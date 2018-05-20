import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private HotelService: HotelService) { }
  hotelResults = [];

  getText() {
    return {
      resultsHead: 'Search Results Page',
      hotels:'hotels',
      in:'in',  
      for:'for',
      noHotels: 'no hotels found',
      currency: '$',
      from: 'from',
      night: '/night',
      total: 'total:',
      showRooms: 'showRooms'
    }
  }

  ngOnInit() {
    this.HotelService.getResults().subscribe(data => {
      this.hotelResults = data;
    })
  }

}
