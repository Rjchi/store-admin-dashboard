import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.scss']
})
export class CoursesAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  processFile($event: any){
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
