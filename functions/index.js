const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.notifyUser = functions.firestore
  .document('records/{recordId}')
  .onCreate(event => {
    const message = event.data.data();
    const userId = message.recipientId;

    const payload = {
      notification: {
        title: 'New message!',
        body: `${message.senderId} sent you a new message`,
        icon: 'https://goo.gl/Fz9nrQ',
      },
    };

    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);

    return userRef
      .get()
      .then(snapshot => snapshot.data())
      .then(user => {
        const tokens = user.fcmTokens ? Object.keys(user.fcmTokens) : [];

        if (!tokens.length) {
          throw new Error('User does not have any tokens!');
        }
        return admin.messaging().sendToDevice(tokens, payload);
      })
      .catch(err => console.log(err));
  });
