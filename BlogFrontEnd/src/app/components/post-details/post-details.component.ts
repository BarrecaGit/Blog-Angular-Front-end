import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/models/token.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  headerText:string = "Details";

  currentUser:Token | undefined;
  currentUserId:string | undefined; // the user logged in
  decodeToken:any;

  currentPost:Post = new Post('',new Date(),'','','','',new Date());


  constructor(private userService:UserService,private postInstance:PostService, private router:Router, private activatedRoute:ActivatedRoute,private titleSvc:Title){}

  
  ngOnInit(): void
  {
    
    this.postInstance.GetPostById(this.activatedRoute.snapshot.params['postId']).subscribe((result: any) => {
      this.currentPost!.postId = result['postId'],
      this.currentPost!.createdDate = result['createdDate'],
      this.currentPost!.title = result['title'],
      this.currentPost!.content = result['content'],
      this.currentPost!.userId = result['userId'],
      this.currentPost!.headerImage = result['headerImage'],
      this.currentPost!.lastUpdated = result['lastUpdated'],
      this.titleSvc.setTitle(`${this.currentPost.title} Details`);
    })


    this.currentUser = this.userService.GetCurrentUser();
    this.decodeToken = this.userService.DecodeTokenObj(this.currentUser);
    if(this.decodeToken)
    {
      this.currentUserId = this.decodeToken.data.userId;
      // console.log(this.currentUserId)
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
  }

  navManageUi()
  {
    this.router.navigate([`/ManagePosts/User/${this.currentUserId}`]);//nav to manage ui
  }
}
