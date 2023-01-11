import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.prod';
import { Token } from '../models/token.model';
import {User} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() userLoggedIn = new EventEmitter<boolean>();

  currentUser:Token | undefined;

  // currentUserObject:User | undefined ={
  //   userId: '',
  //   firstName: '',
  //   lastName: '',
  //   emailAddress: '',
  //   password: ''
  // }

  constructor(private httpClient:HttpClient) { 

    let tokenInstance = localStorage.getItem('token');
    if(tokenInstance){
      this.currentUser = JSON.parse(tokenInstance);
    }
    
  }

  CreateUser(userId:string, firstName:string, lastName:string, emailAddress:string, password:string)
  {
    let newUser = {userId:userId, firstName:firstName, lastName:lastName, emailAddress:emailAddress, password:password};

    return this.httpClient.post<User>(`${environment.serverEndpoint}/Users`, newUser);
  }

  Login(userId:string, password:string)
  {
    return this.httpClient.get<Token>(`${environment.serverEndpoint}/Users/Login/${userId}/${password}`);
  }

  SetCurrentUser(token:Token)
  {
    this.currentUser = token;
    localStorage.setItem('token', JSON.stringify(token));
    this.userLoggedIn.emit(true);
  }

  // Returns a broken down Token object
  DecodeTokenObj(token?:Token)
  {
    let helper = new JwtHelperService();
    let tokenString = JSON.stringify(token);
    let decodeToken = helper.decodeToken((tokenString));
    // console.log("decodeToken: ", decodeToken);
    return decodeToken;
  }

  // Returns a raw Token object
  GetCurrentUser()
  {
    // console.log(this.currentUser)
    return this.currentUser;
  }

  LogoutUser()
  {
    this.currentUser = undefined;
    localStorage.setItem('token', '');
    this.userLoggedIn.emit(false);
    location.reload();
  }


}
