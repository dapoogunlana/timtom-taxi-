import { Component, OnInit } from '@angular/core';
import { RestsService } from '../rests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {

  data:any = '';
  user:any = {};
  model:any = {};
  verifyer:any;
  price:any;
  result:any;
  carTypeWarning:String = ' ';
  dateTest:any;
  allDiv:Boolean = false;
  issue:Boolean = false;
  wrong:Boolean = false;
  final:Boolean = false;
  Order:String = 'Order';
  Limit:String;
  today:String;

  constructor(private apiService: RestsService, private router : Router) { 
    if(!sessionStorage.getItem('token')){
      this.router.navigateByUrl('/login');
    }
    this.fillUsers()
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    document.getElementById('uber').style.height = '0';
    document.getElementById('luxury').style.height = '0';
    this.trial2();
    this.user.f_name = sessionStorage.getItem('f_name')
    //setTimeout(()=>{this.final = true}, 1000);
    this.today = new Date().toISOString().substr(0, 10)
    let present = new Date().getTime();
    let tm = present + (14 * 24 * 60 * 60 * 1000);
    let fl = new Date(tm).toISOString().substr(0, 10)
    this.Limit = fl;
    this.payRef()
  }
  trial(){
    if(this.data != ''){
      setTimeout(()=>{this.model.name = this.data.user.f_name + ' ' + this.data.user.l_name;
      this.model.email = this.data.user.email;
      this.model.phone_no = this.data.user.phone_no;
      console.log(this.model);
    }, 3000)
    } else if(this.data == ''){
      setTimeout(()=>{this.trial();
        console.log('retrying')
      }, 2000)
    }
  }
  trial2(){
     setTimeout(()=>{this.model.name = sessionStorage.getItem('name');
      this.model.email = sessionStorage.getItem('email');
      this.model.phone_no = sessionStorage.getItem('phone_no');
      console.log(this.model);
    }, 1000)
  }
  assign(arg,arg2){
    this.model.car_type =arg;
    console.log(this.model);
    document.getElementById('ride1').style.backgroundColor = '';
    document.getElementById('ride2').style.backgroundColor = '';
    document.getElementById('ride3').style.backgroundColor = '';
    document.getElementById('ride4').style.backgroundColor = '';
    document.getElementById('ride1').style.boxShadow = '';
    document.getElementById('ride2').style.boxShadow = '';
    document.getElementById('ride3').style.boxShadow = '';
    document.getElementById('ride4').style.boxShadow = '';
    document.getElementById(arg2).style.backgroundColor = '#dddff';
    document.getElementById(arg2).style.boxShadow = '0 1px 7px 3px rgba(6, 17, 138, 0.7)';
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
  choose1(){
    document.getElementById('ch2').style.backgroundColor = '';
    document.getElementById('ch2').style.color = '';
    document.getElementById('ch1').style.backgroundColor = '#3535c0';
    document.getElementById('ch1').style.color = '#ffffff';
    document.getElementById('luxury').style.height = '0';
    document.getElementById('luxury').style.padding = '0';
    document.getElementById('uber').style.height = '';
    document.getElementById('uber').style.padding = '';
    document.getElementById('luxury').style.animation = 'none'
  }
  choose2(){
    document.getElementById('ch1').style.backgroundColor = '';
    document.getElementById('ch1').style.color = '';
    document.getElementById('ch2').style.backgroundColor = '#3535c0';
    document.getElementById('ch2').style.color = '#ffffff';
    document.getElementById('uber').style.height = '0';
    document.getElementById('uber').style.padding = '0';
    document.getElementById('luxury').style.height = '';
    document.getElementById('luxury').style.padding = '';
    document.getElementById('luxury').style.animation = 'inswap 1s ease 1';
  }
  orderLuxury(){
      this.Order = 'Processing..';
      this.apiService.getPaystackToken().subscribe(give => {
        this.verifyer = give;
        console.log('na em we log o')
        console.log(this.verifyer.status)
        if(this.verifyer.status == true){
        //console.log(this.model)
          //this.allDiv = true;
          this.apiService.saveLuxury(this.model).subscribe(response => {
            this.result = response;
            console.log(this.result)
            if(this.result.status == 'Successfully Submitted..'){
              sessionStorage.setItem('payref','paid');
              location.reload();
              //setTimeout(()=>{this.router.navigateByUrl('/dashboard')}, 2000)
            }
          }, err => {
            console.log(err.status);
            this.Order = 'Order';
            this.carTypeWarning = 'Error processing ride, please contact our admin';
            setTimeout(()=>{this.carTypeWarning = ' '}, 9000);
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
  reroute(){
    this.router.navigateByUrl('/dashboard')
  }
  reroute2(){
    this.router.navigateByUrl('/about')
  }
  payWithPaystack(){
    this.price = this.model.duration;
    this.model.duration = this.model.duration.toString();
    if(!this.model.car_type){
      this.Order = 'Processing..';
      setTimeout(()=>{this.Order = 'Order'}, 1000)
      setTimeout(()=>{this.carTypeWarning = 'please select a vehicle';}, 1000)
      setTimeout(()=>{this.carTypeWarning = '  '}, 4000)
      //let neww = new Date().setTime(this.dateTest)
      //this.model.date_of_use = this.dateTest.getTime()
      //console.log(this.model.date_of_use)
      //console.log(neww);
      //let crue = '1234';
      //let fig = parseInt(crue)
      //console.log(fig)
      let loga = new Date().getTime();
      console.log(loga)
    } else{
      let outer = this;
      var handler = (<any>window).window.PaystackPop.setup({
        key: 'pk_test_89b7ee900a6ef49829da1e85de9cbc9129ece4a8',
        email: this.model.email,
        amount: (this.model.duration * 1000000),
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
            outer.orderLuxury();
        },
        onClose: function(){
          sessionStorage.setItem('payref','cancelled');
          setTimeout(()=>{location.reload()}, 200);
        }
      });
      handler.openIframe();
    }
  }
}
