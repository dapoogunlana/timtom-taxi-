import { Component, OnInit } from '@angular/core';
import { RestsService } from '../rests.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  constructor(private apiService:RestsService, private router: Router) { }
  data: any = '';
  courier:any = '';
  couriers:any = '';
  luxury:any = '';
  luxuries:any = '';
  user:any = {};
  rec:String = '';
  
  ngOnInit() {
    window.scrollTo(0, 0);
    this.apiService.authCheck();
    if(!sessionStorage.getItem("token")){
      this.router.navigateByUrl('/login');
    }
    this.fillUsers();
    this.getLogs();
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
  getLogs(){
    this.user.email = sessionStorage.getItem('email');
    this.apiService.getLuxury(this.user).subscribe(response =>{
      this.luxury = response
      this.luxuries = this.luxury.data;
      console.log(this.luxuries)
    });
    this.apiService.getCourier(this.user).subscribe(response =>{
      this.courier = response
      this.couriers = this.courier.data;
      console.log(this.couriers)
    });
  }

  
  rec1(){
    document.getElementById('rc2').style.backgroundColor = '';
    document.getElementById('rc2').style.color = '';
    document.getElementById('rc1').style.backgroundColor = '#3535c0';
    document.getElementById('rc1').style.color = '#ffffff';
    this.rec = 'couriers'/*
    document.getElementById('luxury').style.height = '0';
    document.getElementById('luxury').style.padding = '0';
    document.getElementById('uber').style.height = '';
    document.getElementById('uber').style.padding = '';
    document.getElementById('luxury').style.animation = 'none'*/
  }
  rec2(){
    document.getElementById('rc1').style.backgroundColor = '';
    document.getElementById('rc1').style.color = '';
    document.getElementById('rc2').style.backgroundColor = '#3535c0';
    document.getElementById('rc2').style.color = '#ffffff';
    this.rec = 'luxuries' /*
    document.getElementById('uber').style.height = '0';
    document.getElementById('uber').style.padding = '0';
    document.getElementById('luxury').style.height = '';
    document.getElementById('luxury').style.padding = '';
    document.getElementById('luxury').style.animation = 'inswap 1s ease 1';*/
  }
}
