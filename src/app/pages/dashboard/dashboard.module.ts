import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartPanelComponent } from './chart-panel/chart-panel.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  NbCardModule,
  NbTabsetModule,
  NbSelectModule
} from '@nebular/theme';
import { ChartPanelResumenComponent } from './chart-panel/chart-panel-resumen/chart-panel-resumen.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ChartTendenciaComponent } from './chart-panel/chart-tendencia/chart-tendencia.component';
import { VariacionPanelComponent } from './variacion-panel/variacion-panel.component';
import { ChartVariacionComponent } from './variacion-panel/chart-variacion/chart-variacion.component';
import { EstructuraPanelComponent } from './estructura-panel/estructura-panel.component';
import { ChartEstructuraComponent } from './estructura-panel/chart-estructura/chart-estructura.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ChartPanelComponent,
    ChartPanelResumenComponent,
    ChartTendenciaComponent,
    VariacionPanelComponent,
    ChartVariacionComponent,
    EstructuraPanelComponent,
    ChartEstructuraComponent
  ],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NbTabsetModule,
    NbSelectModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
