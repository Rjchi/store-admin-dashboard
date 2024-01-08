import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import { CategorieComponent } from './categorie.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategorieAddComponent } from './categorie-add/categorie-add.component';
import { CategorieEditComponent } from './categorie-edit/categorie-edit.component';
import { CategorieDeleteComponent } from './categorie-delete/categorie-delete.component';


@NgModule({
  declarations: [
    CategorieComponent,
    CategorieListComponent,
    CategorieAddComponent,
    CategorieEditComponent,
    CategorieDeleteComponent
  ],
  imports: [
    CommonModule,
    CategorieRoutingModule
  ]
})
export class CategorieModule { }
