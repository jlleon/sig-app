import { ThemeModule } from 'src/app/@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColocacionesComponent } from './colocaciones.component';
import { PanelChartsComponent } from './panel-charts/panel-charts.component';
import { EstructuraInstitucionesComponent } from './panel-charts/estructura-instituciones.component';
import { EstructuraProductosComponent } from './panel-charts/estructura-productos.component';
import { VariacionProductosComponent } from './panel-charts/variacion-productos.component';
import {
  NbCardModule,
  NbTabsetModule,
  NbSelectModule,
  NbIconModule,
  NbAccordionModule
} from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { PanelResumenComponent } from './smart-table/panel-resumen.component';
import { PanelTablaComponent } from './smart-table/panel-tabla.component';
import { VariacionViewComponent } from './smart-table/variacion-column.component';

@NgModule({
  declarations: [
    ColocacionesComponent,
    PanelChartsComponent,
    EstructuraInstitucionesComponent,
    EstructuraProductosComponent,
    VariacionProductosComponent,
    SmartTableComponent,
    PanelResumenComponent,
    PanelTablaComponent,
    VariacionViewComponent
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
export class ColocacionesModule { }
