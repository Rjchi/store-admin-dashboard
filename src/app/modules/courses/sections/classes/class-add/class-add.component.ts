import { Toaster } from 'ngx-toast-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ClassAditComponent } from '../class-adit/class-adit.component';
import { CourseClassService } from '../../../service/course-class.service';
import { ClassDeleteComponent } from '../class-delete/class-delete.component';

@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.scss']
})
export class ClassAddComponent implements OnInit {
  isLoading$: any;
  title: string;
  sectionId: string = '';
  description: string = '';

  CLASSES: any[] = [];

  constructor(
    public toaster: Toaster,
    public modalService: NgbModal,
    public activatedRouter: ActivatedRoute,
    public courseClassService: CourseClassService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.courseClassService.isLoading$;

    this.activatedRouter.params.subscribe((resp: any) => {
      this.sectionId = resp.id;
    });

    this.courseClassService.listClasses(this.sectionId).subscribe((resp: any) => {
      this.CLASSES = resp.course_class;
    });
  }

  save() {
    if (!this.title || !this.description) {
      this.toaster.open({
        text: 'EL TITULO Y LA DESCRIPCIÓN SON REQUERIDOS PARA EL REGISTRO DE UNA CLASE',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });
      return;
    }

    let data = {
      section: this.sectionId,
      description: this.description,
      title: this.title,
    };

    this.courseClassService.registerClass(data).subscribe((resp: any) => {
      if (resp.msg === 403) {
        this.toaster.open({
          text: resp.message_text,
          caption: 'VALIDACIÓN',
          type: 'danger',
        });
      } else {
        this.title = '';
        this.description = '';

        this.CLASSES.unshift(resp.course_class);

        this.toaster.open({
          text: 'LA CLASE SE HA REGISTRADO CORRECTAMENTE',
          caption: 'VALIDACIÓN',
          type: 'primary',
        });
      }
    });
  }

  onChange($event: any) {
    /**--------------------------------------
     * | Asignamos el valor que se digite
     * --------------------------------------*/
    this.description = $event.editor.getData();
  }

  editClass(CLASS: any) {
    const modalRef = this.modalService.open(ClassAditComponent, {
      size: 'md',
      centered: true,
    });

    modalRef.componentInstance.CLASS = CLASS;

    modalRef.componentInstance.ClassE.subscribe((EditClass: any) => {
      let INDEX = this.CLASSES.findIndex(
        (item: any) => item._id === EditClass._id
      );

      if (INDEX !== -1) {
        this.CLASSES[INDEX] = EditClass;
      }
    });
  }

  deleteClass(CLASS: any) {
    const modalRef = this.modalService.open(ClassDeleteComponent, {
      size: 'md',
      centered: true,
    });

    modalRef.componentInstance.CLASS = CLASS;

    modalRef.componentInstance.ClassD.subscribe((resp: any) => {
      let INDEX = this.CLASSES.findIndex(
        (item: any) => item._id === CLASS._id
      );

      if (INDEX !== -1) {
        this.CLASSES.splice(INDEX, 1);
      }
    });
  }
}
