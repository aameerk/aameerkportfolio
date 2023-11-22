import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    projects: any;
    project: any;

  constructor(private projectService: ProjectService) {
   }

  ngOnInit() {
    this.getProjects();   
  }

  getProjects() {
    this.projects = this.projectService.getProjects();
  }

}
