import { Constantes } from '../shared/constantes';
import { Injectable } from '@angular/core';
import { CustomHttp } from '../shared/customHttp';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivasData, VariacionActivas, PosicionActivas } from '../data/activas';

@Injectable()
export class ActivasService extends ActivasData {

  private baseUrl = Constantes.API_ACTIVAS;

  constructor(private http: CustomHttp) {
    super();
  }

  getPosicionActivas(fecha: string, tipoInstitucion: string): Observable<PosicionActivas[]> {
    const url = `${this.baseUrl}/posicion/buscar/fecha/${fecha}/${tipoInstitucion}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response as PosicionActivas;
      }), catchError(this.handleError));
  }

  getVariacionActivas(fecha: string, tipoInstitucion: string): Observable<VariacionActivas[]> {
    const url = `${this.baseUrl}/variacion/buscar/fecha/${fecha}/${tipoInstitucion}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response as VariacionActivas;
      }), catchError(this.handleError));
  }

  private handleError(error: any): Promise<any> {
    console.error('Ha ocurrido un error.', error); // para propositos de desarrollo
    return Promise.reject(error.message || error);
  }
}
