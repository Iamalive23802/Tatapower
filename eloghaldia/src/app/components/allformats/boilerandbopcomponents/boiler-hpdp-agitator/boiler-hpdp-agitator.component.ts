import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-boiler-hpdp-agitator',
  templateUrl: './boiler-hpdp-agitator.component.html',
  providers: [MessageService]
})
export class BoilerHpdpAgitatorComponent implements OnInit, OnChanges {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  hpdpStatusRows: any[] = [];

  statusOptions = [
    { label: 'Running', value: 'Running' },
    { label: 'Standby', value: 'Standby' },
    { label: 'Auto', value: 'Auto' },
    { label: 'Not available', value: 'Not available' }
  ];

  constructor(
    private messageService: MessageService,
    private httpService: UtilityHttpService
  ) {}

  ngOnInit(): void {
    this.initializeRows();
    setTimeout(() => {
      if (this.shiftDate && this.shiftName) {
        this.fetchData();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['shiftDate'] || changes['shiftName']) && this.shiftDate && this.shiftName) {
      this.fetchData();
    }
  }

  initializeRows() {
    this.hpdpStatusRows = Array(4).fill(null).map(() => ({
      boiler2_1_hpdp1: '',
      boiler2_1_hpdp2: '',
      boiler2_1_agitator: '',

      boiler3_1_hpdp1: '',
      boiler3_1_hpdp2: '',
      boiler3_1_agitator: '',

      boiler4_1_hpdp1: '',
      boiler4_1_hpdp2: '',
      boiler4_1_agitator: ''
    }));
  }

  fetchData() {
    const payload = {
      shiftdate: moment(this.shiftDate).format('YYYY-MM-DD'),
      shiftname: this.shiftName
    };

    this.httpService.post('getboilerhpdpagitator', payload).subscribe({
      next: (res: any) => {
        if (res.success && res.data?.length) {
          this.hpdpStatusRows = res.data;
          this.messageService.add({ severity: 'info', summary: 'Data Loaded', detail: 'Previous data fetched.' });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No Data', detail: 'No previous record found.' });
        }
      },
      error: err => {
        console.error('Error fetching boiler HPDP data:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data.' });
      }
    });
  }

  insertBoilerHpdpAgitator() {
    const payload = {
      shiftdate: moment(this.shiftDate).format('YYYY-MM-DD'),
      shiftname: this.shiftName,
      rows: this.hpdpStatusRows,
      updatedby: 'system' // Replace with actual user if available
    };

    this.httpService.post('insertboilerhpdpagitator', payload).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Data saved successfully.' });
          this.fetchData();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Insert failed.' });
        }
      },
      error: err => {
        console.error('Error inserting boiler HPDP data:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to insert data.' });
      }
    });
  }
}
