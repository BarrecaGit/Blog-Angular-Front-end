import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  currentPost:Post = new Post('',new Date(),'','','','',new Date());
  
  constructor(private postInstance:PostService, private router:Router, private activatedRoute:ActivatedRoute, private titleSvc:Title){}

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
      this.titleSvc.setTitle(this.currentPost.title);
    })
  }

  navBrowse()
  {
    this.router.navigate(['/']);//nav to browse post
  }
}
