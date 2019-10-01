import { Component, Input, EventEmitter, OnDestroy, OnChanges, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'sig-estructura-instituciones',
  template: `
    <ngx-charts-bar-horizontal
      [scheme]="colorScheme"
      [results]="datos"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [showDataLabel]="showDataLabel"
      [showGridLines]="showGridLines"
      (select)="seleccionarElemento($event)">
    </ngx-charts-bar-horizontal>
  `
})
export class EstructuraInstitucionesComponent implements OnChanges, OnDestroy {

  @Input() datos: any;
  @Output() eventoSeleccion = new EventEmitter<any>();

  colorScheme: any;
  themeSubscription: any;
  showLegend = false;
  showXAxis = true;
  showYAxis = true;
  showDataLabel = false;
  showGridLines = true;
  xAxisLabel = 'Saldo (en miles)';
  yAxisLabel = 'Instituciones';

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnChanges() {
    if (!this.datos) {
      return;
    }

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colorScheme = {
        domain: this.datos.map((d: any) => d.color),
      };
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  seleccionarElemento(elemento: any): void {
    this.eventoSeleccion.emit(elemento);
  }

}
