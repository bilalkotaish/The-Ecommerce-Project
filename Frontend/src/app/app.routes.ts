import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryformComponent } from './components/manage/categoryform/categoryform.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandsFormComponent } from './components/manage/brands-form/brands-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductformComponent } from './components/manage/productform/productform.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './core/auth-gaurd';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { AdminGaurd } from './core/admin-gaurd';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminOrderComponent } from './components/manage/admin-order/admin-order.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent,
        canActivate:[AuthGuard]
    },{
        path:"admin",
        component:AdminDashboardComponent,
        canActivate:[AdminGaurd]
    },
    {
        path:"admin/categories",
        component:CategoriesComponent,
        canActivate:[AdminGaurd]
    },
    {
        path:"admin/categories/add",
        component:CategoryformComponent,
        canActivate:[AdminGaurd]
    },
    {
        path:"admin/categories/:id",
        component:CategoryformComponent,
        canActivate:[AdminGaurd]
    },
    {
        path:"admin/brands",
        component:BrandsComponent,
        canActivate:[AdminGaurd]
    },
    {
        path:"admin/brands/add",
        component:BrandsFormComponent,
        canActivate:[AdminGaurd]
    },
    {
        path:"admin/brands/:id",
        component:BrandsFormComponent,
        canActivate:[AdminGaurd]
    }
    ,
    {
        path:"admin/products",
        component:ProductsComponent,
        canActivate:[AdminGaurd]
    },
    {
        path:"admin/orders",
        component:AdminOrderComponent,
        canActivate:[AdminGaurd]
    },
    {
        path:"admin/products/add",
        component:ProductformComponent,
        canActivate:[AdminGaurd]
    },
    {
        path:"admin/products/:id",
        component:ProductformComponent,
        canActivate:[AdminGaurd]
    },
    {
        path:"product",
        component:ProductlistComponent,
        canActivate:[AuthGuard]
    }
    ,
    {
        path:"product/:id",
        component:ProductdetailsComponent,
        canActivate:[AuthGuard]
    }
    ,
    {
        path:"register",
        component:RegisterComponent
    }
    ,
    {
        path:"login",
        component:LoginComponent
    }
    ,{
        path:"profile",
        component:CustomerProfileComponent,
        canActivate:[AuthGuard]
    },{
        path:"wishlist",
        component:WishlistComponent,
        canActivate:[AuthGuard]
    }
    ,
    {
        path:"cart",
        component:ShoppingCartComponent,
        canActivate:[AuthGuard] 
    },
    {
        path:"orders",
        component:OrdersComponent,
        canActivate:[AuthGuard]
    }   
];
