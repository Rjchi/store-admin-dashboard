import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {

  rol: string = "admin";

  name: string = "";
  email: string = "";
  surname: string = "";
  password: string = "";
  profession: string = "";
  description: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
