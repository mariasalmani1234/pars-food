import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../icon.component';
@Component({selector:'app-category-section',standalone:true,imports:[RouterLink,IconComponent],templateUrl:'./category-section.component.html',styleUrl:'./category-section.component.css'})
export class CategorySectionComponent {
  readonly categories=[{id:1,name:'برگر',description:'یک انتخاب پرطرفدار',icon:'burger'},
    {id:2,name:'پیتزا',description:'برش‌هایی از حالِ خوب',icon:'pizza'},
    {id:3,name:'سوخاری',description:'ترد و خوشمزه',icon:'chicken'},
    {id:4,name:'نوشیدنی',description:'کنار غذای دلخواهت',icon:'drink'}];
}
