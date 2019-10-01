import { Observable } from 'rxjs';

export interface PosicionPasivas {
  _id: any;
  fecha: string;
  tipo_institucion: string;
  nombre_corto: string;
  nombre_largo: string;
  producto: string;
  saldo: number;
}

export interface VariacionPasivas {
  _id: any;
  fecha: string;
  tipo_institucion: string;
  nombre_corto: string;
  nombre_largo: string;
  producto: string;
  valor_inicial: number;
  valor_final: number;
  tipo: string;
}

export abstract class PasivasData {
  abstract getPosicionPasivas(fecha: string, tipoInstitucion: string): Observable<PosicionPasivas[]>;
  abstract getVariacionPasivas(fecha: string, tipoInstitucion: string): Observable<VariacionPasivas[]>;
}
