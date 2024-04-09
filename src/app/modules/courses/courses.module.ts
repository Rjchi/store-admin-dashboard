import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular'; // Para procesar textos en otros formatos
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesAddComponent } from './courses-add/courses-add.component';
import { CoursesEditComponent } from './courses-edit/courses-edit.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesDeleteComponent } from './courses-delete/courses-delete.component';
import { SectionAddComponent } from './sections/section-add/section-add.component';
import { SectionEditComponent } from './sections/section-edit/section-edit.component';
import { SectionDeleteComponent } from './sections/section-delete/section-delete.component';
import { ClassAddComponent } from './sections/classes/class-add/class-add.component';
import { ClassAditComponent } from './sections/classes/class-adit/class-adit.component';
import { ClassDeleteComponent } from './sections/classes/class-delete/class-delete.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesAddComponent,
    CoursesEditComponent,
    CoursesListComponent,
    CoursesDeleteComponent,
    SectionAddComponent,
    SectionEditComponent,
    SectionDeleteComponent,
    ClassAddComponent,
    ClassAditComponent,
    ClassDeleteComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,

    CKEditorModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ]
})
export class CoursesModule { }
