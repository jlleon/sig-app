import { Constantes } from '../shared/constantes';
import { CustomHttp } from '../shared/customHttp';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { InstitucionData, Institucion } from '../data/institucion';

@Injectable()
export class InstitucionService extends InstitucionData {

  private baseUrl = Constantes.API_INST_FINANCIERA;

  constructor(private http: CustomHttp) {
    super();
  }

  obtenerInstituciones(): Observable<Institucion[]> {
    const url = `${this.baseUrl}/obtenerInstitucionesFinancieras`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.objeto as Institucion[];
      }), catchError(this.handleError));
  }

  private handleError(error: any): Promise<any> {
    console.error('Ha ocurrido un error.', error);
    return Promise.reject(error.message || error);
  }
}
