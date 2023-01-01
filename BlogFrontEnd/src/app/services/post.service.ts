import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../models/post.model';
import { Token } from '../models/token.model';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  postArray:Post[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient:HttpClient, private userService:UserService) {

    this.postArray = [];
   }

  
  GetPosts(){
    //console.log("from service.get : ", this.httpClient.get<Post[]>(`${environment.serverEndpoint}/Posts`).pipe());
    return this.httpClient.get<Post[]>(`${environment.serverEndpoint}/Posts`).pipe();
  }


  AddPost(post:Post){
    this.postArray.push(post);
    
    let currentTokenString = localStorage.getItem('token');

    let header = new HttpHeaders();

    if(currentTokenString){
      let currentTokenObj: Token = JSON.parse(currentTokenString) as Token;
      
      header = header.set('Authorization',`Bearer ${currentTokenObj.token}`);

    }

    return this.httpClient.post(`${environment.serverEndpoint}/Posts`,post,{headers:header})
  }

  DeletePost(postId:number){
    return this.httpClient.delete<Post>(`${environment.serverEndpoint}/Posts/${postId}`, this.httpOptions).pipe();
  }

}