import { ViewCell } from 'ng2-smart-table';
import { OnInit, Component, Input } from '@angular/core';

@Component({
  selector: 'panel-variacion',
  styleUrls: ['./smart-table.component.scss'],
  template: `
    <div class="row" style="text-align: right">
      <div class="col-sm-6">
        <span class="delta" [class.up]="esPositivo" [class.down]="!esPositivo">
          $ {{ renderValue | number: '1.0-0' }}
        </span>
      </div>
      <div class="col-sm-6">
        <span class="delta" [class.up]="esPositivo" [class.down]="!esPositivo">
          {{ (renderValue / rowData.saldo) | percent: '1.0-2' }}
          <nb-icon [icon]="esPositivo ? 'arrow-up' : 'arrow-down'" pack="eva"></nb-icon>
        </span>
      </div>
    </div>
  `,
})
export class VariacionViewComponent implements ViewCell, OnInit {
  renderValue: any;
  esPositivo = true;

  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = +this.value;
    this.esPositivo = this.value >= 0;
    console.log(this.rowData);
  }
}
