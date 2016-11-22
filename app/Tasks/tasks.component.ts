

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {TaskService}   from '../Services/task.service';
import {TaskCategoryService} from '../Services/taskcategory.service';
import {ProjectService} from '../Services/project.service'
import {Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'my-tasks',
    providers: [TaskService, TaskCategoryService,ProjectService],

    templateUrl: 'Tasks.html'


})

export class TasksComponent implements OnInit {

    tasks: any[];
    taskCategories: any[];
    projects: any[];
    selectedCategory: number;


    constructor(private taskCategoryService: TaskCategoryService,
        private taskService: TaskService,
        private projectService: ProjectService,
        private router: Router) { }

    saveTask(Description: string, Notes: string) {
        this.taskService.create(this.selectedCategory, Description, Notes).then(t => { this.tasks.push(t); })
    }

    onCategorySelect(id: number) {
        this.selectedCategory = id;
    }

    goBack() {
        let link = ['/projects'];
        this.router.navigate(link);
    }
    ngOnInit(): void {
        this.taskCategoryService.getCategories().then(taskCategories => this.taskCategories = taskCategories);
        this.projectService.getProjects().then(projects => this.projects = projects);
     }


    
}
