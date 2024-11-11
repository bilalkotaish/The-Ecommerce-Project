import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
http=inject(HttpClient)
  constructor() { }
  register(name:string,email:string,password:string){
    return this.http.post(environment.apiUrl+"/auth/register",{
      name,email,password
    })
  }
  login(email:string,password:string){
    return this.http.post(environment.apiUrl+"/auth/login",{
      email,password
    })
  }
  get Username(){
    let User=localStorage.getItem("user")
    if(User){
       return JSON.parse(User).name
    }
    else{
      return null
    }
  }
  get UserEmail(){
    let User=localStorage.getItem("user")
    if(User){
       return JSON.parse(User).email
    }
    else{
      return null
    }
  }
  get isAdmin(){
    let User=localStorage.getItem("user")
    if(User){
       return JSON.parse(User).isAdmin
    }
    else{
      return false
    }
  }
  get isLoggedin(){
    let User=localStorage.getItem("user")
    if(User){
       return true}
    else{
      return null
    }
  }
  logout(){
localStorage.removeItem('token')
localStorage.removeItem('user')
  }
}
