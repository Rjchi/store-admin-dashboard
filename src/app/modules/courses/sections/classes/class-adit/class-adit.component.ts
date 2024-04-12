import { Toaster } from 'ngx-toast-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CourseClassService } from '../../../service/course-class.service';

@Component({
  selector: 'app-class-adit',
  templateUrl: './class-adit.component.html',
  styleUrls: ['./class-adit.component.scss'],
})
export class ClassAditComponent implements OnInit {
  @Input() CLASS: any;
  @Output() ClassE: EventEmitter<any> = new EventEmitter();

  title: string = '';
  state: number = 1;
  description: any = '';

  FILE_VIDEO: any = null;
  loadVideo: boolean = true;
  link_video_vimeo: any = null;

  constructor(
    public modal: NgbActiveModal,
    public toaster: Toaster,
    public sanitizer: DomSanitizer,
    public courseClassService: CourseClassService
  ) {}

  ngOnInit(): void {
    this.title = this.CLASS.title;
    this.state = this.CLASS.state;
    this.description = this.CLASS.description;
    this.link_video_vimeo = this.CLASS.vimeo_id;
  }

  onChange($event: any) {
    this.description = $event.editor.getData();
  }

  save() {
    if (!this.title) {
      this.toaster.open({
        text: 'EL TITULO ES REQUERIDO PARA EDITAR LA CLASE',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });
      return;
    }

    let data = {
      title: this.title,
      state: this.state,
      description: this.description,
      _id: this.CLASS._id,
    };

    this.courseClassService.updateClass(data).subscribe((resp: any) => {
      if (resp.msg === 403) {
        this.toaster.open({
          text: resp.message_text,
          caption: 'VALIDACIÓN',
          type: 'danger',
        });
      } else {
        this.modal.close();
        this.ClassE.emit(resp.course_class);

        this.toaster.open({
          text: 'LA CLASE SE HA EDITADO CORRECTAMENTE',
          caption: 'VALIDACIÓN',
          type: 'primary',
        });
      }
    });
  }

  uploadVimeo() {
    if (!this.FILE_VIDEO) {
      this.toaster.open({
        text: 'NO EXISTE EL VIDEO',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    let formData = new FormData();

    formData.append('_id', this.CLASS._id);
    formData.append('video', this.FILE_VIDEO);
    this.loadVideo = false;
    this.courseClassService.uploadVimeo(formData).subscribe((resp: any) => {
      console.log(resp);
      this.loadVideo = true;
      this.toaster.open({
        text: 'VIDEO SUBIDO EXITOSAMENTE!',
        caption: 'VALIDACIONES',
        type: 'primary',
      });
    });
  }

  urlVideo() {
    /**----------------------
     * | Sanitizamos la URL
     * ----------------------*/
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_vimeo);
  }

  processVideo($event: any) {
    this.FILE_VIDEO = $event.target.files[0];
  }
}
