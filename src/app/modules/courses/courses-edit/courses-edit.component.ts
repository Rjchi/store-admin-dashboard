import { Toaster } from 'ngx-toast-notifications';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.scss'],
})
export class CoursesEditComponent implements OnInit {
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
  state: string = '';
  title: string = '';
  level: string = '';
  idioma: string = '';
  subtitle: string = '';
  categorie: string = '';
  price_usd: number = 0;
  price_soles: number = 0;

  course_id: any = null;
  COURSE_SELECTED: any = null;

  constructor(
    public toaster: Toaster,
    public coursesService: CoursesService,
    public activatedRouter: ActivatedRoute // Con esto podemos obtener el ID de la ruta
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.coursesService.isLoading$;

    this.activatedRouter.params.subscribe((resp: any) => {
      this.course_id = resp.id;
    });
    this.coursesService.configAll().subscribe((res: any) => {
      this.USERS = res.users;
      this.CATEGORIES = res.categories;

      /**---------------------------------
       * | Traemos el curso para setear
       * | los campos del formulario
       * ---------------------------------*/
      this.coursesService.ShowCourse(this.course_id).subscribe((resp: any) => {
        this.COURSE_SELECTED = resp.course;

        this.state = this.COURSE_SELECTED.state;
        this.title = this.COURSE_SELECTED.title;
        this.level = this.COURSE_SELECTED.level;
        this.user = this.COURSE_SELECTED.user._id;
        this.idioma = this.COURSE_SELECTED.idioma;
        this.subtitle = this.COURSE_SELECTED.subtitle;
        this.price_usd = this.COURSE_SELECTED.price_usd;
        this.price_soles = this.COURSE_SELECTED.price_soles;
        this.categorie = this.COURSE_SELECTED.categorie._id;
        this.description = this.COURSE_SELECTED.description;
        this.requirements = this.COURSE_SELECTED.requirements;
        this.IMAGEN_PREVIZUALIZAR = this.COURSE_SELECTED.image;
        this.who_is_it_for = this.COURSE_SELECTED.who_is_it_for;
      });
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
      !this.price_soles
    ) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR TODOS LOS CAMPOS DEL FORMULARIO DEL CURSO',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    let formData = new FormData();

    formData.append('_id', this.course_id);
    formData.append('user', this.user);
    formData.append('level', this.level);
    formData.append('state', this.state);
    formData.append('title', this.title);
    formData.append('idioma', this.idioma);
    formData.append('subtitle', this.subtitle);
    if (this.FILE_IMAGEN) {
      formData.append('portada', this.FILE_IMAGEN);
    }
    formData.append('categorie', this.categorie);
    formData.append('description', this.description);
    formData.append('price_usd', this.price_usd + '');
    formData.append('price_soles', this.price_soles + '');
    formData.append('requirements', JSON.stringify(this.requirements));
    formData.append('who_is_it_for', JSON.stringify(this.who_is_it_for));

    this.coursesService.updateCourses(formData).subscribe((res: any) => {
      if (res.message === 403) {
        this.toaster.open({
          text: res.message_text,
          caption: 'VALIDACIONES',
          type: 'danger',
        });

        return;
      }

      this.toaster.open({
        text: res.msg,
        caption: 'VALIDACIONES',
        type: 'primary',
      });
    });
  }
}
