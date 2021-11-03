import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faGraduationCap, faHandshakeSlash, faReply } from '@fortawesome/free-solid-svg-icons';
import { DidactisService } from 'src/app/courses/didactis.service';
import { CourseEdition } from 'src/app/DTOs/edition';
import { Enroll } from 'src/app/DTOs/enroll';
import { Student } from 'src/app/DTOs/student';

@Component({
  selector: 'app-enrollment-edition',
  templateUrl: './enrollment-edition.component.html',
  styleUrls: ['./enrollment-edition.component.css']
})
export class EnrollmentEditionComponent implements OnInit {

  studentsSubsribed: Enroll[] = [];
  studentsAllowed: Student[] = [];
  edition: CourseEdition;

  faiscrivi = faGraduationCap;
  fadisiscrivi = faHandshakeSlash;
  faundo = faReply;
  
  constructor(private service: DidactisService, private router: Router, private route: ActivatedRoute) {  
    this.edition = new CourseEdition();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getEditionById(id)
      .subscribe({
        next: c => { this.edition = c },
        error: error => console.log(error)
      });
      this.service.getSubscribedEnrollmentByCourseEditionId(id)
      .subscribe({
        next: c => { this.studentsSubsribed = c },
        error: error => console.log(error)
      });

    this.service.getAvailableEnrollmentByCourseEditionId(id)
      .subscribe({
        next: c => { this.studentsAllowed = c },
        error: error => console.log(error)
      });
  }
  ClickOnEnroll(idStudent: number) {
    var ed = this.studentsAllowed.find(e => e.id == idStudent)
    if (ed != undefined) {
      var enroll = new Enroll(ed, this.edition);
      this.service.enrollStudent(enroll)
        .subscribe({
          next: c => { enroll = c; console.log(enroll); this.ngOnInit() },
          error: error => console.log(error)
        });
    }
  }
  ClickOnUnsubscribe(idEdition: number) {
    if(window.confirm("Sei sicuro di voler disiscrivere da quest'edizione? ")) {
      console.log(this.remove(idEdition));
    }
  }
  remove(id:number){
    this.service.UnsubscribeStudent(id)
    .subscribe({
      next: c => { this.ngOnInit() },
      error: error => console.log(error)
    });
  }
  onBack(): void{
    this.router.navigate(["/editions", this.edition.courseId])
  }

}
