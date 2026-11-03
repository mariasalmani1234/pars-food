import {
  Component
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  UserService
} from '../../services/user.service';

import {
  User
} from '../../models/user.model';



@Component({

  selector:'app-register',

  standalone:true,

  imports:[
    RouterLink,
    FormsModule
  ],

  templateUrl:
  './register.component.html',

  styleUrl:
  './register.component.css'

})


export class RegisterComponent {


constructor(

  private userService: UserService,

  private router: Router

){}



name='';

email='';

password='';

confirmPassword='';



nameError='';

emailError='';

passwordError='';

confirmPasswordError='';





register(){


this.nameError='';

this.emailError='';

this.passwordError='';

this.confirmPasswordError='';




if(this.name.trim()===''){

this.nameError =
'لطفاً نام خود را وارد کنید';

}



if(this.email.trim()===''){

this.emailError =
'لطفاً ایمیل خود را وارد کنید';

}

else if(!this.email.includes('@')){

this.emailError =
'فرمت ایمیل صحیح نیست';

}





if(this.password.trim()===''){

this.passwordError =
'لطفاً رمز عبور را وارد کنید';

}

else if(this.password.length < 6){

this.passwordError =
'رمز عبور باید حداقل ۶ کاراکتر باشد';

}





if(this.confirmPassword.trim()===''){

this.confirmPasswordError =
'لطفاً رمز عبور را تکرار کنید';

}

else if(
this.password !== this.confirmPassword
){

this.confirmPasswordError =
'رمزهای عبور یکسان نیستند';

}





if(
this.nameError ||
this.emailError ||
this.passwordError ||
this.confirmPasswordError
){

return;

}





const newUser:User = {


id:Date.now(),


name:this.name,


email:this.email,


password:this.password,


phone:'',


role:'customer'


};





this.userService
.register(newUser)
.subscribe({

next:()=>{


alert(
'ثبت نام با موفقیت انجام شد'
);


this.router.navigate([

'/login'

]);


},


error:(error)=>{


console.error(
error
);


alert(
'ثبت نام ناموفق بود'
);


}


});



}


}