import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
     RouterLink
  ],

  templateUrl:
    './login.component.html',

  styleUrl:
    './login.component.css'
})

export class LoginComponent {


  errorMessage = '';



  form =
  this.fb.group({

    email:[
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],


    password:[
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]

  });



  constructor(

    private fb:
      FormBuilder,

    private authService:
      AuthService,

    private router:
      Router

  ){}




  submit(){


    if(
      this.form.invalid
    ){

      return;

    }



    const result =
      this.authService.login(

        this.form.value.email!,

        this.form.value.password!

      );



    if(!result){

      this.errorMessage =
      'ایمیل یا رمز عبور اشتباه است';

      return;

    }



    const user =
      this.authService
      .getCurrentUser();



    if(
      user?.role === 'restaurant'
    ){

      this.router.navigate([
        '/restaurant-management'
      ]);

      return;

    }



    if(
      user?.role === 'admin'
    ){

      this.router.navigate([
        '/admin'
      ]);

      return;

    }



    this.router.navigate([
      '/profile'
    ]);

  }

}