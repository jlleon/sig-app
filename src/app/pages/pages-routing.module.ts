import { AdministracionComponent } from './administracion/administracion.component';
import { ColocacionesComponent } from './colocaciones/colocaciones.component';
import { CaptacionesComponent } from './captaciones/captaciones.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthGuard } from '../@core/security/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [ AuthGuard ]
    },
    {
      path: 'captaciones',
      component: CaptacionesComponent,
      canActivate: [ AuthGuard ]
    },
    {
      path: 'colocaciones',
      component: ColocacionesComponent,
      canActivate: [ AuthGuard ]
    },
    {
      path: 'admin',
      component: AdministracionComponent,
      canActivate: [ AuthGuard ]
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
