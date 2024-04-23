import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Toaster } from 'ngx-toast-notifications';
import { CoursesService } from '../service/courses.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courses-delete',
  templateUrl: './courses-delete.component.html',
  styleUrls: ['./courses-delete.component.scss'],
})
export class CoursesDeleteComponent implements OnInit {
  @Input() COURSE: any;
  @Output() CourseD: EventEmitter<any> = new EventEmitter();

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public courseService: CoursesService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.courseService.removeCourses(this.COURSE._id).subscribe((res: any) => {
      if (res&&res.code === 403) {
        this.toaster.open({
          text: 'NO SE PUEDO ELIMINAR EL CURSO',
          caption: 'VALIDACIÓN',
          type: 'danger',
        });
      } else {
        this.CourseD.emit('');
        this.modal.close();

        this.toaster.open({
          text: 'SE ELIMINO UN CURSO CORRECTAMENTE',
          caption: 'VALIDACIÓN',
          type: 'primary',
        });
      }
    });
  }
}
