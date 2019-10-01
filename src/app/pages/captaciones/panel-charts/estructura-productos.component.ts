import { Component, OnDestroy, Input, OnChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'sig-estructura-productos',
  template: `
    <ngx-charts-bar-vertical
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
    </ngx-charts-bar-vertical>
  `
})
export class EstructuraProductosComponent implements OnDestroy {
  @Input() datos: any[];

  colorScheme: any;
  themeSubscription: any;
  showLegend = false;
  showXAxis = true;
  showYAxis = true;
  showDataLabel = false;
  showGridLines = false;
  xAxisLabel = 'Producto';
  yAxisLabel = 'Saldo (en miles)';

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
