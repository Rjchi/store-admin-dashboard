import { Component, OnInit } from '@angular/core';

import { CoursesService } from '../service/courses.service';

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

  constructor(public coursesService: CoursesService) {}

  ngOnInit(): void {
    this.isLoading = this.coursesService.isLoading$;
    this.listCourses();
  }

  listCourses() {
    this.coursesService.listCourses().subscribe((res: any) => {
      this.COURSES = res.courses;
    });
  }
}
