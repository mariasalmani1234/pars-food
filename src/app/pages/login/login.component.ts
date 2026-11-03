import { Component, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthShellComponent } from '../../shared/auth-shell.component';
import { IconComponent } from '../../shared/icon.component';
import { safeReturnUrl } from '../../shared/safe-return-url';
@Component({selector:'app-login',standalone:true,imports:[ReactiveFormsModule,RouterLink,AuthShellComponent,IconComponent],
 templateUrl:'./login.component.html',styleUrls:['../../shared/auth-form.css','./login.component.css']})
export class LoginComponent {
  errorMessage='';submitting=false;showPassword=false;
  registered=this.route.snapshot.queryParamMap.get('registered')==='1';
  get returnUrl():string|null{return safeReturnUrl(this.route.snapshot.queryParamMap.get('returnUrl'));}
  get authQuery():{returnUrl?:string}{return this.returnUrl?{returnUrl:this.returnUrl}:{};}
  form=this.fb.nonNullable.group({email:['',[Validators.required,Validators.email]],password:['',Validators.required]});
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private route:ActivatedRoute,private host:ElementRef<HTMLElement>){}
  submit():void{
    if(this.submitting)return;
    this.form.controls.email.setValue(this.form.controls.email.value.trim());
    if(this.form.invalid){this.form.markAllAsTouched();this.focus(this.form.controls.email.invalid?'login-email':'login-password');return;}
    this.errorMessage='';this.submitting=true;this.form.disable({emitEvent:false});
    const {email,password}=this.form.getRawValue();
    this.authService.login(email,password).pipe(finalize(()=>{this.submitting=false;this.form.enable({emitEvent:false});})).subscribe({
      next:user=>{
        if(!user){this.errorMessage='ایمیل یا رمز عبور درست نیست. دوباره بررسی کن.';this.focus('login-error');return;}
        if(this.returnUrl){void this.router.navigateByUrl(this.returnUrl);return;}
        void this.router.navigate([user.role==='restaurant'?'/restaurant-management':user.role==='admin'?'/admin':'/profile']);
      },
      error:()=>{this.errorMessage='ارتباط با سرور برقرار نشد. دوباره تلاش کن.';this.focus('login-error');}
    });
  }
  private focus(id:string):void{setTimeout(()=>this.host.nativeElement.querySelector<HTMLElement>('#'+id)?.focus());}
}
