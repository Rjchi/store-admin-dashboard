import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { CuponesService } from '../service/cupones.service';
import { CuponeDeleteComponent } from '../cupone-delete/cupone-delete.component';

@Component({
  selector: 'app-cupone-list',
  templateUrl: './cupone-list.component.html',
  styleUrls: ['./cupone-list.component.scss'],
})
export class CuponeListComponent implements OnInit {
  isLoading: any;
  state: string = '';
  search: string = '';
  CUPONES: any = [];

  constructor(
    public modalService: NgbModal,
    public cuponeService: CuponesService,
  ) {}

  ngOnInit(): void {
    this.isLoading = this.cuponeService.isLoading$;
    this.listCupones();
  }

  listCupones() {
    this.cuponeService
      .listCupones(this.search, this.state)
      .subscribe((res: any) => {
        console.log(res)
        this.CUPONES = res.cupones;
      });
  }

  deleteCupone(CUPONE: any) {
    const modalRef = this.modalService.open(CuponeDeleteComponent, {
      centered: true,
      size: 'md',
    });

    modalRef.componentInstance.CUPONE = CUPONE;

    modalRef.componentInstance.CuponeD.subscribe((val: any) => {
      let INDEX = this.CUPONES.findIndex(
        (item: any) => item._id === CUPONE._id
      );

      if (INDEX != -1) {
        this.CUPONES.splice(INDEX, 1);
      }
    });
  }
}
