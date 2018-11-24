import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup,  FormControl, AbstractControl } from '@angular/forms';
import { JobApplication } from '../job-application';
import {Router} from '@angular/router';
import { JobApplicationService } from '../job-application.service';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {

  

  job:JobApplication=new JobApplication();
  constructor(private FB: FormBuilder,private router: Router, private service : JobApplicationService) { }


  submitted = false;

  Locations = 
  
     ["Alabama", 'Alaska', 'Arizona', 'Arkansas','India'];
    
  

  validation_messages = {
    'companyname': [
      { type : 'pattern', message : 'No special characters are allowed'},
      { type: 'required', message: 'Full name is required' }
    ],
    'desc': [
      { type: 'maxlength', message: 'Bio cannot be more than 256 characters long' },
    ],
    'location': [
      { type: 'required', message: 'Please select location' },
    ],

    'position':
    [
      { type: 'required', message: 'Please select position' },
    ],

    'vaccancy' :[
      { type: 'required', message: 'Please enter vaccancy' },
    ],
  };


  newJobForm = this.FB.group({
    companyname: ['', [Validators.required, Validators.pattern('^([a-z]|[A-Z]){4,8}$')]],
    desc: ['Leader in IT industry', Validators.maxLength(256)],
    location: ['', Validators.required],
    position: ['', Validators.required],
    vaccancy: ['', Validators.required]

});

  ngOnInit() { }



  onSubmit(obj){
    console.log(obj);

    this.submitted=true;
    this.job.jobDescription=obj.position;
    this.job.noOfOpenings=obj.vaccancy;
    this.job.jobProfile=obj.desc;
    this.job.location=obj.location;
    this.job.companyName=obj.companyname;
       
    if (this.newJobForm.invalid) {
      return;
  }
    this.service.postUser(this.job).subscribe( data =>{

      console.log(data);
       alert("User created SuccessFully.");    
    });
}
}