import { ActivasService } from 'src/app/@core/services/activas.service';
import { Component, OnInit } from '@angular/core';
import { PasivasService } from 'src/app/@core/services/pasivas.service';
import { VariacionActivas } from 'src/app/@core/data/activas';
import { VariacionPasivas } from 'src/app/@core/data/pasivas';
import * as d3 from 'd3';
import * as dc from 'dc';

@Component({
  selector: 'sig-variacion-panel',
  templateUrl: './variacion-panel.component.html',
  styleUrls: ['./variacion-panel.component.scss']
})
export class VariacionPanelComponent implements OnInit {

  tipoVariacionPasivas = 'MENSUAL';
  tipoVariacionActivas = 'MENSUAL';
  tiposVariaciones: string[] = ['MENSUAL', 'ACUMULADA', 'ANUAL'];

  fecha = '2019-05-31';
  barrasPasivas: any[];
  barrasActivas: any[];
  variacionActivas: VariacionActivas[];
  variacionPasivas: VariacionPasivas[];

  constructor(private pasivasService: PasivasService,
              private activasService: ActivasService) { }

  ngOnInit() {
    const tipoInstitucion = localStorage.getItem('tipoInstitucion');
    this.pasivasService.getVariacionPasivas(this.fecha, tipoInstitucion)
      .subscribe(res => {
        this.variacionPasivas = res;
        this.calcularVariacionPasivas(this.tipoVariacionPasivas);
      }, error => {
        console.log('Error al llamar al servicio');
      });

    this.activasService.getVariacionActivas(this.fecha, tipoInstitucion)
      .subscribe(res => {
        this.variacionActivas = res;
        this.calcularVariacionActivas(this.tipoVariacionActivas);
      }, error => {
        console.log('Error al llamar al servicio');
      });
  }

  calcularVariacionPasivas(tipo: string) {
    this.barrasPasivas = d3.nest()
      .key(dc.pluck('producto'))
      .rollup((d): any => {
        return d3.sum(d, (v: any): any => (v.valor_final - v.valor_inicial) / 1000);
      }).entries(this.variacionPasivas.filter(d => d.tipo === tipo))
      .map((d: any): any => {
        return {
          name: d.key,
          value: d.value,
          color: (d.value >= 0) ? '#2ce69b' : '#ff708d'
        };
      });
  }

  calcularVariacionActivas(tipo: string) {
    this.barrasActivas = d3.nest()
      .key(dc.pluck('producto'))
      .rollup((d): any => {
        return d3.sum(d, (v: any): any => (v.valor_final - v.valor_inicial) / 1000);
      }).entries(this.variacionActivas.filter(d => d.tipo === tipo))
      .map((d: any): any => {
        return {
          name: d.key,
          value: d.value,
          color: (d.value >= 0) ? '#2ce69b' : '#ff708d'
        };
      });
  }

  changeVariacionPasivas(tipoVariacion: string): void {
    this.tipoVariacionPasivas = tipoVariacion;
    this.calcularVariacionPasivas(tipoVariacion);
  }

  changeVariacionActivas(tipoVariacion: string): void {
    this.tipoVariacionActivas = tipoVariacion;
    this.calcularVariacionActivas(tipoVariacion);
  }
}
