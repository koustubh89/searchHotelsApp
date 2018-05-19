import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor() { }
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
  }

}
