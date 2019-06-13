import { Directive, HostListener } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Directive({
  selector: '[Eventcatcher]'
})
export class EventcatcherDirective {
  checker:number;
  source:string;
  
  constructor(private head: HeaderComponent) { }

  @HostListener('window:scroll') win() {
    let pos = window.pageYOffset;
    let nen = window.innerHeight;
    if(pos >= nen){
      document.getElementById('heady').style.backgroundColor = '#ffffff';
      document.getElementById('heady').style.color = '#2e5db4';
      this.head.source= '../../assets/images/logo1.png';
      document.getElementById('hamburger-menu1').style.backgroundColor = '#2e5db4';
      document.getElementById('hamburger-menu2').style.backgroundColor = '#2e5db4';
      document.getElementById('hamburger-menu3').style.backgroundColor = '#2e5db4';
    } else {
      document.getElementById('heady').style.backgroundColor = '#2e5db4';
      document.getElementById('heady').style.color = '#ffffff';
      this.head.source= '../../assets/images/logo2.png';
      document.getElementById('hamburger-menu1').style.backgroundColor = '#ffffff';
      document.getElementById('hamburger-menu2').style.backgroundColor = '#ffffff';
      document.getElementById('hamburger-menu3').style.backgroundColor = '#ffffff';
    }

    if(pos < this.checker){
      document.getElementById('heady').style.height = '';
      document.getElementById('heady').style.padding = '';
      this.checker = pos;
    }else {
      if(pos > 150){
        document.getElementById('heady').style.height = '0px';
        document.getElementById('heady').style.padding = '0px';
        this.checker = pos;
      }
    }
  }

  

}
