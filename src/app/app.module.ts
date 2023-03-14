import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { StudentListComponent } from './student/student-list/student-list.component'
import { CourseListComponent } from './courses/course-list/course-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CourseDetailsListComponent } from './courses/course-deatails-list/course-details-list.component'
import { StudentDetailsListComponent } from './student/student-deatails-list/student-details-list.component'
import { CourseAddComponent } from './courses/course-add/course-add.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EditionAddComponent } from './edition/edition-add/edition-add.component'
import { EntollmentStudentComponent } from './enrollment/entollment-student/entollment-student.component'
import { StudentAddComponent } from './student/student-add/student-add.component'
import { EditionListComponent } from './edition/edition-list/edition-list.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { EditionDetailsListComponent } from './edition/edition-details-list/edition-details-list.component'
import { EnrollmentEditionComponent } from './enrollment/enrollment-edition/enrollment-edition.component'

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		StudentListComponent,
		CourseListComponent,
		CourseDetailsListComponent,
		StudentDetailsListComponent,
		CourseAddComponent,
		EditionAddComponent,
		EntollmentStudentComponent,
		StudentAddComponent,
		EditionListComponent,
		EditionDetailsListComponent,
		EnrollmentEditionComponent
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, FontAwesomeModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
