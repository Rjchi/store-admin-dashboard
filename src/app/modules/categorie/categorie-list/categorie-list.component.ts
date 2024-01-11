import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { CategorieService } from '../service/categorie.service';
import { CategorieAddComponent } from '../categorie-add/categorie-add.component';
import { CategorieEditComponent } from '../categorie-edit/categorie-edit.component';
import { CategorieDeleteComponent } from '../categorie-delete/categorie-delete.component';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {

  state: string = '';
  search: string = '';
  isLoading: any;
  CATEGORIES: any = [];

  constructor(
    public modalService: NgbModal,
    public categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.categorieService.isLoading$;

    this.listCategorie();
  }

  listCategorie() {
    this.categorieService.listCategories(this.search, this.state).subscribe((res: any) => {
      console.log(res)
      this.CATEGORIES = res.categories;
    });
  }

  registerCategorie() {
    const modalRef = this.modalService.open(CategorieAddComponent, {
      centered: true,
      size: 'md',
    });

    modalRef.componentInstance.CategorieC.subscribe((Categorie: any) => {
      this.CATEGORIES.unshift(Categorie);
    });
  }

  editCategorie(CATEGORIE: any) {
    const modalRef = this.modalService.open(CategorieEditComponent, {
      centered: true,
      size: 'md',
    });

    modalRef.componentInstance.CATEGORIE = CATEGORIE;

    modalRef.componentInstance.CategorieE.subscribe((Categorie: any) => {
      let INDEX = this.CATEGORIES.findIndex((item: any) => item._id === CATEGORIE._id);

      if (INDEX != -1) {
        this.CATEGORIES[INDEX] = Categorie;
      }
    });
  }

  deleteCategorie(CATEGORIE: any) {
    const modalRef = this.modalService.open(CategorieDeleteComponent, {
      centered: true,
      size: 'md',
    });

    modalRef.componentInstance.CATEGORIE = CATEGORIE;

    // modalRef.componentInstance.UserD.subscribe((val: any) => {
    //   let INDEX = this.CATEGORIES.findIndex((item: any) => item._id === CATEGORIE._id);

    //   if (INDEX != -1) {
    //     this.CATEGORIES.splice(INDEX, 1);
    //   }
    // });
  }

}
