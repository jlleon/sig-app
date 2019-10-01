import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptacionesComponent } from './captaciones.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbCardModule,
  NbTabsetModule,
  NbSelectModule,
  NbIconModule,
  NbAccordionModule
} from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PanelChartsComponent } from './panel-charts/panel-charts.component';
import { EstructuraInstitucionesComponent } from './panel-charts/estructura-instituciones.component';
import { EstructuraProductosComponent } from './panel-charts/estructura-productos.component';
import { VariacionProductosComponent } from './panel-charts/variacion-productos.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { VariacionViewComponent } from './smart-table/variacion-column.component';
import { PanelResumenComponent } from './smart-table/panel-resumen.component';
import { PanelTablaComponent } from './smart-table/panel-tabla.component';

@NgModule({
  declarations: [
    CaptacionesComponent,
    PanelChartsComponent,
    EstructuraInstitucionesComponent,
    EstructuraProductosComponent,
    VariacionProductosComponent,
    SmartTableComponent,
    VariacionViewComponent,
    PanelResumenComponent,
    PanelTablaComponent
  ],
  entryComponents: [
    VariacionViewComponent
  ],
  imports: [
    ThemeModule,
    NbCardModule,
    NbTabsetModule,
    NbSelectModule,
    NgxChartsModule,
    NbIconModule,
    NbAccordionModule,
    Ng2SmartTableModule,
    CommonModule
  ]
})
export class CaptacionesModule { }
