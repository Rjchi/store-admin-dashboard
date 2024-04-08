import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CourseSectionService } from '../../service/course-section.service';

@Component({
  selector: 'app-section-delete',
  templateUrl: './section-delete.component.html',
  styleUrls: ['./section-delete.component.scss']
})
export class SectionDeleteComponent implements OnInit {
  @Input() SECTION: any;
  @Output() SectionD: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal: NgbActiveModal,
    public toaster: Toaster,
    public courseSectionService: CourseSectionService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.courseSectionService.removeSection(this.SECTION._id).subscribe((res: any) => {
      this.SectionD.emit('');
      this.modal.close();

      this.toaster.open({
        text: 'SE ELIMINO LA SECCIÓN CORRECTAMENTE',
        caption: 'VALIDACIÓN',
        type: 'primary',
      });
    });
  }
}
