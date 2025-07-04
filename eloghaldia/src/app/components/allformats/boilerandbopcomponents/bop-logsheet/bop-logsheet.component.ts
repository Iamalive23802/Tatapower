import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-bop-logsheet',
  templateUrl: './bop-logsheet.component.html',
  styleUrls: ['./bop-logsheet.component.css'],
  providers: [MessageService]
})
export class BopLogsheetComponent implements OnInit, OnChanges {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  bopObj: any = {
    shiftdate: new Date(),
    shiftdatestr: '',
    shiftname: ''
  };

  bfpUnit1and2Arr: any[] = [];
  valvePosArr: any[] = [];
  acwArr: any[] = [];
  cwpArr: any[] = [];
  ctfansArr: any[] = [];
  conductivityArr: any[] = [];
  roomTempsArr: any[] = [];
  serviceWaterPumpLevels: any[] = [];
  serviceWaterPumpStatus: any = { swp1: '', swp2: '' };

  pumpStatusOptions = [
    { label: 'Running', value: 'Running' },
    { label: 'Stand By', value: 'Stand By' },
    { label: 'Auto', value: 'Auto' },
    { label: 'Not Available', value: 'Not Available' }
  ];

  statusOptions = [
    { label: 'AVAILABLE & MANUAL', value: 'AVAILABLE & MANUAL' },
    { label: 'AVAILABLE & AUTO', value: 'AVAILABLE & AUTO' },
    { label: 'NOT AVAILABLE', value: 'NOT AVAILABLE' }
  ];

  constructor(
    private messageService: MessageService,
    private httpService: UtilityHttpService
  ) {}

  ngOnInit(): void {
    this.initializeArrays();
    setTimeout(() => {
      if (this.shiftDate && this.shiftName) {
        this.bopObj.shiftdate = this.shiftDate;
        this.bopObj.shiftname = this.shiftName;
        this.tryFetchData();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shiftDate']?.currentValue) this.bopObj.shiftdate = this.shiftDate;
    if (changes['shiftName']?.currentValue) this.bopObj.shiftname = this.shiftName;
    if (this.bopObj.shiftdate && this.bopObj.shiftname) this.tryFetchData();
  }

  tryFetchData(): void {
    if (this.bopObj.shiftdate && this.bopObj.shiftname) this.fetchData();
  }

  fetchData(): void {
    const payload = {
      shiftdate: moment(this.bopObj.shiftdate).format('YYYY-MM-DD'),
      shiftname: this.bopObj.shiftname
    };

    this.httpService.post('getboplogsheet', payload).subscribe({
      next: (res: any) => {
        if (res?.success && res.data) {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Fetched last saved data.' });
          Object.keys(this.bopObj).forEach(key => {
            if (res.data.hasOwnProperty(key)) this.bopObj[key] = res.data[key];
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No Data', detail: 'No previous record found for this shift.' });
        }
      },
      error: (err: any) => {
        console.error('Fetch error:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data.' });
      }
    });
  }

  insertFunc(): void {
    this.bopObj.shiftdatestr = moment(this.bopObj.shiftdate).format('YYYY-MM-DD');
    this.httpService.post('insertboplogsheet', this.bopObj).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully.' });
          this.fetchData();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Data could not be saved.' });
        }
      },
      error: (err: any) => {
        console.error('Insert error:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Insertion failed.' });
      }
    });
  }

  initializeArrays(): void {
    this.bfpUnit1and2Arr = [
      { parameter: 'BFP CURRENT', unit: 'AMPS', bfp1a: '', bfp1b: '', bfp1c: '', bfp2a: '', bfp2b: '', bfp2c: '', bfp3a: '', bfp3b: '', bfp3c: '' },
      { parameter: 'BFP SUCTION PR.', unit: 'KG/CM2', bfp1a: '', bfp1b: '', bfp1c: '', bfp2a: '', bfp2b: '', bfp2c: '', bfp3a: '', bfp3b: '', bfp3c: '' },
      { parameter: 'BFP SUCTION TEMP.', unit: 'DegC', bfp1a: '', bfp1b: '', bfp1c: '', bfp2a: '', bfp2b: '', bfp2c: '', bfp3a: '', bfp3b: '', bfp3c: '' },
      { parameter: 'BFP DISCHARGE PR.', unit: 'KG/CM2', bfp1a: '', bfp1b: '', bfp1c: '', bfp2a: '', bfp2b: '', bfp2c: '', bfp3a: '', bfp3b: '', bfp3c: '' },
      { parameter: 'BFP DISCHARGE TEMP.', unit: 'DegC', bfp1a: '', bfp1b: '', bfp1c: '', bfp2a: '', bfp2b: '', bfp2c: '', bfp3a: '', bfp3b: '', bfp3c: '' },
      { parameter: 'BFP MOTOR BRG. TEMP. (DE)', unit: 'DegC', bfp1a: '', bfp1b: '', bfp1c: '', bfp2a: '', bfp2b: '', bfp2c: '', bfp3a: '', bfp3b: '', bfp3c: '' },
      { parameter: 'BFP MOTOR BRG. TEMP. (NDE)', unit: 'DegC', bfp1a: '', bfp1b: '', bfp1c: '', bfp2a: '', bfp2b: '', bfp2c: '', bfp3a: '', bfp3b: '', bfp3c: '' },
      { parameter: 'BFP MOTOR MAX WINDING TEMP.', unit: 'DegC', bfp1a: '', bfp1b: '', bfp1c: '', bfp2a: '', bfp2b: '', bfp2c: '', bfp3a: '', bfp3b: '', bfp3c: '' }
    ];


    this.acwArr = [
      { parameter: 'ACW CURRENT', unit: 'AMPS', acw1a: '', acw1b: '', acw2a: '', acw2b: '', acw3a: '', acw3b: '' },
      { parameter: 'ACW DISCHARGE PR.', unit: 'KG/CM2', acw1a: '', acw1b: '', acw2a: '', acw2b: '', acw3a: '', acw3b: '' },
      { parameter: 'ACW DISCH WATER HDR TEMP AFTER PHE', unit: 'DegC', acw1a: '', acw1b: '', acw2a: '', acw2b: '', acw3a: '', acw3b: '' },
      { parameter: 'BOOSTER P/P DISCH WATER HDR TEMP AFTER PHE', unit: 'DegC', acw1a: '', acw1b: '', acw2a: '', acw2b: '', acw3a: '', acw3b: '' }
    ];

    this.cwpArr = [
      { parameter: 'CWP CURRENT', unit: 'AMPS', cwpa: '', cwpb: '', cwpc: '', cwpd: '' },
      { parameter: 'CW DISCHARGE PR.', unit: 'KG/CM2', cwpa: '', cwpb: '', cwpc: '', cwpd: '' },
      { parameter: 'CW THRUST BRG. TEMP.', unit: 'DegC', cwpa: '', cwpb: '', cwpc: '', cwpd: '' },
      { parameter: 'CW MOTOR BRG. TEMP. (DE)', unit: 'DegC', cwpa: '', cwpb: '', cwpc: '', cwpd: '' },
      { parameter: 'CW MOTOR BRG. TEMP. (NDE)', unit: 'DegC', cwpa: '', cwpb: '', cwpc: '', cwpd: '' },
      { parameter: 'CW MOTOR MAX WINDING TEMP.', unit: 'DegC', cwpa: '', cwpb: '', cwpc: '', cwpd: '' }
    ];

    this.ctfansArr = [
      { name: 'CT FAN-1', status: '', current: '', unit: 'UNIT-1', lhs: '', rhs: '' },
      { name: 'CT FAN-2', status: '', current: '', unit: 'UNIT-1', lhs: '', rhs: '' },
      { name: 'CT FAN-3', status: '', current: '', unit: 'UNIT-1', lhs: '', rhs: '' },
      { name: 'CT FAN-4', status: '', current: '', unit: 'UNIT-2', lhs: '', rhs: '' },
      { name: 'CT FAN-5', status: '', current: '', unit: 'UNIT-2', lhs: '', rhs: '' },
      { name: 'CT FAN-6', status: '', current: '', unit: 'UNIT-2', lhs: '', rhs: '' },
      { name: 'CT FAN-7', status: '', current: '', unit: 'UNIT-3', lhs: '', rhs: '' },
      { name: 'CT FAN-8', status: '', current: '', unit: 'UNIT-3', lhs: '', rhs: '' }
    ];

    this.valvePosArr = [
      { unit: 'UNIT-1', lhs: '', rhs: '' },
      { unit: 'UNIT-2', lhs: '', rhs: '' },
      { unit: 'UNIT-3', lhs: '', rhs: '' }
    ];

    this.conductivityArr = [
      { parameter: 'Conductivity (Max 5.0 micron)', unit1: '', unit2: '', unit3: '', limit: '5.0' },
      { parameter: 'Cation Conductivity (Max 0.5 micron)', unit1: '', unit2: '', unit3: '', limit: '0.5' }
    ];

    this.roomTempsArr = [
      { name: 'CONTROL ROOM TEMP.', shiftstart: '', shiftend: '' },
      { name: 'BMCC 1 ROOM TEMP.', shiftstart: '', shiftend: '' },
      { name: 'BMCC 2 ROOM TEMP.', shiftstart: '', shiftend: '' },
      { name: 'FW TANK 1 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'FW TANK 2 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'SDM-1 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'SDM-2 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'SDM-3 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'SDM-4 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'RESERVOIR 1 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'RESERVOIR 2 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'SUMP/PIT LEVEL', shiftstart: '', shiftend: '' }
    ];

    this.serviceWaterPumpLevels = [
      { name: 'SDM-1 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'SDM-2 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'SDM-3 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'SDM-4 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'RESERVIOUR 1 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'RESERVIOUR 2 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'SUMP/PIT LEVEL', shiftstart: '', shiftend: '' },
      { name: 'FW TANK 1 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'FW TANK 2 LEVEL', shiftstart: '', shiftend: '' },
      { name: 'CONTROL ROOM TEMP.', shiftstart: '', shiftend: '' },
      { name: 'BMCC 1 ROOM TEMP.', shiftstart: '', shiftend: '' },
      { name: 'BMCC 2 ROOM TEMP.', shiftstart: '', shiftend: '' }
    ];
  }
}
