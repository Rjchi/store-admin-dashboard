import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsersService } from '../service/users.service';
import { UsersAddComponent } from '../users-add/users-add.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

  USERS: any = [];
  isLoading: any;

  /**----------------------------------------------------------------------
   * | Llamamos a la clase NgbModal para generar las ventanas emergentes
   * ----------------------------------------------------------------------*/
  constructor(public modalService: NgbModal, public userService: UsersService) {}

  ngOnInit(): void {

    /**-------------------------------------------------------------------
     * | Aqui inicializamos isLoading para que se renderice la vista
     * -------------------------------------------------------------------*/
    this.isLoading = this.userService.isLoading$;

    this.userService.listUser().subscribe((res: any) => {
      this.USERS = res.users;
    });
  }

  registerUser() {

    /**-------------------------------------------
     * | Aperturamos la ventana emergente
     * | Pasandole como parametro un componente
     * -------------------------------------------*/
    const modalRef = this.modalService.open(UsersAddComponent, {centered: true, size: 'md'});
  }
}
