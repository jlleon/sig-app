import { Institucion } from './../../@core/data/institucion';
import { Credencial, Persona } from './../../@core/data/users';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersService } from 'src/app/@core/services/users.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { InstitucionService } from 'src/app/@core/services/instituciones.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  private listadoInstituciones: Institucion[];
  private listadoPersonas: Persona[];

  source: LocalDataSource = new LocalDataSource();
  usuario: Persona = new Persona();
  credencial: Credencial = new Credencial();
  instituciones: Institucion[];

  settings = {
    actions: false,
    columns: {
      _id: {
        title: 'Identificación',
        filter: false
      },
      nombre: {
        title: 'Nombre',
        filter: false
      },
      apellido: {
        title: 'Apellido',
        filter: false
      },
      institucion: {
        title: 'Institución',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      },
      telefono: {
        title: 'Teléfono',
        filter: false
      }
    }
  };

  constructor(private personaService: UsersService,
              private intitucionService: InstitucionService,
              private toastrService: NbToastrService) { }

  ngOnInit() {
    this.personaService.obtenerPersonas()
      .pipe(takeUntil(this.destroy$))
      .subscribe((personas: Persona[]) => {
        this.listadoPersonas = personas;
        this.source.load(personas);
      });

    this.intitucionService.obtenerInstituciones()
      .pipe(takeUntil(this.destroy$))
      .subscribe((instituciones: Institucion[]) => {
        const institucionTodas = new Institucion();
        institucionTodas.nombre_corto = 'TODAS';
        institucionTodas.nombre_largo = 'TODAS';
        institucionTodas.tipo = 'Todas';

        this.listadoInstituciones = [ institucionTodas ];
        this.listadoInstituciones = this.listadoInstituciones.concat(instituciones);
        this.instituciones = this.listadoInstituciones.filter((d: any) => d.tipo === 'Todas');

        this.credencial.rol = 'admin';
        this.usuario.institucion = this.instituciones[0].nombre_corto;
      });
  }

  onSubmit(element: any) {
    this.credencial.identificacion = this.usuario._id;
    if (this.usuario._id === undefined || this.usuario.nombre === undefined ||
        this.usuario.apellido === undefined || this.usuario.email === undefined ||
        this.usuario.institucion === undefined || this.credencial._id === undefined ||
        this.credencial.identificacion === undefined || this.credencial.password === undefined ||
        this.credencial.rol === undefined) {
          this.toastrService.show('Ingrese todos los campos', 'Registro', {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'danger'
          });

          return;
    }

    this.personaService.crearPersona(this.usuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe((persona: Persona) => {
        if (persona !== null) {
          this.personaService.crearCredencial(this.credencial)
          .pipe(takeUntil(this.destroy$))
          .subscribe((credencial: Credencial) => {
            if (credencial !== null) {
              this.toastrService.show('El usuario se ingreso correctamente.', 'Registro', {
                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                status: 'success'
              });

              this.listadoPersonas = this.listadoPersonas.concat([ persona ]);
              this.source.load(this.listadoPersonas);
              this.usuario = new Persona();
              this.credencial = new Credencial();
            } else {
              this.toastrService.show('El username no se encuentra disponible.', 'Registro', {
                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                status: 'warning'
              });
            }
          });
        } else {
          this.toastrService.show('La identificación ya pertenece a otro usuario .', 'Registro', {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'warning'
          });
        }
      });
  }

  cambiarRol(elemento: any) {
    if (elemento === 'admin' || elemento === 'invitado') {
      this.instituciones = this.listadoInstituciones.filter((d: any) => d.tipo === 'Todas');
    } else if (elemento === 'institucion_banco') {
      this.instituciones = this.listadoInstituciones.filter((d: any) => d.tipo === 'Banco');
    } else if (elemento === 'institucion_coop') {
      this.instituciones = this.listadoInstituciones.filter((d: any) => d.tipo === 'Cooperativa');
    } else {
      this.instituciones = this.listadoInstituciones.filter((d: any) => d.tipo === 'Mutualista');
    }

    this.usuario.institucion = this.instituciones[0].nombre_corto;
  }
}
