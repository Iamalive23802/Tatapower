import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boiler-row1-2-field',
  templateUrl: './boiler-row1-2-field.component.html',
  styleUrls: ['./boiler-row1-2-field.component.css']
})
export class BoilerRow12FieldComponent {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;
}
