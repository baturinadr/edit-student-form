import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup;

  public ngOnInit(): void {
    this.initializeForm();
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
  }
}
