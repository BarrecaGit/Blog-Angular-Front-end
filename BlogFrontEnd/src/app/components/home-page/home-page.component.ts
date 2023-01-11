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

  testPost:Post =
  {
    postId:0,
    createdDate: new Date(),
    title: `GILBERT BURNS: "I'M COMING TO BRAZIL FOR A FINISH"`,
    content: "UFC Welterweight Gilbert Burns Is Determined To Put On The Performance Of A Lifetime In Front Of The Brazilian Faithful At UFC 283: Texeira vs Hill",
    userId: "testUser",
    headerImage: "https://www.ufc.com/s3/files/styles/background_image_lg/s3/2022-12/123022-Gilbert-Burns-Flag-2-GettyImages-1327899403.jpg?h=d1cb525d&itok=9U0Wsph2",
    lastUpdated: new Date()
  }
  constructor(private userService:UserService, private _snackBar: MatSnackBar, private titleSvc:Title, private postInstance:PostService){
    // test push
    // this.postArray.push(this.testPost);
  }

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

  DeletePost(postId: number)
  {
    this.postArray = this.postArray?.filter(p => p.postId !== postId);
    this.postInstance.DeletePost(postId).subscribe();
  }

  
}
