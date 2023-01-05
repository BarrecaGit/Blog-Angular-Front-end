import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  title='Create a blog post'
  newPost:Post;
  responseError = false;
  ErrorMessage = '';

  createPostFormGroup = new FormGroup({
    title : new FormControl('',[Validators.required]),
    headerImage : new FormControl('', [Validators.required]),
    content : new FormControl('',[Validators.required])
  });

  constructor(private _snackBar: MatSnackBar,private titleSvc:Title, private postInstance:PostService, private router:Router)
  {
    this.newPost = new Post(0,new Date(),'','','','',new Date());
  }

  ngOnInit(): void 
  {
    this.titleSvc.setTitle('Create a blog post');
  }

  CreatePost()
  {
    this.createPostFormGroup.markAllAsTouched()
    if(this.createPostFormGroup.valid)
    {
      let title = this.createPostFormGroup.get('title')?.value;
      let headerImage = this.createPostFormGroup.get('headerImage')?.value;
      let content = this.createPostFormGroup.get('content')?.value;
    
      if(title && content && headerImage)
      {
        this.newPost.title = title;
        this.newPost.headerImage = headerImage;
        this.newPost.content = content;

        this.postInstance.AddPost(this.newPost).subscribe({
          next: (data) => {
            this._snackBar.open(`Post has been successfully created`, 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            console.log(data);
            this.router.navigate(['/']);
          },
          error: (err) => { // change
            this.responseError = true;
            let errStringified = JSON.stringify(err);
            console.log(errStringified)
            let errObj = JSON.parse(errStringified);
            console.log(errObj.error.message);
            this.ErrorMessage = errObj.error.message; // check message or msg
            this._snackBar.open(`Error: ${errObj.error.message}`, "Close", {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        });
      }
    }
    else
    {
      this._snackBar.open("Something went wrong.", "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
}