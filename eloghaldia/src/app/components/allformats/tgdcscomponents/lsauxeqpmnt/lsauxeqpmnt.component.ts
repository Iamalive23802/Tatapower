import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

type UnitKey = 'unit1' | 'unit2' | 'unit3';

@Component({
  selector: 'app-lsauxeqpmnt',
  templateUrl: './lsauxeqpmnt.component.html',
  providers: [MessageService]
})
export class LsauxeqpmntComponent implements OnInit, OnChanges {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  panelStates: Record<UnitKey, boolean> = {
    unit1: false,
    unit2: false,
    unit3: false,
  };

  auxUnitData: Record<UnitKey, string[]> = {
    unit1: [
      'AOP', 'MOP', 'DC EOP', 'AC JOP', 'DC JOP',
      'OVEF-1A', 'OVEF-1B', 'LOC-1A', 'LOC-1B', 'LOF-1A', 'LOF-1B',
      'LVDH', 'OIL CENTRIFUGE', 'ELC', 'TOP EJECTOR', 'BOTTOM EJECTOR',
      'HOGGER', 'AMMONIA-1A', 'AMMONIA-1B', 'HYDRAZIN_1A', 'HYDRAZIN_1B',
      'CEP-1A', 'CEP-1B'
    ],
    unit2: [
      'AOP', 'MOP', 'DC EOP', 'AC JOP', 'DC JOP',
      'OVEF-2A', 'OVEF-2B', 'LOC-2A', 'LOC-2B', 'LOF-2A', 'LOF-2B',
      'LVDH', 'OIL CENTRIFUGE', 'ELC', 'TOP EJECTOR', 'BOTTOM EJECTOR',
      'HOGGER', 'AMMONIA-2A', 'AMMONIA-2B', 'HYDRAZIN_2A', 'HYDRAZIN_2B',
      'CEP-2A', 'CEP-2B'
    ],
    unit3: [
      'AOP', 'MOP', 'DC EOP', 'AC JOP', 'DC JOP',
      'OVEF-3A', 'OVEF-3B', 'LOC-3A', 'LOC-3B', 'LOF-3A', 'LOF-3B',
      'LVDH', 'OIL CENTRIFUGE', 'ELC', 'TOP EJECTOR', 'BOTTOM EJECTOR',
      'HOGGER', 'AMMONIA-3A', 'AMMONIA-3B', 'HYDRAZIN_3A', 'HYDRAZIN_3B',
      'CEP-3A', 'CEP-3B'
    ]
  };

  equipmentStatus: Record<UnitKey, Record<string, { start: string; end: string }>> = {
    unit1: {},
    unit2: {},
    unit3: {}
  };

  statusOptions = [
    { label: 'Running', value: 'Running' },
    { label: 'Stand By', value: 'Stand By' },
    { label: 'Auto', value: 'Auto' },
    { label: 'Not Available', value: 'Not Available' }
  ];

  constructor(
    private messageService: MessageService,
    private httpService: UtilityHttpService
  ) {}

  ngOnInit(): void {
    this.initializeEquipmentStatus();

    setTimeout(() => {
      if (this.shiftDate && this.shiftName) {
        this.fetchdata();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shiftDate']?.currentValue) {
      this.shiftDate = changes['shiftDate'].currentValue;
    }
    if (changes['shiftName']?.currentValue) {
      this.shiftName = changes['shiftName'].currentValue;
    }

    if (this.shiftDate && this.shiftName) {
      this.fetchdata();
    }
  }

  initializeEquipmentStatus() {
    (['unit1', 'unit2', 'unit3'] as UnitKey[]).forEach(unit => {
      this.equipmentStatus[unit] = {};
      this.auxUnitData[unit].forEach(eq => {
        this.equipmentStatus[unit][eq] = { start: '', end: '' };
      });
    });
  }

  fetchdata() {
    const payload = {
      shiftdate: moment(this.shiftDate).format('YYYY-MM-DD'),
      shiftname: this.shiftName
    };

    this.httpService.post('gethaldiaauxeqpmnt', payload).subscribe({
      next: (res: any) => {
        if (res?.success && res.data) {
          this.messageService.add({ severity: 'info', summary: 'Fetched', detail: 'Previous record loaded.' });

          (['unit1', 'unit2', 'unit3'] as UnitKey[]).forEach(unit => {
            this.auxUnitData[unit].forEach(eq => {
              const keyStart = `${unit}_${this.sanitize(eq)}_start`;
              const keyEnd = `${unit}_${this.sanitize(eq)}_end`;

              const startValue = res.data[keyStart];
              const endValue = res.data[keyEnd];

              this.equipmentStatus[unit][eq] = {
                start: typeof startValue === 'string' ? startValue : '',
                end: typeof endValue === 'string' ? endValue : ''
              };
            });
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No Data', detail: 'No saved data for this shift.' });
        }
      },
      error: err => {
        console.error('Fetch error:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data.' });
      }
    });
  }

  insertfunc() {
    const payload: any = {
      shiftdate: moment(this.shiftDate).format('YYYY-MM-DD'),
      shiftname: this.shiftName
    };

    (['unit1', 'unit2', 'unit3'] as UnitKey[]).forEach(unit => {
      this.auxUnitData[unit].forEach(eq => {
        const keyStart = `${unit}_${this.sanitize(eq)}_start`;
        const keyEnd = `${unit}_${this.sanitize(eq)}_end`;
        payload[keyStart] = this.equipmentStatus[unit][eq].start;
        payload[keyEnd] = this.equipmentStatus[unit][eq].end;
      });
    });

    console.log('Saving payload:', payload); // ✅ helpful for debug

    this.httpService.post('inserthaldiaauxeqpmnt', payload).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Equipment status saved successfully.' });
          this.fetchdata();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Save failed.' });
        }
      },
      error: err => {
        console.error('Insert error:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save data.' });
      }
    });
  }

  sanitize(eq: string): string {
    return eq.replace(/[\s-]/g, '_').toLowerCase();
  }

  togglePanel(unit: UnitKey) {
    this.panelStates[unit] = !this.panelStates[unit];
  }
}
