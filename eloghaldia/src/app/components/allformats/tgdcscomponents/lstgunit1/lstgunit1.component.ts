import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-lstgunit1',
  templateUrl: './lstgunit1.component.html',
  styleUrls: ['./lstgunit1.component.css'],
  providers: [MessageService]
})
export class Lstgunit1Component implements OnInit, OnChanges {
  @Input() shiftDate!: Date;      
@Input() shiftName!: string;


  tgunit1Obj: any = {
    shiftdate: new Date(),
    shiftdatestr: '',
    shiftname: '',
    gen_active_power_1 :"",
gen_reactive_power_1 :"",
gen_voltage_1 :"",
gen_frequency_1 :"",
turbine_speed_1 :"",
excitation_voltage_1 :"",
excitation_current_1 :"",
gen_stator_current_max_1 :"",
gen_winding_temp_max_1 :"",
gen_core_temp_max_1 :"",
gen_tooth_temp_max_1 :"",
gen_hot_air_temp_1 :"",
gen_cold_air_temp_1 :"",
main_steam_pressure_1 :"",
main_steam_temp_1 :"",
wheel_chamber_pressure_1 :"",
condenser_vaccum_calc_1 :"",
turbine_exhaust_temp_1 :"",
lub_oil_header_pressure_1 :"",
aopmop_curr_1 :"",
ctrl_oil_pressure_1 :"",
sec_oil_pressure_1 :"",
lube_oil_temp_1 :"",
cw_pr_condenser_1 :"",
cw_temp_condenser_1 :"",
hotwell_level_1 :"",
cep_pressure_1 :"",
cep_current_1 :"",
cep_tb_temp_1 :"",
con_water_temp_1 :"",
lpheatershell_pressure_1 :"",
lpheater_level_1 :"",
deaeratorext_pressure_1 :"",
deaeratorext_temp_1 :"",
deaerator_pressure_1 :"",
deaerator_lev_1 :"",
prds_pressure_1 :"",
prds_temp_1 :"",
glandslng_pressure_1 :"",
glandslng_temp_1 :"",
tbv_brgno_1 :"",
tbt_brgno_1 :"",
axial_shift_1 :"",
chasingtemp_top_1 :"",
chasingtemp_bottom_1 :"",
cond_flow_1 :"",
shift_gen_1 :"",
max_load_1 :"",
min_load_1 :"",
avg_load_shift_1 :"",


gen_active_power_2 :"",
gen_reactive_power_2 :"",
gen_voltage_2 :"",
gen_frequency_2 :"",
turbine_speed_2 :"",
excitation_voltage_2 :"",
excitation_current_2 :"",
gen_stator_current_max_2 :"",
gen_winding_temp_max_2 :"",
gen_core_temp_max_2 :"",
gen_tooth_temp_max_2 :"",
gen_hot_air_temp_2 :"",
gen_cold_air_temp_2 :"",
main_steam_pressure_2 :"",
main_steam_temp_2 :"",
wheel_chamber_pressure_2 :"",
condenser_vaccum_calc_2 :"",
turbine_exhaust_temp_2 :"",
lub_oil_header_pressure_2 :"",
aopmop_curr_2 :"",
ctrl_oil_pressure_2 :"",
sec_oil_pressure_2 :"",
lube_oil_temp_2 :"",
cw_pr_condenser_2 :"",
cw_temp_condenser_2 :"",
hotwell_level_2 :"",
cep_pressure_2 :"",
cep_current_2 :"",
cep_tb_temp_2 :"",
con_water_temp_2 :"",
lpheatershell_pressure_2 :"",
lpheater_level_2 :"",
deaeratorext_pressure_2 :"",
deaeratorext_temp_2 :"",
deaerator_pressure_2 :"",
deaerator_lev_2 :"",
prds_pressure_2 :"",
prds_temp_2 :"",
glandslng_pressure_2 :"",
glandslng_temp_2 :"",
tbv_brgno_2 :"",
tbt_brgno_2 :"",
axial_shift_2 :"",
chasingtemp_top_2 :"",
chasingtemp_bottom_2 :"",
cond_flow_2 :"",
shift_gen_2 :"",
max_load_2 :"",
min_load_2 :"",
avg_load_shift_2 :"",


gen_active_power_3 :"",
gen_reactive_power_3 :"",
gen_voltage_3 :"",
gen_frequency_3 :"",
turbine_speed_3 :"",
excitation_voltage_3 :"",
excitation_current_3 :"",
gen_stator_current_max_3 :"",
gen_winding_temp_max_3 :"",
gen_core_temp_max_3 :"",
gen_tooth_temp_max_3 :"",
gen_hot_air_temp_3 :"",
gen_cold_air_temp_3 :"",
main_steam_pressure_3 :"",
main_steam_temp_3 :"",
wheel_chamber_pressure_3 :"",
condenser_vaccum_calc_3 :"",
turbine_exhaust_temp_3 :"",
lub_oil_header_pressure_3 :"",
aopmop_curr_3 :"",
ctrl_oil_pressure_3 :"",
sec_oil_pressure_3 :"",
lube_oil_temp_3 :"",
cw_pr_condenser_3 :"",
cw_temp_condenser_3 :"",
hotwell_level_3 :"",
cep_pressure_3 :"",
cep_current_3 :"",
cep_tb_temp_3 :"",
con_water_temp_3 :"",
lpheatershell_pressure_3 :"",
lpheater_level_3 :"",
deaeratorext_pressure_3 :"",
deaeratorext_temp_3 :"",
deaerator_pressure_3 :"",
deaerator_lev_3 :"",
prds_pressure_3 :"",
prds_temp_3 :"",
glandslng_pressure_3 :"",
glandslng_temp_3 :"",
tbv_brgno_3 :"",
tbt_brgno_3 :"",
axial_shift_3 :"",
chasingtemp_top_3 :"",
chasingtemp_bottom_3 :"",
cond_flow_3 :"",
shift_gen_3 :"",
max_load_3 :"",
min_load_3 :"",
avg_load_shift_3 :"",

  };

  lstgunit1Arr: any[] = [];

  constructor(
    private messageService: MessageService,
    private httpService: UtilityHttpService
  ) {}

  ngOnInit() {
    this.initializeParameterArray();
  
    // Wait until Inputs are initialized by Angular
    setTimeout(() => {
      if (this.shiftDate && this.shiftName) {
        this.tgunit1Obj.shiftdate = this.shiftDate;
        this.tgunit1Obj.shiftname = this.shiftName;
        this.tryFetchData();
      }
    });
  }  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shiftDate'] && changes['shiftDate'].currentValue) {
      this.tgunit1Obj.shiftdate = this.shiftDate!;
    }
    if (changes['shiftName'] && changes['shiftName'].currentValue) {
      this.tgunit1Obj.shiftname = this.shiftName!;
    }
  
    if (this.tgunit1Obj.shiftdate && this.tgunit1Obj.shiftname) {
      this.tryFetchData();
    }
  }  

  tryFetchData() {
    if (this.tgunit1Obj.shiftdate && this.tgunit1Obj.shiftname) {
      this.fetchdata();
    }
  }

  fetchdata() {
    const payload = {
      shiftdate: moment(this.tgunit1Obj.shiftdate).format('YYYY-MM-DD'),
      shiftname: this.tgunit1Obj.shiftname
    };

    this.httpService.post('gettgdcslstgunit1', payload).subscribe({
      next: (res: any) => {
        if (res?.success && res.data) {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Fetched last saved data.' });
          Object.keys(this.tgunit1Obj).forEach(key => {
            if (res.data.hasOwnProperty(key)) {
              this.tgunit1Obj[key] = res.data[key];
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
    this.tgunit1Obj.shiftdatestr = moment(this.tgunit1Obj.shiftdate).format('YYYY-MM-DD');

    this.httpService.post('inserttgdcslstgunit1', this.tgunit1Obj).subscribe(data => {
      if (data.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Shift activities saved successfully.' });
        this.fetchdata();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Shift activity could not be added.' });
      }
    });
  }

  initializeParameterArray() {
    this.lstgunit1Arr = [
    { parameter: 'GEN ACTIVE POWER', unit: 'MW', max: '45', min: 'NA', reading1: 'gen_active_power_1', reading2: 'gen_active_power_2', reading3: 'gen_active_power_3' },
    { parameter: 'GEN REACTIVE POWER', unit: 'MVAR', max: '', min: '', reading1: 'gen_reactive_power_1', reading2: 'gen_reactive_power_2', reading3: 'gen_reactive_power_3' },
    { parameter: 'GEN VOLTAGE', unit: 'KV', max: '11.55', min: '10.45', reading1: 'gen_voltage_1', reading2: 'gen_voltage_2', reading3: 'gen_voltage_3' },
    { parameter: 'GEN FREQUIENCY', unit: 'HZ', max: '52.5', min: '47.5', reading1: 'gen_frequency_1', reading2: 'gen_frequency_2', reading3: 'gen_frequency_3' },
    { parameter: 'TURBINE SPEED', unit: 'RPM', max: '3150', min: '', reading1: 'turbine_speed_1', reading2: 'turbine_speed_2', reading3: 'turbine_speed_3' },
    { parameter: 'EXCITATION VOLTAGE', unit: 'VOLT', max: '45.5', min: 'NA', reading1: 'excitation_voltage_1', reading2: 'excitation_voltage_2', reading3: 'excitation_voltage_3' },
    { parameter: 'EXCITATION CURRENT', unit: 'AMPS', max: 'NA', min: '', reading1: 'excitation_current_1', reading2: 'excitation_current_2', reading3: 'excitation_current_3' },
    { parameter: 'GEN STATOR CURRENT(MAX)', unit: 'AMPS', max: '2952', min: 'NA', reading1: 'gen_stator_current_max_1', reading2: 'gen_stator_current_max_2', reading3: 'gen_stator_current_max_3' },
    { parameter: 'GEN WINDING TEMP(MAX)', unit: 'DegC', max: '120', min: 'NA', reading1: 'gen_winding_temp_max_1', reading2: 'gen_winding_temp_max_2', reading3: 'gen_winding_temp_max_3' },
    { parameter: 'GEN CORE TEMP(MAX)', unit: 'DegC', max: '120', min: 'NA', reading1: 'gen_core_temp_max_1', reading2: 'gen_core_temp_max_2', reading3: 'gen_core_temp_max_3' },
    { parameter: 'GEN TOOTH TEMP(MAX)', unit: 'DegC', max: '120', min: 'NA', reading1: 'gen_tooth_temp_max_1', reading2: 'gen_tooth_temp_max_2', reading3: 'gen_tooth_temp_max_3' },
    { parameter: 'GEN HOT AIR (TEMP.1/TEMP.2)', unit: 'DegC', max: '75', min: 'NA', reading1: 'gen_hot_air_temp_1', reading2: 'gen_hot_air_temp_2', reading3: 'gen_hot_air_temp_3' },
    { parameter: 'GEN COLD AIR (TEMP.1/TEMP.2)', unit: 'DegC', max: '50', min: 'NA', reading1: 'gen_cold_air_temp_1', reading2: 'gen_cold_air_temp_2', reading3: 'gen_cold_air_temp_3' },
    { parameter: 'MAIN STEAM PRESSURE', unit: 'KG/CM2', max: '86', min: '75', reading1: 'main_steam_pressure_1', reading2: 'main_steam_pressure_2', reading3: 'main_steam_pressure_3' },
    { parameter: 'MAIN STEAM TEMPERATURE', unit: 'DegC', max: '535', min: '500', reading1: 'main_steam_temp_1', reading2: 'main_steam_temp_2', reading3: 'main_steam_temp_3' },
    { parameter: 'WHEEL CHEMBER PRESSURE', unit: 'KG/CM2', max: '68', min: 'NA', reading1: 'wheel_chamber_pressure_1', reading2: 'wheel_chamber_pressure_2', reading3: 'wheel_chamber_pressure_3' },
    { parameter: 'CONDENSER VACUUM CALCULATED', unit: 'KG/CM2', max: '-0.934', min: 'NA', reading1: 'condenser_vaccum_calc_1', reading2: 'condenser_vaccum_calc_2', reading3: 'condenser_vaccum_calc_3' },
    { parameter: 'TURBINE EXHAUST TEMPERATURE', unit: 'DegC', max: '45', min: 'NA', reading1: 'turbine_exhaust_temp_1', reading2: 'turbine_exhaust_temp_2', reading3: 'turbine_exhaust_temp_3' },
    { parameter: 'LUB OIL HEADER PRESSURE', unit: 'KG/CM2', max: 'NA', min: '1.5', reading1: 'lub_oil_header_pressure_1', reading2: 'lub_oil_header_pressure_2', reading3: 'lub_oil_header_pressure_3' },
    { parameter: 'AOP/MOP CURRENT', unit: 'AMPS', max: '124', min: 'NA', reading1: 'aopmop_curr_1', reading2: 'aopmop_curr_2', reading3: 'aopmop_curr_3' },
    { parameter: 'CONTROL OIL PRESSURE', unit: 'KG/CM2', max: '10', min: '8.5', reading1: 'ctrl_oil_pressure_1', reading2: 'ctrl_oil_pressure_2', reading3: 'ctrl_oil_pressure_3' },
    { parameter: 'SECONDERY OIL PRESSURE', unit: 'KG/CM2', max: '4.5', min: '1.6', reading1: 'sec_oil_pressure_1', reading2: 'sec_oil_pressure_2', reading3: 'sec_oil_pressure_3' },
    { parameter: 'LUBE OIL TEMP. (AFTER COOLER)', unit: 'DegC', max: '47', min: 'NA', reading1: 'lube_oil_temp_1', reading2: 'lube_oil_temp_2', reading3: 'lube_oil_temp_3' },
    { parameter: 'CW PR. AT CONDENSER I/L & O/L', unit: 'KG/CM2', max: '1.8', min: '1.3', reading1: 'cw_pr_condenser_1', reading2: 'cw_pr_condenser_2', reading3: 'cw_pr_condenser_3' },
    { parameter: 'CW TEMP. AT CONDENSER I/L & O/L', unit: 'DegC', max: '41', min: '32', reading1: 'cw_temp_condenser_1', reading2: 'cw_temp_condenser_2', reading3: 'cw_temp_condenser_3' },
    { parameter: 'HOTWELL LEVEL', unit: 'mmWC', max: '800', min: '300', reading1: 'hotwell_level_1', reading2: 'hotwell_level_2', reading3: 'hotwell_level_3' },
    { parameter: 'CEP PRESSURE', unit: 'KG/CM2', max: 'NA', min: 'NA', reading1: 'cep_pressure_1', reading2: 'cep_pressure_2', reading3: 'cep_pressure_3' },
    { parameter: 'CEP CURRENT', unit: 'AMPS', max: '255', min: 'NA', reading1: 'cep_current_1', reading2: 'cep_current_2', reading3: 'cep_current_3' },
    { parameter: 'CEP THRUST BEARING TEMP.', unit: 'DegC', max: '46', min: 'NA', reading1: 'cep_tb_temp_1', reading2: 'cep_tb_temp_2', reading3: 'cep_tb_temp_3' },
    { parameter: 'CONDENSET WATER TEMP.', unit: 'DegC', max: '44', min: 'NA', reading1: 'con_water_temp_1', reading2: 'con_water_temp_2', reading3: 'con_water_temp_3' },
    { parameter: 'LP HEATER SHELL PRESSURE', unit: 'KG/CM2', max: '1', min: 'NA', reading1: 'lpheatershell_pressure_1', reading2: 'lpheatershell_pressure_2', reading3: 'lpheatershell_pressure_3' },
    { parameter: 'LP HEATER LEVEL', unit: 'mmWC', max: 'NA', min: 'NA', reading1: 'lpheater_level_1', reading2: 'lpheater_level_2', reading3: 'lpheater_level_3' },
    { parameter: 'DEAERATOR EXTRACTION PRESSURE', unit: 'KG/CM2', max: '6.5', min: 'NA', reading1: 'deaeratorext_pressure_1', reading2: 'deaeratorext_pressure_2', reading3: 'deaeratorext_pressure_3' },
    { parameter: 'DEAERATOR EXTRACTION TEMPERATURE', unit: 'DegC', max: '302.2', min: 'NA', reading1: 'deaeratorext_temp_1', reading2: 'deaeratorext_temp_2', reading3: 'deaeratorext_temp_3' },
    { parameter: 'DEAERATOR PRESSURE', unit: 'KG/CM2', max: '5.8', min: 'NA', reading1: 'deaerator_pressure_1', reading2: 'deaerator_pressure_2', reading3: 'deaerator_pressure_3' },
    { parameter: 'DEAERATOR LEVEL', unit: 'mmWC', max: '1000', min: '50', reading1: 'deaerator_lev_1', reading2: 'deaerator_lev_2', reading3: 'deaerator_lev_3' },
    { parameter: 'PRDS PRESSURE', unit: 'KG/CM2', max: '11', min: 'NA', reading1: 'prds_pressure_1', reading2: 'prds_pressure_2', reading3: 'prds_pressure_3' },
    { parameter: 'PRDS TEMP.', unit: 'DegC', max: '280', min: 'NA', reading1: 'prds_temp_1', reading2: 'prds_temp_2', reading3: 'prds_temp_3' },
    { parameter: 'GLAND SALING PRESSURE', unit: 'mmWC', max: '330', min: 'NA', reading1: 'glandslng_pressure_1', reading2: 'glandslng_pressure_2', reading3: 'glandslng_pressure_3' },
    { parameter: 'GLAND SALING TEMP.', unit: 'DegC', max: '', min: '', reading1: 'glandslng_temp_1', reading2: 'glandslng_temp_2', reading3: 'glandslng_temp_3' },
    { parameter: 'TG BEARING VIBRATION (MAX) BRG. NO.', unit: 'MICRON', max: '164', min: 'NA', reading1: 'tbv_brgno_1', reading2: 'tbv_brgno_2', reading3: 'tbv_brgno_3' },
    { parameter: 'TG BEARING TEMP. (MAX) BRG. NO.', unit: 'DegC', max: '95', min: 'NA', reading1: 'tbt_brgno_1', reading2: 'tbt_brgno_2', reading3: 'tbt_brgno_3' },
    { parameter: 'AXIAL SHIFT', unit: 'MM', max: '0.5', min: '-0.5', reading1: 'axial_shift_1', reading2: 'axial_shift_2', reading3: 'axial_shift_3' },
    { parameter: 'CASING TEMP-TOP', unit: 'DegC', max: '', min: '', reading1: 'chasingtemp_top_1', reading2: 'chasingtemp_top_2', reading3: 'chasingtemp_top_3' },
    { parameter: 'CASING TEMP-BOTTOM', unit: 'DegC', max: '', min: '', reading1: 'chasingtemp_bottom_1', reading2: 'chasingtemp_bottom_2', reading3: 'chasingtemp_bottom_3' },
    { parameter: 'COND FLOW', unit: 'TPH', max: '', min: '', reading1: 'cond_flow_1', reading2: 'cond_flow_2', reading3: 'cond_flow_3' },
    { parameter: 'UNIT 1 TOTAL GENERATION', unit: 'MW', max: '', min: '', reading1: 'shift_gen_1', reading2: 'shift_gen_2', reading3: 'shift_gen_3' },
    { parameter: 'MAXIMUM LOAD', unit: 'MW', max: '', min: '', reading1: 'max_load_1', reading2: 'max_load_2', reading3: 'max_load_3' },
    { parameter: 'MINIMUM LOAD', unit: 'MW', max: '', min: '', reading1: 'min_load_1', reading2: 'min_load_2', reading3: 'min_load_3' },
    { parameter: 'AVERAGE LOAD DURING SHIFT', unit: 'MW', max: '', min: '', reading1: 'avg_load_shift_1', reading2: 'avg_load_shift_2', reading3: 'avg_load_shift_3' }
    ];
    }
    }
    
