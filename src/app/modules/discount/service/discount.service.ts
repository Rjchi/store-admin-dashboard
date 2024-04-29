import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, finalize } from 'rxjs';

import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, public authservice: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  configAll() {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    const URL = URL_SERVICIOS + '/discount/config-all';

    return this.http
      .get(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  ShowDiscount(discountId: string = '') {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    const URL = URL_SERVICIOS + '/discount/show/' + discountId;

    return this.http
      .get(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  listDiscount() {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });

    let URL = URL_SERVICIOS + '/discount/list';
    console.log(URL);
    return this.http
      .get(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  registerDiscount(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/discount/register';

    return this.http
      .post(URL, data, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  updateDiscount(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/discount/update';

    return this.http
      .put(URL, data, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  removeDiscount(discountId: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/discount/remove/' + discountId;

    return this.http
      .delete(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
}
