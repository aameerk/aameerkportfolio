import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateNewProject(project){
    if(project.title == undefined || project.image == undefined || project.description == undefined){
      console.log(project);
      return false;
    } else {
      return true;
    }
  }
}
