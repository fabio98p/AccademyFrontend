import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DidactisService } from 'src/app/services/didactis.service';
import { Edition } from 'src/app/DTOs/edition';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

declare var bootbox:any;
@Component({
  selector: 'app-edition-list',
  templateUrl: './edition-list.component.html',
  styleUrls: ['./edition-list.component.css']
})
export class EditionListComponent implements OnInit {

    public editions:Edition[] = [];
    public edition:Edition = new Edition();
    public originalEditions: Edition[] = [];
    public id: number = 0;
    myValue:string="";

    faiscrivi = faGraduationCap;
    fainfo= faInfoCircle;
    faedit = faEdit;
    faelimina = faTrash;
    fasearch = faSearch;
    fadelete = faTrash;

    constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) {

    }

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    let obsCourses:Observable<Edition[]> = this.service.getEditionsByCourseId(this.id);
    obsCourses.subscribe({
      next: cs => {
        this.editions = cs;   
        console.log(this.editions);
         
        this.originalEditions = cs;
      },
      error: err => console.log(err)
    });
    let obsCourse:Observable<Edition> = this.service.getEditionById(this.id);
    obsCourse.subscribe({
      next: cs => {
        this.edition = cs;   
      },
      error: err => console.log(err)
    });
  }
  
  search(name:string){
    this.editions = this.originalEditions;
    this.editions = this.editions.filter(c => c.code.includes(name))
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
  remove(id: number){
      console.log(id)
      let obsCourse:Observable<Edition> = this.service.deleteEdition(id);
      obsCourse.subscribe({
          next: c => {
          this.edition = c;
          this.ngOnInit();
          },
          error: err => console.log(err)
      });
  }
}
