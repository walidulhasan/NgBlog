import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  baseUrl:string = 'http://localhost:6643/api/';

  constructor(private http:HttpClient) { }

  listAuthors(){
    return this.http.get(this.baseUrl+'Authors');
  }
  addAuthor(blogObj:any){
    return this.http.post(this.baseUrl+'Authors',blogObj);
  }
  authorByName(name:string){
    return this.http.get(this.baseUrl+'Authors/ByName/'+name);
  }
  authorById(id:number){
    return this.http.get(this.baseUrl+'Authors/'+id);
  }
  authorUpdateBy(id:any, blogObj:any){
    return this.http.put(this.baseUrl+'Authors/'+id, blogObj);
  }
}
