import { Component, OnInit } from '@angular/core';

import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.scss'],
})
export class CoursesAddComponent implements OnInit {
  USERS: any = [];
  CATEGORIES: any = [];
  isLoading$: any; // Siempre es neccesario para que se renderice correctamente la vista

  constructor(public coursesService: CoursesService) {}

  ngOnInit(): void {
    this.isLoading$ = this.coursesService.isLoading$;

    this.coursesService.configAll().subscribe((res: any) => {
      this.USERS = res.users;
      this.CATEGORIES = res.categories;
    });
  }

  processFile($event: any) {
    // if ($event.target.files[0].type.indexOf('image') < 0) {
    //   this.toaster.open({
    //     text: 'SOLAMENTE SE ACEPTA IMAGENES',
    //     caption: 'VALIDACIONES',
    //     type: 'danger',
    //   });
    //   return;
    // }
    // this.FILE_IMAGEN = $event.target.files[0];
    // let reader = new FileReader();
    // reader.readAsDataURL(this.FILE_IMAGEN);
    // reader.onloadend = () => (this.IMAGEN_PREVIZUALIZAR = reader.result);
  }
}
