import { VariacionPasivas } from './../data/pasivas';
import { Constantes } from './../shared/constantes';
import { Injectable } from '@angular/core';
import { PasivasData, PosicionPasivas } from '../data/pasivas';
import { CustomHttp } from '../shared/customHttp';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PasivasService extends PasivasData {

  private baseUrl = Constantes.API_PASIVAS;

  constructor(private http: CustomHttp) {
    super();
  }

  getPosicionPasivas(fecha: string, tipoInstitucion: string): Observable<PosicionPasivas[]> {
    const url = `${this.baseUrl}/posicion/buscar/fecha/${fecha}/${tipoInstitucion}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response as PosicionPasivas;
      }), catchError(this.handleError));
  }

  getVariacionPasivas(fecha: string, tipoInstitucion: string): Observable<VariacionPasivas[]> {
    const url = `${this.baseUrl}/variacion/buscar/fecha/${fecha}/${tipoInstitucion}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response as VariacionPasivas;
      }), catchError(this.handleError));
  }

  private handleError(error: any): Promise<any> {
    console.error('Ha ocurrido un error.', error); // para propositos de desarrollo
    return Promise.reject(error.message || error);
  }
}
