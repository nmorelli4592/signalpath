
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppComponent }  from './app.component';
import { ProjectComponent} from './project.component';
import { TasksComponent }  from './tasks.component';

import { LoginComponent }  from './login.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


@NgModule({

    declarations: [AppComponent, ProjectComponent, TasksComponent],
    imports: [BrowserModule,
        HttpModule,
        FormsModule, RouterModule.forRoot([
            { path: '', redirectTo: '/projects', pathMatch: 'full' },
            { path: 'projects', component: ProjectComponent },
            { path: 'tasks', component: TasksComponent }
        ])
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }