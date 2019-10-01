import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../@core/services/modules.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sig-pages',
  styleUrls: ['./pages.component.scss'],
  template: `
    <sig-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </sig-one-column-layout>
  `
})
export class PagesComponent implements OnInit {

  menu = [];
  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    this.menu = usuario.modulos;
  }
}
