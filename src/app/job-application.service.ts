import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import { JobApplication} from './job-application';


const httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  constructor(private http : HttpClient) { }

  private userUrl = 'http://localhost:9989';


  public postUser(JobApplication){

    return this.http.post<JobApplication>(this.userUrl+"/employer/postjobs/job", JobApplication)
  }
  public getUser(id:String){

    return this.http.get<JobApplication[]>(this.userUrl+"/employer/seejobs/"+id)
  }

 
}
