import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
formbuilder=inject(FormBuilder)
authservice=inject(AuthService)
router=inject(Router)
registerform=this.formbuilder.group({
  name:['',[Validators.required]],
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.minLength(8)]],
})
register(){
  let value=this.registerform.value
 this.authservice.register(value.name!,value.email!,value.password!).subscribe(result=>{
  alert("User Registered")
  this.router.navigateByUrl("/login")
 })
}
}
