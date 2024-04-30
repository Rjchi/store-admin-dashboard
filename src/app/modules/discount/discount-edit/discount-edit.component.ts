import { Toaster } from 'ngx-toast-notifications';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-edit',
  templateUrl: './discount-edit.component.html',
  styleUrls: ['./discount-edit.component.scss'],
})
export class DiscountEditComponent implements OnInit {
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

  DISCOUNT_ID: string;
  DISCOUNT_SELECTED: any;

  constructor(
    public discountService: DiscountService,
    public activatedRouter: ActivatedRoute,
    public datePipe: DatePipe,
    public toaster: Toaster
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.discountService.isLoading$;
    this.activatedRouter.params.subscribe(
      (params: any) => (this.DISCOUNT_ID = params.id)
    );
    this.discountService.configAll().subscribe((response: any) => {
      if (response && response.categories && response.courses) {
        this.COURSES = response.courses;
        this.CATEGORIES = response.categories;

        this.discountService
          .ShowDiscount(this.DISCOUNT_ID)
          .subscribe((result: any) => {
            console.log(result);
            this.DISCOUNT_SELECTED = result.discount;

            this.discount = this.DISCOUNT_SELECTED.discount;
            this.end_date = this.getParseDate(this.DISCOUNT_SELECTED.end_date);
            this.start_date = this.getParseDate(
              this.DISCOUNT_SELECTED.start_date
            );
            this.type_segment = this.DISCOUNT_SELECTED.type_segment;
            this.type_campaing = this.DISCOUNT_SELECTED.type_campaing;
            this.type_discount = this.DISCOUNT_SELECTED.type_discount;

            if (this.type_segment === 1) {
              this.DISCOUNT_SELECTED.courses.forEach((course: any) => {
                let COURSE_S = this.COURSES_SELECTED.find(
                  (item: any) => item._id === course
                );

                if (!COURSE_S) {
                  let COURSE_T = this.COURSES.find(
                    (item: any) => item._id === course
                  );
                  this.COURSES_SELECTED.push(COURSE_T);
                }
              });
            } else {
              this.DISCOUNT_SELECTED.categories.forEach((categorie: any) => {
                console.log(categorie);
                let CATEGORIE_S = this.CATEGORIES_SELECTED.find(
                  (item: any) => item._id === categorie
                );

                if (!CATEGORIE_S) {
                  let CATEGORIE_T = this.CATEGORIES.find(
                    (item: any) => item._id === categorie
                  );
                  this.CATEGORIES_SELECTED.push(CATEGORIE_T);
                }
              });
            }
          });
      }
    });

    this.course_id = '';
    this.categorie_id = '';
  }

  getParseDate(date: Date) {
    return this.datePipe.transform(date, 'YYYY-MM-dd', 'UTC');
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
      _id: this.DISCOUNT_ID,
    };

    this.discountService.updateDiscount(data).subscribe((resp: any) => {
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
