import { Employee } from './../models/employee';
import { EmployeeService } from './../services/employee.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {}

  onAddEmployee(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const newEmployee: Employee = form.value;

    this.employeeService
      .addEmployee(newEmployee)
      .pipe(
        switchMap((response) => {
          return this.employeeService.getEmployees();
        }),
        map((employees) => {
          this.employeeService.employeesChanged.next(employees);
        })
      )
      .subscribe((res) => {
        this.activeModal.close();
      });
  }
}
