import { Component, OnInit } from '@angular/core';
import { RestsService } from '../rests.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  model: any = {}
  data: any
  passed: Boolean;
  failed: Boolean;
  reseter:String = 'Reset password';
  error: any = '';
  constructor(private apiService : RestsService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.passed = false;
    this.failed = false;
  }
  reset(){
    this.reseter = 'Sending..'
    console.log(this.model.email)
    this.apiService.resetData(this.model).subscribe(response => {
      console.log(response)
      this.data = response;
      if(this.data.success == true){
        this.reseter = 'Reset password';
        this.passed = true;
      }
    }, err => {
      this.reseter = 'Reset password';
      this.failed = true;
      setTimeout(()=>{this.failed = false}, 4000);
    })
    console.table(this.data);
  }

}
