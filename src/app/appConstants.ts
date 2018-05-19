import { HttpHeaders } from '@angular/common/http';

export class AppUrls {
    public baseUrl = 'https://public-be.oski.io/hotel/v1.0/search';
    public searchInit = this.baseUrl + 'init';  // URL to web api for people
    public getSearchStatus = this.baseUrl + 'status';  // URL to web api for people
    public getHotels = this.baseUrl + 'result';  // URL to web api for people
}
export class AppConstants extends AppUrls {
    public httpOptions = {
        headers: new HttpHeaders({ 'oski-tenantId':'Demo', 'Content-Type': 'application/json' })
    };
}
