import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 
  year:Number = new Date().getFullYear();

  constructor() { }
 
  token: any = sessionStorage.getItem('token');
  
  ngOnInit() {
    //this.year = new Date().getFullYear()
  }
  piran(){
   // document.getElementById('mydate').innerHTML = new Date().getFullYear()
  }

}
