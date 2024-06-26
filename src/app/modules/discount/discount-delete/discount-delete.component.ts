import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DiscountService } from '../service/discount.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-discount-delete',
  templateUrl: './discount-delete.component.html',
  styleUrls: ['./discount-delete.component.scss']
})
export class DiscountDeleteComponent implements OnInit {
  @Input() DISCOUNT: any;
  @Output() DiscountD: EventEmitter<any> = new EventEmitter();

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public discountService: DiscountService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.discountService.removeDiscount(this.DISCOUNT._id).subscribe((res: any) => {
      if (res&&res.code === 403) {
        this.toaster.open({
          text: 'NO SE PUEDO ELIMINAR EL DESCUENTO',
          caption: 'VALIDACIÓN',
          type: 'danger',
        });
      } else {
        this.DiscountD.emit('');
        this.modal.close();

        this.toaster.open({
          text: 'EL DESCUENTO SE ELIMINO CORRECTAMENTE',
          caption: 'VALIDACIÓN',
          type: 'primary',
        });
      }
    });
  }
}
