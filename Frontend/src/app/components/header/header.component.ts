import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomersService } from '../../services/customers.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
customerservice=inject(CustomersService)
categorylist:Category[]=[]
router=inject(Router)
authservice=inject(AuthService)
searchTerm!:string
ngOnInit(){
  
  this.customerservice.getCategories().subscribe(result=>{
   return this.categorylist=result
  })
  
}
get isLoggedIn(){
  return this.authservice.isLoggedin
} 

 onSearch(e:any){
 if(e.target.value){
  this.router.navigateByUrl("/product?search="+e.target.value)
} 
}
searchCategory(id: string) {
  this.searchTerm = "";
  this.router.navigateByUrl(`product?categoryid=${id}`);
}

logout(){
  this.authservice.logout()
  this.router.navigateByUrl("/login")
}

}