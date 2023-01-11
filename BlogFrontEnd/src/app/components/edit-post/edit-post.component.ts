import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Token } from 'src/app/models/token.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  // title = 'Edit a blog post';
  
  currentUser:Token | undefined;
  currentUserId:string | undefined; // the user logged in
  decodeToken:any;
  responseError = false;
  ErrorMessage = '';

  editPostFormGroup = new FormGroup({
    title : new FormControl(''),
    headerImage : new FormControl(''),
    content : new FormControl('')
  });

  
  constructor(private _snackBar: MatSnackBar,private userService:UserService,private postInstance:PostService, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void
  {
    this.postInstance.GetPostById(this.activatedRoute.snapshot.params['postId']).subscribe((result: any) => {
      this.editPostFormGroup = new FormGroup({
        title : new FormControl(result['title']),
        headerImage : new FormControl(result['headerImage']),
        content : new FormControl(result['content'])
      })
    })

    this.currentUser = this.userService.GetCurrentUser();
    this.decodeToken = this.userService.DecodeTokenObj(this.currentUser);
    if(this.decodeToken)
    {
      this.currentUserId = this.decodeToken.data.userId;
      console.log(this.currentUserId)
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

  collection()
  {
    // this.postInstance.UpdatePost(this.activatedRoute.snapshot.params['postId'], this.editPostFormGroup.value).subscribe((result:any)=>{
    //   console.log(result)
    //   this.router.navigate(['/'])
    // });
    
    this.postInstance.UpdatePost(this.activatedRoute.snapshot.params['postId'], this.editPostFormGroup.value).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
          let errStringified = JSON.stringify(err);
          console.log(errStringified)
          let errObj = JSON.parse(errStringified);
          console.log(errObj.error.message);
          this.ErrorMessage = errObj.error.message;
          this._snackBar.open(`Error: ${errObj.error.message}`, "Close", {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
      },
      complete: () => {
        this._snackBar.open("Post successfully updated", "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['/']);
        console.log('Post successfully updated');
      }
    });
  }

}
