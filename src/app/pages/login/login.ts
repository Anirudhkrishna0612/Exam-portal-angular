import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../user.service'; // Path now correct
import { User } from '../../user.model';     // Path now correct
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginData={
    username:'',
    password:'',

  };
  constructor(private snack:MatSnackBar, private login:LoginService){}
   

  ngOnInit(): void{}

  formSubmit(){
    console.log('login btn clicked');

    if(this.loginData.username.trim()=='' || this.loginData.username==null){

      this.snack.open('Username is required !!','',{
        duration:3000,
      });
      return;
    }
     if(this.loginData.password.trim()=='' || this.loginData.password==null){

      this.snack.open('password is required !!','',{
        duration:3000,
      });
      return;
    }

    //request server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);

        //login...

        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect ADMIN..: admin-dashboard
            //redirect USER..: user-dashboard
            
          }
        )

      },
      (error)=>{
        console.log("Error!");
        console.log(error);
        
      }
    )

  }
}
