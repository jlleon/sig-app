import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class CustomHttp {

  private resultado: Response;

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
    return headers;
  }

  get(url: string) {
    let cabecera: HttpHeaders = new HttpHeaders();
    cabecera = this.createAuthorizationHeader(cabecera);
    // tslint:disable-next-line: deprecation
    return Observable.create((observer: any) => {
      this.http.get(url, {
        headers: cabecera
      }).subscribe((result: Response) => {
        observer.next(result);
        observer.complete();
      }, (err) => {
        if (err.status === 401) {
          // this.logout();
        } else {
          observer.next(err);
          observer.complete();
        }
      });
    });
  }

  post(url: string, data: any, cabeceras = null) {
    let cabecera: HttpHeaders = new HttpHeaders();
    cabecera = this.createAuthorizationHeader(cabecera);
    // tslint:disable-next-line: deprecation
    return Observable.create(observer => {
      this.http.post(url, data, {
        headers: cabecera
      }).subscribe((result: Response) => {
        observer.next(result);
        observer.complete();
      }, (err) => {
        if (err.status === 401) {
          // this.logout();
        } else {
          observer.next(err);
          observer.complete();
        }
      });
    });
  }

  // postBasic(url: string) {
  //   let headers: HttpHeaders = new HttpHeaders();
  //   headers = this.createAuthorizationHeaderBasic(headers);
  //   url = url.replace('${domainId}', Constantes.DOMAIN_ID);
  //   return Observable.create(observer => {
  //     this.http.post(url, {}, {
  //       headers: headers
  //     }).subscribe((result: Response) => {
  //       observer.next(result);
  //       observer.complete();
  //     }, (err) => {
  //       if (err.status === 401) {
  //         this.logout();
  //       } else {
  //         observer.next(err);
  //         observer.complete();
  //       }
  //     });
  //   });
  // }

  // put(url, data, cabeceras = null) {
  //   let headers: HttpHeaders = new HttpHeaders();
  //   headers = this.createAuthorizationHeader(headers);
  //   headers = this.createJsonHeader(headers);
  //   return Observable.create(observer => {
  //     this.http.put(url, data, {
  //       headers: headers
  //     }).subscribe((result: Response) => {
  //       observer.next(result);
  //       observer.complete();
  //     }, (err) => {
  //       if (err.status === 401) {
  //         this.logout();
  //       } else {
  //         observer.next(err);
  //         observer.complete();
  //       }
  //     }
  //     );
  //   });
  // }

  // delete(url) {
  //   let headers: HttpHeaders = new HttpHeaders();
  //   headers = this.createAuthorizationHeader(headers);
  //   return Observable.create(observer => {
  //     this.http.delete(url, {
  //       headers: headers
  //     }).subscribe((result: Response) => {
  //       observer.next(result);
  //       observer.complete();
  //     }, (err) => {
  //       if (err.status === 401) {
  //         this.logout();
  //       } else {
  //         observer.next(err);
  //         observer.complete();
  //       }
  //     }
  //     );
  //   });
  // }

  // logout () {
  //   localStorage.clear();
  //   let logout = Constantes.LOGOUT_URI;
  //   logout = logout.replace('${domainId}', Constantes.DOMAIN_ID);
  //   logout = logout.replace('${redirectUri}', Constantes.REDIRECT_URI);
  //   window.location.href = logout;
  // }

}
