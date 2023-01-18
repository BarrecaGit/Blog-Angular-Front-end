import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Token } from 'src/app/models/token.model';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  title:string = 'Home'
  currentUser:Token | undefined;
  
  responseError = false;
  ErrorMessage = '';

  postArray:Post[] =[];

  constructor(private userService:UserService, private _snackBar: MatSnackBar, private titleSvc:Title, private postInstance:PostService){ }

  ngOnInit(): void 
  {
    this.titleSvc.setTitle('Home Page');
    this.currentUser = this.userService.GetCurrentUser();
    this.userService.userLoggedIn.subscribe((data)=>{
      if(data)
      {
        this.currentUser=this.userService.GetCurrentUser();
      }
      else
      {
        this.currentUser = undefined;
      }
    });
    this.GetPosts();
  }

  GetPosts()
  {
    this.postInstance.GetPosts().subscribe(posts => this.postArray = posts);
  }

  
}
