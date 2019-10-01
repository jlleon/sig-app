import { ActivasService } from 'src/app/@core/services/activas.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/@core/services/users.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sig-colocaciones',
  styleUrls: ['./colocaciones.component.scss'],
  templateUrl: './colocaciones.component.html',
})
export class ColocacionesComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  fecha = '2019-05-31';

  institucion: string;
  tipoInstitucion = 'Todas';
  tiposInstituciones: string[] = ['Todas', 'Banco', 'Cooperativa', 'Mutualista'];
  muestraTipoInstituciones = true;

  posicionActivas: any[];
  variacionActivas: any[];

  constructor(private usersService: UsersService,
              private activasService: ActivasService) { }

  ngOnInit() {
    this.tipoInstitucion = localStorage.getItem('tipoInstitucion');
    this.institucion = localStorage.getItem('institucion');
    this.muestraTipoInstituciones = localStorage.getItem('tipoInstitucion') === 'Todas';

    this.activasService.getPosicionActivas(this.fecha, this.tipoInstitucion)
      .subscribe(resPosicion => {
        this.posicionActivas = resPosicion;
        this.activasService.getVariacionActivas(this.fecha, this.tipoInstitucion)
          .subscribe(resVariacion => {
            this.variacionActivas = resVariacion;
          }, error => {
            console.log('Error al llamar al servicio');
          });
      }, error => {
        console.log('Error al llamar al servicio');
      });
  }

  changeInstitucion(institucion: string) {
    this.tipoInstitucion = institucion;
  }
}
