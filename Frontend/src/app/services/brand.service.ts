import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../types/brands';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }
  http=inject(HttpClient)

  getBrands(){
    return this.http.get<Brand[]>(environment.apiUrl+"/brand")
  }
  getBrandsById(id:string){
    return this.http.get<Brand>(environment.apiUrl+"/brand/"+id)
  }
  deleteBrandsById(id:string){
    return this.http.delete(environment.apiUrl+"/brand/"+id)
  }
  addBrands(name:string){
    return this.http.post(environment.apiUrl+"/brand",{
      name:name
    })
  }
  updateBrands(id:string,name:string){

    return this.http.put(environment.apiUrl+"/brand/"+id,{
      name: name,
    })
  }
}
