import { Observable } from 'rxjs';
import { NbMenuItem } from '@nebular/theme';

export class User {
  _id: string;
  nombre: string;
  apellido: string;
  username: string;
  tipo_institucion: string;
  institucion: string;
  rol: string;
  modulos: NbMenuItem[];
}

export class Persona {
  _id: string;
  nombre: string;
  apellido: string;
  institucion: string;
  email: string;
  telefono: string;
  estado: boolean;
}

export class Credencial {
  _id: string;
  identificacion: string;
  password: string;
  rol: string;
}
export abstract class UserData {
  abstract autenticar(username: string, password: string): Observable<User>;
  abstract obtenerPersonas(): Observable<Persona[]>;
  abstract crearPersona(persona: Persona): Observable<Persona>;
  abstract crearCredencial(credencial: Credencial): Observable<Credencial>;
}
