import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoryform',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatInputModule],
  templateUrl: './categoryform.component.html',
  styleUrl: './categoryform.component.scss'
})
export class CategoryformComponent {
  name!:string
  categoryservice=inject(CategoryService)
  router=inject(Router)
  route=inject(ActivatedRoute)
  isEdit=false
  id!:string
  ngOnInit(){
    this.id=this.route.snapshot.params["id"]
    if(this.id){
      this.isEdit=true
      this.categoryservice.getCategoryById(this.id).subscribe((result:any)=>{
        console.log(result)
        this.name=result.name
       
      })
    }
  }
  add(){
    console.log(this.name)
    this.categoryservice.addCategory(this.name).subscribe((result:any)=>{
      alert("Category Added Successfully")
      this.router.navigateByUrl("/admin/categories")
    })
  }
  update(){
    console.log(this.name)
    this.categoryservice.updateCategory(this.id,this.name).subscribe((result:any)=>{
      alert("Category Updated Successfully")
      this.router.navigateByUrl("/admin/categories")
  })
}

}