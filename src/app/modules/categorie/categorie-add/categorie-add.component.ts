import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-categorie-add',
  templateUrl: './categorie-add.component.html',
  styleUrls: ['./categorie-add.component.scss']
})
export class CategorieAddComponent implements OnInit {

  @Output() CategorieC: EventEmitter<any> = new EventEmitter();

  title: string = '';

  FILE_IMAGEN: any;
  IMAGEN_PREVIZUALIZAR: any = 'assets/media/avatars/300-6.jpg';

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public categorieService: CategorieService,
  ) {}

  ngOnInit(): void {}

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
    if (!this.title || !this.FILE_IMAGEN) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR TODOS LOS CAMPOS',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });

      return;
    }

    let formData = new FormData();

    formData.append('title', this.title);
    formData.append('imagen', this.FILE_IMAGEN);

    this.categorieService.registerCategorie(formData).subscribe((res: any) => {

      this.CategorieC.emit(res.categorie);
      this.modal.close();

      this.toaster.open({
        text: 'SE REGISTRO UNA NUEVA CATEGORIA',
        caption: 'VALIDACIÓN',
        type: 'primary',
      });
    });
  }

}
