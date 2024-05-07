import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DiscountComponent } from './discount.component';
import { DiscountAddComponent } from './discount-add/discount-add.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';
import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountDeleteComponent } from './discount-delete/discount-delete.component';


@NgModule({
  declarations: [
    DiscountComponent,
    DiscountAddComponent,
    DiscountEditComponent,
    DiscountDeleteComponent,
    DiscountListComponent
  ],
  imports: [
    CommonModule,
    DiscountRoutingModule,

    NgbModule,
    FormsModule,
    NgbModalModule,
    InlineSVGModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class DiscountModule { }
