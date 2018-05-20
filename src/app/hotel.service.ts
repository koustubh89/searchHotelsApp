import { Injectable } from '@angular/core';

import { HttpModule, RequestOptions } from '@angular/http';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppConstants } from './appConstants';
import { Search } from './search';

@Injectable()

export class HotelService {

  constructor(
    private http: HttpClient,
    private AppConstants: AppConstants
  ) {
  }

  hotels: undefined;
  sessionId: undefined;
  query: undefined;

  setQueryObject(queryObject) {
    this.query = queryObject;
  }
  searchStatusObj = {
    "sessionId": this.sessionId || undefined,
    "paging": {
        "pageNo": 1,
        "pageSize": 2,
        "orderBy": "price asc, rating desc"
    },
    "optionalDataPrefs": [
        "All"
    ],
    "currency": "USD",
    "contentPrefs": [
        "Basic",
        "Activities",
        "Amenities",
        "Policies",
        "AreaAttractions",
        "Descriptions",
        "Images",
        "CheckinCheckoutPolicy",
        "All"
    ],
    "filters": {
        "minHotelPrice": 1,
        "maxHotelPrice": 10000,
        "minHotelRating": 1,
        "maxHotelRating": 5,
        "hotelChains": [
          "Novotel",
          "Marriott",
          "Hilton",
          "Accor"
        ],
        "allowedCountry": "FR"
    }
  };

  //send init call
  getSearchInit = () => {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('oski-tenantId', 'Demo');

    this.http.post<any>(this.AppConstants.searchInit,{}, {headers: headers}).subscribe(
      (Id => {
          this.sessionId = Id;
          this.searchStatusObj.sessionId = this.sessionId;
          this.getSearchStatus();
        }
      ),
      (error) => {
        catchError(this.handleError(`searchInit`, []))
      }
    );
  }

  // send status call
  getSearchStatus = () => {    
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('oski-tenantId', 'Demo');
    
    this.http.post<any>(this.AppConstants.getSearchStatus, {sessionId: this.sessionId}, {headers: headers}).pipe(
      tap(result => {
          // this.getResults()
        }
      ),
      catchError(this.handleError(`getSearchStatus`, []))
    );
  }

  // get all hotels
  getResults = (): Observable<any> => {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('oski-tenantId', 'Demo');

    return this.http.post<any>(this.AppConstants.getHotels, this.searchStatusObj, {headers: headers}).pipe(
      tap(hotels =>{
        console.log(`fetched hotels`, hotels.hotels)
        this.hotels = hotels.hotels; 
      }),
      catchError(this.handleError(`getHotels`, []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}