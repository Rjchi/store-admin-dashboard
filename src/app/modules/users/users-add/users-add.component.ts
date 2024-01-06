import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
})
export class UsersAddComponent implements OnInit {

  /**------------------------------------------------------
   * | En este caso vamos a mandar un dato al componente
   * | users-list (Componente Padre de este componente)
   * ------------------------------------------------------*/
  @Output() UserC: EventEmitter<any> = new EventEmitter();

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
  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public userService: UsersService,
  ) {}

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

  save() {
    if (
      !this.name ||
      !this.surname ||
      !this.FILE_AVATAR ||
      !this.email ||
      !this.password
    ) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR TODOS LOS CAMPOS',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });

      return;
    }

    /**------------------------------------------------------
     * | FormData para manejar la propiedad de tipo archivo
     * ------------------------------------------------------*/
    let formData = new FormData();

    formData.append('rol', this.rol);
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('surname', this.surname);
    formData.append('password', this.password);
    formData.append('avatar', this.FILE_AVATAR);
    formData.append('profession', this.profession);
    formData.append('description', this.description);

    this.userService.register(formData).subscribe((res: any) => {

      /**----------------------------------------------------------
       * | Pasamos el valor del usuario que acabamos de generar
       * ----------------------------------------------------------*/
      this.UserC.emit(res.user);
      this.modal.close();
    });
  }
}
