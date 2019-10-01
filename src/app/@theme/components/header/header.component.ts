import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { map, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'sig-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userPictureOnly = false;
  user: any;

  userMenu = [ { title: 'Log out' } ];
  esAdministrador = false;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private router: Router) { }

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    this.user = {
      name: `${usuario.nombre} ${usuario.apellido}`
    };

    this.esAdministrador = false;
    if (usuario.rol === 'admin') {
      // this.userMenu = [ { title: 'Administración' }, { title: 'Log out' } ];
      this.esAdministrador = true;
    }

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'menuUsuario'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title === 'Log out') {
          localStorage.clear();
          this.router.navigate(['/auth']);
        }

        if (title === 'Administración') {
          this.router.navigate(['/pages/admin']);
        }
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    this.router.navigate(['/pages/dashboard']);
    return false;
  }

  eventoClick(element: any) {
    this.router.navigate(['/pages/admin']);
  }
}
