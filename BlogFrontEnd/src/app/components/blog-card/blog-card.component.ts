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


  
  // DeletePost(postId?: string)
  // {
  //   console.log(`DeletePost in blog-card-component: ${postId} `)

  //   this.postInstance.DeletePost(postId!).subscribe({
  //     next:(data) => {
  //       this._snackBar.open(`Post has been successfully deleted`, 'Close', {
  //         horizontalPosition: 'center',
  //         verticalPosition: 'top'
  //       });
  //       console.log(data);
  //       this.router.navigate(['/']);
  //     },
  //     error: (err) => { 
  //       this.responseError = true;
  //       let errStringified = JSON.stringify(err);
  //       console.log(errStringified)
  //       let errObj = JSON.parse(errStringified);
  //       console.log(errObj.error.message);
  //       this.ErrorMessage = errObj.error.message; // check message or msg
  //       this._snackBar.open(`Error: ${errObj.error.message}`, "Close", {
  //         horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //       });
  //     }
  //   });
  // }

  EditPost(postId?: string)
  {
    // console.log(`You are trying to edit this postId: ${postId} `)
    this.router.navigate([`/EditPost/${postId}`]);
  }
}
