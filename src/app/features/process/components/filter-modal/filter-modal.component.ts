import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss'
})
export class FilterProcessModalComponent {
  @Output() applied = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      dataAbertura: [''],
      documento: [''],
      status: ['']
    });
  }

  applyFilter() {
    this.applied.emit(this.form.value);
    this.close();
  }

  close() {
    this.closed.emit();
  }

}