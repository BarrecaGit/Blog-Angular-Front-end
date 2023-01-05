import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  title = 'MMA Blog';
  currentUser:Token | undefined;
  currentUserId:string | undefined;
  decodeToken:any;

  constructor(private userService:UserService, private router:Router){}

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
      }
      else
      {
        this.currentUser = undefined;
        this.router.navigate(['/']);
      }
    });

    
  }

  LogoutUser()
  {
    this.userService.LogoutUser();
  }
}
