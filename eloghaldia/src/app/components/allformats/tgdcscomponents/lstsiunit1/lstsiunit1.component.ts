import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-lstsiunit1',
  templateUrl: './lstsiunit1.component.html',
  styleUrls: ['./lstsiunit1.component.css'],
  providers: [MessageService]
})
export class Lstsiunit1Component implements OnInit, OnChanges {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  tsiunit1Obj: any = {
    shiftdate: new Date(),
    shiftdatestr: '',
    shiftname: '',

    thrust_nonactive_top_1: "", thrust_nonactive_top_2: "", thrust_nonactive_top_3: "",
    thrust_nonactive_bottom_1: "", thrust_nonactive_bottom_2: "", thrust_nonactive_bottom_3: "",
    thrust_active_top_1: "", thrust_active_top_2: "", thrust_active_top_3: "",
    thrust_active_bottom_1: "", thrust_active_bottom_2: "", thrust_active_bottom_3: "",

    turb_front_vib_top_1: "", turb_front_vib_top_2: "", turb_front_vib_top_3: "",
    turb_front_vib_bottom_1: "", turb_front_vib_bottom_2: "", turb_front_vib_bottom_3: "",
    turb_front_temp_top_1: "", turb_front_temp_top_2: "", turb_front_temp_top_3: "",
    turb_front_temp_bottom_1: "", turb_front_temp_bottom_2: "", turb_front_temp_bottom_3: "",

    turb_rear_temp_top_1: "", turb_rear_temp_top_2: "", turb_rear_temp_top_3: "",
    turb_rear_temp_bottom_1: "", turb_rear_temp_bottom_2: "", turb_rear_temp_bottom_3: "",
    turb_rear_vib_top_1: "", turb_rear_vib_top_2: "", turb_rear_vib_top_3: "",
    turb_rear_vib_bottom_1: "", turb_rear_vib_bottom_2: "", turb_rear_vib_bottom_3: "",

    gen_front_vib_top_1: "", gen_front_vib_top_2: "", gen_front_vib_top_3: "",
    gen_front_vib_bottom_1: "", gen_front_vib_bottom_2: "", gen_front_vib_bottom_3: "",
    gen_front_temp_top_1: "", gen_front_temp_top_2: "", gen_front_temp_top_3: "",
    gen_front_temp_bottom_1: "", gen_front_temp_bottom_2: "", gen_front_temp_bottom_3: "",

    gen_rear_vib_top_1: "", gen_rear_vib_top_2: "", gen_rear_vib_top_3: "",
    gen_rear_vib_bottom_1: "", gen_rear_vib_bottom_2: "", gen_rear_vib_bottom_3: "",
    gen_rear_temp_top_1: "", gen_rear_temp_top_2: "", gen_rear_temp_top_3: "",
    gen_rear_temp_bottom_1: "", gen_rear_temp_bottom_2: "", gen_rear_temp_bottom_3: ""
  };

  lstsiunit1Arr: any[] = [
    { parameter: 'THRUST BEARING METAL TEMP(NON ACTIVE)-TOP', unit: 'DegC', reading1: 'thrust_nonactive_top_1', reading2: 'thrust_nonactive_top_2', reading3: 'thrust_nonactive_top_3' },
    { parameter: 'THRUST BEARING METAL TEMP(NON ACTIVE)-BOTTOM', unit: 'DegC', reading1: 'thrust_nonactive_bottom_1', reading2: 'thrust_nonactive_bottom_2', reading3: 'thrust_nonactive_bottom_3' },
    { parameter: 'THRUST BEARING METAL TEMP(ACTIVE)-TOP', unit: 'DegC', reading1: 'thrust_active_top_1', reading2: 'thrust_active_top_2', reading3: 'thrust_active_top_3' },
    { parameter: 'THRUST BEARING METAL TEMP(ACTIVE)-BOTTOM', unit: 'DegC', reading1: 'thrust_active_bottom_1', reading2: 'thrust_active_bottom_2', reading3: 'thrust_active_bottom_3' },
    { parameter: 'TURBINE FRONT SHAFT VIBRATION-TOP', unit: 'MICRON', reading1: 'turb_front_vib_top_1', reading2: 'turb_front_vib_top_2', reading3: 'turb_front_vib_top_3' },
    { parameter: 'TURBINE FRONT SHAFT VIBRATION-BOTTOM', unit: 'MICRON', reading1: 'turb_front_vib_bottom_1', reading2: 'turb_front_vib_bottom_2', reading3: 'turb_front_vib_bottom_3' },
    { parameter: 'TURBINE FRONT BEARING METAL TEMP -TOP', unit: 'DegC', reading1: 'turb_front_temp_top_1', reading2: 'turb_front_temp_top_2', reading3: 'turb_front_temp_top_3' },
    { parameter: 'TURBINE FRONT SHAFT BEARING METAL TEMP-BOTTOM', unit: 'DegC', reading1: 'turb_front_temp_bottom_1', reading2: 'turb_front_temp_bottom_2', reading3: 'turb_front_temp_bottom_3' },
    { parameter: 'TURBINE REAR BEARING METAL TEMP -TOP', unit: 'DegC', reading1: 'turb_rear_temp_top_1', reading2: 'turb_rear_temp_top_2', reading3: 'turb_rear_temp_top_3' },
    { parameter: 'TURBINE REAR SHAFT BEARING METAL TEMP-BOTTOM', unit: 'DegC', reading1: 'turb_rear_temp_bottom_1', reading2: 'turb_rear_temp_bottom_2', reading3: 'turb_rear_temp_bottom_3' },
    { parameter: 'TURBINE REAR SHAFT VIBRATION-TOP', unit: 'MICRON', reading1: 'turb_rear_vib_top_1', reading2: 'turb_rear_vib_top_2', reading3: 'turb_rear_vib_top_3' },
    { parameter: 'TURBINE REAR SHAFT VIBRATION-BOTTOM', unit: 'MICRON', reading1: 'turb_rear_vib_bottom_1', reading2: 'turb_rear_vib_bottom_2', reading3: 'turb_rear_vib_bottom_3' },
    { parameter: 'GENERATOR FRONT SHAFT VIBRATION-TOP', unit: 'MICRON', reading1: 'gen_front_vib_top_1', reading2: 'gen_front_vib_top_2', reading3: 'gen_front_vib_top_3' },
    { parameter: 'GENERATOR FRONT SHAFT VIBRATION-BOTTOM', unit: 'MICRON', reading1: 'gen_front_vib_bottom_1', reading2: 'gen_front_vib_bottom_2', reading3: 'gen_front_vib_bottom_3' },
    { parameter: 'GENERATOR FRONT BEARING METAL TEMP-TOP', unit: 'DegC', reading1: 'gen_front_temp_top_1', reading2: 'gen_front_temp_top_2', reading3: 'gen_front_temp_top_3' },
    { parameter: 'GENERATOR FRONT BEARING METAL TEMP-BOTTOM', unit: 'DegC', reading1: 'gen_front_temp_bottom_1', reading2: 'gen_front_temp_bottom_2', reading3: 'gen_front_temp_bottom_3' },
    { parameter: 'GENERATOR REAR SHAFT VIBRATION-TOP', unit: 'MICRON', reading1: 'gen_rear_vib_top_1', reading2: 'gen_rear_vib_top_2', reading3: 'gen_rear_vib_top_3' },
    { parameter: 'GENERATOR REAR SHAFT VIBRATION-BOTTOM', unit: 'MICRON', reading1: 'gen_rear_vib_bottom_1', reading2: 'gen_rear_vib_bottom_2', reading3: 'gen_rear_vib_bottom_3' },
    { parameter: 'GENERATOR REAR BEARING METAL TEMP-TOP', unit: 'DegC', reading1: 'gen_rear_temp_top_1', reading2: 'gen_rear_temp_top_2', reading3: 'gen_rear_temp_top_3' },
    { parameter: 'GENERATOR REAR BEARING METAL TEMP-BOTTOM', unit: 'DegC', reading1: 'gen_rear_temp_bottom_1', reading2: 'gen_rear_temp_bottom_2', reading3: 'gen_rear_temp_bottom_3' }
  ];

  constructor(
    private messageService: MessageService,
    private httpService: UtilityHttpService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.shiftDate && this.shiftName) {
        this.tsiunit1Obj.shiftdate = this.shiftDate;
        this.tsiunit1Obj.shiftname = this.shiftName;
        this.tryFetchData();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shiftDate'] && changes['shiftDate'].currentValue) {
      this.tsiunit1Obj.shiftdate = this.shiftDate!;
    }
    if (changes['shiftName'] && changes['shiftName'].currentValue) {
      this.tsiunit1Obj.shiftname = this.shiftName!;
    }

    if (this.tsiunit1Obj.shiftdate && this.tsiunit1Obj.shiftname) {
      this.tryFetchData();
    }
  }

  tryFetchData() {
    if (this.tsiunit1Obj.shiftdate && this.tsiunit1Obj.shiftname) {
      this.fetchData();
    }
  }

  fetchData() {
    const payload = {
      shiftdate: moment(this.tsiunit1Obj.shiftdate).format('YYYY-MM-DD'),
      shiftname: this.tsiunit1Obj.shiftname
    };

    this.httpService.post('gettsiunit1', payload).subscribe({
      next: (res: any) => {
        if (res?.success && res.data) {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Fetched last saved data.' });
          Object.keys(this.tsiunit1Obj).forEach(key => {
            if (res.data.hasOwnProperty(key)) {
              this.tsiunit1Obj[key] = res.data[key];
            }
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No Data', detail: 'No previous record found for this shift.' });
        }
      },
      error: (err: any) => {
        console.error('Error during fetch:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data.' });
      }
    });
  }

  insertfunc() {
    this.tsiunit1Obj.shiftdatestr = moment(this.tsiunit1Obj.shiftdate).format('YYYY-MM-DD');

    this.httpService.post('inserttsiunit1', this.tsiunit1Obj).subscribe(data => {
      if (data.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'TSI Unit 1 saved successfully.' });
        this.fetchData();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Insert failed.' });
      }
    });
  }
}
