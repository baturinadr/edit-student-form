import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";

import {StudentService} from "./services/student.service";
import {IStudent} from "./models/student.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup;

  constructor(private studentService: StudentService) {
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.fillForm();
  }

  public initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(32)
      ]),
      age: new FormControl(null, [Validators.required, Validators.min(1)]),
      hasSportAchievements: new FormControl(false),
      minSportGroup: new FormControl(null, [Validators.required, Validators.min(1)]),
      maxSportGroup: new FormControl(null, [Validators.required, Validators.min(1)]),
      registrationDate: new FormControl(null, [Validators.required])
    });
  }

  public getSportGroupsAchievements(): FormControl[] {
    if (!this.form.get('sportGroupsAchievements')) return [];

    return <FormControl[]>(<FormArray>this.form.get('sportGroupsAchievements')).controls;
  }

  public onAddAchievement(): void {
    (<FormArray>this.form.get('sportGroupsAchievements')).push(new FormControl(''))
  }

  public deleteAchievement(idx: number): void {
    (<FormArray>this.form.get('sportGroupsAchievements')).removeAt(idx);
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const {registrationDate} = this.form.value;
    const year = registrationDate.year;
    const month = registrationDate.month;
    const day = registrationDate.day;

    this.form.value.registrationDate = `${year}-${month}-${day}`;

    this.studentService.updateStudent(this.form.value);
  }

  private fillForm(): void {
    this.studentService.getStudent('John1')
      .subscribe((student: IStudent) => {
        if (student.sportGroupsAchievements) {
          const achievementsArr = student.sportGroupsAchievements.map(achievement => new FormControl(achievement));
          this.form.addControl('sportGroupsAchievements', new FormArray(achievementsArr));
        } else {
          delete student.sportGroupsAchievements;
        }

        const date = new Date(student.registrationDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // @ts-ignore
        student.registrationDate = new NgbDate(year, month, day);
        this.form.setValue(student);
      });
  }
}
