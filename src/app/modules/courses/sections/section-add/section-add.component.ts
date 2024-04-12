import { Toaster } from 'ngx-toast-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CourseSectionService } from '../../service/course-section.service';
import { SectionEditComponent } from '../section-edit/section-edit.component';
import { SectionDeleteComponent } from '../section-delete/section-delete.component';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss'],
})
export class SectionAddComponent implements OnInit {
  isLoading$: any;
  title: string;
  courseId: string = '';

  SECTIONS: any[] = [];

  constructor(
    public toaster: Toaster,
    public modalService: NgbModal,
    public activatedRouter: ActivatedRoute,
    public courseSectionService: CourseSectionService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.courseSectionService.isLoading$;

    /**----------------------------
     * | Tomamos el ID del curso
     * ----------------------------*/
    this.activatedRouter.params.subscribe((resp: any) => {
      this.courseId = resp.id;
    });

    this.courseSectionService.listSections().subscribe((resp: any) => {
      this.SECTIONS = resp.courses_sections;
    });
  }

  save() {
    if (!this.title) {
      this.toaster.open({
        text: 'EL TITULO ES REQUERIDO PARA REGISTRAR UNA SECCIÓN',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });
      return;
    }

    let data = {
      course: this.courseId,
      title: this.title,
    };

    this.courseSectionService.registerSection(data).subscribe((resp: any) => {
      if (resp.msg === 403) {
        this.toaster.open({
          text: resp.message_text,
          caption: 'VALIDACIÓN',
          type: 'danger',
        });
      } else {
        this.title = '';

        /**--------------------------------------------------------------
         * | Sincronizamos el listado con el formulario de registro
         * --------------------------------------------------------------*/
        this.SECTIONS.unshift(resp.section);

        this.toaster.open({
          text: 'LA SECCIÓN SE HA REGISTRADO CORRECTAMENTE',
          caption: 'VALIDACIÓN',
          type: 'primary',
        });
      }
    });
  }

  editSection(SECTION: any) {
    const modalRef = this.modalService.open(SectionEditComponent, {
      size: 'md',
      centered: true,
    });

    /**--------
     * | Input
     * --------*/
    modalRef.componentInstance.SECTION = SECTION;

    /**--------
     * | Output
     * --------*/
    modalRef.componentInstance.SectionE.subscribe((EditSection: any) => {
      /**------------------------------------
       * | Editamos la sección de la lista
       * ------------------------------------*/
      let INDEX = this.SECTIONS.findIndex(
        (item: any) => item._id === EditSection._id
      );

      if (INDEX !== -1) {
        this.SECTIONS[INDEX] = EditSection;
      }
    });
  }

  deleteSection(SECTION: any) {
    const modalRef = this.modalService.open(SectionDeleteComponent, {
      size: 'md',
      centered: true,
    });

    modalRef.componentInstance.SECTION = SECTION;

    modalRef.componentInstance.SectionD.subscribe((resp: any) => {
      let INDEX = this.SECTIONS.findIndex(
        (item: any) => item._id === SECTION._id
      );

      if (INDEX !== -1) {
        this.SECTIONS.splice(INDEX, 1);
      }
    });
  }
}
