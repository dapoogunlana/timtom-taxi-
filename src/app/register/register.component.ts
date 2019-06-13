import { Component, OnInit } from '@angular/core';
import { RestsService } from '../rests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

model: any = {};
data : any;
error : any;
token : any = "";

  constructor(private apiService : RestsService, private router : Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    
  }
  
  onSubmit() {
   let inputField = document.querySelector('#register') as HTMLInputElement
   inputField.value = 'Sending...';
    console.log(this.model)
    this.apiService.registerData(this.model).subscribe( response => {
    this.data = response;
          if (this.data) {
            console.log(response);
            sessionStorage.setItem("token",this.data.token);
            this.router.navigateByUrl('/dashboard');
          }
        },
        err => {
          console.log(err);
          if(err.status == 400){
          inputField.value  = 'Register'; 
          console.log(err.error);
            return this.error = "Email Alreeady Exists !";
          }
          inputField.value  = 'Register'; 
          return this.error = "No Network";
        });
  }
    
}
