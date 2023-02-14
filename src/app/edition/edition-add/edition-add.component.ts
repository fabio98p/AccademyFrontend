import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/services/didactis.service';
import { Course } from 'src/app/DTOs/course';
import { CourseEdition } from 'src/app/DTOs/edition';
import { Teacher } from 'src/app/DTOs/teacher';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-edition-add',
  templateUrl: './edition-add.component.html',
  styleUrls: ['./edition-add.component.css']
})
export class EditionAddComponent implements OnInit {

  editionForm: FormGroup;
  teachers:Teacher[] = [];
  courses:Course[] = [];
  edition: CourseEdition = new CourseEdition();
  id:number = 0;
  idCourse: number=0;

  faundo = faReply;
  fasave = faSave;

  constructor(private fb:FormBuilder, private editionService: DidactisService, private router:Router, private route:ActivatedRoute) {
    this.editionForm = this.fb.group({   
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.idCourse = Number(this.route.snapshot.paramMap.get('idcorso'));
    this.editionForm = this.fb.group({
      code: ['', Validators.required ],
      description: ['', Validators.required ],
      startDate: ['', Validators.required ],
      finalizationDate: ['', Validators.required ],
      realPrice: ['', Validators.required ],
      instructorId: [0, Validators.required ],
      courseId: [this.idCourse, Validators.required ]
    });
    if(this.id!=0)
    {
      this.editionService.getEditionById(this.id)
      .subscribe({
        next: s => {
          this.edition = s;
          this.displayEdition();
        },
        error: err => console.log(err)
      })
    }
    this.editionService.getTeachers()
    .subscribe({
      next: t => {this.teachers = t; },
      error: error => console.log(error)
    });
    this.editionService.getCourses()
    .subscribe({
      next: t => {
        this.courses = t;
      },
      error: error => console.log(error)
    });
  }

  displayEdition():void{
    if(this.editionForm)
    {
      this.editionForm.reset();
      this.editionForm.patchValue({
        code: this.edition.code,
        description: this.edition.description,
        startDate: this.edition.startDate,
        finalizationDate: this.edition.finalizationDate,
        realPrice: this.edition.realPrice,
        instructorId: this.edition.instructorId,
        courseId: this.edition.courseId
      });
    }
  }

  save(){
    this.editionForm.value.instructorId = Number(this.editionForm.value.instructorId)
    this.editionForm.value.courseId = Number(this.editionForm.value.courseId)
    if (this.id == 0) {
        this.editionService.createEdition(this.editionForm.value)
        .subscribe({
          next: ce => {
            alert("Edizione creata con id: "+ce.id);
            this.onBack();
          },
          error: error=> console.log(error)
        });
    } else {
        this.edition = this.editionForm.value;
        this.edition.id = this.id;
        this.editionService.updateEdition(this.edition)
        .subscribe({
          next: ce => {
            alert("Edizione aggiornata con id: "+this.edition.id);
            this.onBack();
          },
          error: error=> console.log(error)
        });

    }
    
  }
  onBack(): void{
    this.router.navigate(["/editions/"+this.idCourse])
  }
  checkValid(name:string):boolean{
    let element = this.editionForm.get(name);
    if(!element)
    {
      return false;
    }

    return (element?.touched || element?.dirty) && !element?.valid
  }
  checkRequired(name:string):boolean{
    let element = this.editionForm.get(name);
    let required = element?.errors?.required;
    return required;
  }
}
