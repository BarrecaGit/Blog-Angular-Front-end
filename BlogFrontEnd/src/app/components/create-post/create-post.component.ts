import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token.model';
import { Post } from 'src/app/models/post.model';
import { UserService } from 'src/app/services/user.service';
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
  currentUser:Token | undefined;
  currentUserId:string | undefined; // the user logged in
  decodeToken:any;

  createPostFormGroup!: FormGroup;

  editorStyle = {
    height: '300px',
    width: 'full-width',
    backgroundColor: 'white'
  }

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']  
      ]
      
    }
  }

  constructor(private _snackBar: MatSnackBar,private titleSvc:Title, private userService:UserService,private postInstance:PostService, private router:Router)
  {
    this.newPost = new Post('',new Date(),'','','','',new Date());
  }

  ngOnInit(): void 
  {
    this.createPostFormGroup = new FormGroup({
      'title': new FormControl('',[Validators.required]),
      'headerImage': new FormControl('',[Validators.required]),
      'content': new FormControl('',[Validators.required])
    })
    this.titleSvc.setTitle('Create a blog post');
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

  CreatePost()
  {
    console.log(this.createPostFormGroup.get('content')?.value)    
    this.createPostFormGroup.markAllAsTouched()
    if(this.createPostFormGroup.valid)
    {
      let title = this.createPostFormGroup.get('title')?.value;
      let headerImage = this.createPostFormGroup.get('headerImage')?.value;
      
      let content = this.createPostFormGroup.get('content')?.value;
      // console.log(`Content: ${content}`)

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
            // console.log(data);
            this.router.navigate([`/ManagePosts/User/${this.currentUserId}`]);//nav to manage ui
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
