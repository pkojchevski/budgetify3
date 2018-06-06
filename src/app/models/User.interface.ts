export interface User {
  uid: string;
  email: string;
  photoUrl?: string;
  displayName?: string;

  fcmTokens?: {[token: string]: true};
}
