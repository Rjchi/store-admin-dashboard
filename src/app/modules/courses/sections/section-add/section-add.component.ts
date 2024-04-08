import { Toaster } from 'ngx-toast-notifications';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CourseSectionService } from '../../service/course-section.service';

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
      console.log(resp);
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
}
