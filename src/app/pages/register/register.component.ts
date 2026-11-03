import { Component, ElementRef } from '@angular/core';
import { FormsModule, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AuthShellComponent } from '../../shared/auth-shell.component';
import { IconComponent } from '../../shared/icon.component';
import { safeReturnUrl } from '../../shared/safe-return-url';
@Component({selector:'app-register',standalone:true,imports:[RouterLink,FormsModule,AuthShellComponent,IconComponent],
 templateUrl:'./register.component.html',styleUrls:['../../shared/auth-form.css','./register.component.css']})
export class RegisterComponent {
  name='';email='';password='';confirmPassword='';
  nameError='';emailError='';passwordError='';confirmPasswordError='';errorMessage='';
  submitting=false;showPassword=false;showConfirmPassword=false;
  get returnUrl():string|null{return safeReturnUrl(this.route.snapshot.queryParamMap.get('returnUrl'));}
  get authQuery():{returnUrl?:string}{return this.returnUrl?{returnUrl:this.returnUrl}:{};}
  constructor(private userService:UserService,private router:Router,private route:ActivatedRoute,private host:ElementRef<HTMLElement>){}
  register():void{
    if(this.submitting)return;
    this.errorMessage='';
    this.nameError=this.name.trim()?'':'نام و نام خانوادگی را وارد کن.';
    const email=this.email.trim().toLowerCase();
    this.emailError=!email||Validators.email(new FormControl(email))?'ایمیل معتبر وارد کن.':'';
    this.passwordError=this.password.trim().length<6?'رمز عبور باید حداقل ۶ کاراکتر باشد.':'';
    this.confirmPasswordError=this.password!==this.confirmPassword?'دو رمز عبور یکسان نیستند.':'';
    const invalid=this.nameError?'name':this.emailError?'email':this.passwordError?'password':this.confirmPasswordError?'confirmPassword':null;
    if(invalid){this.focus('register-'+invalid);return;}
    this.submitting=true;
    this.userService.register({name:this.name.trim(),email,password:this.password,phone:'',role:'customer'})
      .pipe(finalize(()=>this.submitting=false)).subscribe({
        next:()=>{void this.router.navigate(['/login'],{queryParams:{registered:'1',...this.authQuery}});},
        error:error=>{
          if(error?.message==='EMAIL_EXISTS'){this.emailError='این ایمیل قبلاً ثبت شده است؛ وارد حسابت شو.';this.focus('register-email');}
          else{this.errorMessage='ثبت‌نام انجام نشد. ارتباط را بررسی و دوباره تلاش کن.';this.focus('register-error');}
        }
      });
  }
  private focus(id:string):void{setTimeout(()=>this.host.nativeElement.querySelector<HTMLElement>('#'+id)?.focus());}
}
