import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseDetailsListComponent } from './courses/course-deatails-list/course-details-list.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { EditionAddComponent } from './edition/edition-add/edition-add.component';
import { EditionListComponent } from './edition/edition-list/edition-list.component';
import { EntollmentStudentComponent } from './enrollment/entollment-student/entollment-student.component';
import { HomeComponent } from './home/home.component';
import { StudentDetailsListComponent } from './student/student-deatails-list/student-details-list.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentAddComponent } from './student/student-add/student-add.component';
import { EditionDetailsListComponent } from './edition/edition-details-list/edition-details-list.component';
import { EnrollmentEditionComponent } from './enrollment/enrollment-edition/enrollment-edition.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent , data: { animationState: 'One' }},

  { path: 'courses', component: CourseListComponent, data: { animationState: 'Three' } },

  { path: 'students', component: StudentListComponent, data: { animationState: 'Two' } },

  { path: 'enrollmentstudent/:id', component: EntollmentStudentComponent, data: { animationState: 'EnrollStudent' } },

  { path: 'addcourse/:id', component: CourseAddComponent, data: { animationState: 'Add' } },

  { path: 'addstudent/:id', component: StudentAddComponent, data: { animationState: 'Add' } },
  
  {path: 'coursedetails/:id', component: CourseDetailsListComponent, data: { animationState: 'ThreeDetails' }},

  {path: 'studentdetails/:id', component: StudentDetailsListComponent, data: { animationState: 'TwoDetails' }},

  {path: 'enrolledition/:id', component: EnrollmentEditionComponent, data: { animationState: 'EnrollEdition' }},

  {path: 'addedition/:id/:idcorso', component: EditionAddComponent, data: { animationState: 'ThreeDetailsAddEdition' }},

  { path: 'editions/:id', component: EditionListComponent, data: { animationState: 'Four' } },

  { path: 'editiondetails/:id/:idcorso', component: EditionDetailsListComponent, data: { animationState: 'Four' } },

  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
