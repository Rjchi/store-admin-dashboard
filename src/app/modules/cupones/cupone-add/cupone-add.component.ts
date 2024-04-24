import { Toaster } from 'ngx-toast-notifications';
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
  COURSES_SELECTED: any[] = [];
  CATEGORIES_SELECTED: any[] = [];

  constructor(public cuponeService: CuponesService, public toaster: Toaster) {}

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

  addCourse() {
    if (this.course_id) {
      let COURSE_INDEX = this.COURSES.findIndex(
        (item: any) => item._id === this.course_id
      );

      if (COURSE_INDEX != -1) {
        let VALID_EXIST_COURSE = this.COURSES_SELECTED.find(
          (item: any) => item._id === this.course_id
        );
        if (VALID_EXIST_COURSE) {
          this.toaster.open({
            text: 'SELECCIONA OTRO CURSO (YA ESTA EN LA LISTA)',
            caption: 'VALIDACIONES',
            type: 'warning',
          });
          return;
        } else {
          this.COURSES_SELECTED.push(this.COURSES[COURSE_INDEX]);
        }
      }
    } else {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR UN CURSO PARA PODER AGREGARLO',
        caption: 'VALIDACIONES',
        type: 'warning',
      });
    }
  }

  addCategorie() {
    if (this.categorie_id) {
      let CATEGORIE_INDEX = this.CATEGORIES.findIndex(
        (item: any) => item._id === this.categorie_id
      );

      if (CATEGORIE_INDEX != -1) {
        let VALID_EXIST_CATEGORIE = this.CATEGORIES_SELECTED.find(
          (item: any) => item._id === this.categorie_id
        );
        if (VALID_EXIST_CATEGORIE) {
          this.toaster.open({
            text: 'SELECCIONA OTRA CATEGORIA (YA ESTA EN LA LISTA)',
            caption: 'VALIDACIONES',
            type: 'warning',
          });
          return;
        } else {
          this.CATEGORIES_SELECTED.push(this.CATEGORIES[CATEGORIE_INDEX]);
        }
      }
    } else {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR UNA CATEGORIA PARA PODER AGREGARLA',
        caption: 'VALIDACIONES',
        type: 'warning',
      });
    }
  }
}
