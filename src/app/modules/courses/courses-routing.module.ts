import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CoursesAddComponent } from './courses-add/courses-add.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesEditComponent } from './courses-edit/courses-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: 'list',
        component: CoursesListComponent,
      },
      {
        path: 'register',
        component: CoursesAddComponent,
      },
      {
        path: 'edit/:id',
        component: CoursesEditComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
