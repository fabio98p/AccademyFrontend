import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/services/didactis.service';
import { Student } from 'src/app/DTOs/student';
import { faReply } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-student-details-list',
    templateUrl: './student-details-list.component.html',
    styleUrls: ['./student-details-list.component.css']
  })
  export class StudentDetailsListComponent implements OnInit{

    student:Student | undefined
    fareply = faReply;

    constructor(private service: DidactisService, private router:Router, private route:ActivatedRoute){
    }
    
    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.service.getStudentById(id)
          .subscribe({
            next: c => {this.student = c},
            error: error => console.log(error)
          });
    }
    onBack(): void{
      this.router.navigate(["/students"])
    } 
  }