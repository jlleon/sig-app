import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { VariacionViewComponent } from './variacion-column.component';
import * as d3 from 'd3';
import * as dc from 'dc';

@Component({
  selector: 'sig-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss']
})
export class SmartTableComponent implements OnInit, OnChanges {

  @Input() variacionActivas: any;

  datosBancos: any[];
  datosCooperativas: any[];
  datosMutualistas: any[];

  resumenB: any;
  resumenC: any;
  resumenM: any;
  resumenT: any;

  tituloB = 'Banco';
  tituloC = 'Cooperativa';
  tituloM = 'Mutualista';
  tituloT = 'Total';

  mostrarTabla = {
    banco: {
      tab: true,
      exp: false
    },
    coop: {
      tab: true,
      exp: false
    },
    mut: {
      tab: true,
      exp: false
    }
  };

  configuracion = {
    actions: false,
    columns: {
      institucion: {
        title: 'INSTITUCION',
        filter: false
      },
      saldo: {
        title: 'SALDO',
        filter: false,
        type: 'html',
        valuePrepareFunction: (value: any): any => {
          return '<div align="right"><span>' + '$ ' + new Intl.NumberFormat().format(Math.round(value)) + '</span></div>';
        }
      },
      var_mensual: {
        title: 'VARIACION MENSUAL',
        filter: false,
        type: 'custom',
        renderComponent: VariacionViewComponent
      },
      var_anual: {
        title: 'VARIACION ACUMULADA',
        filter: false,
        type: 'custom',
        renderComponent: VariacionViewComponent
      },
      var_acumulada: {
        title: 'VARIACION ANUAL',
        filter: false,
        type: 'custom',
        renderComponent: VariacionViewComponent
      }
    }
  };

  constructor() {
  }

  ngOnInit() {
    const tipoInstitucion = localStorage.getItem('tipoInstitucion');
    if (tipoInstitucion === 'Banco') {
      this.mostrarTabla.banco.tab = true;
      this.mostrarTabla.banco.exp = true;
      this.mostrarTabla.coop.tab = false;
      this.mostrarTabla.coop.exp = false;
      this.mostrarTabla.mut.tab = false;
      this.mostrarTabla.mut.exp = false;
    } else if (tipoInstitucion === 'Cooperativa') {
      this.mostrarTabla.banco.tab = false;
      this.mostrarTabla.banco.exp = false;
      this.mostrarTabla.coop.tab = true;
      this.mostrarTabla.coop.exp = true;
      this.mostrarTabla.mut.tab = false;
      this.mostrarTabla.mut.exp = false;
    } else if (tipoInstitucion === 'Mutualista') {
      this.mostrarTabla.banco.tab = false;
      this.mostrarTabla.banco.exp = false;
      this.mostrarTabla.coop.tab = false;
      this.mostrarTabla.coop.exp = false;
      this.mostrarTabla.mut.tab = true;
      this.mostrarTabla.mut.exp = true;
    } else {
      this.mostrarTabla.banco.tab = true;
      this.mostrarTabla.banco.exp = false;
      this.mostrarTabla.coop.tab = true;
      this.mostrarTabla.coop.exp = false;
      this.mostrarTabla.mut.tab = true;
      this.mostrarTabla.mut.exp = false;
    }
  }

  ngOnChanges() {
    if (!this.variacionActivas) {
      return;
    }

    this.datosBancos = this.calcularDatosSmartTable('Banco');
    this.datosCooperativas = this.calcularDatosSmartTable('Cooperativa');
    this.datosMutualistas = this.calcularDatosSmartTable('Mutualista');

    this.resumenB = this.calcularDatosResumen('Banco');
    this.resumenC = this.calcularDatosResumen('Cooperativa');
    this.resumenM = this.calcularDatosResumen('Mutualista');
    this.resumenT = this.calcularDatosResumen('Total');
  }

  calcularDatosSmartTable(tipoInstitucion: string): any[] {
    return d3.nest()
      .key(dc.pluck('nombre_corto'))
      .rollup((d: any): any => {
        return {
          saldo: d3.sum(d, (v: any): any => v.tipo === 'MENSUAL' ? v.valor_final / 1000 : 0),
          var_mensual: d3.sum(d, (v: any): any => v.tipo === 'MENSUAL' ? (v.valor_final - v.valor_inicial) / 1000 : 0),
          var_acumulada: d3.sum(d, (v: any): any => v.tipo === 'ACUMULADA' ? (v.valor_final - v.valor_inicial) / 1000 : 0),
          var_anual: d3.sum(d, (v: any): any => v.tipo === 'ANUAL' ? (v.valor_final - v.valor_inicial) / 1000 : 0),
        };
      })
      .entries(this.variacionActivas.filter((d: any): any => d.tipo_institucion === tipoInstitucion))
      .map((d: any): any => {
        return {
          institucion: d.key,
          saldo: d.value.saldo,
          var_mensual: d.value.var_mensual,
          var_acumulada: d.value.var_acumulada,
          var_anual: d.value.var_anual
        };
      });
  }

  calcularDatosResumen(tipoInstitucion: string): any {
    if (tipoInstitucion === 'Total') {
      return d3.nest()
        .rollup((d: any): any => {
          return {
            saldo: d3.sum(d, (v: any): any => v.tipo === 'MENSUAL' ? v.valor_final / 1000 : 0),
            varMensual: d3.sum(d, (v: any): any => v.tipo === 'MENSUAL' ? (v.valor_final - v.valor_inicial) / 1000 : 0),
            varAcumulada: d3.sum(d, (v: any): any => v.tipo === 'ACUMULADA' ? (v.valor_final - v.valor_inicial) / 1000 : 0),
            varAnual: d3.sum(d, (v: any): any => v.tipo === 'ANUAL' ? (v.valor_final - v.valor_inicial) / 1000 : 0),
          };
        })
        .entries(this.variacionActivas);
    }

    return d3.nest()
      .rollup((d: any): any => {
        return {
          saldo: d3.sum(d, (v: any): any => v.tipo === 'MENSUAL' ? v.valor_final / 1000 : 0),
          varMensual: d3.sum(d, (v: any): any => v.tipo === 'MENSUAL' ? (v.valor_final - v.valor_inicial) / 1000 : 0),
          varAcumulada: d3.sum(d, (v: any): any => v.tipo === 'ACUMULADA' ? (v.valor_final - v.valor_inicial) / 1000 : 0),
          varAnual: d3.sum(d, (v: any): any => v.tipo === 'ANUAL' ? (v.valor_final - v.valor_inicial) / 1000 : 0),
        };
      })
      .entries(this.variacionActivas.filter((d: any): any => d.tipo_institucion === tipoInstitucion));
  }
}
