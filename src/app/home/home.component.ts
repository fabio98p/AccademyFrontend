import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/services/didactis.service';
import { Course } from '../DTOs/course';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  courses:Course[] = [];
  constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.service.getLastCourses(6)
    .subscribe({
      next: c => {
        this.courses = c;
      },
      error: error => console.log(error)
    });
  }
  title = 'Home';
}
