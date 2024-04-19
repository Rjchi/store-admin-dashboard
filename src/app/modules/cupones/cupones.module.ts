import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuponesRoutingModule } from './cupones-routing.module';
import { CuponesComponent } from './cupones.component';
import { CuponeAddComponent } from './cupone-add/cupone-add.component';
import { CuponeEditComponent } from './cupone-edit/cupone-edit.component';
import { CuponeListComponent } from './cupone-list/cupone-list.component';
import { CuponeDeleteComponent } from './cupone-delete/cupone-delete.component';


@NgModule({
  declarations: [
    CuponesComponent,
    CuponeAddComponent,
    CuponeEditComponent,
    CuponeListComponent,
    CuponeDeleteComponent
  ],
  imports: [
    CommonModule,
    CuponesRoutingModule
  ]
})
export class CuponesModule { }
