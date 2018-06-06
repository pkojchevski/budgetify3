import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BsNavbarComponent} from './bs-navbar/bs-navbar.component';
import {CalendarComponent} from './calendar/calendar.component';
import {ListComponent} from './list/list.component';
import {ChartsComponent} from './charts/charts.component';
import {RecordComponent} from './record/record.component';
import {LoginComponent} from './login/login.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PkModalComponent} from './record/pk-modal.component';
import {PkModalService} from './record/pk-modal.service';

import {RecordService} from './services/record.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {config} from './services/config.firebase';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ArrangedataService} from './services/arrangedata.service';
import {SelectedDateComponent} from './selected-date/selected-date.component';

import {NvD3Module} from 'ng2-nvd3';
import 'd3';
import 'nvd3';

import {SelectedDateService} from './services/selectedDate.service';
import {BarchartComponent} from './charts/barchart/barchart.component';
import {PiechartComponent} from './charts/piechart/piechart.component';
import {ControlMessagesComponent} from './control-messages/control-messages';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SidemenuComponent} from './sidemenu/sidemenu.component';
import {MessagingService} from './services/messaging.service';
import {SendRecordsService} from './services/send-records.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    CalendarComponent,
    ListComponent,
    ChartsComponent,
    RecordComponent,
    LoginComponent,
    PkModalComponent,
    SelectedDateComponent,
    BarchartComponent,
    PiechartComponent,
    ControlMessagesComponent,
    SidemenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    NvD3Module,
  ],
  providers: [
    PkModalService,
    RecordService,
    ArrangedataService,
    SelectedDateService,
    AuthService,
    AuthGuard,
    MessagingService,
    SendRecordsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
