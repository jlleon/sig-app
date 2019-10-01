import { RoundPipe } from './pipes/round.pipe';
import { NumberWithCommasPipe } from './pipes/number-with-commas.pipe';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbThemeModule,
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HeaderComponent } from './components/header/header.component';
import { OneColumnComponent } from './layouts/one-column/one-column.component';
import { RouterModule } from '@angular/router';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  RouterModule
];

const COMPONENTS = [
  HeaderComponent,
  OneColumnComponent
];

const PIPES = [
  NumberWithCommasPipe,
  RoundPipe
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...COMPONENTS, ...PIPES]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'cosmic'
          },
        ).providers
      ]
    };
  }
}
