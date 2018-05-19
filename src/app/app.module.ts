import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import { HotelService } from './hotel.service';
import { AppConstants } from './appConstants';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HotelService, AppConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
