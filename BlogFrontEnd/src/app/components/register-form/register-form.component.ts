import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  title='Register'

  responseError = false;
  ErrorMessage = '';
  newUser:User;
  hide = true;

  registrationFormGroup = new FormGroup({

    userId : new FormControl('',[Validators.required]),
    firstName : new FormControl('',[Validators.required]),
    lastName : new FormControl('',[Validators.required]),
    emailAddress : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required])

  });

  constructor(private _snackBar: MatSnackBar, private titleSvc:Title, private userService: UserService, private router:Router){
    this.newUser = new User('','','','','');
  }

  createUser()
  {
    this.registrationFormGroup.markAllAsTouched()
    if(this.registrationFormGroup.valid)
    {

      let userId = this.registrationFormGroup.get('userId')?.value;
      let firstName = this.registrationFormGroup.get('firstName')?.value;
      let lastName = this.registrationFormGroup.get('lastName')?.value;
      let emailAddress = this.registrationFormGroup.get('emailAddress')?.value;
      let password = this.registrationFormGroup.get('password')?.value;

      if(userId && firstName && lastName && emailAddress && password){
        this.userService.CreateUser(userId, firstName, lastName, emailAddress, password).subscribe(
          {
            next: (data) => 
            {
              this._snackBar.open(`User: ${data.userId} has been successfully created`, 'Close', {
                horizontalPosition: 'center',
                verticalPosition: 'top'
              });
              this.router.navigate(['/Login']);
            },
            error: (err)=>
            {
              this.responseError = true;
              this.ErrorMessage = err.Message;
              this._snackBar.open(`Error: ${JSON.stringify(err)}`);
            }
          })
      }
    }
    else
    {
      this._snackBar.open("Please retry registration.", "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }

    console.log(this.newUser);
  }
  
  ngOnInit(): void {
    this.titleSvc.setTitle('Register');
  }
}
