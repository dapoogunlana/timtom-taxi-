import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }
  drone:Boolean;
  drone2:Boolean;
  ngOnInit() {
    this.drone = true;
    this.drone2 = true;
    document.getElementById('abt-conf').style.height = '0';
    window.scrollTo(0, 0);
  }

  showMap(){
    if(this.drone == true){
      document.getElementById('gmap_canvas').style.display = 'block';
      document.getElementById('gmap_canvas').style.transform = 'scale(0) translateY(50%)'
      document.getElementById('mapbutton').innerHTML = 'Hide map';
      setTimeout(() =>{document.getElementById('gmap_canvas').style.transform = 'scale(1) translateY(0%)'}, 100);
      this.drone = false;
    }else {
      document.getElementById('gmap_canvas').style.transform = 'scale(0) translateY(50%)'
      setTimeout(() =>{document.getElementById('gmap_canvas').style.display = 'none'}, 600);
      document.getElementById('mapbutton').innerHTML = 'show map';
      this.drone = true;
    }
  }
  lapse(){
    if(this.drone == true){
      document.getElementById('abt-conf').style.height = '';
      document.getElementById('abt-conf').style.padding = '4vh 0';
      document.getElementById('fill').innerHTML = 'Close form';
      this.drone = false;
    }else {
      document.getElementById('abt-conf').style.height = '0';
      document.getElementById('abt-conf').style.padding = '0';
      document.getElementById('fill').innerHTML = 'Open form';
      this.drone = true;
    }
  }

}
