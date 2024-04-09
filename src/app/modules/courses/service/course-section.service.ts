import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root',
})
export class CourseSectionService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, public authservice: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listSections() {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });

    let URL = URL_SERVICIOS + '/course-section/list';

    return this.http
      .get(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  registerSection(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/course-section/register';

    return this.http
      .post(URL, data, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  updateSection(data: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/course-section/update';

    return this.http
      .put(URL, data, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  removeSection(section_id: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({ token: this.authservice.token });
    let URL = URL_SERVICIOS + '/course-section/remove/' + section_id;

    return this.http
      .delete(URL, { headers })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
}
