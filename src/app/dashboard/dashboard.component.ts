import { Employee } from './../models/employee';
import { EmployeeService } from './../services/employee.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.employees = employees;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.employeeService.employeesChanged.subscribe((employees) => {
      this.employees = employees;
    });
  }
}
