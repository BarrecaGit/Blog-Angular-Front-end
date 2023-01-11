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

  httpOptions = 
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient:HttpClient, private userService:UserService)
  {

    this.postArray = [];
   }

  
  GetPosts()
  {
    //console.log("from service.get : ", this.httpClient.get<Post[]>(`${environment.serverEndpoint}/Posts`).pipe());
    return this.httpClient.get<Post[]>(`${environment.serverEndpoint}/Posts`).pipe();
  }



  DeletePost(postId:number)
  {
    console.log('In DeletePost')
    this.postArray = this.postArray.filter(j => j.postId !== postId);

    let currentTokenString = localStorage.getItem('token');
    console.log(currentTokenString)
    let header = new HttpHeaders();

    if(currentTokenString)
    {
      let currentTokenObj: Token = JSON.parse(currentTokenString) as Token;
      console.log(currentTokenObj.token)
      header = header.set('Authorization',`Bearer ${currentTokenObj.token}`);
      console.log(header)
    }
    else
    {
      console.log('No currentToken')
    }
    
    return this.httpClient.delete<Post>(`${environment.serverEndpoint}/Posts/${postId}`, this.httpOptions).pipe();
  }

  GetPostById(postId:number)
  {
    return this.httpClient.get(`${environment.serverEndpoint}/Posts/${postId}`);
  }

  UpdatePost(postId:number, data:any)
  {
    let currentTokenString = localStorage.getItem('token');
    let header = new HttpHeaders();

    if(currentTokenString)
    {
      let currentTokenObj: Token = JSON.parse(currentTokenString) as Token;
      header = header.set('Authorization',`Bearer ${currentTokenObj.token}`);
      console.log(header)
    }
    else
    {
      console.log('No currentToken')
    }

    return this.httpClient.patch(`${environment.serverEndpoint}/Posts/${postId}`, data, {headers:header})
  }

  AddPost(post:Post)
  {
    this.postArray.push(post);
    
    let currentTokenString = localStorage.getItem('token');
    let header = new HttpHeaders();
    if(currentTokenString)
    {
      let currentTokenObj: Token = JSON.parse(currentTokenString) as Token;
      header = header.set('Authorization',`Bearer ${currentTokenObj.token}`);
      console.log(header)
    }

    return this.httpClient.post(`${environment.serverEndpoint}/Posts`,post,{headers:header})
  }
}
