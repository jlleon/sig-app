import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/@core/services/users.service';
import { takeUntil } from 'rxjs/operators';
import { PasivasService } from 'src/app/@core/services/pasivas.service';

@Component({
  selector: 'app-captaciones',
  styleUrls: ['./captaciones.component.scss'],
  templateUrl: './captaciones.component.html',
})
export class CaptacionesComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  fecha = '2019-05-31';

  institucion: string;
  tipoInstitucion = 'Todas';
  tiposInstituciones: string[] = ['Todas', 'Banco', 'Cooperativa', 'Mutualista'];
  muestraTipoInstituciones = true;

  posicionPasivas: any[];
  variacionPasivas: any[];

  constructor(private usersService: UsersService,
              private pasivasService: PasivasService) { }

  ngOnInit() {
    this.tipoInstitucion = localStorage.getItem('tipoInstitucion');
    this.institucion = localStorage.getItem('institucion');
    this.muestraTipoInstituciones = localStorage.getItem('tipoInstitucion') === 'Todas';

    this.pasivasService.getPosicionPasivas(this.fecha, this.tipoInstitucion)
      .subscribe(resPosicion => {
        this.posicionPasivas = resPosicion;
        this.pasivasService.getVariacionPasivas(this.fecha, this.tipoInstitucion)
          .subscribe(resVariacion => {
            this.variacionPasivas = resVariacion;
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
