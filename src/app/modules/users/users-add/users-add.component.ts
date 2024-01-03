import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
})
export class UsersAddComponent implements OnInit {
  rol: string = 'admin';

  name: string = '';
  email: string = '';
  surname: string = '';
  password: string = '';
  profession: string = '';
  description: string = '';

  /**------------------------------------------------------
   * | Aqui asignamos la imagen que queremos previsualizar
   * | De manera dinamica
   * ------------------------------------------------------*/
  FILE_AVATAR: any;
  IMAGEN_PREVIZUALIZAR: any = 'assets/media/avatars/300-6.jpg';

  /**----------------------------------------------------
   * | Toaster lo utilizamos para las notificaciones
   * | Emergentes
   * ----------------------------------------------------*/
  constructor(public toaster: Toaster) {}

  ngOnInit(): void {}

  processAvatar($event: any) {
    /**----------------------------------------------------------------
     * | La imagen queda añadida como el primer elemento de un array
     * | Validamos si contiene un string que diga 'image'
     * | En caso de que la salida sea -1 significa que no es una img
     * ----------------------------------------------------------------*/
    if ($event.target.files[0].type.indexOf('image') < 0) {
      /**---------------------------------------------------
       * | Aperturamos la notificación flotante
       * | parametros: MENSAJE, TITULO, DISEÑO
       * ---------------------------------------------------*/
      this.toaster.open({
        text: 'SOLAMENTE SE ACEPTA IMAGENES',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    this.FILE_AVATAR = $event.target.files[0]; // Asignamos el archivo

    /**--------------------------------------------------------------
     * | Convertimos el archivo a base 64 para poder previsualizar
     * | La imagen
     * --------------------------------------------------------------*/
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => (this.IMAGEN_PREVIZUALIZAR = reader.result);
  }
}
