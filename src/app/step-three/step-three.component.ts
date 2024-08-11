import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent {
  @Output() previous = new EventEmitter<void>();

  onPrevious() {
    this.previous.emit();
  }
}
