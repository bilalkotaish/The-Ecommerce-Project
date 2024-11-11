import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formbuilder=inject(FormBuilder)
  authservice=inject(AuthService)
  router=inject(Router)
  loginform=this.formbuilder.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]],
  })
  login(){
    this.authservice.login(this.loginform.value.email!,this.loginform.value.password!).subscribe((result:any)=>{
      console.log(result)
      localStorage.setItem("token",result.token)
      localStorage.setItem("user",JSON.stringify(result.user))
      this.router.navigateByUrl("/")
    })
  }
}
