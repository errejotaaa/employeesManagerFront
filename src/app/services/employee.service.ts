import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employeesChanged = new Subject<Employee[]>();
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiBaseurl;

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/all`);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employee/find/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/add`, employee);
  }

  updateEmploye(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employee/update`, employee);
  }

  deleteEmploye(employeeId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/employee/delete/${employeeId}`
    );
  }
}
