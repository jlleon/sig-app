import { NbThemeService } from '@nebular/theme';
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'sig-variacion-productos',
  template: `
    <ngx-charts-bar-horizontal
      [scheme]="colorScheme"
      [animations]="false"
      [results]="datos"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [showDataLabel]="showDataLabel"
      [showGridLines]="showGridLines">
    </ngx-charts-bar-horizontal>
  `
})
export class VariacionProductosComponent implements OnChanges, OnDestroy {

  @Input() datos: any;

  colorScheme: any;
  themeSubscription: any;
  showLegend = false;
  showXAxis = true;
  showYAxis = true;
  showDataLabel = true;
  showGridLines = false;
  xAxisLabel = 'Variación (en miles)';
  yAxisLabel = 'Productos';

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

    this.colorScheme = {
      domain: this.datos.map((d: any) => d.color),
    };
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
