import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { DiscountService } from '../service/discount.service';
import { DiscountDeleteComponent } from '../discount-delete/discount-delete.component';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss'],
})
export class DiscountListComponent implements OnInit {
  isLoading: any;
  state: string = '';
  DISCOUNTS: any = [];

  constructor(
    public modalService: NgbModal,
    public discountService: DiscountService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
    this.listDiscount();
  }

  listDiscount() {
    this.discountService.listDiscount().subscribe((res: any) => {
      console.log(res);
      this.DISCOUNTS = res.discounts;
    });
  }

  deleteDiscount(DISCOUNT: any) {
    const modalRef = this.modalService.open(DiscountDeleteComponent, {
      centered: true,
      size: 'md',
    });

    modalRef.componentInstance.DISCOUNT = DISCOUNT;

    modalRef.componentInstance.DiscountD.subscribe((val: any) => {
      let INDEX = this.DISCOUNTS.findIndex(
        (item: any) => item._id === DISCOUNT._id
      );

      if (INDEX != -1) {
        this.DISCOUNTS.splice(INDEX, 1);
      }
    });
  }

  getTypeCampaing(type_campaing: number) {
    let response = '';

    switch (type_campaing) {
      case 1:
        return response = 'CAMPAÑA NORMAL';
      case 2:
        return response = 'CAMPAÑA FLASH';
      case 3:
        return response = 'CAMPAÑA BANNER';

      default:
        break;
    }
  }

  getParseDate(date: Date) {
    return this.datePipe.transform(date, "YYYY-MM-dd", "UTC");
  }
}
