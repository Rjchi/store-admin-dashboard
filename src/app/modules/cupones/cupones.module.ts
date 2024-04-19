import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuponesRoutingModule } from './cupones-routing.module';
import { CuponesComponent } from './cupones.component';


@NgModule({
  declarations: [
    CuponesComponent
  ],
  imports: [
    CommonModule,
    CuponesRoutingModule
  ]
})
export class CuponesModule { }
