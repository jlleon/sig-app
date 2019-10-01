import { Observable } from 'rxjs';

export interface PosicionActivas {
  _id: any;
  fecha: string;
  tipo_institucion: string;
  nombre_corto: string;
  nombre_largo: string;
  producto: string;
  segmento: string;
  segmento_cartera: string;
  saldo: number;
}

export interface VariacionActivas {
  _id: any;
  fecha: string;
  tipo_institucion: string;
  nombre_corto: string;
  nombre_largo: string;
  producto: string;
  segmento: string;
  segmento_cartera: string;
  valor_inicial: number;
  valor_final: number;
  tipo: string;
}

export abstract class ActivasData {
  abstract getPosicionActivas(fecha: string, tipoInstitucion: string): Observable<PosicionActivas[]>;
  abstract getVariacionActivas(fecha: string, tipoInstitucion: string): Observable<VariacionActivas[]>;
}
