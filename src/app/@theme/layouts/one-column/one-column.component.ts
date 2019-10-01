import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sig-one-column-layout',
  styleUrls: ['./one-column.component.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <sig-header></sig-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `
})
export class OneColumnComponent { }
