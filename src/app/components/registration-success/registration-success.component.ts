import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.css']
})
export class RegistrationSuccessComponent {
  @Output() previous = new EventEmitter<void>();

  onPrevious() {
    this.previous.emit();
  }
}
