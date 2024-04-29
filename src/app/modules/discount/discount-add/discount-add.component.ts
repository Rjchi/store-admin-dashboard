import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.scss'],
})
export class DiscountAddComponent implements OnInit {
  discount: number = 0;
  type_segment: number = 1;
  type_campaing: number = 1;
  course_id: any = null;
  categorie_id: any = null;
  type_discount: number = 1;
  start_date: any = null;
  end_date: any = null;

  isLoading$: any;

  COURSES: any[] = [];
  CATEGORIES: any[] = [];
  COURSES_SELECTED: any[] = [];
  CATEGORIES_SELECTED: any[] = [];

  constructor(
    public discountService: DiscountService,
    public toaster: Toaster
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.discountService.isLoading$;
    this.discountService.configAll().subscribe((response: any) => {
      if (response && response.categories && response.courses) {
        this.COURSES = response.courses;
        this.CATEGORIES = response.categories;
      }
    });

    this.course_id = '';
    this.categorie_id = '';
  }

  save() {
    if (!this.discount || !this.start_date || !this.end_date) {
      this.toaster.open({
        text: 'NECESITAS LLENAR TODOS LOS CAMPOS NECESARIOS',
        caption: 'VALIDACIONES',
        type: 'danger',
      });

      return;
    }

    if (this.type_segment === 1 && this.COURSES_SELECTED.length === 0) {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR UN CURSO',
        caption: 'VALIDACIONES',
        type: 'danger',
      });

      return;
    }

    if (this.type_segment === 2 && this.CATEGORIES_SELECTED.length === 0) {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR UNA CATEGORIA',
        caption: 'VALIDACIONES',
        type: 'danger',
      });

      return;
    }

    let courses_selected: any = [];
    let categories_selected: any = [];
    let courses_s: any = [];
    let categories_s: any = [];

    this.COURSES_SELECTED.forEach((course: any) => {
      courses_selected.push(course._id);
      courses_s.push(course._id);
    });

    this.CATEGORIES_SELECTED.forEach((categorie: any) => {
      categories_selected.push(categorie._id);
      categories_s.push(categorie._id);
    });

    let data = {
      // state: 1,
      discount: this.discount,
      type_segment: this.type_segment,
      type_campaing: this.type_campaing,
      type_discount: this.type_discount,
      courses: courses_selected,
      categories: categories_selected,
      courses_s: courses_s,
      categories_s: categories_s,
      start_date: this.start_date,
      end_date: this.end_date,
      start_date_num: new Date(this.start_date).getTime(),
      end_date_num: new Date(this.end_date).getTime(),
    };

    this.discountService.registerDiscount(data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message === 403) {
        this.toaster.open({
          text: resp.message_text,
          caption: 'VALIDACIONES',
          type: 'warning',
        });
      } else {
        this.toaster.open({
          text: resp.message_text,
          caption: 'VALIDACIONES',
          type: 'primary',
        });

        this.discount = 0;
        this.end_date = null;
        this.type_segment = 1;
        this.type_segment = 1;
        this.start_date = null;
        this.type_campaing = 1;
        this.type_discount = 1;
        this.COURSES_SELECTED = [];
        this.CATEGORIES_SELECTED = [];
      }
    });
  }

  selectedTypeDiscount(val: number) {
    this.type_discount = val;
  }

  selectedTypeCampaing(val: number) {
    this.type_campaing = val;
  }

  selectedTypeCupon(val: number) {
    this.type_segment = val;

    this.COURSES_SELECTED = [];
    this.CATEGORIES_SELECTED = [];
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
          this.course_id = '';
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
          this.categorie_id = '';
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

  removeCategorie(CATEGORIE_SELEC: any) {
    let CATEGORIE_INDEX = this.CATEGORIES_SELECTED.findIndex(
      (item: any) => item._id === CATEGORIE_SELEC._id
    );

    if (CATEGORIE_INDEX != -1) {
      this.CATEGORIES_SELECTED.splice(CATEGORIE_INDEX, 1);
    }
  }

  removeCourse(COURSE_SELEC: any) {
    let COURSE_INDEX = this.COURSES_SELECTED.findIndex(
      (item: any) => item._id === COURSE_SELEC._id
    );

    if (COURSE_INDEX != -1) {
      this.COURSES_SELECTED.splice(COURSE_INDEX, 1);
    }
  }
}
