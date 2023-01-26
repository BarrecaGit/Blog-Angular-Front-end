import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Title } from '@angular/platform-browser';
import { Post } from 'src/app/models/post.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  postArray:Post[] =[];
  dataSource:any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private titleSvc:Title,private postInstance:PostService){ }

  ngOnInit(): void 
  {
    this.titleSvc.setTitle('View the blog');
    // this.GetPosts();
    this.postInstance.GetPosts().subscribe((result) =>{
      this.postArray = result;
      this.dataSource = new MatTableDataSource(this.postArray);
      this.dataSource.paginator = this.paginator;
      
    })
  }

  GetPosts()
  {
    // this.postInstance.GetPosts().subscribe(posts => this.postArray = posts);
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
  }

}
