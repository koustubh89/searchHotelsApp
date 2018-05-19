import { Component, OnInit } from '@angular/core';
import { Search } from '../search';
import { } from '';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }
  
  guests = [1, 2, 3, 4];

  model = new Search( 1, '', '', '', 2);

  submitted = false;

  onSubmit() { 
    this.submitted = true;
    console.log('lookup from here');
  }

  ngOnInit() {
  }

}
