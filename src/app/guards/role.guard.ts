import {
  inject
} from '@angular/core';


import {
  Router
} from '@angular/router';


import {
  AuthService
} from '../services/auth.service';



export const roleGuard = (

role:string

) => {


return () => {



const authService =

inject(AuthService);



const router =

inject(Router);




const user =

authService.getCurrentUser();





if(
user &&
user.role === role
){

return true;

}




router.navigate([

'/'

]);


return false;



};


};