import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-lstsiunit3',
  templateUrl: './lstsiunit3.component.html',
  styleUrls: ['./lstsiunit3.component.css'],
  providers: [MessageService]
})
export class Lstsiunit3Component implements OnInit, OnChanges {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  tsiunit3Obj: any = {
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
  turb_front_temp_lhs_1: "", turb_front_temp_lhs_2: "", turb_front_temp_lhs_3: "",

  turb_rear_temp_lhs_1: "", turb_rear_temp_lhs_2: "", turb_rear_temp_lhs_3: "",
  turb_rear_temp_rhs_1: "", turb_rear_temp_rhs_2: "", turb_rear_temp_rhs_3: "",
  turb_rear_vib_top_1: "", turb_rear_vib_top_2: "", turb_rear_vib_top_3: "",
  turb_rear_vib_bottom_1: "", turb_rear_vib_bottom_2: "", turb_rear_vib_bottom_3: "",

  gen_front_vib_top_1: "", gen_front_vib_top_2: "", gen_front_vib_top_3: "",
  gen_front_vib_bottom_1: "", gen_front_vib_bottom_2: "", gen_front_vib_bottom_3: "",
  gen_front_temp_active_1: "", gen_front_temp_active_2: "", gen_front_temp_active_3: "",
  gen_front_temp_nonactive_1: "", gen_front_temp_nonactive_2: "", gen_front_temp_nonactive_3: "",
  gen_rear_vib_top_1: "", gen_rear_vib_top_2: "", gen_rear_vib_top_3: "",
  gen_rear_vib_bottom_1: "", gen_rear_vib_bottom_2: "", gen_rear_vib_bottom_3: "",
  gen_rear_temp_top_1: "", gen_rear_temp_top_2: "", gen_rear_temp_top_3: "",
  gen_rear_temp_bottom_1: "", gen_rear_temp_bottom_2: "", gen_rear_temp_bottom_3: "",

  gear_temp1_lss_1: "", gear_temp1_lss_2: "", gear_temp1_lss_3: "",
  gear_temp2_lss_1: "", gear_temp2_lss_2: "", gear_temp2_lss_3: "",
  gear_temp3_lss_1: "", gear_temp3_lss_2: "", gear_temp3_lss_3: "",

  gear_vib1_lss_1: "", gear_vib1_lss_2: "", gear_vib1_lss_3: "",
  gear_vib2_lss_1: "", gear_vib2_lss_2: "", gear_vib2_lss_3: "",

  gear_vib1_hss_1: "", gear_vib1_hss_2: "", gear_vib1_hss_3: "",
  gear_vib2_hss_1: "", gear_vib2_hss_2: "", gear_vib2_hss_3: "",

  gear_temp1_hss_1: "", gear_temp1_hss_2: "", gear_temp1_hss_3: "",
  gear_temp2_hss_1: "", gear_temp2_hss_2: "", gear_temp2_hss_3: "",
  gear_temp3_hss_1: "", gear_temp3_hss_2: "", gear_temp3_hss_3: ""
};
  
  lstsiunit3Arr: any[] = [
  { parameter: 'THRUST BEARING METAL TEMP(NON ACTIVE)-TOP', unit: 'DegC', reading1: 'thrust_nonactive_top_1', reading2: 'thrust_nonactive_top_2', reading3: 'thrust_nonactive_top_3' },
  { parameter: 'THRUST BEARING METAL TEMP(NON ACTIVE)-BOTTOM', unit: 'DegC', reading1: 'thrust_nonactive_bottom_1', reading2: 'thrust_nonactive_bottom_2', reading3: 'thrust_nonactive_bottom_3' },
  { parameter: 'THRUST BEARING METAL TEMP(ACTIVE)-TOP', unit: 'DegC', reading1: 'thrust_active_top_1', reading2: 'thrust_active_top_2', reading3: 'thrust_active_top_3' },
  { parameter: 'THRUST BEARING METAL TEMP(ACTIVE)-BOTTOM', unit: 'DegC', reading1: 'thrust_active_bottom_1', reading2: 'thrust_active_bottom_2', reading3: 'thrust_active_bottom_3' },
  { parameter: 'TURBINE FRONT SHAFT VIBRATION-TOP', unit: 'MICRON', reading1: 'turb_front_vib_top_1', reading2: 'turb_front_vib_top_2', reading3: 'turb_front_vib_top_3' },
  { parameter: 'TURBINE FRONT SHAFT VIBRATION-BOTTOM', unit: 'MICRON', reading1: 'turb_front_vib_bottom_1', reading2: 'turb_front_vib_bottom_2', reading3: 'turb_front_vib_bottom_3' },
  { parameter: 'TURBINE FRONT BEARING METAL TEMP -TOP', unit: 'DegC', reading1: 'turb_front_temp_top_1', reading2: 'turb_front_temp_top_2', reading3: 'turb_front_temp_top_3' },
  { parameter: 'TURBINE FRONT BEARING METAL TEMP-LHS', unit: 'DegC', reading1: 'turb_front_temp_lhs_1', reading2: 'turb_front_temp_lhs_2', reading3: 'turb_front_temp_lhs_3' },
  { parameter: 'TURBINE REAR BEARING METAL TEMP-LHS', unit: 'DegC', reading1: 'turb_rear_temp_lhs_1', reading2: 'turb_rear_temp_lhs_2', reading3: 'turb_rear_temp_lhs_3' },
  { parameter: 'TURBINE REAR BEARING METAL TEMP-RHS', unit: 'DegC', reading1: 'turb_rear_temp_rhs_1', reading2: 'turb_rear_temp_rhs_2', reading3: 'turb_rear_temp_rhs_3' },
  { parameter: 'TURBINE REAR SHAFT VIBRATION-TOP', unit: 'MICRON', reading1: 'turb_rear_vib_top_1', reading2: 'turb_rear_vib_top_2', reading3: 'turb_rear_vib_top_3' },
  { parameter: 'TURBINE REAR SHAFT VIBRATION-BOTTOM', unit: 'MICRON', reading1: 'turb_rear_vib_bottom_1', reading2: 'turb_rear_vib_bottom_2', reading3: 'turb_rear_vib_bottom_3' },

  { parameter: 'GEAR BOX TEMP 1 LSS', unit: 'DegC', reading1: 'gear_temp1_lss_1', reading2: 'gear_temp1_lss_2', reading3: 'gear_temp1_lss_3' },
  { parameter: 'GEAR BOX TEMP 2 LSS', unit: 'DegC', reading1: 'gear_temp2_lss_1', reading2: 'gear_temp2_lss_2', reading3: 'gear_temp2_lss_3' },
  { parameter: 'GEAR BOX TEMP 3 LSS', unit: 'DegC', reading1: 'gear_temp3_lss_1', reading2: 'gear_temp3_lss_2', reading3: 'gear_temp3_lss_3' },

  { parameter: 'GEAR BOX VIBRATION 1 LSS', unit: 'MICRON', reading1: 'gear_vib1_lss_1', reading2: 'gear_vib1_lss_2', reading3: 'gear_vib1_lss_3' },
  { parameter: 'GEAR BOX VIBRATION 2 LSS', unit: 'MICRON', reading1: 'gear_vib2_lss_1', reading2: 'gear_vib2_lss_2', reading3: 'gear_vib2_lss_3' },

  { parameter: 'GEAR BOX VIBRATION 1 HSS', unit: 'MICRON', reading1: 'gear_vib1_hss_1', reading2: 'gear_vib1_hss_2', reading3: 'gear_vib1_hss_3' },
  { parameter: 'GEAR BOX VIBRATION 2 HSS', unit: 'MICRON', reading1: 'gear_vib2_hss_1', reading2: 'gear_vib2_hss_2', reading3: 'gear_vib2_hss_3' },

  { parameter: 'GEAR BOX TEMP 1 HSS', unit: 'DegC', reading1: 'gear_temp1_hss_1', reading2: 'gear_temp1_hss_2', reading3: 'gear_temp1_hss_3' },
  { parameter: 'GEAR BOX TEMP 2 HSS', unit: 'DegC', reading1: 'gear_temp2_hss_1', reading2: 'gear_temp2_hss_2', reading3: 'gear_temp2_hss_3' },
  { parameter: 'GEAR BOX TEMP 3 HSS', unit: 'DegC', reading1: 'gear_temp3_hss_1', reading2: 'gear_temp3_hss_2', reading3: 'gear_temp3_hss_3' },

  { parameter: 'GENERATOR FRONT SHAFT VIBRATION-TOP', unit: 'MICRON', reading1: 'gen_front_vib_top_1', reading2: 'gen_front_vib_top_2', reading3: 'gen_front_vib_top_3' },
  { parameter: 'GENERATOR FRONT SHAFT VIBRATION-BOTTOM', unit: 'MICRON', reading1: 'gen_front_vib_bottom_1', reading2: 'gen_front_vib_bottom_2', reading3: 'gen_front_vib_bottom_3' },
  { parameter: 'GENERATOR FRONT BEARING METAL TEMP-ACTIVE', unit: 'DegC', reading1: 'gen_front_temp_active_1', reading2: 'gen_front_temp_active_2', reading3: 'gen_front_temp_active_3' },
  { parameter: 'GENERATOR FRONT BEARING METAL TEMP-NON ACTIVE', unit: 'DegC', reading1: 'gen_front_temp_nonactive_1', reading2: 'gen_front_temp_nonactive_2', reading3: 'gen_front_temp_nonactive_3' },
  { parameter: 'GENERATOR REAR SHAFT VIBRATION-TOP', unit: 'MICRON', reading1: 'gen_rear_vib_top_1', reading2: 'gen_rear_vib_top_2', reading3: 'gen_rear_vib_top_3' },
  { parameter: 'GENERATOR REAR SHAFT VIBRATION-BOTTOM', unit: 'MICRON', reading1: 'gen_rear_vib_bottom_1', reading2: 'gen_rear_vib_bottom_2', reading3: 'gen_rear_vib_bottom_3' },
  { parameter: 'GENERATOR REAR BEARING METAL TEMP-TOP', unit: 'DegC', reading1: 'gen_rear_temp_top_1', reading2: 'gen_rear_temp_top_2', reading3: 'gen_rear_temp_top_3' },
  { parameter: 'GENERATOR REAR BEARING METAL TEMP-BOTTOM', unit: 'DegC', reading1: 'gen_rear_temp_bottom_1', reading2: 'gen_rear_temp_bottom_2', reading3: 'gen_rear_temp_bottom_3' }
];
  constructor(
    private messageService: MessageService,
    private httpService: UtilityHttpService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.shiftDate && this.shiftName) {
        this.tsiunit3Obj.shiftdate = this.shiftDate;
        this.tsiunit3Obj.shiftname = this.shiftName;
        this.tryFetchData();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shiftDate']?.currentValue) {
      this.tsiunit3Obj.shiftdate = this.shiftDate;
    }
    if (changes['shiftName']?.currentValue) {
      this.tsiunit3Obj.shiftname = this.shiftName;
    }
    this.tryFetchData();
  }

  tryFetchData() {
    if (this.tsiunit3Obj.shiftdate && this.tsiunit3Obj.shiftname) {
      this.fetchData();
    }
  }

  fetchData() {
    const payload = {
      shiftdate: moment(this.tsiunit3Obj.shiftdate).format('YYYY-MM-DD'),
      shiftname: this.tsiunit3Obj.shiftname
    };

    this.httpService.post('gettsiunit3', payload).subscribe({
      next: (res: any) => {
        if (res?.success && res.data) {
          this.messageService.add({ severity: 'info', summary: 'Fetched', detail: 'Previous data loaded.' });
          Object.keys(this.tsiunit3Obj).forEach(k => {
            if (res.data[k] !== undefined) this.tsiunit3Obj[k] = res.data[k];
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
    this.tsiunit3Obj.shiftdatestr = moment(this.tsiunit3Obj.shiftdate).format('YYYY-MM-DD');

    this.httpService.post('inserttsiunit3', this.tsiunit3Obj).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'TSI Unit 3 data saved.' });
          this.fetchData();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Insert Failed', detail: res.message });
        }
      }
    });
  }
}
