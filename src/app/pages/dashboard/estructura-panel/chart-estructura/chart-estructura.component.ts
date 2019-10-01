import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'sig-chart-estructura',
  template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
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
export class ChartEstructuraComponent implements OnDestroy {

  @Input() datos: any;

  colorScheme: any;
  themeSubscription: any;
  showLegend = false;
  showXAxis = true;
  showYAxis = false;
  showDataLabel = true;
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
