import { Component, OnInit } from '@angular/core';
import { RestsService } from '../rests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

  model: any = {}
  data: any;
  falsify:String = '';
  passed: Boolean;
  failed: Boolean;
  final:Boolean = false;
  reseter:String = 'Reset password';
  error: any = '';
  constructor(private apiService : RestsService, private router:Router) { 
    if(!sessionStorage.getItem('token')){
      this.router.navigateByUrl('/login');
    }
    this.fillUsers()
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.passed = false;
    this.failed = false;
    this.fillUsers();
  }
  fillUsers(){
    this.apiService.userData().subscribe(response =>{
      this.data = response
      console.log(this.data)
      if(this.data.status == 'Token is Invalid'){
        sessionStorage.clear();
        location.reload();
      }
    },
      err => console.log(err.status))
  }
  reset(){
    this.reseter = 'Sending..';
    this.model.email = sessionStorage.getItem('email');
    console.log(this.model)
    this.apiService.passwordUpdate(this.model).subscribe(response => {
      console.log(response)
      this.data = response;
      if(this.data.success == true){
        this.reseter = 'Reset password';
        this.passed = true;
      }else if(this.data.success == false){
        this.falsify = this.data.message
        this.reseter = 'Reset password';
        setTimeout(()=>{this.falsify = ''}, 5000);
      }
    }, err => {
      this.reseter = 'Reset password';
      this.failed = true;
      setTimeout(()=>{this.failed = false}, 4000);
    })
    console.table(this.data);
  }
  
  reroute(){
    this.router.navigateByUrl('/dashboard')
  }

}
