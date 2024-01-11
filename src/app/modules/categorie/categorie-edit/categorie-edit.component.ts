import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.scss'],
})
export class CategorieEditComponent implements OnInit {
  @Input() CATEGORIE: any;
  @Output() CategorieE: EventEmitter<any> = new EventEmitter();

  title: string = '';
  state: number = 0;

  FILE_IMAGEN: any;
  IMAGEN_PREVIZUALIZAR: any = 'assets/media/avatars/300-6.jpg';

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.title = this.CATEGORIE.title;
    this.state = this.CATEGORIE.state;
    this.IMAGEN_PREVIZUALIZAR = this.CATEGORIE.imagen;
  }

  processAvatar($event: any) {
    if ($event.target.files[0].type.indexOf('image') < 0) {
      this.toaster.open({
        text: 'SOLAMENTE SE ACEPTA IMAGENES',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    this.FILE_IMAGEN = $event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_IMAGEN);
    reader.onloadend = () => (this.IMAGEN_PREVIZUALIZAR = reader.result);
  }

  save() {
    if (!this.title) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR TODOS LOS CAMPOS',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });

      return;
    }

    let formData = new FormData();

    formData.append('title', this.title);
    formData.append('_id', this.CATEGORIE._id);

    if (this.FILE_IMAGEN) {
      formData.append('imagen', this.FILE_IMAGEN);
    }

    formData.append('state', this.state + '');

    this.categorieService.updateCategorie(formData).subscribe((res: any) => {
      this.CategorieE.emit(res.categorie);
      this.modal.close();

      this.toaster.open({
        text: 'SE ACTUALIZO LA CATEGORIA',
        caption: 'VALIDACIÓN',
        type: 'primary',
      });
    });
  }
}
