import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl:string = 'http://localhost:6643/api/';

  constructor(private http:HttpClient) { }

  listCommentsDesc(){
    return this.http.get(this.baseUrl+'Comments');
  }
  listCommentsByPost(id:number){
    return this.http.get(this.baseUrl+'Comments/getCommentsByPostId/'+id);
  }
  postComment(blogObj:any){
    return this.http.post(this.baseUrl+'Comments',blogObj);
  }

}
