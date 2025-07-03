import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-boiler-logsheet',
  templateUrl: './boiler-logsheet.component.html',
  styleUrls: ['./boiler-logsheet.component.css'],
  providers: [MessageService]
})
export class BoilerLogsheetComponent implements OnInit, OnChanges {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  boilerBopObj: any = {
    shiftdate: new Date(),
    shiftdatestr: '',
    shiftname: ''
  };

  boilerBopArr: any[] = [];
  boilers: string[] = [
    'B1-1', 'B1-2', 'B1-3', 'B1-4',
'B2-1', 'B2-2', 'B2-3', 'B2-4',
'B3-1', 'B3-2', 'B3-3', 'B3-4',
'B4-1', 'B4-2', 'B4-3', 'B4-4'
  ];

  constructor(
    private messageService: MessageService,
    private httpService: UtilityHttpService
  ) {}

  ngOnInit(): void {
    this.initializeBoilerBopArr();
    this.initializeBoilerBopObj();

    setTimeout(() => {
      if (this.shiftDate && this.shiftName) {
        this.boilerBopObj.shiftdate = this.shiftDate;
        this.boilerBopObj.shiftname = this.shiftName;
        this.tryFetchData();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shiftDate'] && changes['shiftDate'].currentValue) {
      this.boilerBopObj.shiftdate = this.shiftDate;
    }
    if (changes['shiftName'] && changes['shiftName'].currentValue) {
      this.boilerBopObj.shiftname = this.shiftName;
    }

    if (this.boilerBopObj.shiftdate && this.boilerBopObj.shiftname) {
      this.tryFetchData();
    }
  }

  tryFetchData(): void {
    if (this.boilerBopObj.shiftdate && this.boilerBopObj.shiftname) {
      this.fetchdata();
    }
  }

  fetchdata(): void {
    const payload = {
      shiftdate: moment(this.boilerBopObj.shiftdate).format('YYYY-MM-DD'),
      shiftname: this.boilerBopObj.shiftname
    };

    this.httpService.post('getboilerandbop', payload).subscribe({
      next: (res: any) => {
        if (res?.success && res.data) {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Fetched last saved data.' });
          Object.keys(this.boilerBopObj).forEach(key => {
            if (res.data.hasOwnProperty(key)) {
              this.boilerBopObj[key] = res.data[key];
            }
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

  insertfunc(): void {
    this.boilerBopObj.shiftdatestr = moment(this.boilerBopObj.shiftdate).format('YYYY-MM-DD');

    this.httpService.post('insertboilerandbop', this.boilerBopObj).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Boiler & BOP data saved successfully.' });
          this.fetchdata();
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

  initializeBoilerBopArr(): void {
    const parameters = [
      { name: 'MAIN STEAM PRESSURE', unit: 'KG/CM2', max: 96, min: 'NA', key: 'main_steam_pressure' },
      { name: 'MAIN STEAM FLOW', unit: 'TPH', max: 31.5, min: 21.5, key: 'main_steam_flow' },
      { name: 'MAIN STEAM TEMP.', unit: 'DegC', max: 545, min: 535, key: 'main_steam_temp' },
      { name: 'DRUM LEVEL', unit: 'mmWC', max: 100, min: -100, key: 'drum_level' },
      { name: 'DRUM PRESSURE', unit: 'KG/CM2', max: 101, min: 'NA', key: 'drum_pressure' },
      { name: 'ID FAN SPEED', unit: 'RPM', max: 980, min: 'NA', key: 'id_fan_speed' },
      { name: 'ID FAN CURRENT', unit: 'AMPS', max: 238, min: 'NA', key: 'id_fan_current' },
      { name: 'FLUE GAS I/L TEMP MAX', unit: 'DegC', max: 1000, min: 900, key: 'flue_gas_temp' },
      { name: 'FLUE GAS I/L PRESSURE (BLR)', unit: 'mmWC', max: -70, min: -30, key: 'flue_gas_pressure_blr' },
      { name: 'FLUE GAS I/L PRESSURE (ID FAN)', unit: 'mmWC', max: -201.5, min: 'NA', key: 'flue_gas_pressure_idfan' },
      { name: 'BOILER ECO O/L TEMP.', unit: 'DegC', max: 180, min: 'NA', key: 'eco_outlet_temp' },
      { name: 'ID FAN IGV POSITION', unit: '%', max: 100, min: 0, key: 'id_fan_igv_position' },
      { name: 'ID FAN DE BEARING TEMP', unit: 'DegC', max: 80, min: 45, key: 'id_fan_de_temp' },
      { name: 'ID FAN NDE BEARING TEMP', unit: 'DegC', max: 80, min: 45, key: 'id_fan_nde_temp' },
      { name: 'ID MOTOR DE BEARING TEMP', unit: 'DegC', max: 80, min: 45, key: 'id_motor_de_temp' },
      { name: 'ID MOTOR NDE BEARING TEMP', unit: 'DegC', max: 80, min: 45, key: 'id_motor_nde_temp' },
      { name: 'ID MOTOR MAX WINDING TEMP', unit: 'DegC', max: 80, min: 45, key: 'id_motor_winding_temp' },
      { name: 'VFD DRIVE TEMP', unit: 'DegC', max: 70, min: 'NA', key: 'vfd_drive_temp' }
    ];

    this.boilerBopArr = parameters.map(param => {
      const row: any = {
        parameter: param.name,
        unit: param.unit,
        max: param.max,
        min: param.min
      };
      this.boilers.forEach(boiler => {
        row[boiler + '_r1'] = `${param.key}_${boiler}_r1`;
        row[boiler + '_r2'] = `${param.key}_${boiler}_r2`;
        row[boiler + '_r3'] = `${param.key}_${boiler}_r3`;
      });
      return row;
    });
  }

  initializeBoilerBopObj(): void {
    this.boilerBopArr.forEach(row => {
      this.boilers.forEach(boiler => {
        this.boilerBopObj[row[boiler + '_r1']] = '';
        this.boilerBopObj[row[boiler + '_r2']] = '';
        this.boilerBopObj[row[boiler + '_r3']] = '';
      });
    });
  }
}