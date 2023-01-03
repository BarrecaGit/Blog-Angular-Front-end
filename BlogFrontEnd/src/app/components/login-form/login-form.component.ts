import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  title = 'Login';
  ErrorMessage = '';
  hide = true;
  loginError:boolean = false;

  
  // userIdRequried = new FormControl('',[Validators.required]);
  // passwordRequried = new FormControl('',[Validators.required]);

  loginFormGroup = new FormGroup({
    userId : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })
  
  
  constructor(private _snackBar: MatSnackBar, private titleSvc:Title, private userService:UserService,private router:Router){}

  userId='';
  password='';
  
  
  ngOnInit(): void {
    this.titleSvc.setTitle('Login');
  }

  // Login()
  // {
  //   this.userService.Login(this.userId, this.password).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.userService.SetCurrentUser(data);
  //     },
  //     error: (error) => {
  //       this.loginError = true;
  //       console.log(error);
  //     },
  //     complete: () => {
  //       this.router.navigate(['/']);
  //       console.log('Complete');
  //     }
  //   });
  // }

  Login()
  {
    let userId = this.loginFormGroup.get('userId')?.value;
    let password = this.loginFormGroup.get('password')?.value;

    this.loginFormGroup.markAllAsTouched()
    if(this.loginFormGroup.valid)
    {
      this.userService.Login(userId!, password!).subscribe({
        next: (data) => {
          console.log(data);
          this.userService.SetCurrentUser(data);
        },
        error: (err) => 
        {
          this.loginError = true;
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
          this.router.navigate(['/']);
          console.log('Complete');
        }
      });
    }
    else
    {
      this._snackBar.open("Problem with login", "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }
}
