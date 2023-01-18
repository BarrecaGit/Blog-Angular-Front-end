import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Token } from 'src/app/models/token.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/post.model';


@Component({
  selector: 'app-manage-posts-ui',
  templateUrl: './manage-posts-ui.component.html',
  styleUrls: ['./manage-posts-ui.component.css']
})
export class ManagePostsUIComponent implements OnInit {

  currentUser:Token | undefined;
  currentUserId:string | undefined; // the user logged in
  decodeToken:any;
  responseError = false;
  ErrorMessage = '';

  userPostArray:Post[] =[];

  constructor(private _snackBar: MatSnackBar,private userService:UserService,private postInstance:PostService, private router:Router, private activatedRoute:ActivatedRoute){}

  collection:any = [];
  // collection:any = {};

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
        this.currentUser = this.userService.GetCurrentUser();
        console.log(this.currentUser)
      }
      else
      {
        console.log('No data')
        this.currentUser = undefined;
      }
    });
    
    //this.GetPosts(this.currentUserId!);
    this.postInstance.GetPostsByUserId(this.currentUserId!).subscribe((result) => {
      console.log(result)
      this.collection = result;
    })
  }

  DeletePost(postId: string)
  {
    // console.warn(postId);
    // get the index of the post by the postId
    let position:number = this.collection.indexOf(postId, 0);
    // then splice
    this.collection.splice(position-1,1);
    this.postInstance.DeletePost(postId).subscribe((result) => {
      console.warn("result", result)
    });
  }

}
