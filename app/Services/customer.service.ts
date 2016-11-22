import {Injectable } from '@angular/core';
import {Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private Server: string = "http://sigpathapi.azurewebsites.net/";
    private ApiUrl: string = "api/Customers";
   
    constructor(private http: Http) { }

   
    getCustomers(): Promise<any[]>
    {
        return this.http.get(this.Server + this.ApiUrl)
           .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    create(name: string): Promise<any> {
        return this.http
            .post(this.Server + this.ApiUrl, JSON.stringify({ FirstName: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

     private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
  
    
}

