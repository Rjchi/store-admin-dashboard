import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersAddComponent,
    UsersEditComponent,
    UsersDeleteComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,

    HttpClientModule, // Para hacer las peticiones http dentro del modulo
    FormsModule, // Para formularios
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ]
})
export class UsersModule { }
