import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, finalize } from 'rxjs';

import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class CourseClassService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, public authservice: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listClasses() {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });

    let URL = URL_SERVICIOS + '/course-class/list';

    return this.http
      .get(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  registerClass(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/course-class/register';

    return this.http
      .post(URL, data, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  updateClass(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/course-class/update';

    return this.http
      .put(URL, data, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  removeClass(section_id: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/course-class/remove/' + section_id;

    return this.http
      .delete(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
}
