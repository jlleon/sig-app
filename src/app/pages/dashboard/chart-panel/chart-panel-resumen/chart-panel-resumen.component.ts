import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sig-chart-panel-resumen',
  styleUrls: ['./chart-panel-resumen.component.scss'],
  template: `
    <div class="summary-container">
      <div *ngFor="let item of resumen">
        <div>{{ item.titulo }}</div>
        <div class="h6">{{ item.valor | sigNumeroConComas }}</div>
      </div>
    </div>
  `
})
export class ChartPanelResumenComponent {
  @Input() resumen: { titulo: string; valor: number }[];
}
