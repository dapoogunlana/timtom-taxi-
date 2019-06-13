import { Component, OnInit, NgZone } from '@angular/core';
import { RestsService } from '../rests.service';
import {  Router, ActivatedRoute } from '@angular/router'
import { reference } from '@angular/core/src/render3';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  data:any = '';
  user:Object;
  pay:Boolean = false;
  model:any = {};
  verifyer:any;
  allDiv:Boolean = false;
  final:Boolean = false;
  wrong:Boolean = false;
  issue:Boolean = false;
  estimate:any = 0;
  Order:String = "Proceed";
  typeWarning:String = '';
  return:any;
  responseErr:String = '';

  constructor(private apiService:RestsService, private route: ActivatedRoute,private ngzone:NgZone, private router:Router) {
    this.route.params.subscribe(nav => this.user = nav.id )
    if(!sessionStorage.getItem('token')){
      this.router.navigateByUrl('/login');
    }
    this.fillUsers()
   }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.payRef()
    
    this.model.sender_name = sessionStorage.getItem('name');
    this.model.sender_phone = sessionStorage.getItem('phone_no');
    this.model.sender_email = sessionStorage.getItem('email');
    this.model.price = 1200;

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
  solve(){
    this.apiService.getPaystackToken().subscribe( give => {
      console.log(give);
      this.verifyer = give;
      console.log(this.verifyer.status)
    })
  }
  calc(){
    if(!this.model.courier_type){
      this.typeWarning = 'Please select a courier type';
      setTimeout(()=>{this.typeWarning = ''}, 3000);
    }
    else{
      if(this.model.courier_type == 'parcel'){
        this.model.price = '2000';
        this.estimate = 3;
      }else if(this.model.courier_type == 'perishable'){
        this.model.price = '3000';
        this.estimate = 2;
      }else if(this.model.courier_type == 'heavy goods'){
        this.model.price = '5000';
        this.estimate = 4;
      }
      
      this.model.contact_phone = this.model.contact_phone.toString();
      console.log(this.model);
      this.pay = false;
      setTimeout(()=>{this.pay = true}, 2);
    }
  }
  order(){
    this.Order = 'Processing1..'
    this.apiService.getPaystackToken().subscribe(give => {
      this.verifyer = give;
      console.log(this.verifyer.status)
      if(this.verifyer.status == true){
      //console.log(this.model)
      this.Order = 'Processing..'
      this.apiService.saveCourier(this.model).subscribe(response =>{
        console.log(response);
        this.return = response;
        this.Order = 'Proceed';
        if(this.return.status == 'Successfully Submitted..'){
          sessionStorage.setItem('payref','paid');
          location.reload();
        }
      }, err => {
        console.log(err)
        this.Order = 'Proceed';
        this.responseErr = 'Request failed, please contact our admin'
      })
      }
    }, err => {
      console.log('Payment unverified');
      sessionStorage.setItem('payref','unverified');
      console.log(err.status)
      location.reload();
      /*console.log(this.issue);
      this.issue = true;
      this.allDiv = true;
      console.log(this.issue); */
    })
  }
  dismiss(){
    this.wrong = false;
  }
  payRef(){
    if(sessionStorage.getItem('payref') == 'unverified'){
      this.issue = true;
      sessionStorage.removeItem('payref');
      sessionStorage.removeItem('reference');
    }else if(sessionStorage.getItem('payref') == 'paid'){
      this.final = true;
      sessionStorage.removeItem('payref');
      sessionStorage.removeItem('reference');
    }else if(sessionStorage.getItem('payref') == 'cancelled'){
      this.wrong = true;
      sessionStorage.removeItem('payref');
      sessionStorage.removeItem('reference');
    }
  }
  /*
  
    this.getPaystackToken().subscribe(give => {
      this.verifyer = give;
      console.log(this.verifyer.status)
      if(this.verifyer.status == true){
      }else{
        alert('Your payment could not be validated. Please contact our support team');
        location.reload();
      }
    })
  */
  reroute(){
    this.router.navigateByUrl('/dashboard')
  }
  reroute2(){
    this.router.navigateByUrl('/about')
  }
  payWithPaystack(){
    let outer = this;
    var handler = (<any>window).window.PaystackPop.setup({
      key: 'pk_test_89b7ee900a6ef49829da1e85de9cbc9129ece4a8',
      email: this.model.sender_email,
      amount: (this.model.price * 100),
      //ref: 200,''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
         custom_fields: [
            {
                display_name: "Mobile Number",
                variable_name: "mobile_number",
                value: "+2348012345678"
            }
         ]
      },
      callback: function(response){
          //alert('success. transaction ref is ' + response.reference);
          console.log(response)
          sessionStorage.setItem('reference', response.reference)// response.reference);
          outer.order();
      },
      onClose: function(){
        sessionStorage.setItem('payref','cancelled');
        setTimeout(()=>{location.reload()}, 200);
      }
    });
    handler.openIframe();
  }

}/*
- from_location
- to_location
- description
- sender_name
- sender_phone
- sender_email
- contact_name
- contact_phone
- courier_type
- price
*/