import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project: any;
  title: any;
  description: any;
  image: any;
  
  constructor(private projectService : ProjectService,
   private route: ActivatedRoute,
   private router: Router,
   private flashMessages: FlashMessagesService) { }

  ngOnInit() {
   this.getProject();
  }
  
   getProject() {
     this.project = this.projectService.getSingleProject(this.route.snapshot.params['id']);
  }

  onDeleteSubmit(){
    this.projectService.deleteProject(this.route.snapshot.params['id']).subscribe(data =>{
      if(data.success){
        this.flashMessages.show('Project Deleted', {cssClass: 'alert-success', timeout: 3000})
        this.router.navigate(['/']);
      } else {
        this.flashMessages.show('Something went wrong ', {cssClass: 'alert-danger', timeout: 3000})
        this.router.navigate(['/']);
      }
    });
  }

  
}
