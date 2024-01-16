import { Toaster } from 'ngx-toast-notifications';
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

  FILE_IMAGEN: any;
  IMAGEN_PREVIZUALIZAR: any = '';

  description: any = '';

  constructor(public coursesService: CoursesService, public toaster: Toaster) {}

  ngOnInit(): void {
    this.isLoading$ = this.coursesService.isLoading$;

    this.coursesService.configAll().subscribe((res: any) => {
      this.USERS = res.users;
      this.CATEGORIES = res.categories;
    });
  }

  processFile($event: any) {
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

    /**----------------------------------------------------------------------
     * | Damos tiempo de 100ms para que la imagen se pueda previsualizar
     * ----------------------------------------------------------------------*/
    this.coursesService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.coursesService.isLoadingSubject.next(false);
    }, 100);
  }

  /**------------------------------------------------------------------------------------
   * | Esta es la parte del ckeditor, aqui gestionamos todos los cambios que se hagan
   * | Dentro del ckeditor
   * ------------------------------------------------------------------------------------*/
  onChange($event: any) {
    /**--------------------------------------
     * | Asignamos el valor que se digite
     * --------------------------------------*/
    this.description = $event.editor.getData();
  }
}
