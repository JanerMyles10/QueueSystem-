import { Dailyhistory } from './components/dailyhistory/dailyhistory';
import { Front } from './components/front/front';
import { Routes } from '@angular/router';
import { Display } from './components/display/display';
import { Admin } from './components/admin/admin';
import { Login } from './components/login/login';
import { AuthGuard } from './guards/authguard';
import { Dashboard } from './components/dashboard/dashboard';
import { Statsoverview } from './components/statsoverview/statsoverview';


export const routes: Routes = [
  { path: '', component: Front },
  { path: 'front', component: Front },
  { path: 'login', component: Login },
  { path: 'display', component: Display },
  { path: 'admin', component: Admin, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'dailyhistory', pathMatch: 'full' },
      { path: 'dailyhistory', component: Dailyhistory },
      { path: 'statsoverview', component: Statsoverview },
    ]
  }
];

