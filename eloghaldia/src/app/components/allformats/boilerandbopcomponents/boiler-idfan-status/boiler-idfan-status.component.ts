import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-boiler-idfan-status',
  templateUrl: './boiler-idfan-status.component.html',
  providers: [MessageService]
})
export class BoilerIdfanStatusComponent implements OnInit, OnChanges {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  idfanStatusArr: any[] = [];

  statusOptions = [
    { label: 'IN SERVICE & MANUAL', value: 'IN SERVICE & MANUAL' },
    { label: 'AVAILABLE', value: 'AVAILABLE' },
    { label: 'OUT OF SERVICE', value: 'OUT OF SERVICE' },
    { label: 'MAINTENANCE', value: 'MAINTENANCE' }
  ];

  constructor(
    private httpService: UtilityHttpService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeArray();
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

  initializeArray(): void {
    this.idfanStatusArr = [];
    for (let row = 1; row <= 4; row++) {
      for (let col = 1; col <= 4; col++) {
        this.idfanStatusArr.push({
          label: `ID FAN-${col}/${row}`,
          key: `idfan_${col}_${row}`,
          status: ''
        });
      }
    }
  }

  fetchData(): void {
    const payload = {
      shiftdate: moment(this.shiftDate).format('YYYY-MM-DD'),
      shiftname: this.shiftName
    };

    this.httpService.post('getboileridfanstatus', payload).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          const row = res.data;
          this.idfanStatusArr.forEach(item => {
            if (row[item.key]) {
              item.status = row[item.key];
            }
          });
          this.messageService.add({ severity: 'info', summary: 'Loaded', detail: 'Data loaded.' });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No Data', detail: 'No existing record found.' });
        }
      },
      error: err => {
        console.error('Fetch error:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data.' });
      }
    });
  }

  saveData(): void {
    const dataToSend: any = {
      shiftdate: moment(this.shiftDate).format('YYYY-MM-DD'),
      shiftname: this.shiftName,
      updatedby: 'system' // Replace with actual user if needed
    };

    this.idfanStatusArr.forEach(item => {
      dataToSend[item.key] = item.status;
    });

    this.httpService.post('insertboileridfanstatus', dataToSend).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Data saved successfully.' });
          this.fetchData();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Insert failed.' });
        }
      },
      error: err => {
        console.error('Insert error:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to insert data.' });
      }
    });
  }
}
