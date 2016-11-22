
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppComponent }  from './app.component';
import { TimeLoggingComponent} from './TimeLogging/time-logging.component';
import { TasksComponent }  from './Tasks/tasks.component';

//import { LoginComponent }  from './login.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


@NgModule({

    declarations: [AppComponent, TimeLoggingComponent, TasksComponent],
    imports: [BrowserModule,
        HttpModule,
        FormsModule, RouterModule.forRoot([
            { path: '', redirectTo: '/timelog', pathMatch: 'full' },
            { path: 'timelog', component: TimeLoggingComponent },
            { path: 'tasks', component: TasksComponent }
        ])
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }