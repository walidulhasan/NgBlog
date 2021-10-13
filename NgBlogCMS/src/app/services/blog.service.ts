import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl:string = 'http://localhost:6643/api/';

  constructor(private http:HttpClient) { }

  listBlogs(){
    return this.http.get(this.baseUrl+'Posts');
  }
  listBlogsBack(){
    return this.http.get(this.baseUrl+'Posts/Filter2/Back');
  }
  listBlogsByCat(cat:string){
    return this.http.get(this.baseUrl+'Posts/filter/'+cat)
  }
  listBlogsByTag(tag:string){
    return this.http.get(this.baseUrl+'Posts/tags/'+tag)
  }
  addPost(blogObj:any){
    return this.http.post(this.baseUrl+'Posts',blogObj);
  }
  editPost(id:any, blogObj:any){
    return this.http.put(this.baseUrl+'Posts/'+id, blogObj);
  }
  deletePost(id:any){
    return this.http.delete(this.baseUrl+'Posts/'+id)
  }
  viewPost(id:string){
    return this.http.get(this.baseUrl+'Posts/'+id)
  }
  listPopularPosts(){
    return this.http.get(this.baseUrl+'Posts/popular')
  }
  listBlogsByAutor(name:string){
    return this.http.get(this.baseUrl+'Posts/author/'+name)
  }
  listBlogsByAutorId(id:any){
    return this.http.get(this.baseUrl+'Posts/ByAuthorId/'+id)
  }
}
