import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityHttpService } from 'src/app/services/utility-http.service';
import { SharedService } from 'src/app/services/shared-service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

interface Employees {
  empid: string;
  empname: string;
  empemail: string;
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-manning',
  templateUrl: './manning.component.html',
  styleUrls: ['./manning.component.css'],
  providers: [MessageService]
})
export class ManningComponent implements OnInit {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  shiftNames = [
    { label: 'Shift A', value: 'Shift A' },
    { label: 'Shift B', value: 'Shift B' },
    { label: 'Shift C', value: 'Shift C' }
  ];

  emprole: any;
  editMode: boolean = false;

  employees = [{}];
  selectedshiftincharge: Employees | undefined;
  selectedCREngg1: Employees | undefined;
  selectedCREngg2: Employees | undefined;
  selectedCREngg3: Employees | undefined;
  selectedFE1: Employees | undefined;
  selectedFE2: Employees | undefined;
  selectedFE3: Employees | undefined;
  selectedFE4: Employees | undefined;
  selectedFE5: Employees | undefined;
  selectedFE6: Employees | undefined;

  filteredshiftincharge: any[] = [];
  filteredCREngg1: any[] = [];
  filteredCREngg2: any[] = [];
  filteredCREngg3: any[] = [];
  filteredFE1: any[] = [];
  filteredFE2: any[] = [];
  filteredFE3: any[] = [];
  filteredFE4: any[] = [];
  filteredFE5: any[] = [];
  filteredFE6: any[] = [];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private httpService: UtilityHttpService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService.getAllEmployees();

    let menu = this.httpService.rolemenuObj;
    if (menu !== undefined) {
      this.shiftName = menu?.currshiftmaster?.shiftname || '';
      this.emprole = menu?.role;
    } else {
      this.httpService.rolemenuObj$.subscribe({
        next: (result: any) => {
          if (result) {
            this.emprole = result.role;
            this.shiftName = result.shiftname || '';
          }
        }
      });
    }

    this.checkShiftManning();
  }

  checkShiftManning() {
    const formattedDate = moment(this.shiftDate).format('YYYY-MM-DD');
    // this.httpService.getShiftReadings(formattedDate, this.shiftName).subscribe((data) => {
    //   this.editMode = data && data.length > 0;
    //   console.log('Edit mode status:', this.editMode);
    // });
  }

  submitManning() {
    const payload = {
      shiftdate: moment(this.shiftDate).format('YYYY-MM-DD'),
      shiftname: this.shiftName,
      readings: {
        // Example readings, replace or add actual fields
        gen_active_power: '100',
        gen_voltage: '11'
      },
      createdby: this.httpService.createdby
    };

    this.httpService.editShiftReadings(payload).subscribe((response) => {
      console.log('Response:', response);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.editMode ? 'Data updated successfully' : 'Data submitted successfully'
      });
    });
  }

  // Filtering for autocomplete
  filtershiftincharge(event: AutoCompleteCompleteEvent) {
    this.filteredshiftincharge = this.sharedService.getFilteredEmployees(event.query);
  }
  filterCREngg1(event: AutoCompleteCompleteEvent) {
    this.filteredCREngg1 = this.sharedService.getFilteredEmployees(event.query);
  }
  filterCREngg2(event: AutoCompleteCompleteEvent) {
    this.filteredCREngg2 = this.sharedService.getFilteredEmployees(event.query);
  }
  filterCREngg3(event: AutoCompleteCompleteEvent) {
    this.filteredCREngg3 = this.sharedService.getFilteredEmployees(event.query);
  }
  filterFE1(event: AutoCompleteCompleteEvent) {
    this.filteredFE1 = this.sharedService.getFilteredEmployees(event.query);
  }
  filterFE2(event: AutoCompleteCompleteEvent) {
    this.filteredFE2 = this.sharedService.getFilteredEmployees(event.query);
  }
  filterFE3(event: AutoCompleteCompleteEvent) {
    this.filteredFE3 = this.sharedService.getFilteredEmployees(event.query);
  }
  filterFE4(event: AutoCompleteCompleteEvent) {
    this.filteredFE4 = this.sharedService.getFilteredEmployees(event.query);
  }
  filterFE5(event: AutoCompleteCompleteEvent) {
    this.filteredFE5 = this.sharedService.getFilteredEmployees(event.query);
  }
  filterFE6(event: AutoCompleteCompleteEvent) {
    this.filteredFE6 = this.sharedService.getFilteredEmployees(event.query);
  }
}
