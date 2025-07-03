import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared-service';
import { UtilityHttpService } from 'src/app/services/utility-http.service';
import * as moment from 'moment';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  CRstatus = '';
  emprole: any;
  editMode: boolean = false;

  selectedShiftDate: Date = new Date();
  selectedShiftName: string = ''; 

  shiftNames = [
    { label: 'Shift A', value: 'Shift A' },
    { label: 'Shift B', value: 'Shift B' },
    { label: 'Shift C', value: 'Shift C' }
  ];

  readings: any = {}; 

  constructor(
    private sharedService: SharedService,
    private httpService: UtilityHttpService
  ) {}

  ngOnInit() {
    this.sharedService.CRstatus$.subscribe(data => {
      this.CRstatus = data;
    });

    const menu = this.httpService.rolemenuObj;
    if (menu !== undefined) {
      this.selectedShiftName = menu?.currshiftmaster?.shiftname || '';
      this.emprole = menu?.role;

      this.setShiftDate();
      this.setShiftName();
    } else {
      this.httpService.rolemenuObj$.subscribe({
        next: (result: any) => {
          if (result) {
            this.emprole = result.role;
            this.selectedShiftName = result.shiftname || '';

            this.setShiftDate();
            this.setShiftName();
          }
        }
      });
    }

    // this.checkShiftData();
  }

  onShiftDateChange() {
    this.setShiftDate();
    this.checkShiftData();
  }

  onShiftNameChange() {
    this.setShiftName();
    this.checkShiftData();
  }

  setShiftDate() {
    this.sharedService.setshiftdate(this.selectedShiftDate);
  }

  setShiftName() {
    this.sharedService.setshiftname(this.selectedShiftName);
  }
  checkShiftData() {
    const shiftDateStr = moment(this.selectedShiftDate).format('YYYY-MM-DD');

  // checkShiftData() {
  //   const shiftDateStr = moment(this.selectedShiftDate).format('YYYY-MM-DD');

  //   this.httpService.getShiftReadings(shiftDateStr, this.selectedShiftName).subscribe({
  //     next: (data) => {
  //       if (data && data.length > 0) {
  //         this.readings = data[0]; 
  //         this.editMode = true;
  //         console.log('Readings loaded:', this.readings);
  //       } else {
  //         this.readings = {};
  //         this.editMode = false;
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching readings:', err);
  //       this.editMode = false;
  //     }
  //   });
  }
  

  submitShiftInfo() {
    const shiftDateStr = moment(this.selectedShiftDate).format('YYYY-MM-DD');

    const payload = {
      shiftdate: shiftDateStr,
      shiftname: this.selectedShiftName,
      readings: this.readings,
      createdby: this.httpService.createdby, 
    };

    this.httpService.editShiftReadings(payload).subscribe({
      next: (res) => {
        console.log('Response:', res);
        if (res.message) {
          alert('Readings saved successfully.');
          this.editMode = true;
        } else {
          alert('Failed to save readings.');
        }
      },
      error: (err) => {
        console.error('Error saving readings:', err);
        alert('Error saving readings.');
      }
    });
  }
}
