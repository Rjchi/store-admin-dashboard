import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, public authservice: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false); // Con isLoadingSubjet le decimos a metronic que se esta iniciando una petición http
    this.isLoading$ = this.isLoadingSubject.asObservable(); // Dependemos de esta variable para que la vista se renderice
  }

  listUser(search: any = null) {
    this.isLoadingSubject.next(true); // Cuando inicia la petición http

    /**-------------------------------------------------
     * | Esto es para enviar el token en la petición
     * -------------------------------------------------*/
    let headers = new HttpHeaders({ token: this.authservice.token });
    let LINK = '?T=';

    if (search) {
      /**--------------------------------------------------------------
       * | En caso de haber parametros de busqueda los concatenamos
       * --------------------------------------------------------------*/
      LINK += '&search=' + search;
    }

    let URL = URL_SERVICIOS + '/auth/list' + LINK; // lINK por defecto es null

    return this.http
      .get(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false))); // Cuando finaliza la petición http
  }

  register(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/auth/register_admin';

    return this.http
      .post(URL, data, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  update(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/auth/update';

    return this.http
      .put(URL, data, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  remove(user_id: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/auth/delete/' + user_id;

    return this.http
      .delete(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
}
