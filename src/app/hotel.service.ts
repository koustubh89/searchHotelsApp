import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppConstants } from './appConstants';

@Injectable()

export class HotelService {

  constructor(
    private http: HttpClient,
    private AppConstants: AppConstants) { }

    hotels: [];
    sessionId: undefined;
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
    getSearchInit = (): Observable<any> => {
      return this.http.post<any>(this.AppConstants.searchInit,{}).pipe(
        tap(Id => {
          this.sessionId = Id; 
          this.searchStatusObj.sessionId = this.sessionId; 
        }),
        catchError(this.handleError(`searchInit`, []))
      );
    }
    // send status call
    getSearchStatus = (): Observable<any> => {
      return this.http.post<any>(this.AppConstants.getSearchStatus, {sessionId: this.sessionId}).pipe(
        tap(result => this.getResults() ),
        catchError(this.handleError(`getSearchStatus`, []))
      );
    }

    // get all hotels
    getResults = (): Observable<any> => {
      return this.http.post<any>(this.AppConstants.getHotels, this.searchStatusObj).pipe(
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
}