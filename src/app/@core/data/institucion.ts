import { Observable } from 'rxjs';

export class Institucion {
  _id: string;
  codigo: string;
  nombre_corto: string;
  nombre_largo: string;
  estatus: string;
  tipo: string;
  segmento: string;
  origen: string;
}

export abstract class InstitucionData {
  abstract obtenerInstituciones(): Observable<Institucion[]>;
}
