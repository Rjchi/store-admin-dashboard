import { Toaster } from 'ngx-toast-notifications';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CuponesService } from '../service/cupones.service';

@Component({
  selector: 'app-cupone-edit',
  templateUrl: './cupone-edit.component.html',
  styleUrls: ['./cupone-edit.component.scss'],
})
export class CuponeEditComponent implements OnInit {
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
  CUPON_SELECTED: any = null;
  COURSES_SELECTED: any[] = [];
  CATEGORIES_SELECTED: any[] = [];

  cupone_id: any;

  constructor(
    public cuponeService: CuponesService,
    public toaster: Toaster,
    public activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.cuponeService.isLoading$;

    this.activatedRouter.params.subscribe((params: any) => {
      this.cupone_id = params.id;
    });

    this.cuponeService.configAll().subscribe((response: any) => {
      if (response && response.categories && response.courses) {
        this.COURSES = response.courses;
        this.CATEGORIES = response.categories;
      }

      this.cuponeService
        .ShowCupone(this.cupone_id)
        .subscribe((response: any) => {
          console.log(response);
          this.CUPON_SELECTED = response.cupone;

          this.code = this.CUPON_SELECTED.code;
          this.num_use = this.CUPON_SELECTED.num_use;
          this.discount = this.CUPON_SELECTED.discount;
          this.type_count = this.CUPON_SELECTED.type_count;
          this.type_cupon = this.CUPON_SELECTED.type_cupon;
          this.type_discount = this.CUPON_SELECTED.type_discount;

          if (this.type_cupon === 1) {
            this.CUPON_SELECTED.courses.forEach((course: any) => {
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
            this.CUPON_SELECTED.categories.forEach((categorie: any) => {
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
    });

    this.course_id = '';
    this.categorie_id = '';
  }

  save() {
    if (!this.code || !this.discount) {
      this.toaster.open({
        text: 'NECESITAS LLENAR TODOS LOS CAMPOS NECESARIOS',
        caption: 'VALIDACIONES',
        type: 'danger',
      });

      return;
    }

    if (this.type_count === 2 && this.num_use === 0) {
      this.toaster.open({
        text: 'NECESITAS LLENAR UN NUMERO DE USOS LIMITE',
        caption: 'VALIDACIONES',
        type: 'danger',
      });

      return;
    }

    if (this.type_cupon === 1 && this.COURSES_SELECTED.length === 0) {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR UN CURSO',
        caption: 'VALIDACIONES',
        type: 'danger',
      });

      return;
    }

    if (this.type_cupon === 2 && this.CATEGORIES_SELECTED.length === 0) {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR UNA CATEGORIA',
        caption: 'VALIDACIONES',
        type: 'danger',
      });

      return;
    }

    let courses_selected: any = [];
    let categories_selected: any = [];

    this.COURSES_SELECTED.forEach((course: any) => {
      courses_selected.push(course._id);
    });

    this.CATEGORIES_SELECTED.forEach((categorie: any) => {
      categories_selected.push(categorie._id);
    });

    let data = {
      // state: 1,
      num_use: this.num_use,
      discount: this.discount,
      code: this.code,
      type_cupon: this.type_cupon,
      type_count: this.type_count,
      type_discount: this.type_discount,
      courses: courses_selected,
      categories: categories_selected,
      _id: this.cupone_id,
    };

    this.cuponeService.updateCupone(data).subscribe((resp: any) => {
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

        this.code = null;
        this.num_use = 0;
        this.discount = 0;
        this.type_cupon = 1;
        this.type_count = 1;
        this.type_discount = 1;
        this.COURSES_SELECTED = [];
        this.CATEGORIES_SELECTED = [];
      }
    });
  }

  selectedTypeDiscount(val: number) {
    this.type_discount = val;
  }

  selectedTypeCount(val: number) {
    this.type_count = val;
  }

  selectedTypeCupon(val: number) {
    this.type_cupon = val;

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
