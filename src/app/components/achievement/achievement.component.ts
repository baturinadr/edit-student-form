import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss']
})
export class AchievementComponent {
  @Input() public achievementControl: FormControl;
  @Output() public onDelete: EventEmitter<void> = new EventEmitter<void>();

  public delete(): void {
    this.onDelete.emit();
  }
}
