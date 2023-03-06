import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/DTOs/course';
import { CoursesService } from 'src/app/services/courses.service';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';


declare var bootbox:any;
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit {

  public courses:Course[] = [];
  public course:Course = new Course();
  myValue:string="";
  public originalCourses:Course[] = [];
  

  fasearch = faSearch;
  fainfo = faInfoCircle;
  faedit = faEdit;
  fatrash = faTrash;
  fabook = faBook;
 

  constructor(private coursesService:CoursesService, private router:Router, private route:ActivatedRoute) { console.log('courseListConstructor');
  }


  ngOnInit(): void {
    console.log('ngOnInit CourseListComponent');
    let obsCourses:Observable<Course[]> = this.coursesService.getCourses();
    obsCourses.subscribe({
      next: cs => {
        this.courses = cs;
        this.originalCourses = cs;
      },
      error: err => console.log(err)
    });
  }
  delete(id: number) {
    bootbox.dialog({
      title:"Elimina studente",
      message: "Sei sicuro di voler eliminare questo studente?",
      closeButton: false,
      size:'large',
      buttons: {
          cancel: {
              label: 'Elimina',
              className: 'btn-danger',
              callback:  () => {
               this.remove(id);
            },
          },
          confirm: {
            label: 'Annulla',
            className: 'btn-warning'
        },
      },
    });
  }
  search(name:string){

    this.courses = this.originalCourses;
    this.courses = this.courses.filter(c => c.title.includes(name))

  }

  remove(id: number){
    console.log(id)
    let obsCourse:Observable<Course> = this.coursesService.deleteCourse(id);
    obsCourse.subscribe({
      next: c => {
        this.course = c;
        this.ngOnInit();
      },
      error: err => console.log(err)
    });
  }
}
