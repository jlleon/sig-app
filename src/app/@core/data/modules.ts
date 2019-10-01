import { Observable } from 'rxjs';
import { NbMenuItem } from '@nebular/theme';

export abstract class ModulesData {
  abstract getModules(): Observable<NbMenuItem[]>;
}
