import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class Constantes {
  public static API_PASIVAS = environment.envSERVER_REPOSITORIO + environment.envURL_PASIVAS;
  public static API_ACTIVAS = environment.envSERVER_REPOSITORIO + environment.envURL_ACTIVAS;
  // Administracion
  public static API_PERSONA = environment.envSERVER_ADMINISTRACION +
                              environment.envURL_ENDPOINT_ADMINISTRACION +
                              environment.envURL_PERSONAS;
  public static API_ROL = environment.envSERVER_ADMINISTRACION + environment.envURL_ENDPOINT_ADMINISTRACION + environment.envURL_ROL;
  public static API_INST_FINANCIERA = environment.envSERVER_ADMINISTRACION +
                                      environment.envURL_ENDPOINT_ADMINISTRACION +
                                      environment.envURL_INST_FINANCIERA;
  public static API_CREDENCIAL = environment.envSERVER_ADMINISTRACION +
                                 environment.envURL_ENDPOINT_ADMINISTRACION +
                                 environment.envURL_CREDENCIAL;
}
