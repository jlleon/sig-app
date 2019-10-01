import { ActivasService } from './activas.service';
import { PasivasService } from './pasivas.service';
import { ModulesService } from './modules.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { InstitucionService } from './instituciones.service';

const SERVICES = [
  UsersService,
  ModulesService,
  PasivasService,
  ActivasService,
  InstitucionService
];

@NgModule({
  imports: [
    CommonModule
  ],
  providers : [
    ...SERVICES
  ]
})
export class ServicesDataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ServicesDataModule,
      providers: [
        ...SERVICES
      ]
    };
  }
}
