import {Injectable } from '@angular/core';
import {Task} from'./task';
import {Headers, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private Server: string = "http://sigpathapi.azurewebsites.net/";
    private ApiUrl: string = "api/JobTasks";

    constructor(private http: Http) { }


    getTasks() {
        return this.http.get(this.Server + this.ApiUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }
    getTask(id: number): Promise<Task> {
        return this.http.get(this.Server + this.ApiUrl+"/"+id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    create(categoryId: number, description: string, notes: string): Promise<any> {
        return this.http
            .post(this.Server + this.ApiUrl, JSON.stringify({ CategoryId: categoryId, Description: description, Notes: notes }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }


    update(task: any) {

        const url = '${this.Server}${this.ApiUrl}/${task.Id}';
        return this.http
            .put(url, JSON.stringify(task),{ headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
