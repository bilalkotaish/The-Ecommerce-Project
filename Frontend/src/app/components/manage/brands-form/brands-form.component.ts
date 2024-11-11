import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brands-form',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatInputModule],
  templateUrl: './brands-form.component.html',
  styleUrl: './brands-form.component.scss'
})
export class BrandsFormComponent {
  name!:string
  brandservice=inject(BrandService)
  router=inject(Router)
  route=inject(ActivatedRoute)
  isEdit=false
  id!:string
  ngOnInit(){
    this.id=this.route.snapshot.params["id"]
    if(this.id){
      this.isEdit=true
      this.brandservice.getBrandsById(this.id).subscribe((result:any)=>{
        console.log(result)
        this.name=result.name
       
      })
    }
  }
  add(){
    console.log(this.name)
    this.brandservice.addBrands(this.name).subscribe((result:any)=>{
      alert("Category Added Successfully")
      this.router.navigateByUrl("/admin/brands")
    })
  }
  update(){
    console.log(this.name)
    this.brandservice.updateBrands(this.id,this.name).subscribe((result:any)=>{
      alert("Category Updated Successfully")
      this.router.navigateByUrl("/admin/brands")
  })
}
}
