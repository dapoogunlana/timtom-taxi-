import { Component, OnInit } from '@angular/core';
import { RestsService } from '../rests.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data : any = "";

  constructor(private apiService: RestsService, private route: ActivatedRoute, private router : Router ) { 
  if(!sessionStorage.getItem('token')){
      this.router.navigateByUrl('/login');
   }
   else if(!sessionStorage.getItem('dashboard') && sessionStorage.getItem('token')){
     sessionStorage.setItem("dashboard",'Loggedin...');
     location.reload();
   }
    this.getUser();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  

  getUser(){
     this.apiService.userData().subscribe(response =>{
     console.table(response);
     this.data = response;
     if(this.data.status == 'Token is Invalid'){
       sessionStorage.clear();
       location.reload();
      }
     sessionStorage.setItem('email',this.data.user.email);
     sessionStorage.setItem('f_name',this.data.user.f_name);
     sessionStorage.setItem('l_name',this.data.user.l_name);
     sessionStorage.setItem('name',this.data.user.f_name + ' ' + this.data.user.l_name);
     sessionStorage.setItem('phone_no',this.data.user.phone_no);
     sessionStorage.setItem('address',this.data.user.address);
     console.log(this.data);
     },err => console.log(err.status));
  }

}
