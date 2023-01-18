import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Token } from 'src/app/models/token.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  currentUser:Token | undefined; //
  currentUserId:string | undefined; // the user logged in
  decodeToken:any;
  responseError = false;
  ErrorMessage = '';

  
  @Input() CurrentPost:Post | undefined;

  constructor(private _snackBar: MatSnackBar,private userService:UserService,private postInstance:PostService, private router:Router){}

  ngOnInit(): void
  {
    this.currentUser = this.userService.GetCurrentUser();

    this.decodeToken = this.userService.DecodeTokenObj(this.currentUser);

    if(this.decodeToken)
    {
      this.currentUserId = this.decodeToken.data.userId;
    }

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
  }

  
}
