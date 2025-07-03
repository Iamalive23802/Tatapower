import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

interface Unit {
  name: string;
  code: string;
}

interface Role {
  name: string;
  code: string;
}

interface Shift {
  name: string;
  code: string;
}

interface carouselObj {
  id:string;
  name: string;
  imgsrc: string;
}


@Component({
  selector: 'app-landing2',
  templateUrl: './landing2.component.html',
  styleUrls: ['./landing2.component.css'],
  standalone: true,
  imports: [TableModule,DialogModule,CarouselModule, ButtonModule, TagModule]
})

export class Landing2Component implements OnInit  {

  displayModal: boolean = false;

  showModal() {
    this.displayModal = true;
  }
  hideModal() {
    this.displayModal = false;
  }
  systemadmins = [
    {location:'Trombay',name:'Milind Karmarkar',email:'milindkarmarkar@tatapower.com'}
  ]

  units: Unit[] | undefined;
  selectedUnit: Unit | undefined;
  roles: Unit[] | undefined;
  selectedRole: Role | undefined;
  shifts: Unit[] | undefined;
  selectedShift: Shift | undefined;
  
  carousalImg: carouselObj[] = [];

    responsiveOptions: any[] | undefined;

  constructor(private router: Router) {}
  
  ngOnInit() {

    this.carousalImg = [
      {
        id:"",
        name: 'Haldia Unit 1',
        //prod
        imgsrc: './assets/carousel/Haldia1.jpg'
        // imgsrc: './../../assets/carousel/trombay/TrombayOverview.JPG'
      },
      {
        id:"",
        name: 'Haldia control room',
        //prod
        imgsrc: './assets/carousel/Haldia2.jpg'
        // imgsrc: './../../assets/carousel/trombay/Trombay_unit8.jpg'
      },
    // {
    //   id:"",
    //   name: 'Trombay unit 8',
    //   // imgsrc: './assets/carousel/trombay/trombay_unit8_2.jpg'
    //   imgsrc: './../../assets/carousel/trombay/trombay_unit8_2.jpg'
    // },
    // {
    //   id:"",
    //   name: 'Trombay unit 8 ',
    //   // imgsrc: './assets/carousel/trombay/trombay_unit8_3.jpg'
    //   imgsrc: './../../assets/carousel/trombay/trombay_unit8_3.jpg'
    // },
    // {
    //   id:"",
    //   name: 'Trombay unit 8',
    //   // imgsrc: './assets/carousel/trombay/trombay_unit8_4.jpg'
    //   imgsrc: './../../assets/carousel/trombay/trombay_unit8_4.jpg'
    // },
    // {
    //   id:"",
    //   name: 'Trombay control room',
    //   // imgsrc: './assets/carousel/trombay/trombay_unit8_5.jpg'
    //   imgsrc: './../../assets/carousel/trombay/trombay_unit8_5.jpg'
    // }
    {
        id:"",
        name: 'Haldia unit 2',
        imgsrc: './assets/carousel/Haldia3.jpg'
        // imgsrc: './../../assets/carousel/trombay/TrombayUnit7.jpg'
      },
      {
        id:"",
        name: 'Haldia Evening',
        //prod
        imgsrc: './assets/carousel/Haldia4.jpg'
        // imgsrc: './../../assets/carousel/trombay/MaithonEvening.jpg'
      }
    ];

    // this.responsiveOptions = [
    //   {
    //       breakpoint: '1199px',
    //       numVisible: 1,
    //       numScroll: 1
    //   },
    //   {
    //       breakpoint: '991px',
    //       numVisible: 2,
    //       numScroll: 1
    //   },
    //   {
    //       breakpoint: '767px',
    //       numVisible: 1,
    //       numScroll: 1
    //   },      
    // {
    //   id:"",
    //   name: 'Maithon',
    //   imgsrc: './../../assets/OIP.jpg'
    // }
    // ];
    
    this.units = [
        { name: 'Unit 8', code: 'Unit8' },
        { name: 'Unit 7', code: 'Unit7' },
        { name: 'Unit 5', code: 'Unit5' }
    ];
    this.roles = [
        { name: 'Shift incharge', code: 'Shift incharge' },
        { name: 'Sr Control Room Engg', code: 'Sr Control Room Engg' },
        { name: 'Area operation engg', code: 'Area operation engg' }
    ];
    this.shifts = [
        { name: 'Shift A', code: 'ShiftA' },
        { name: 'Shift B', code: 'ShiftB' },
        { name: 'Shift C', code: 'ShiftC' }
    ];
  }


  
  submitselection() {
    this.router.navigate(['elogcards']);
}

getSeverity(status: string) {
  switch (status) {
    case 'INSTOCK':
        return 'success';
    case 'LOWSTOCK':
        return 'warning';
    case 'OUTOFSTOCK':
        return 'danger';
  }
  return 'success';
  }

}
