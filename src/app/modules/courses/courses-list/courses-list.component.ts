import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { CoursesService } from '../service/courses.service';
import { CoursesDeleteComponent } from '../courses-delete/courses-delete.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {

  isLoading: any;
  state: string = '';
  search: string = '';
  COURSES: any = [];

  CATEGORIES: any = [];
  categorie: string = "";

  constructor(public coursesService: CoursesService, public modalService: NgbModal) {}

  ngOnInit(): void {
    this.isLoading = this.coursesService.isLoading$;
    this.listCourses();

    this.coursesService.configAll().subscribe((res: any) => {
      this.CATEGORIES = res.categories;
    });
  }

  listCourses() {
    this.coursesService.listCourses(this.search, this.state, this.categorie).subscribe((res: any) => {
      this.COURSES = res.courses;
    });
  }

  deleteCourse(COURSE: any) {
    const modalRef = this.modalService.open(CoursesDeleteComponent, {
      centered: true,
      size: 'md',
    });

    modalRef.componentInstance.COURSE = COURSE;

    modalRef.componentInstance.CourseD.subscribe((val: any) => {
      let INDEX = this.COURSES.findIndex((item: any) => item._id === COURSE._id);

      if (INDEX != -1) {
        this.COURSES.splice(INDEX, 1);
      }
    });
  }
}
