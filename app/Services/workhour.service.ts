import {Injectable } from '@angular/core';
import {Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WorkHourService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private Server: string = "http://sigpathapi.azurewebsites.net/";
    private ApiUrl: string = "api/WorkHours";

    constructor(private http: Http) { }


    getWorkHours(): Promise<any[]> {
        return this.http.get(this.Server + this.ApiUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    create(customerId: number, stTime: Date, endTime: Date): Promise<any> {
        return this.http
            .post(this.Server + this.ApiUrl, JSON.stringify({ CustomerId: customerId, StartTime: stTime, EndTime: endTime }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}

