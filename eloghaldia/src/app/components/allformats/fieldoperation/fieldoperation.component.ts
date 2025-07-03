import { Component, OnInit, Input } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { SharedService } from 'src/app/services/shared-service';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-fieldoperation',
  templateUrl: './fieldoperation.component.html',
  styleUrls: ['./fieldoperation.component.css'],
    providers: [MessageService]
})
export class FieldoperationComponent implements OnInit {
//to be removed in all places - input passed by vedant to be removed and subscribed instead
  @Input() shiftDate!: Date;
  @Input() shiftName!: string;
  

  // Panel tracking (for individual sections inside field operations)
  panelLoaded: Record<string, boolean> = {
    boilerrow1: false,
    boilerrow3: false,
    tgarea: false
  };
  shiftname = "Shift B";
  shiftdate = new Date();
  editortextbr1n2 = '';
  editortextbr3n4 = '';
  editortext = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter field data...',
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
    console.log('Field Operation Loaded');
    console.log('Shift Date:', this.shiftDate);
    console.log('Shift Name:', this.shiftName);
    this.sharedService.shiftname$.subscribe(data=>{
      this.shiftname = data;
      this.fetchdata();
    });    
    this.sharedService.shiftdate$.subscribe(data=>{
      this.shiftdate = data;
      this.fetchdata();
    });
  }

  onCollapsedChange(collapsed: boolean, section: string): void {
    if (!collapsed && this.panelLoaded.hasOwnProperty(section)) {
      this.panelLoaded[section] = true;
    }
  }

  
      addeditortxtfunc(acttype:string,editorname:string){  
        let chkeditortext="";
        if(editorname === 'editortextbr1n2')
        chkeditortext = this.sharedService.sanitizeContent(this.editortextbr1n2);
        if(editorname === 'editortextbr3n4')
        chkeditortext = this.sharedService.sanitizeContent(this.editortextbr3n4);
        if(editorname === 'editortext')
        chkeditortext = this.sharedService.sanitizeContent(this.editortext);
         if(chkeditortext.trim() === ""){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter proper data.' });      
           return; 
         }
        //console.log("addshiftactivitiesfunc ",this.shiftactObj);
        let shiftdatestr = moment(this.shiftdate).format('YYYY-MM-DD');
        this.httpService.post("insertactivities",{
        shiftactivitiesdate: this.shiftdate,
        shiftdatestr: shiftdatestr,
        description : "",
        editortext : chkeditortext,
        shiftname : this.shiftname,
        acttype:acttype,//"boilerbopactivities",
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
              acttype:"boilerrow1n2activities"
            }).subscribe(
              {
                next: (data:any) => {
                  console.log('API call successful', data);
                  // this.CRstatus=data.data.status;
                   this.editortextbr1n2= data.data.editortext;
                  //  this.setaddeditflag();
                },
                error: (err: any) => {
                  console.error('Error during API call', err);
                }
              }
          );  
          this.httpService.post("getactivities",{
            shiftactivitydate :moment(this.shiftdate).format('YYYY-MM-DD'),
            shiftname:this.shiftname,
            acttype:"boilerrow3n4activities"
          }).subscribe(
            {
              next: (data:any) => {
                console.log('API call successful', data);
                // this.CRstatus=data.data.status;
                 this.editortextbr3n4= data.data.editortext;
                //  this.setaddeditflag();
              },
              error: (err: any) => {
                console.error('Error during API call', err);
              }
            }
        );  
        this.httpService.post("getactivities",{
          shiftactivitydate :moment(this.shiftdate).format('YYYY-MM-DD'),
          shiftname:this.shiftname,
          acttype:"tgareafneopractivities"
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
          }
          
}
