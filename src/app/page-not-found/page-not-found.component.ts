import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  backRoute(){
    if(sessionStorage.getItem('token')){
      this.router.navigateByUrl('/dashboard')
    } else {
      this.router.navigateByUrl('/')
    }
  }

}
