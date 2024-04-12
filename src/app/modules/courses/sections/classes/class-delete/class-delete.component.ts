import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CourseClassService } from '../../../service/course-class.service';

@Component({
  selector: 'app-class-delete',
  templateUrl: './class-delete.component.html',
  styleUrls: ['./class-delete.component.scss']
})
export class ClassDeleteComponent implements OnInit {
  @Input() CLASS: any;
  @Output() ClassD: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal: NgbActiveModal,
    public toaster: Toaster,
    public courseClassService: CourseClassService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.courseClassService.removeClass(this.CLASS._id).subscribe((res: any) => {
      this.ClassD.emit('');
      this.modal.close();

      this.toaster.open({
        text: 'SE ELIMINO LA CLASE CORRECTAMENTE',
        caption: 'VALIDACIÓN',
        type: 'primary',
      });
    });
  }
}
