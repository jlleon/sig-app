import { Injectable } from '@angular/core';
import { ModulesData } from '../data/modules';
import { NbMenuItem } from '@nebular/theme';
import { of as observableOf, Observable } from 'rxjs';

@Injectable()
export class ModulesService extends ModulesData {

  // private menu: NbMenuItem[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'home-outline',
  //     link: 'dashboard',
  //     home: true
  //   },
  //   {
  //     title: 'OPCIONES',
  //     group: true
  //   },
  //   {
  //     title: 'Captaciones',
  //     icon: 'briefcase-outline',
  //     link: 'captaciones'
  //   },
  //   {
  //     title: 'Colocaciones',
  //     icon: 'credit-card-outline',
  //     link: 'colocaciones'
  //   }
  // ];

  getModules(): Observable<any> {
    return undefined;
  }
}
