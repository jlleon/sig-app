import { PosicionPasivas } from 'src/app/@core/data/pasivas';
import { ActivasService } from 'src/app/@core/services/activas.service';
import { Component, OnInit } from '@angular/core';
import { PasivasService } from 'src/app/@core/services/pasivas.service';
import { PosicionActivas } from 'src/app/@core/data/activas';
import * as d3 from 'd3';
import * as dc from 'dc';

@Component({
  selector: 'sig-estructura-panel',
  templateUrl: './estructura-panel.component.html',
  styleUrls: ['./estructura-panel.component.scss']
})
export class EstructuraPanelComponent implements OnInit {

  fecha = '2019-05-31';
  estructuraPasivas: any[];
  estructuraActivas: any[];
  posicionActivas: PosicionActivas[];
  posicionPasivas: PosicionPasivas[];

  constructor(private pasivasService: PasivasService,
              private activasService: ActivasService) { }

  ngOnInit() {
    const tipoInstitucion = localStorage.getItem('tipoInstitucion');
    this.pasivasService.getPosicionPasivas(this.fecha, tipoInstitucion)
      .subscribe(res => {
        this.posicionPasivas = res;
        this.calcularEstructuraPasivas();
      }, error => {
        console.log('Error al llamar al servicio');
      });

    this.activasService.getPosicionActivas(this.fecha, tipoInstitucion)
      .subscribe(res => {
        this.posicionActivas = res;
        this.calcularEstructuraActivas();
      }, error => {
        console.log('Error al llamar al servicio');
      });
  }

  calcularEstructuraPasivas() {
    this.estructuraPasivas = d3.nest()
      .key(dc.pluck('producto'))
      .rollup((d): any => {
        return d3.sum(d, (v: any) => v.fecha === this.fecha ? v.saldo / 1000 : 0);
      }).entries(this.posicionPasivas)
      .map((d): any => {
        return {
          name: d.key,
          value: d.value
        };
      });
  }

  calcularEstructuraActivas() {
    this.estructuraActivas = d3.nest()
      .key(dc.pluck('producto'))
      .rollup((d): any => {
        return d3.sum(d, (v: any) => v.fecha === this.fecha ? v.saldo / 1000 : 0);
      }).entries(this.posicionActivas)
      .map((d): any => {
        return {
          name: d.key,
          value: d.value
        };
      });
  }
}
