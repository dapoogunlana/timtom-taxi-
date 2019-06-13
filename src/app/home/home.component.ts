import { Component, OnInit } from '@angular/core';
import { RestsService } from '../rests.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private cee:Boolean;
  candidate: Object;
  constructor(private datum: RestsService) { }
  
  ngOnInit() {
    window.scrollTo(0, 0);
    //document.getElementById('content').style.height = '0';
    this.tryAnimate();
    setInterval(()=>{this.tryAnimate()}, 14000);
  }
  crude(){
    if(this.cee != true){
      document.getElementById('content').style.height = '';
      this.cee = true
    }else {
      document.getElementById('content').style.height = '0';
      this.cee = false;
    }
  }
  tryAnimate(){
    this.D('try2').style.display = 'block';
    this.D('try2').style.opacity = '1';
    setTimeout(()=>{this.D('try2').style.opacity = '0';}, 6600);
    setTimeout(()=>{this.D('try2').style.display = 'none';}, 7000);
    setTimeout(()=>{this.D('try2').style.display = 'block';}, 13590);
    setTimeout(()=>{this.D('try2').style.opacity = '1';}, 13600);
  }
  D(arg){
    return document.getElementById(arg);
  }

}
