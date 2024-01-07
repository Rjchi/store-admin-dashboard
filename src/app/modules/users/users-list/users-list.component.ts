import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsersService } from '../service/users.service';
import { UsersAddComponent } from '../users-add/users-add.component';
import { UsersEditComponent } from '../users-edit/users-edit.component';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  USERS: any = [];
  search: string = '';
  isLoading: any;

  /**----------------------------------------------------------------------
   * | Llamamos a la clase NgbModal para generar las ventanas emergentes
   * ----------------------------------------------------------------------*/
  constructor(
    public modalService: NgbModal,
    public userService: UsersService
  ) {}

  ngOnInit(): void {
    /**-------------------------------------------------------------------
     * | Aqui inicializamos isLoading para que se renderice la vista
     * -------------------------------------------------------------------*/
    this.isLoading = this.userService.isLoading$;

    this.listUser();
  }

  /**-----------------------------------
   * | Función para filtrar un usuario
   * -----------------------------------*/
  listUser() {
    this.userService.listUser(this.search).subscribe((res: any) => {
      this.USERS = res.users;
    });
  }

  registerUser() {
    /**-------------------------------------------
     * | Aperturamos la ventana emergente
     * | Pasandole como parametro un componente
     * -------------------------------------------*/
    const modalRef = this.modalService.open(UsersAddComponent, {
      centered: true,
      size: 'md',
    });

    modalRef.componentInstance.UserC.subscribe((User: any) => {
      this.USERS.unshift(User);
    });
  }

  editUser(USER: any) {
    const modalRef = this.modalService.open(UsersEditComponent, {
      centered: true,
      size: 'md',
    });

    /**------------------------------------------------------------
     * | En este caso utilizamos una variable de tipo input
     * | Ya que le vamos a pasar contenido a un componente hijo
     * ------------------------------------------------------------*/
    modalRef.componentInstance.USER = USER;

    modalRef.componentInstance.UserE.subscribe((User: any) => {
      let INDEX = this.USERS.findIndex((item: any) => item._id === USER._id);

      /**--------------------------------------------
       * | En este caso si encontro al usurio
       * --------------------------------------------*/
      if (INDEX != -1) {
        this.USERS[INDEX] = User; // Reemplazamos con la nueva información
      }
    });
  }

  deleteUser(USER: any) {
    const modalRef = this.modalService.open(UsersDeleteComponent, {
      centered: true,
      size: 'md',
    });

    modalRef.componentInstance.USER = USER;

    modalRef.componentInstance.UserD.subscribe((val: any) => {
      let INDEX = this.USERS.findIndex((item: any) => item._id === USER._id);

      if (INDEX != -1) {
        this.USERS.splice(INDEX, 1); // Eliminamos el usuario de la lista
      }
    });
  }
}
