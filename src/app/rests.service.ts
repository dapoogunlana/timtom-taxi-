import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestsService {
  ApiUrl = 'http://mycodeprojects.com.ng/api';
  verifyer:any;

  constructor(private http:HttpClient) { }

  public auth = true;

  register(f_name, l_name, email, password, address, phone_no){
    return this.http.post( this.ApiUrl + '/register', {
      f_name:f_name,
      l_name:l_name,
      email:email,
      password:password,
      address:address,
      phone_no:phone_no
    },{headers: { 'Content-Type': 'application/json' }} )
  }


  postData(email: string, password: string){
    let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin,X-Requested-With, Content-Type, Accept',
        'Cache-Control':'no-cache',
        })
      };
      return this.http.post(this.ApiUrl+'/login',{
      email: email,
          password: password
      },httpOptions);
  }

  userData(){
    let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        })
      };
    return this.http.get(this.ApiUrl+'/user',httpOptions);
  }

  resetData(email: String){
    let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin,X-Requested-With, Content-Type, Accept',
        'Cache-Control':'no-cache',
        })
      };
    return this.http.post(this.ApiUrl+'/update_password', email, httpOptions);
  }

  registerData(data: any){
    let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin,X-Requested-With, Content-Type, Accept',
        'Cache-Control':'no-cache',
        })
      };
      return this.http.post(this.ApiUrl+'/register',data,httpOptions);
  }
  saveLuxury(data: any){
    let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin,X-Requested-With, Content-Type, Accept',
        'Cache-Control':'no-cache',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        })
      };
      return this.http.post(this.ApiUrl+'/save_luxury',data,httpOptions);
  }
  saveCourier(data: any){
    let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin,X-Requested-With, Content-Type, Accept',
        'Cache-Control':'no-cache',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        })
      };
      return this.http.post(this.ApiUrl+'/save_courier',data,httpOptions);
  }
  getLuxury(data: any){
    let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin,X-Requested-With, Content-Type, Accept',
        'Cache-Control':'no-cache',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        })
      };
      return this.http.post(this.ApiUrl+'/get_luxury',data,httpOptions);
  }
  getCourier(data: any){
        let httpOptions = {
          headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers':'Origin,X-Requested-With, Content-Type, Accept',
          'Cache-Control':'no-cache',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          })
        };
        return this.http.post(this.ApiUrl+'/get_courier',data,httpOptions);
    
  }
  passwordUpdate(data: any){
  let httpOptions = {
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'Origin,X-Requested-With, Content-Type, Accept',
      'Cache-Control':'no-cache',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    return this.http.post(this.ApiUrl+'/passwordupdate',data,httpOptions);
  }

  getPaystackToken(){
  let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      //'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer sk_test_4bed790df1ea2b83221cd9be8a9f33deae975897'
      })
    };
    return this.http.get('https://api.paystack.co/transaction/verify/'+sessionStorage.getItem('reference'),httpOptions);
  }


  authCheck(){
    if(this.auth == false) alert('Oops! it seems you have been loged out')
  }

}