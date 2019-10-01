import { AuthGuard } from './../@core/security/auth.guard';
import { ThemeModule } from './../@theme/theme.module';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import {
  NbMenuModule,
  NbCardModule,
  NbIconModule,
  NbSelectModule,
  NbDatepickerModule,
  NbRadioModule,
  NbCheckboxModule,
  NbButtonModule,
  NbInputModule,
  NbToastrModule,
  NbToastrService
} from '@nebular/theme';
import { CaptacionesModule } from './captaciones/captaciones.module';
import { ColocacionesModule } from './colocaciones/colocaciones.module';
import { AdministracionComponent } from './administracion/administracion.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

const MODULES_THEME = [
  NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbCheckboxModule,
  NbRadioModule,
  NbSelectModule,
  NbIconModule,
  Ng2SmartTableModule,
  NbToastrModule.forRoot()
];
@NgModule({
  declarations: [
    PagesComponent,
    AdministracionComponent
  ],
  imports: [
    ...MODULES_THEME,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    CaptacionesModule,
    ColocacionesModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    NbToastrService
  ]
})
export class PagesModule { }
