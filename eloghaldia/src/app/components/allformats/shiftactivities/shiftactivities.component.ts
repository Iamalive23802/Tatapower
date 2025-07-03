import { Component, Input } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-shiftactivities',
  templateUrl: './shiftactivities.component.html',
  styleUrls: ['./shiftactivities.component.css']
})
export class ShiftactivitiesComponent {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  editortext = "";
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter data here...',
    translate: 'no',
    defaultFontName: 'Arial',
    sanitize: false,
    toolbarHiddenButtons: [
      ['insertImage', 'insertVideo', 'link', 'unlink', 'removeFormat', 'toggleEditorMode'],
      ['subscript', 'superscript', 'strikeThrough', 'justifyFull', 'indent', 'outdent']
    ]
  };

}
