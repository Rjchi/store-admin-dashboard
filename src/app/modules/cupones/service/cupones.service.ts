import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, finalize } from 'rxjs';

import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class CuponesService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, public authservice: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  configAll() {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    const URL = URL_SERVICIOS + '/cupone/config-all';

    return this.http
      .get(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  ShowCupone(cuponeId: string = '') {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    const URL = URL_SERVICIOS + '/cupone/show/' + cuponeId;

    return this.http
      .get(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  listCupones(search: any = null, state: any = null) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let LINK = '?T=';

    if (search) {
      LINK += '&search=' + search;
    }

    if (state) {
      LINK += "&state=" + state;
    }

    let URL = URL_SERVICIOS + '/cupone/list' + LINK;
    console.log(URL);
    return this.http
      .get(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  registerCupone(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/cupone/register';

    return this.http
      .post(URL, data, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  updateCupone(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/cupone/update';

    return this.http
      .put(URL, data, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  removeCupone(categorie_id: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/cupone/remove/' + categorie_id;

    return this.http
      .delete(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
}
