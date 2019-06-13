import { Component, OnInit } from '@angular/core';
import { RestsService } from '../rests.service';
import {  Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user:any;
  data:any;

  constructor(private apiService:RestsService, private route: ActivatedRoute, private router:Router) {
    this.route.params.subscribe(nav => this.user = nav.id )
    if(!sessionStorage.getItem('token')){
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
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

}
