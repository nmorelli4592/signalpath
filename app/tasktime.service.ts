import {Injectable } from '@angular/core';
import {Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskTimeService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private Server: string = "http://sigpathapi.azurewebsites.net/";
    private ApiUrl: string = "api/TaskTimes";

    constructor(private http: Http) { }


    geTaskTimes(): Promise<any[]> {
        return this.http.get(this.Server + this.ApiUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    create(stTime: Date, endTime: Date, taskId: number): Promise<any> {
        var dur = endTime.valueOf() - stTime.valueOf();
        return this.http
            .post(this.Server + this.ApiUrl, JSON.stringify({ ResourceId: 0, TimeIn: stTime, TimeOut: endTime, Duration: dur, TaskId: taskId }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}

