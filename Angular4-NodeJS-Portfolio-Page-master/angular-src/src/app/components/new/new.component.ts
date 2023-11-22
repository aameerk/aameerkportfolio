import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {ProjectService} from '../../services/project.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  title: String;
  image: String;
  description: String;

  constructor(private flashMessages : FlashMessagesService,
   private validateService : ValidateService,
   private projectService : ProjectService,
   private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const project = {
      title: this.title,
      image: this.image,
      description: this.description
    }

    if(!this.validateService.validateNewProject(project)){
      this.flashMessages.show('Please fill all the form.', {cssClass: 'alert-danger', timeout: 3000})
      return false;
    } else {
      this.projectService.createProject(project).subscribe(data => {
        if(data.success){
        this.flashMessages.show('Project Created', {cssClass: 'alert-success', timeout: 3000})
        this.router.navigate(['/']);
        } else {
          this.flashMessages.show('Something went wrong ', {cssClass: 'alert-danger', timeout: 3000})
        this.router.navigate(['/']);
        }
      });
    }
  }


 
}
