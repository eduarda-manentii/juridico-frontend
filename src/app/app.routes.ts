import { Routes } from '@angular/router';
import { LoginComponentComponent } from './features/auth/components/login-component/login-component.component';
import { IndexProcessComponent } from './features/process/pages/index-process/index-process.component';
import { IndexPartiesInvoledComponent } from './features/parties-involved/pages/index-parties-involed/index-parties-involed.component';
import { IndexProceduralProgressComponent } from './features/procedural-progress/pages/index-procedural-progress/index-procedural-progress.component';
import { NewPartiesInvoledComponent } from './features/parties-involved/pages/new-parties-involed/new-parties-involed.component';
import { NewProceduralProgressComponent } from './features/procedural-progress/pages/new-procedural-progress/new-procedural-progress.component';
import { NewProcessComponent } from './features/process/pages/new-process/new-process.component';
import { ShowPartiesInvoledComponent } from './features/parties-involved/pages/show-parties-involed/show-parties-involed.component';
import { ShowProceduralProgressComponent } from './features/procedural-progress/pages/show-procedural-progress/show-procedural-progress.component';
import { ShowProcessComponent } from './features/process/pages/show-process/show-process.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AuthGuard } from './core/services/auth-guard.service';

export const routes: Routes = [
  { path: '',                                    redirectTo: 'login', pathMatch: 'full' },
  { path : "login",                              component: LoginComponentComponent },
  { path : "process/new",                        component: NewProcessComponent, canActivate: [AuthGuard] },
  { path : "process/show/:id",                   component: ShowProcessComponent, canActivate: [AuthGuard] },
  { path : "process/edit/:id",                   component: NewProcessComponent, canActivate: [AuthGuard] },
  { path : "process/index",                      component: IndexProcessComponent, canActivate: [AuthGuard]  },
  { path : "parties_involved/new",               component: NewPartiesInvoledComponent, canActivate: [AuthGuard] },
  { path : "parties_involved/show/:id",          component: ShowPartiesInvoledComponent, canActivate: [AuthGuard] },
  { path : "parties_involved/edit/:id",          component: NewPartiesInvoledComponent, canActivate: [AuthGuard] },
  { path : "parties_involved/index",             component: IndexPartiesInvoledComponent, canActivate: [AuthGuard]  },
  { path : "procedural_progress/new",            component: NewProceduralProgressComponent, canActivate: [AuthGuard] },
  { path : "procedural_progress/show/:id",       component: ShowProceduralProgressComponent, canActivate: [AuthGuard] },
  { path : "procedural_progress/edit/:id",       component: NewProceduralProgressComponent, canActivate: [AuthGuard] },
  { path : "procedural_progress/index",          component: IndexProceduralProgressComponent, canActivate: [AuthGuard]  },
  { path : "home",                               component: HomeComponent, canActivate: [AuthGuard] },
];
