import {
  Component
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';
import { AuthNavigationService } from '../../shared/auth-navigation.service';


@Component({

  selector:'app-footer',

  standalone:true,

  imports:[
    RouterLink
  ],

  templateUrl:
  './footer.component.html',

  styleUrl:
  './footer.component.css'

})


export class FooterComponent {
  constructor(public authNavigation: AuthNavigationService) {}

}
