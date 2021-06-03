import { EmployeeService } from './../services/employee.service';
import { AddEmployeeComponent } from './../add-employee/add-employee.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from './../models/employee';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  employees: Employee[] = [];
  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
    this.employeeService.employeesChanged.subscribe((employees) => {
      this.employees = employees;
    });
  }

  onOpenModal(): void {
    this.modalService.open(AddEmployeeComponent);
  }

  public searchEmployees(key: string): void {
    console.log(key);
    let results: Employee[] = [];
    for (const employee of this.employees) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    console.log(results);
    this.employeeService.employeesChanged.next(results);
    if (results.length === 0 || !key) {
      this.employeeService
        .getEmployees()
        .pipe(
          tap((employees) => {
            this.employeeService.employeesChanged.next(employees);
          })
        )
        .subscribe(() => {});
    }
  }
}
