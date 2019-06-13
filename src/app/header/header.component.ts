import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RestsService } from '../rests.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  zobia: String
  source: String;
  switch: Boolean;
  //private navSwitch = false;
  navSwitch:Boolean;
  token : any = sessionStorage.getItem('token');
  active : Boolean = false ;

  constructor (private http: RestsService, private rh: Router){
    this.rh.events.subscribe(( l:NavigationEnd) => this.zobia = l.url);
    console.log(this.zobia);
  }


  ngOnInit() {
    this.source = '../../assets/images/logo2.png'
    this.switch = true;
    this.navSwitch = this.http.auth;
  }

  getLoggedOut(){
   sessionStorage.clear();
   location.reload();
  }
  onActivate(event) {
    window.scroll(0,0);
  }
  menuResponse(){
    if(this.switch != false){
      this.D('hamburger-menu1').style.animationName = 't-laps-f';
      this.D('hamburger-menu2').style.animationName = 'm-laps-f';
      this.D('hamburger-menu3').style.animationName = 'b-laps-f';
      this.D('menuItems').style.display = 'block';
      this.D('menuItems').style.animationName = 'down';
      this.switch = false;
    }else{
      this.crush();
    }
  }
  close(){
    this.D('menuItems').style.display = 'none';
  }
  crush(){
    this.D('hamburger-menu1').style.animationName = 't-laps-b';
    this.D('hamburger-menu2').style.animationName = 'm-laps-b';
    this.D('hamburger-menu3').style.animationName = 'b-laps-b';
    this.D('menuItems').style.animationName = 'up';
    setTimeout(()=>{this.D('menuItems').style.display = 'none'}, 500);
    this.switch = true;
  }
  D(arg){
    return document.getElementById(arg);
  }
  vstate(){
    if(this.D('menuItems').style.display == 'block'){
      this.crush();
    }
  }
  

}
/*let Apr = 'nfidnjingjndjfnjfn'
import { HttpClientModule } from '@angular/common/http'
constructor (private http: HttpClientModule) {};
function getApi() {
  return this.http.get(Apr)
};
function postApi(name, email, phone, pword){
  return this.http.post(Apr,
      {
        name:name,
        email:email,
        phone:phone,
        pword:pword
      },
      ('title','title said'),
    )
}
this.jasmine.getApi(user.id).subscribe(
  bumbum => this.shell = bumbum
)
this.route.params.subscribe(param => this.user = param)
import { Router, NavigationEnd } from '@angular/router';
export class Zodiak {
  zobia: String
  constructor (private rh: Router){}
  fufu(){
    this.rh.events.subscribe(( l:NavigationEnd) => this.zobia = l.url)
  }
}*/