import { Component, OnInit } from '@angular/core';

import { CuponesService } from '../service/cupones.service';

@Component({
  selector: 'app-cupone-add',
  templateUrl: './cupone-add.component.html',
  styleUrls: ['./cupone-add.component.scss'],
})
export class CuponeAddComponent implements OnInit {
  code: any = null;
  num_use: number = 0;
  discount: number = 0;
  type_count: number = 1;
  type_cupon: number = 1;
  course_id: any = null;
  categorie_id: any = null;
  type_discount: number = 1;

  isLoading$: any;

  COURSES: any[] = [];
  CATEGORIES: any[] = [];

  constructor(public cuponeService: CuponesService) {}

  ngOnInit(): void {
    this.isLoading$ = this.cuponeService.isLoading$;
    this.cuponeService.configAll().subscribe((response: any) => {
      if (response && response.categories && response.courses) {
        this.COURSES = response.courses;
        this.CATEGORIES = response.categories;
      }
    });
  }

  save() {}

  selectedTypeDiscount(val: number) {
    this.type_discount = val;
  }

  selectedTypeCount(val: number) {
    this.type_count = val;
  }

  selectedTypeCupon(val: number) {
    this.type_cupon = val;
  }
}
