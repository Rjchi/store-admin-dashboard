import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CuponesService } from '../service/cupones.service';

@Component({
  selector: 'app-cupone-delete',
  templateUrl: './cupone-delete.component.html',
  styleUrls: ['./cupone-delete.component.scss']
})
export class CuponeDeleteComponent implements OnInit {
  @Input() CUPONE: any;
  @Output() CuponeD: EventEmitter<any> = new EventEmitter();

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public cuponeService: CuponesService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.cuponeService.removeCupone(this.CUPONE._id).subscribe((res: any) => {
      if (res&&res.code === 403) {
        this.toaster.open({
          text: 'NO SE PUEDO ELIMINAR EL CUPONE',
          caption: 'VALIDACIÓN',
          type: 'danger',
        });
      } else {
        this.CuponeD.emit('');
        this.modal.close();

        this.toaster.open({
          text: 'SE ELIMINO UN CUPONE CORRECTAMENTE',
          caption: 'VALIDACIÓN',
          type: 'primary',
        });
      }
    });
  }
}
