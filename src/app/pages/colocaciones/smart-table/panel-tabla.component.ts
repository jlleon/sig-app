import { Component, Input, OnChanges } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'sig-panel-tabla',
  template: `
    <input #search class="search" nbInput fullWidth type="text" placeholder="Buscar" (keydown.enter)="onSearch(search.value)">
    <ng2-smart-table [settings]="configuracion" [source]="source"></ng2-smart-table>
  `,
  styleUrls: ['./smart-table.component.scss']
})
export class PanelTablaComponent implements OnChanges {

  @Input() datos: any;
  @Input() configuracion: any;

  source: LocalDataSource = new LocalDataSource();

  constructor() { }

  ngOnChanges() {
    if (!this.datos) {
      return;
    }

    this.source.load(this.datos);
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'institucion',
        search: query
      }
    ], true);
  }

}
