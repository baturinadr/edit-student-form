import {Injectable} from '@angular/core';
import {IStudent} from "../models/student.model";

import {Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public students: IStudent[] = [
    {
      name: 'John1',
      age: 1,
      hasSportAchievements: true,
      minSportGroup: 1,
      maxSportGroup: 4,
      registrationDate: '2021-08-15',
      sportGroupsAchievements: ['Football', 'Ping-pong', 'Tennis']
    }
  ];

  public getStudent(name: string): Observable<IStudent> {
    const student = this.students.find((student: IStudent) => student.name === name);
    return of(student);
  }

  public updateStudent(newStudent: IStudent): void {
    const student = this.students.find((_student: IStudent) => _student.name === newStudent.name);

    if (!student) return;

    Object.assign(student, newStudent);
  }
}
