import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as dc from 'dc';

@Component({
  selector: 'sig-panel-charts',
  templateUrl: './panel-charts.component.html',
  styleUrls: ['./panel-charts.component.scss']
})
export class PanelChartsComponent implements OnChanges {

  @Input() tipoInstitucion: string;
  @Input() institucion: string;
  @Input() posicionActivas: any[];
  @Input() variacionActivas: any[];

  fecha = '2019-05-31';
  mostrarChartInstituciones = false;
  tipoVariacion = 'MENSUAL';
  tiposVariaciones: string[] = ['MENSUAL', 'ACUMULADA', 'ANUAL'];

  datosInstituciones: any[];
  datosProductos: any[];
  datosVariaciones: any[];
  institucionSeleccionada: string;

  constructor() { }

  ngOnChanges() {
    if (!this.posicionActivas || !this.variacionActivas) {
      return;
    }

    this.mostrarChartInstituciones = this.tipoInstitucion !== 'Todas';
    this.institucionSeleccionada = undefined;
    this.calcularDatosInstituciones();
    this.calcularDatosProductos();
    this.calcularDatosVariaciones();
  }

  calcularDatosInstituciones() {
    let datos = this.posicionActivas;
    if (this.tipoInstitucion !== 'Todas') {
      datos = datos.filter((d): any => d.tipo_institucion === this.tipoInstitucion);
    }

    this.datosInstituciones = d3.nest()
      .key(dc.pluck('nombre_corto'))
      .rollup((d): any => {
        return d3.sum(d, (v: any) => v.fecha === this.fecha ? v.saldo / 1000 : 0);
      })
      .entries(datos)
      .sort((a: any, b: any) => {
        return d3.descending(a.value, b.value);
      })
      .map((d: any) => {
        return {
          name: d.key,
          value: d.value,
          color: d.key === this.institucion ? '#ff708d' : '#42aaff'
        };
      }).slice(0, 24);
  }

  calcularDatosProductos() {
    let datos = this.posicionActivas;
    if (this.tipoInstitucion !== 'Todas') {
      datos = datos.filter((d): any => d.tipo_institucion === this.tipoInstitucion);
    }

    if (this.institucionSeleccionada) {
      datos = datos.filter((d): any => d.nombre_corto === this.institucionSeleccionada);
    }

    this.datosProductos = d3.nest()
      .key(dc.pluck('producto'))
      .sortKeys(d3.ascending)
      .rollup((d): any => {
        return d3.sum(d, (v: any) => v.fecha === this.fecha ? v.saldo / 1000 : 0);
      })
      .entries(datos)
      .map((d: any) => {
        return {
          name: d.key,
          value: d.value,
        };
      });
  }

  calcularDatosVariaciones() {
    let datos = this.variacionActivas.filter((d): any => d.tipo === this.tipoVariacion);
    if (this.tipoInstitucion !== 'Todas') {
      datos = datos.filter((d): any => d.tipo_institucion === this.tipoInstitucion);
    }

    if (this.institucionSeleccionada) {
      datos = datos.filter((d): any => d.nombre_corto === this.institucionSeleccionada);
    }

    this.datosVariaciones = d3.nest()
      .key(dc.pluck('producto'))
      .sortKeys(d3.ascending)
      .rollup((d): any => {
        return {
            valor_inicial: d3.sum(d, (v: any) => v.valor_inicial / 1000),
            valor_final: d3.sum(d, (v: any) => v.valor_final / 1000)
          };
      })
      .entries(datos)
      .map((d: any) => {
        return {
          name: d.key,
          value: d.value.valor_final - d.value.valor_inicial,
          color: (d.value.valor_final - d.value.valor_inicial) >= 0 ? '#2ce69b' : '#ff708d'
        };
      });
  }

  seleccionarElemento(elemento: any) {
    if (this.institucionSeleccionada === elemento.name) {
      this.institucionSeleccionada = undefined;
    } else {
      this.institucionSeleccionada = elemento.name;
    }
    this.calcularDatosProductos();
    this.calcularDatosVariaciones();
  }

  changeVariacion(variacion: string) {
    this.tipoVariacion = variacion;
    this.calcularDatosVariaciones();
  }

  limpiarFiltro() {
    this.institucionSeleccionada = undefined;
    this.calcularDatosProductos();
    this.calcularDatosVariaciones();
  }
}
