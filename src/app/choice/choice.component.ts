import { Component, OnInit } from '@angular/core';
import { RestsService } from '../rests.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {
  data : any = {};

  constructor(private apiService: RestsService, private route: ActivatedRoute, private router : Router ) { 
  if(!sessionStorage.getItem('token')){
      this.router.navigateByUrl('/login');
   }
   else if(!sessionStorage.getItem('dashboard') && sessionStorage.getItem('token')){
     sessionStorage.setItem("dashboard",'Loggedin...');
     location.reload();
    }
    this.data.f_name = sessionStorage.getItem('f_name');
    this.fillUsers();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
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

}
