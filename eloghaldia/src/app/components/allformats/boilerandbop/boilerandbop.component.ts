import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { SharedService } from 'src/app/services/shared-service';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-boilerandbop',
  templateUrl: './boilerandbop.component.html',
  styleUrls: ['./boilerandbop.component.css'],
  providers: [MessageService]
})
export class BoilerandbopComponent implements OnInit {
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;

  shiftname = "Shift B";
  shiftdate = new Date();
  editortext = '';
  panelLoaded: Record<string, boolean> = {
    boiler: false,
    damper: false,
    hpdp: false,
    idfan: false,
    bop: false
  };

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter shift activities...',
    translate: 'no',
    defaultFontName: 'Arial',
    sanitize: false,
    toolbarHiddenButtons: [
      ['insertImage', 'insertVideo', 'link', 'unlink', 'removeFormat', 'toggleEditorMode'],
      ['subscript', 'superscript', 'strikeThrough', 'justifyFull', 'indent', 'outdent']
    ]
  };

  constructor(
    private sharedService: SharedService,
    private httpService: UtilityHttpService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log('Boiler & BOP shiftDate:', this.shiftDate);
    console.log('Boiler & BOP shiftName:', this.shiftName);
    this.fetchdata();
    this.sharedService.shiftname$.subscribe(data=>{
      this.shiftname = data;
      this.fetchdata();
    });    
    this.sharedService.shiftdate$.subscribe(data=>{
      this.shiftdate = data;
      this.fetchdata();
    });
    
  }

  onCollapsedChange(collapsed: boolean, key: string): void {
    if (!collapsed && this.panelLoaded.hasOwnProperty(key)) {
      this.panelLoaded[key] = true;
    }
  }


  
    addeditortxtfunc(){  
      this.editortext = this.sharedService.sanitizeContent(this.editortext);
       if(this.editortext.trim() === ""){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter proper data.' });      
         return; 
       }
      //console.log("addshiftactivitiesfunc ",this.shiftactObj);
      let shiftdatestr = moment(this.shiftdate).format('YYYY-MM-DD');
      this.httpService.post("insertactivities",{
      shiftactivitiesdate: this.shiftdate,
      shiftdatestr: shiftdatestr,
      description : "",
      editortext : this.editortext,
      shiftname : this.shiftname,
      acttype:"boilerbopactivities",
      updateddate:moment().format('YYYY-MM-DD')
      }).subscribe(data => {
        console.log("data to check status code ",data);
         
          if(data.success){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Shift activities saved successfully.' });      
            this.fetchdata();
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Shift activity could not be added.' });      
          //console.log("data not inserted")
        }
        // }
    
      })
    }
    
    
    fetchdata(){
      this.httpService.post("getactivities",{
        shiftactivitydate :moment(this.shiftdate).format('YYYY-MM-DD'),
        shiftname:this.shiftname,
        acttype:"boilerbopactivities"
      }).subscribe(
        {
          next: (data:any) => {
            console.log('API call successful', data);
            // this.CRstatus=data.data.status;
             this.editortext= data.data.editortext;
            //  this.setaddeditflag();
          },
          error: (err: any) => {
            console.error('Error during API call', err);
          }
        }
    );  
      // this.setaddeditflag();
    }
    
    
}
