import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'sig-chart-tendencia',
  template: `
    <ngx-charts-line-chart
      [scheme]="colorScheme"
      [results]="datos"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [autoScale]="autoScale"
      [xAxisTickFormatting]="this.dateTickFormatting"
      [yAxisTickFormatting]="this.nummberFormatting"
      [showGridLines]="showGridLines">
      <ng-template #tooltipTemplate let-model="model">
        <h5>{{ this.dateTickFormatting(model.name) }}: {{ this.nummberFormatting(model.value) }}</h5>
      </ng-template>
    </ngx-charts-line-chart>
  `,
})
export class ChartTendenciaComponent implements OnDestroy {
  @Input() datos: any;

  showLegend = false;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = false;
  xAxisLabel = 'Fecha';
  showYAxisLabel = true;
  yAxisLabel = 'Saldo (en miles)';
  colorScheme: any;
  themeSubscription: any;
  autoScale = true;
  showGridLines = true;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  dateTickFormatting(val: any): string {
    return moment(val, 'YYYY-MM-dd').format('MMM-YY');
  }

  nummberFormatting(val: number): string {
    return '$ ' + new Intl.NumberFormat().format(Math.round(val));
  }
}
