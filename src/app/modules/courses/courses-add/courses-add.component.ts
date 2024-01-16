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

  description: string = '';

  requirement: string = '';
  requirements: any = [];

  who_is: string = '';
  who_is_it_for: any = [];

  user: string = '';
  title: string = '';
  level: string = '';
  idioma: string = '';
  subtitle: string = '';
  categorie: string = '';
  price_usd: number = 0;
  price_soles: number = 0;

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

  addRequirement() {
    if (!this.requirement) {
      this.toaster.open({
        text: 'EL TEXTO ES REQUERIDO',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    this.requirements.push(this.requirement);

    setTimeout(() => {
      this.requirement = '';

      /**----------------------------------------------------------
       * | Agregamos esto para que el input se vacie
       * | Despues de agregar una opción (en otras palabras
       * | sincronizamos la vista)
       * ----------------------------------------------------------*/
      this.coursesService.isLoadingSubject.next(true);
      setTimeout(() => {
        this.coursesService.isLoadingSubject.next(false);
      }, 100);
    }, 25);
  }

  addWhoIs() {
    if (!this.who_is) {
      this.toaster.open({
        text: 'EL TEXTO ES REQUERIDO',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    this.who_is_it_for.push(this.who_is);

    setTimeout(() => {
      this.who_is = '';

      this.coursesService.isLoadingSubject.next(true);
      setTimeout(() => {
        this.coursesService.isLoadingSubject.next(false);
      }, 100);
    }, 25);
  }

  deleteRequirement(index: any) {
    /**---------------------------------------------------
     * | Con esto eliminamos una opción en especifico
     * | del array de opciones
     * ---------------------------------------------------*/
    this.requirements.splice(index, 1);
  }

  deleteWhoIs(index: any) {
    this.who_is_it_for.splice(index, 1);
  }

  save() {
    if (
      !this.description ||
      this.requirements.length === 0 ||
      this.who_is_it_for.length === 0 ||
      !this.user ||
      !this.title ||
      !this.level ||
      !this.idioma ||
      !this.subtitle ||
      !this.categorie ||
      !this.price_usd ||
      !this.price_soles ||
      !this.FILE_IMAGEN
    ) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR TODOS LOS CAMPOS DEL FORMULARIO DEL CURSO',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    let formData = new FormData();

    formData.append('user', this.user);
    formData.append('level', this.level);
    formData.append('title', this.title);
    formData.append('idioma', this.idioma);
    formData.append('subtitle', this.subtitle);
    formData.append('portada', this.FILE_IMAGEN);
    formData.append('categorie', this.categorie);
    formData.append('description', this.description);
    formData.append('price_usd', this.price_usd + '');
    formData.append('price_soles', this.price_soles + '');
    formData.append('requirements', JSON.stringify(this.requirements));
    formData.append('who_is_it_for', JSON.stringify(this.who_is_it_for));

    this.coursesService.registerCourses(formData).subscribe((res: any) => {
      if (res.message === 403) {
        this.toaster.open({
          text: res.message_text,
          caption: 'VALIDACIONES',
          type: 'danger',
        });

        return;
      }

      this.user = '';
      this.level = '';
      this.title = '';
      this.idioma = '';
      this.subtitle = '';
      this.categorie = '';
      this.description = '';
      this.price_usd = 0;
      this.price_soles = 0;
      this.requirements = [];
      this.who_is_it_for = [];
      this.FILE_IMAGEN = null;
      this.IMAGEN_PREVIZUALIZAR = null;

      this.toaster.open({
        text: res.msg,
        caption: 'VALIDACIONES',
        type: 'primary',
      });
    });
  }
}
