import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CourseSectionService } from '../../service/course-section.service';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss'],
})
export class SectionEditComponent implements OnInit {
  @Input() SECTION: any;
  @Output() SectionE: EventEmitter<any> = new EventEmitter();

  title: string = '';
  state: number = 1;

  constructor(
    public modal: NgbActiveModal,
    public toaster: Toaster,
    public courseSectionService: CourseSectionService
  ) {}

  ngOnInit(): void {
    this.title = this.SECTION.title;
    this.state = this.SECTION.state;
  }

  save() {
    if (!this.title) {
      this.toaster.open({
        text: 'EL TITULO ES REQUERIDO PARA EDITAR LA SECCIÓN',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });
      return;
    }

    let data = {
      title: this.title,
      state: this.state,
      _id: this.SECTION._id,
    };

    this.courseSectionService.updateSection(data).subscribe((resp: any) => {
      if (resp.msg === 403) {
        this.toaster.open({
          text: resp.message_text,
          caption: 'VALIDACIÓN',
          type: 'danger',
        });
      } else {
        this.modal.close();
        this.SectionE.emit(resp.section);

        this.toaster.open({
          text: 'LA SECCIÓN SE HA EDITADO CORRECTAMENTE',
          caption: 'VALIDACIÓN',
          type: 'primary',
        });
      }
    });
  }
}
