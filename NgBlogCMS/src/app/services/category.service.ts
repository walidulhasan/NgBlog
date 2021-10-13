import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl:string = 'http://localhost:6643/api/';

  constructor(private http:HttpClient) { }

  listCategories(){
    return this.http.get(this.baseUrl+'Categories');
  }
  addCat(obj:any){
    return this.http.post(this.baseUrl+'Categories', obj)
  }
  catUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'Categories/'+id, obj)
  }
  CatById(id:number){
    return this.http.get(this.baseUrl+'Categories/'+id);
  }
}
