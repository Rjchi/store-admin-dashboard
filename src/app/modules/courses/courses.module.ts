import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesAddComponent } from './courses-add/courses-add.component';
import { CoursesEditComponent } from './courses-edit/courses-edit.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesDeleteComponent } from './courses-delete/courses-delete.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesAddComponent,
    CoursesEditComponent,
    CoursesListComponent,
    CoursesDeleteComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
