import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { UtilityHttpService } from 'src/app/services/utility-http.service';
import { UtilityEndpointsService } from 'src/app/services/utility-endpoints.service';

@Component({
  selector: 'app-boiler-damper-status',
  templateUrl: './boiler-damper-status.component.html',
  styleUrls: ['./boiler-damper-status.component.css'],
  providers: [MessageService]
})
export class BoilerDamperStatusComponent implements OnInit, OnChanges {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  boilerList = [
    { key: 'b1_1', label: 'Boiler 1-1' },
    { key: 'b1_2', label: 'Boiler 1-2' },
    { key: 'b1_3', label: 'Boiler 1-3' },
    { key: 'b1_4', label: 'Boiler 1-4' },
    { key: 'b2_1', label: 'Boiler 2-1' },
    { key: 'b2_2', label: 'Boiler 2-2' },
    { key: 'b2_3', label: 'Boiler 2-3' },
    { key: 'b2_4', label: 'Boiler 2-4' },
    { key: 'b3_1', label: 'Boiler 3-1' },
    { key: 'b3_2', label: 'Boiler 3-2' },
    { key: 'b3_3', label: 'Boiler 3-3' },
    { key: 'b3_4', label: 'Boiler 3-4' },
    { key: 'b4_1', label: 'Boiler 4-1' },
    { key: 'b4_2', label: 'Boiler 4-2' },
    { key: 'b4_3', label: 'Boiler 4-3' },
    { key: 'b4_4', label: 'Boiler 4-4' }
  ];

  damperTypes = [
    { key: 'inlet', label: 'Inlet Damper' },
    { key: 'outlet', label: 'Outlet Damper' },
    { key: 'recirc', label: 'Recirculation Damper' }
  ];

  damperPercentOptions = [
  { label: '0%', value: '0' },
  { label: '10%', value: '10' },
  { label: '50%', value: '50' },
  { label: '100%', value: '100' }
];

  boilerDamperObj: any = {
    shiftdate: null,
    shiftdatestr: '',
    shiftname: ''
  };

  constructor(
    private httpService: UtilityHttpService,
    private messageService: MessageService,
    private endpoint: UtilityEndpointsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.shiftDate && this.shiftName) {
        this.boilerDamperObj.shiftdate = this.shiftDate;
        this.boilerDamperObj.shiftname = this.shiftName;
        this.tryFetchData();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shiftDate']?.currentValue) {
      this.boilerDamperObj.shiftdate = this.shiftDate;
    }
    if (changes['shiftName']?.currentValue) {
      this.boilerDamperObj.shiftname = this.shiftName;
    }

    if (this.boilerDamperObj.shiftdate && this.boilerDamperObj.shiftname) {
      this.resetForm();
      this.tryFetchData();
    }
  }

  tryFetchData() {
    if (this.boilerDamperObj.shiftdate && this.boilerDamperObj.shiftname) {
      this.fetchData();
    }
  }

  fetchData() {
    const payload = {
      shiftdate: moment(this.boilerDamperObj.shiftdate).format('YYYY-MM-DD'),
      shiftname: this.boilerDamperObj.shiftname
    };

    this.httpService.post('getboilerdamperstatus', payload).subscribe({
      next: (res: any) => {
        if (res?.success && res.data) {
          Object.keys(res.data).forEach(key => {
            this.boilerDamperObj[key] = res.data[key];
          });
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Fetched previous data successfully.' });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No Data', detail: 'No existing record found for this shift.' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching damper data.' });
      }
    });
  }

  insertDamperData() {
    this.boilerDamperObj.shiftdatestr = moment(this.boilerDamperObj.shiftdate).format('YYYY-MM-DD');

    this.httpService.post('insertboilerdamperstatus', this.boilerDamperObj).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully.' });
          this.fetchData();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Insert failed.' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error inserting data.' });
      }
    });
  }

  resetForm() {
    this.boilerDamperObj = {
      shiftdate: this.shiftDate,
      shiftdatestr: '',
      shiftname: this.shiftName
    };
    this.boilerList.forEach(boiler => {
      this.damperTypes.forEach(damper => {
        this.boilerDamperObj[`${boiler.key}_${damper.key}_start`] = '';
        this.boilerDamperObj[`${boiler.key}_${damper.key}_end`] = '';
      });
    });
  }
}
