import { Routes } from '@angular/router';
import {CalendarPage} from './calendar-page/calendar-page';
import {SettingsPage} from './settings-page/settings-page';

const routes: Routes = [
  { path: 'calendar', component: CalendarPage },
  { path: 'settings', component: SettingsPage }

];
