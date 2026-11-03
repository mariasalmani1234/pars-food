import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { ImageFallbackDirective } from '../../shared/image-fallback.directive';
import { IconComponent } from '../../shared/icon.component';
@Component({selector:'app-home-hero',standalone:true,imports:[FormsModule,RouterLink,ImageFallbackDirective,IconComponent],templateUrl:'./home-hero.component.html',styleUrl:'./home-hero.component.css'})
export class HomeHeroComponent {
  searchText='';
  constructor(private router:Router){}
  search():void{void this.router.navigate(['/restaurants'],{queryParams:this.searchText.trim()?{q:this.searchText.trim()}:undefined});}
}
