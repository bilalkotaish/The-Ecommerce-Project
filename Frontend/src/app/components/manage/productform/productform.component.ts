import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../types/brands';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-productform',
  standalone: true,
  imports: [FormsModule,MatCheckboxModule,MatButtonModule,MatInputModule,ReactiveFormsModule,MatSelectModule,MatFormFieldModule],
  templateUrl: './productform.component.html',
  styleUrl: './productform.component.scss'
})
export class ProductformComponent {
formbuilder=inject(FormBuilder)
productform=this.formbuilder.group({
  name:[null,[Validators.required,Validators.minLength(6)]],
  shortDescription:[null,[Validators.required,Validators.minLength(10)]],
  description:[null,[Validators.required,Validators.minLength(50)]],
  purchasePrice:[null,[Validators.required]],
  discount:[],
  images:this.formbuilder.array([]),
  categoryId:[null,[Validators.required]],
  brandId:[null,[Validators.required]],
  isfeatured:[false],
  isNew:[false]
})
categoryservice=inject(CategoryService)
brandservice=inject(BrandService)
productservice=inject(ProductService)
brands:Brand[]=[]
category:Category[]=[]
id!:string
route=inject(ActivatedRoute)
router=inject(Router)
ngOnInit(){
  this.addImages()
  this.categoryservice.getCategories().subscribe((result)=>{
    this.category=result
  })
  this.brandservice.getBrands().subscribe((result)=>{
    this.brands=result
  })
  this.id=this.route.snapshot.params["id"]
  console.log(this.id)
  if(this.id){
    this.productservice.getProductById(this.id).subscribe(result=>{
      for(let index=0;index<result.images.length-1;index++){
        this.addImages()
      }
      this.productform.patchValue(result as any)
    })
  }else{
    this.addImages()
  }
}
addProduct(){
  let value=this.productform.value
  console.log(value)
  this.productservice.addProduct(value as any).subscribe((result)=>{
    alert("Product Added Successfully")
    this.router.navigateByUrl("admin/products")
  })
}
updateProduct(){
  let value=this.productform.value
  console.log(value)
  this.productservice.updateProduct(this.id,value as any).subscribe(result=>{
    alert("Product Updated Successfully")
    this.router.navigateByUrl("admin/products")
  })
}
addImages(){
  return this.images.push(this.formbuilder.control(null))
}
removeImages(){
  return this.images.removeAt(this.images.controls.length-1)
}
get images(){
return this.productform.get("images") as FormArray
}
}
