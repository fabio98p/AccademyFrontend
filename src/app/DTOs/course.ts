import { Level } from "./level";

export class Course{
  id: number = 0;
  title: string = "";
  description: string = "";
  duration: number = 0;
  basePrice: number = 0;
  syllabus: string = "";
  level: Level = Level.INTERMEDIATE;
  areaId: number = 0;
  areaName: string = "";
  grantsCertification: boolean = false;
  creationDate: string = "";
  constructor(){
  }
}
