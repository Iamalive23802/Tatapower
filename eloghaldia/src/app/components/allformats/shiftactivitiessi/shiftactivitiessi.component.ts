import { Component, Input } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { SharedService } from 'src/app/services/shared-service';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-shiftactivitiessi',
  templateUrl: './shiftactivitiessi.component.html',
  styleUrls: ['./shiftactivitiessi.component.css'],
  providers: [MessageService]
})
export class ShiftactivitiessiComponent {
  constructor( private messageService: MessageService,private sharedService: SharedService,private httpService: UtilityHttpService) {}

  editortext = "";
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter data here...',
    translate: 'no',
    defaultFontName: 'Arial',
    sanitize: false,
    toolbarHiddenButtons: [
      ['insertImage', 'insertVideo', 'link', 'unlink', 'removeFormat', 'toggleEditorMode'],
      ['subscript', 'superscript', 'strikeThrough', 'justifyFull', 'indent', 'outdent']
    ]
  };

  shiftactObj = {    
    id:"",
    shiftactivitiesdate: new Date(),
    shiftdatestr: "",
    description : "",
    editortext : "",
    shiftname : "Shift B",
    acttype:"shiftincharge",
    status:"Pending",
    updateddate:moment().format('YYYY-MM-DD')//,
    //updatedby:this.httpService.createdby
    }





    ngOnInit(){  
      this.sharedService.shiftname$.subscribe(data=>{
        this.shiftactObj.shiftname = data;
        this.fetchdata();
      })
      
      this.sharedService.shiftdate$.subscribe(data=>{
        this.shiftactObj.shiftactivitiesdate = data;
        this.fetchdata();
      })
      
    }
  
addshiftactivityfunc(){  
  this.shiftactObj.editortext = this.sharedService.sanitizeContent(this.editortext);
   if(this.shiftactObj.editortext.trim() === ""){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter shift activity data.' });      
     return; 
   }
  //console.log("addshiftactivitiesfunc ",this.shiftactObj);
  this.shiftactObj.shiftdatestr = moment(this.shiftactObj.shiftactivitiesdate).format('YYYY-MM-DD');
  this.httpService.post("insertactivities",this.shiftactObj).subscribe(data => {
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
    shiftactivitydate :moment(this.shiftactObj.shiftactivitiesdate).format('YYYY-MM-DD'),
    shiftname:this.shiftactObj.shiftname,
    acttype:"shiftincharge"
  }).subscribe(
    {
      next: (data:any) => {
        console.log('API call successful', data);
        this.sharedService.setCRstatus(data.data.status);
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
