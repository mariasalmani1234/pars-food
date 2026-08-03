import { Component, Input ,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css'
})
export class RestaurantCardComponent {
  @Input() name='';
  @Input() city='';
  @Input() rate=0;


  @Output() detailsClicked= new EventEmitter <string> ();

  showDetails(){
    this.detailsClicked.emit(this.name);
  }



}
