import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'sig-panel-resumen',
  styleUrls: ['./smart-table.component.scss'],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12"><h5>{{ titulo }} (en miles)</h5></div>
      </div>
      <div class="row">
        <div class="col-md-3"><h6>Saldo: $ {{ resumen.saldo | number: '1.0-0' }}</h6></div>
        <div class="col-md-3"><h6>Var. Mensual:</h6>
          <div class="row">
            <div class="col-md-4 resumen" [class.up]="esPosMensual" [class.down]="!esPosMensual">
              $ {{ resumen.varMensual | number: '1.0-0' }}
            </div>
            <div class="col-md-4 resumen" [class.up]="esPosMensual" [class.down]="!esPosMensual">
              {{ (resumen.varMensual / resumen.saldo) | percent: '1.0-2' }}
              <nb-icon [icon]="esPosMensual ? 'arrow-up' : 'arrow-down'" pack="eva"></nb-icon>
            </div>
          </div>
        </div>
        <div class="col-md-3"><h6>Var. Acumulada:</h6>
          <div class="row">
            <div class="col-md-4 resumen" [class.up]="esPosAcumulada" [class.down]="!esPosAcumulada">
              $ {{ resumen.varAcumulada | number: '1.0-0' }}
            </div>
            <div class="col-md-4 resumen" [class.up]="esPosAcumulada" [class.down]="!esPosAcumulada">
              {{ (resumen.varAcumulada / resumen.saldo) | percent: '1.0-2' }}
              <nb-icon [icon]="esPosAcumulada ? 'arrow-up' : 'arrow-down'" pack="eva"></nb-icon>
            </div>
          </div>
        </div>
        <div class="col-md-3"><h6>Var. Anual:</h6>
          <div class="row">
            <div class="col-md-4 resumen" [class.up]="esPosAnual" [class.down]="!esPosAnual">
              $ {{ resumen.varAnual | number: '1.0-0' }}
            </div>
            <div class="col-md-4 resumen" [class.up]="esPosAnual" [class.down]="!esPosAnual">
              {{ (resumen.varAnual / resumen.saldo) | percent: '1.0-2' }}
              <nb-icon [icon]="esPosAnual ? 'arrow-up' : 'arrow-down'" pack="eva"></nb-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PanelResumenComponent implements OnChanges {

  titulo = 'Resumen';
  resumen = {
    saldo: 1,
    varMensual: 0,
    varAcumulada: 0,
    varAnual: 0
  };

  @Input() datos: any;
  @Input() tituloResumen: any;

  esPosMensual = true;
  esPosAcumulada = true;
  esPosAnual = true;

  ngOnChanges() {
    if (!this.datos) {
      return;
    }

    this.resumen = this.datos;
    this.titulo = this.tituloResumen;
    this.esPosMensual = this.resumen.varMensual >= 0;
    this.esPosAcumulada = this.resumen.varAcumulada >= 0;
    this.esPosAnual = this.resumen.varAnual >= 0;
  }

}
