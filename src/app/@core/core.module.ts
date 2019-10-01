import { ActivasService } from './services/activas.service';
import { PasivasService } from './services/pasivas.service';
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ServicesDataModule } from './services/services-data.module';
import { UserData } from './data/users';
import { UsersService } from './services/users.service';
import { ModulesData } from './data/modules';
import { ModulesService } from './services/modules.service';
import { CustomHttp } from './shared/customHttp';
import { PasivasData } from './data/pasivas';
import { ActivasData } from './data/activas';
import { ResponsiveD3 } from './shared/responsive';
import { InstitucionData } from './data/institucion';
import { InstitucionService } from './services/instituciones.service';

const DATA_SERVICES = [
  { provide: UserData, useClass: UsersService },
  { provide: ModulesData, userClass: ModulesService },
  { provide: PasivasData, userClass: PasivasService },
  { provide: ActivasData, userClass: ActivasService },
  { provide: InstitucionData, userClass: InstitucionService }
];

export const NB_CORE_PROVIDERS = [
  CustomHttp,
  ResponsiveD3,
  ...ServicesDataModule.forRoot().providers,
  ...DATA_SERVICES
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS
      ]
    };
  }
}
