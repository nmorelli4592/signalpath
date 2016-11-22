import { Component, OnInit } from '@angular/core';
import { RouteConfig, RouterOutlet } from '@angular/router-deprecated';
import { Router } from '@angular/router';
import {CustomerService}   from '../Services/customer.service';
import {WorkHourService}   from '../Services/workhour.service';
import {AddressService}   from '../Services/address.service';
import {TaskService}   from '../Services/task.service';
import {TaskCategoryService} from '../Services/taskcategory.service';
import {TaskTimeService} from '../Services/tasktime.service';
import {ProjectService}   from '../Services/project.service';
import {Observable } from 'rxjs/Rx';
import {Task } from '../Tasks/task';
import {TaskCategory } from '../Tasks/task';


@Component({
    moduleId: module.id,
    selector: 'my-project',
    providers: [CustomerService, WorkHourService, AddressService, TaskService, ProjectService, TaskCategoryService, TaskTimeService],

    templateUrl: 'Time-Logging.html',
    // pipes: [AddressPipe]
    // styleUrls: ['app/appStyles.css']


})
export class TimeLoggingComponent implements OnInit {
    customers: any[];
    workHours: any[];
    taskTimes: any[];
    addresses: any[];
    projects: any[];
    tasks: any[];
    taskCategories: TaskCategory[];

    selectedTask: Task;
    selectedTaskCategory: TaskCategory;

    selectedCustomerId = 0;
    selectedTaskId = 0;
    TaskNotes: any;
    filteredAddresses: any[];
    filteredProjects: any[];


    constructor(
        private customerService: CustomerService,
        private addressService: AddressService,
        private projectService: ProjectService,
        private taskService: TaskService,
        private taskCategoryService: TaskCategoryService,
        private taskTimeService: TaskTimeService,
        private router: Router) { }


    getData(): void {
        this.customerService.getCustomers().then(customers => this.customers = customers);
        this.addressService.getAddresses().then(addresses => this.addresses = addresses);
        this.taskService.getTasks().then(tasks => this.tasks = tasks);
        this.taskCategoryService.getCategories().then(taskCategories => this.taskCategories = taskCategories);
        this.projectService.getProjects().then(projects => this.projects = projects);
        this.taskTimeService.geTaskTimes().then(taskTimes => this.taskTimes = taskTimes);
    }


    //Dropdown Selection Events for filtering
    onSelect(selection: number) {
        this.selectedCustomerId = selection
        this.filteredAddresses = this.addresses.filter(x => x.CustomerId == selection);

    }
    onAddSelect(selection: number) {
        this.filteredProjects = this.projects.filter(x => x.AddressId == selection && x.CustomerId == this.selectedCustomerId);
    }

    //timeLogging function
    addTimes(stTime: Date, endTime: Date): void {
        //name = name.trim();

        this.taskTimeService.create(stTime, endTime, this.selectedTaskId)
            .then(timeLog => {
                this.taskTimes.push(timeLog);
            })

    }


    //looks up TaskCategory ijg uhjf
    taskChange(task: Task) {
        if (this.selectedTask == null) return;

        this.selectedTaskCategory = this.taskCategories.find(x => x.Id == task.CategoryId);
    }
    //Page Change to tasks
    addTask() {
        let link = ['/tasks'];
            this.router.navigate(link);
        }
    

    ngOnInit(): void {
        this.getData();
    }
}