import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Token } from 'src/app/models/token.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/post.model';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';

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

  displayedColumns: string[] = ['title', 'createdDate', 'actions'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private _snackBar: MatSnackBar,
    private userService:UserService,
    private postInstance:PostService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    public dialog: MatDialog
    ){}

  collection:any = [];

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
    
    this.postInstance.GetPostsByUserId(this.currentUserId!).subscribe((result) => {
      console.log(result)
      this.collection = result;
      this.dataSource = new MatTableDataSource(this.collection);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  DeletePost(postId: string)
  {
    console.warn(postId);
    alert("Are you sure");
    // get the index of the post by the postId
    let position:number = this.collection.indexOf(postId, 0);
    // then splice
    this.collection.splice(position-1,1);
    this.dataSource = new MatTableDataSource(this.collection);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.postInstance.DeletePost(postId).subscribe((result) => {
      console.warn("result", result)
    });
  
  }

  navEdit(postId?: string)
  {
    // console.log(`You are trying to edit this postId: ${postId} `)
    this.router.navigate([`/EditPost/${postId}`]);
  }


}