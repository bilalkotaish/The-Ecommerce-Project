import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { BrandService } from '../../../services/brand.service';
import { Category } from '../../../types/category';
import { Product } from '../../../types/product';
import { Brand } from '../../../types/brands';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatButtonModule,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
categoryservice=inject(CategoryService)
productservice=inject(ProductService)
brandservice=inject(BrandService)
categorylist:Category[]=[]
productlist:Product[]=[]
brandlist:Brand[]=[]

}
