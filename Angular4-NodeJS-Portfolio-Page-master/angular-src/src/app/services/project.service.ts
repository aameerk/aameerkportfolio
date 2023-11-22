import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProjectService {
  image: String;
  description: String;
  title: String;


  constructor(private http:Http) { }

  createProject(project){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/projects/new', project, {headers: headers})
    .map(res => res.json());
  }

  getProjects(){
     return this.http.get('http://localhost:8080/projects/')
    .map(res => res.json());
  }

  getSingleProject(projectId){
    return this.http.get('http://localhost:8080/projects/' + projectId)
    .map(res => res.json());
  }

  getProjectToEdit(projectId){
     return this.http.get('http://localhost:8080/projects/' + projectId + '/edit')
    .map(res => res.json());
  }

  findProjectAndUpdate(projectId, validateProject){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/projects/' + projectId + '/edit' + '?_method=PUT',validateProject, {headers: headers})
    .map(res => res.json());
  }

  deleteProject(projectId){
    let headers = new Headers();
    console.log("Test Delete Method");
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/projects/' + projectId + '?_method=DELETE' , {headers: headers})
    .map(res => res.json());

  }
}
