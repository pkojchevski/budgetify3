import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component';
import {RecordComponent} from './record/record.component';
import {CalendarComponent} from './calendar/calendar.component';
import {LoginComponent} from './login/login.component';
import {ChartsComponent} from './charts/charts.component';
import {AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'charts',
    component: ChartsComponent,
    data: {animation: {page: 'chartsPage'}},
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    component: ListComponent,
    data: {animation: {page: 'listPage'}},
    canActivate: [AuthGuard],
  },
  {
    path: 'records',
    component: RecordComponent,
    data: {animation: {page: 'recordPage'}},
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    data: {animation: {page: 'calendarPage'}},
    canActivate: [AuthGuard],
  },
  {path: '', redirectTo: 'list', pathMatch: 'full', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
