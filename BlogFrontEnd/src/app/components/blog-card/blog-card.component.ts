import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Token } from 'src/app/models/token.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  currentUser:Token | undefined;
  currentUserId:string | undefined;
  decodeToken:any;

  @Input() CurrentPost:Post | undefined;

  constructor(private userService:UserService,private postInstance:PostService){ }

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


  
  DeletePost(postId?: number)
  {
    console.log(`DeletePost in blog-card-component: ${postId} `)
    //this.postArray = this.postArray.filter(p => p.postId !== postId);
    //this.postInstance.DeletePost(postId!).subscribe();
  }

  EditPost(postId?: number)
  {
    console.log(`EditPost in blog-card-component: ${postId} `)
    //this.postArray = this.postArray.filter(p => p.postId !== postId);
    //this.postInstance.DeletePost(postId!).subscribe();
  }
}
