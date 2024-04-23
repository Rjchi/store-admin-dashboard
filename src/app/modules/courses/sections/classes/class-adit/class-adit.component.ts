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

  FILES: any[] = [];
  FILE_VIDEO: any = null;
  FILE_DOCUMENT: any = null;
  loadVideo: boolean = true;
  link_video_vimeo: any = null;

  DOCUMENT_NAME: any = null;
  DOCUMENT_SIZE: any = null;

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
    this.FILES = this.CLASS.files;
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
      this.link_video_vimeo = resp.vimeo_id;
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

  processFile($event: any) {
    console.log($event.target.files[0]);
    this.FILE_DOCUMENT = $event.target.files[0];
    this.DOCUMENT_NAME = this.FILE_DOCUMENT.name;
    this.DOCUMENT_SIZE = this.FILE_DOCUMENT.size;
  }

  uploadFile() {
    if (!this.FILE_DOCUMENT) {
      this.toaster.open({
        text: 'NO EXISTE EL DOCUMENTO',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    let formData = new FormData();

    formData.append('clase', this.CLASS._id);
    formData.append('recurso', this.FILE_DOCUMENT);
    formData.append('file_name', this.DOCUMENT_NAME);
    formData.append('size', this.DOCUMENT_SIZE);
    this.loadVideo = false;
    this.courseClassService.uploadFile(formData).subscribe((resp: any) => {
      console.log(resp);
      this.loadVideo = true;
      this.FILES.unshift(resp.file);
      this.FILE_DOCUMENT = null;
      this.DOCUMENT_NAME = null;
      this.DOCUMENT_SIZE = null;
      this.toaster.open({
        text: 'DOCUMENTO SUBIDO EXITOSAMENTE!',
        caption: 'VALIDACIONES',
        type: 'primary',
      });
    });
  }

  deleteFile(FILE: any) {
    this.loadVideo = false;
    this.courseClassService.removeClassFile(FILE._id).subscribe((resp: any) => {
      console.log(resp);
      this.loadVideo = true;
      let INDEX = this.FILES.findIndex((item: any) => item._id == FILE._id);

      if (INDEX != -1) {
        this.FILES.splice(INDEX, 1);
      }

      this.toaster.open({
        text: 'DOCUMENTO SUBIDO EXITOSAMENTE!',
        caption: 'VALIDACIONES',
        type: 'primary',
      });
    });
  }
}
