import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountComponent } from './discount.component';
import { DiscountAddComponent } from './discount-add/discount-add.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';
import { DiscountDeleteComponent } from './discount-delete/discount-delete.component';
import { DiscountListComponent } from './discount-list/discount-list.component';


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
    DiscountRoutingModule
  ]
})
export class DiscountModule { }
