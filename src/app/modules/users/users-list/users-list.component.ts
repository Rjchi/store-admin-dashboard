import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsersAddComponent } from '../users-add/users-add.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

  /**----------------------------------------------------------------------
   * | Llamamos a la clase NgbModal para generar las ventanas emergentes
   * ----------------------------------------------------------------------*/
  constructor(public modalService: NgbModal) {}

  ngOnInit(): void {}

  registerUser() {

    /**-------------------------------------------
     * | Aperturamos la ventana emergente
     * | Pasandole como parametro un componente
     * -------------------------------------------*/
    const modalRef = this.modalService.open(UsersAddComponent, {centered: true, size: 'md'});
  }
}
