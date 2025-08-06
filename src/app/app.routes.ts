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

export const routes: Routes = [
  { path: '',                                    redirectTo: 'login', pathMatch: 'full' },
  { path : "login",                              component: LoginComponentComponent },
  { path : "process/new",                        component: NewProcessComponent },
  { path : "process/show/:id",                   component: ShowProcessComponent },
  { path : "process/edit/:id",                   component: NewProcessComponent },
  { path : "process/index",                      component: IndexProcessComponent  },
  { path : "parties_involved/new",               component: NewPartiesInvoledComponent },
  { path : "parties_involved/show/:id",          component: ShowPartiesInvoledComponent },
  { path : "parties_involved/edit/:id",          component: NewPartiesInvoledComponent },
  { path : "parties_involved/index",             component: IndexPartiesInvoledComponent  },
  { path : "procedural_progress/new",            component: NewProceduralProgressComponent },
  { path : "procedural_progress/show/:id",       component: ShowProceduralProgressComponent },
  { path : "procedural_progress/edit/:id",       component: NewProceduralProgressComponent },
  { path : "procedural_progress/index",          component: IndexProceduralProgressComponent  },
];
