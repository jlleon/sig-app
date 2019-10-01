import { Component, OnInit } from '@angular/core';
import { ActivasService } from 'src/app/@core/services/activas.service';
import { PasivasService } from 'src/app/@core/services/pasivas.service';
import { PosicionActivas } from 'src/app/@core/data/activas';
import { PosicionPasivas } from 'src/app/@core/data/pasivas';
import * as d3 from 'd3';
import * as dc from 'dc';

@Component({
  selector: 'sig-dashboard-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnInit {

  fecha = '2019-05-31';
  mostrarPasivas = false;
  mostrarActivas = false;
  tendenciaPasivas = 'tendencia-pasivas';
  tendenciaActivas = 'tendencia-activas';
  resumenPasivas: any[];
  resumenActivas: any[];
  seriePasivas: any[];
  serieActivas: any[];
  posicionActivas: PosicionActivas[];
  posicionPasivas: PosicionPasivas[];

  constructor(private pasivasService: PasivasService,
              private activasService: ActivasService) { }

  ngOnInit() {
    const tipoInstitucion = localStorage.getItem('tipoInstitucion');
    this.pasivasService.getPosicionPasivas(this.fecha, tipoInstitucion)
      .subscribe(res => {
        this.posicionPasivas = res;
        this.calcularResumenPasivas();
        this.calcularSeriesPasivas();
      }, error => {
        console.log('Error al llamar al servicio');
      });

    this.activasService.getPosicionActivas(this.fecha, tipoInstitucion)
      .subscribe(res => {
        this.posicionActivas = res;
        this.calcularResumenActivas();
        this.calcularSeriesActivas();
      }, error => {
        console.log('Error al llamar al servicio');
      });
  }

  /**
   * Funcion que calcula los resumenes de las captaciones
   */
  calcularResumenPasivas() {
    this.resumenPasivas = d3.nest()
      .key(dc.pluck('tipo_institucion'))
      .sortKeys(d3.ascending)
      .rollup((d): any => {
        return d3.sum(d, (v: any) => v.fecha === this.fecha ? v.saldo : 0);
      })
      .entries(this.posicionPasivas)
      .map((d): any => {
        return {
          titulo: d.key,
          valor: d.value
        };
      });

    const total = {
      titulo: 'Total',
      valor: d3.nest()
        .rollup((d): any => {
          return d3.sum(d, (v: any) => v.fecha === this.fecha ? v.saldo : 0);
        })
        .entries(this.posicionPasivas)
    };

    this.resumenPasivas.unshift(total);
  }

  calcularSeriesPasivas() {
    const datos = d3.nest()
      .key(dc.pluck('fecha'))
      .sortKeys(d3.ascending)
      .rollup((d): any => {
        return d3.sum(d, (v: any) => v.saldo / 1000);
      })
      .entries(this.posicionPasivas)
      .map((d): any => {
        return {
          name: d.key,
          value: d.value
        };
      });

    this.seriePasivas = [{
      name: 'Captaciones',
      series: datos
    }];
  }

  /**
   * Funcion que calcula los resumenes de las colocaciones
   */
  calcularResumenActivas() {
    this.resumenActivas = d3.nest()
      .key(dc.pluck('tipo_institucion'))
      .sortKeys(d3.ascending)
      .rollup((d): any => {
        return d3.sum(d, (v: any) => v.fecha === this.fecha ? v.saldo : 0);
      })
      .entries(this.posicionActivas)
      .map((d): any => {
        return {
          titulo: d.key,
          valor: d.value
        };
      });

    const total = {
      titulo: 'Total',
      valor: d3.nest()
      .rollup((d): any => {
        return d3.sum(d, (v: any) => v.fecha === this.fecha ? v.saldo : 0);
      })
      .entries(this.posicionActivas)
    };

    this.resumenActivas.unshift(total);
  }

  calcularSeriesActivas() {
    const datos = d3.nest()
    .key(dc.pluck('fecha'))
    .sortKeys(d3.ascending)
    .rollup((d): any => {
      return d3.sum(d, (v: any) => v.saldo / 1000);
    })
    .entries(this.posicionActivas)
    .map((d): any => {
      return {
        name: d.key,
        value: d.value
      };
    });

    this.serieActivas = [{
      name: 'Colocaciones',
      series: datos
    }];
  }

  changeTab(selectedTab: any) {
    if (selectedTab.tabTitle === 'Colocaciones') {
      this.mostrarActivas = true;
      this.mostrarPasivas = false;
    } else {
      this.mostrarPasivas = true;
      this.mostrarActivas = false;
    }
  }
}
