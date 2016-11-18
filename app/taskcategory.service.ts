import {Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskCategoryService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private Server: string = "http://sigpathapi.azurewebsites.net/";
    private ApiUrl: string = "api/TaskCategories";

    constructor(private http: Http) { }


    getCategories() {
        return this.http.get(this.Server + this.ApiUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

   
    create(name: string) {
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
