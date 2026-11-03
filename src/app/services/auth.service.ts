import {
  Injectable
} from '@angular/core';


import {
  User
} from '../models/user.model';


import {
  UserService
} from './user.service';



@Injectable({
  providedIn:'root'
})


export class AuthService {



private currentUserKey =
'pars-food-current-user';





constructor(

private userService:UserService

){}







login(

email:string,

password:string

):boolean {



const users =

this.userService
.getUsersSync();




const user =

users.find(

item =>

item.email === email &&

item.password === password

);





if(!user){

return false;

}





localStorage.setItem(

this.currentUserKey,

JSON.stringify(user)

);





return true;


}







register(user:User){


return this.userService
.register(user);


}







getCurrentUser():

User | null {



const data =

localStorage.getItem(

this.currentUserKey

);




if(!data){

return null;

}




return JSON.parse(data);


}







logout(){


localStorage.removeItem(

this.currentUserKey

);


}







isLoggedIn():

boolean{


return !!this.getCurrentUser();


}







hasRole(

role:string

):

boolean{


const user =

this.getCurrentUser();



return !!(

user &&

user.role === role

);



}




}