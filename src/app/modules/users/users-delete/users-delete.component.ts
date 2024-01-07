import { Toaster } from 'ngx-toast-notifications';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.scss'],
})
export class UsersDeleteComponent implements OnInit {
  @Input() USER: any;
  @Output() UserD: EventEmitter<any> = new EventEmitter();

  constructor(
    public toaster: Toaster,
    public modal: NgbActiveModal,
    public userService: UsersService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.userService.remove(this.USER._id).subscribe((res: any) => {
      this.UserD.emit('');
      this.modal.close();

      this.toaster.open({
        text: 'SE ELIMINO EL USUARIO CORRECTAMENTE',
        caption: 'VALIDACIÓN',
        type: 'primary',
      });
    });
  }
}
