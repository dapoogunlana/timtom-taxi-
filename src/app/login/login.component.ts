import { Component, OnInit } from '@angular/core';
import { RestsService } from '../rests.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 model: any = {};
 data : any;
 error : any;
 token : any = "";
 reset: Boolean;

  constructor(private apiService : RestsService, private router : Router) { }

  ngOnInit() {
    this.reset = false;
    window.scrollTo(0, 0);
  }

  onSubmit() {
   let inputField = document.querySelector('#login') as HTMLInputElement
   inputField.value = 'Sending...';
    console.log(this.model)
    this.apiService.postData(this.model.email,this.model.password).subscribe( response => {
    this.data = response;
          if (this.data) {
            console.log(response);
            sessionStorage.setItem("token",this.data.token);
            this.router.navigateByUrl('/dashboard');
          }
        },
        err => {
          console.log(err.status);
          if(err.status == 400){
            console.log(err.error)
          	inputField.value = 'Login';
            this.reset= true;
            return this.error = "Invalid Username or Password";
          }
          inputField.value = 'Login';
          this.reset= true;
          return this.error = "No Network";
        });
        
  }

}
