import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UtilityHttpService } from './utility-http.service';
// import { ToastrService } from 'ngx-toastr';
// import { any } from 'underscore';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor(private httpService:UtilityHttpService) { }

public shiftname = 'Shift B'
  private _shiftname = new Subject<any>();
  shiftname$ = this._shiftname.asObservable();
    setshiftname(shiftname:any) {   
      this.shiftname = shiftname; 
      this._shiftname.next(shiftname);
    }
  
    public shiftdate= new Date();
    private _shiftdate = new Subject<any>();
    shiftdate$ = this._shiftdate.asObservable();
      setshiftdate(shiftdate:any) {    
        this.shiftdate = shiftdate;
        this._shiftdate.next(shiftdate);
      }
    


  symbolsOnly(value: string) {
    if ( !/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/.test(value)) {
      return true;
    }
    return false;
    }
    
  numbersOnly(value: string) {
    if ( /^-?[0-9][^\.]*$/.test(value)) {
      return true;
    }
    return false;
    }
    
    getAllEmployees(){
      if(_.isEmpty(this.allEmployees)){
        this.httpService.post("getallemployeesApi",{}).subscribe(data => {
            if(data.success){
              this.allEmployees = data.data;
          }}, error => {
            //console.log(error);
          });
      }
      return this.allEmployees;
    }

downloadAttachment(attachment: any) {
  // //console.log(this.document_arr);
  // let attachment = this.document_arr[index];
  //console.log("downloadAttachment", attachment);  // Path [on server] of file to be downloaded 
  let filePathArr = attachment.split('/');
  this.httpService.downloadFileRequest('common/downloadfile', { attachment: attachment }).subscribe((res: any) => {

    if (res != undefined) {
      //console.log(res, res.headers);
      var newBlob = new Blob([res]);
      var downloadURL = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = filePathArr[filePathArr.length - 1];;
      link.click();
    } else {
      // this._sharedService.getToasterMessageDisplay("Error", "File Could not be downloaded.", "error");
      //console.log("error");
    }
  });
}


private allEmployees:any=[];

getFilteredEmployees(searchStr:string) {
    console.log("searchStr ",searchStr)
  let filtered: any = [];
  filtered = _.filter(this.allEmployees, function(emp:any){ 
    let empname = emp['empname']?.toLowerCase();    
    let empid = emp['empid'].toString();
      return (empname.includes(searchStr?.toLowerCase()) || empid.includes(searchStr)); 
    });
  return filtered;
}


isDateBetween(target: Date, start: Date, end: Date): boolean {
  // Strip time part by setting the time to midnight (00:00)
  const targetDateOnly = new Date(target.setHours(0, 0, 0, 0));
  const startDateOnly = new Date(start.setHours(0, 0, 0, 0));
  const endDateOnly = new Date(end.setHours(0, 0, 0, 0));

  return targetDateOnly >= startDateOnly && targetDateOnly <= endDateOnly;
}


private _CRstatus = new Subject<any>();
CRstatus$ = this._CRstatus.asObservable();
  setCRstatus(CRstatus:any) {    
    this._CRstatus.next(CRstatus);
  }



 // Function to Remove <script> Tags
 public sanitizeContent(content: string): string {
  return content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}


}
