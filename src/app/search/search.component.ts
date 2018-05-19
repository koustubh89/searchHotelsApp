import { Component, OnInit } from '@angular/core';
import { Search } from '../search';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private HotelService: HotelService) { }
  
  guests = [1, 2, 3, 4];

  model = new Search( 1, '', '', '', 2);

  submitted = false;

  getText() {
    return {
      SearchFormHeader: 'Search Form Header',
      NumberGuest: 'Number of Guest',
      where: 'Where are you going ?',
      CheckIn: 'Check-in',
      CheckOut: 'Check-out',
      Search: 'Search for Hotels'
    }
  }
  onSubmit() { 
    this.submitted = true;
    this.HotelService.getSearchInit();
  }

  ngOnInit() {
  }

}
