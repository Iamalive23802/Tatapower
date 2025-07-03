import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-lstsiunit2',
  templateUrl: './lstsiunit2.component.html',
  styleUrls: ['./lstsiunit2.component.css'],
  providers: [MessageService]
})
export class Lstsiunit2Component implements OnInit, OnChanges {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  tsiunit2Obj: any = {
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
  
  lstsiunit2Arr: any[] = [
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

  constructor(private messageService: MessageService, private httpService: UtilityHttpService) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.shiftDate && this.shiftName) {
        this.tsiunit2Obj.shiftdate = this.shiftDate;
        this.tsiunit2Obj.shiftname = this.shiftName;
        this.tryFetchData();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shiftDate']?.currentValue) {
      this.tsiunit2Obj.shiftdate = this.shiftDate;
    }
    if (changes['shiftName']?.currentValue) {
      this.tsiunit2Obj.shiftname = this.shiftName;
    }
    this.tryFetchData();
  }

  tryFetchData() {
    if (this.tsiunit2Obj.shiftdate && this.tsiunit2Obj.shiftname) {
      this.fetchData();
    }
  }

  fetchData() {
    const payload = {
      shiftdate: moment(this.tsiunit2Obj.shiftdate).format('YYYY-MM-DD'),
      shiftname: this.tsiunit2Obj.shiftname
    };

    this.httpService.post('gettsiunit2', payload).subscribe({
      next: (res: any) => {
        if (res?.success && res.data) {
          this.messageService.add({ severity: 'info', summary: 'Fetched', detail: 'Previous data loaded.' });
          Object.keys(this.tsiunit2Obj).forEach(k => {
            if (res.data[k] !== undefined) this.tsiunit2Obj[k] = res.data[k];
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No Data', detail: 'No record for this shift.' });
        }
      },
      error: err => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch.' });
      }
    });
  }

  insertfunc() {
    this.tsiunit2Obj.shiftdatestr = moment(this.tsiunit2Obj.shiftdate).format('YYYY-MM-DD');

    this.httpService.post('inserttsiunit2', this.tsiunit2Obj).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'TSI Unit 2 data saved.' });
          this.fetchData();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Insert Failed', detail: res.message });
        }
      }
    });
  }
}
