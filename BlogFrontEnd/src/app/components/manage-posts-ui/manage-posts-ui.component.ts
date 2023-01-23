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
import { ConfDialogComponent } from '../conf-dialog/conf-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

  collection:Post[] = [];

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
      this.collection = result;
      // console.log(this.collection)
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
    // get the index of the post by the postId
    let index = this.collection.findIndex(i => i.postId === postId);
    
    // then splice
    this.collection.splice(index,1);
    
    // update dataSource
    this.dataSource = new MatTableDataSource(this.collection);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.postInstance.DeletePost(postId).subscribe((result) => {
      console.warn("result", result)
    });
  
  }

  navEdit(postId?: string)
  {
    this.router.navigate([`/EditPost/${postId}`]);
  }

  navDetails(postId?: string)
  {
    this.router.navigate([`/postDetails/${postId}`]);
  }

  openDialog(postId:string)
  {
		const dialogRef = this.dialog.open(ConfDialogComponent,{
		data:
    {
			message: "Are you sure want to delete this?"
		}
		});
		
		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
			if (confirmed) 
      {
				this.DeletePost(postId);
			}
		});
	}

}
