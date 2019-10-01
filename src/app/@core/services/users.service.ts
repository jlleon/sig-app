import { Persona, Credencial } from './../data/users';
import { Constantes } from './../shared/constantes';
import { CustomHttp } from './../shared/customHttp';
import { Injectable } from '@angular/core';
import { UserData, User } from '../data/users';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UsersService extends UserData {

  private baseUrl = Constantes.API_CREDENCIAL;
  private baseUrlPersona = Constantes.API_PERSONA;

  constructor(private http: CustomHttp) {
    super();
  }

  autenticar(username: string, password: string): Observable<User> {
    const url = `${this.baseUrl}/autenticar/${username}/${password}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.objeto as User;
      }), catchError(this.handleError));
  }

  obtenerPersonas(): Observable<Persona[]> {
    const url = `${this.baseUrlPersona}/obtenerPersonas`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.objeto as Persona[];
      }), catchError(this.handleError));
  }

  crearPersona(persona: Persona): Observable<Persona> {
    const url = `${this.baseUrlPersona}/crear`;
    return this.http.post(url, persona).pipe(
      map((response: any) => {
        return response.objeto as Persona;
      })
    );
  }

  crearCredencial(credencial: Credencial): Observable<Credencial> {
    const url = `${this.baseUrl}/crear`;
    return this.http.post(url, credencial).pipe(
      map((response: any) => {
        return response.objeto as Persona;
      })
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('Ha ocurrido un error.', error);
    return Promise.reject(error.message || error);
  }
}
