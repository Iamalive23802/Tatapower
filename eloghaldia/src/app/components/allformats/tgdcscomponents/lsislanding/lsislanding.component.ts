import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UtilityHttpService } from 'src/app/services/utility-http.service';
import * as moment from 'moment';

@Component({
  selector: 'app-lsislanding',
  templateUrl: './lsislanding.component.html',
  providers: [MessageService]
})
export class LsislandingComponent implements OnInit, OnChanges {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  editflag = false;

  statusOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  islandingObj: any = {
    shiftdate: new Date(),
    shiftdatestr: '',
    shiftname: ''
  };

  islandingArr = [
    { parameter: 'Checklist in islanding panel', isHeading: true },

    { parameter: 'DC-1 Healthy light glow', key: 'dc1_light', status: '' },
    { parameter: 'DC-2 Healthy light glow', key: 'dc2_light', status: '' },
    { parameter: 'DC source selection switch is in independent position', key: 'dc_source_switch', status: '' },
    { parameter: 'PT selection switch is in independent position', key: 'pt_switch', status: '' },
    { parameter: 'Islanding main-1 relay IN/OUT switch is in IN position', key: 'relay_main1', status: '' },
    { parameter: 'Islanding main-2 relay IN/OUT switch is in IN position', key: 'relay_main2', status: '' },
    { parameter: 'Both main 1 & 2 microm relay healthy LED glow', key: 'microm_relay', status: '' },
    { parameter: 'Main-1 lockout relay TSR(95A1) LED glow', key: 'main1_relay_95a1', status: '' },
    { parameter: 'Main-1 lockout relay TSR(95B1) LED glow', key: 'main1_relay_95b1', status: '' },
    { parameter: 'Main-1 lockout relay TSR(95C1) LED glow', key: 'main1_relay_95c1', status: '' },
    { parameter: 'Main-2 lockout relay TSR(95A1) LED glow', key: 'main2_relay_95a1', status: '' },
    { parameter: 'Main-2 lockout relay TSR(95B1) LED glow', key: 'main2_relay_95b1', status: '' },
    { parameter: 'Main-2 lockout relay TSR(95C1) LED glow', key: 'main2_relay_95c1', status: '' },

    { parameter: 'Checklist in DCS', isHeading: true },

    { parameter: 'Islanding selector ON in unit-1 DCS', key: 'selector_unit1', status: '' },
    { parameter: 'Islanding selector ON in unit-2 DCS', key: 'selector_unit2', status: '' },
    { parameter: 'Islanding selector ON feedback in unit DCS available', key: 'selector_feedback', status: '' },
    { parameter: 'Unit 1 speed control button is in off condition', key: 'speed_ctrl_off', status: '' },
    { parameter: 'Boiler selected for islanding trip', key: 'boiler_selected', status: '', isNumeric: true }
  ];

  constructor(
    private messageService: MessageService,
    private httpService: UtilityHttpService
  ) {}

  ngOnInit(): void {
    if (this.shiftDate && this.shiftName) {
      this.islandingObj.shiftdate = this.shiftDate;
      this.islandingObj.shiftname = this.shiftName;
      this.fetchData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shiftDate']?.currentValue) {
      this.islandingObj.shiftdate = this.shiftDate;
    }
    if (changes['shiftName']?.currentValue) {
      this.islandingObj.shiftname = this.shiftName;
    }
    if (this.islandingObj.shiftdate && this.islandingObj.shiftname) {
      this.fetchData();
    }
  }

  fetchData(): void {
    const payload = {
      shiftdate: moment(this.islandingObj.shiftdate).format('YYYY-MM-DD'),
      shiftname: this.islandingObj.shiftname
    };

    this.httpService.post('getlsislanding', payload).subscribe({
      next: (res: any) => {
        if (res?.success && res.data) {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Fetched saved data.' });
          this.islandingObj = res.data;

          this.islandingArr.forEach(item => {
            if (item.key) {
              item.status = this.islandingObj[item.key] || '';
            }
          });

          this.editflag = true;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No Data', detail: 'No previous record found.' });
          this.editflag = false;
        }
      },
      error: (err) => {
        console.error('Fetch Error:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data.' });
      }
    });
  }

  saveData(): void {
    this.islandingObj.shiftdatestr = moment(this.islandingObj.shiftdate).format('YYYY-MM-DD');

    this.islandingArr.forEach(item => {
      if (item.key) {
        this.islandingObj[item.key] = item.status || null;
      }
    });

    this.httpService.post('insertlsislanding', this.islandingObj).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Islanding log saved successfully.' });
          this.fetchData();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Insert Failed', detail: 'Unable to save islanding log.' });
        }
      },
      error: (err) => {
        console.error('Insert Error:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Insert request failed.' });
      }
    });
  }
}
