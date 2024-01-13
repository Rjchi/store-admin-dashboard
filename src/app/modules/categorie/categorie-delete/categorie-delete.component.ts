import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-categorie-delete',
  templateUrl: './categorie-delete.component.html',
  styleUrls: ['./categorie-delete.component.scss']
})
export class CategorieDeleteComponent implements OnInit {

  @Input() CATEGORIE: any;
  @Output() CategorieD: EventEmitter<any> = new EventEmitter();

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public categorieService: CategorieService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.categorieService.removeCategorie(this.CATEGORIE._id).subscribe((res: any) => {
      this.CategorieD.emit('');
      this.modal.close();

      this.toaster.open({
        text: 'SE ELIMINO UNA CATEGORIA CORRECTAMENTE',
        caption: 'VALIDACIÓN',
        type: 'primary',
      });
    });
  }

}
