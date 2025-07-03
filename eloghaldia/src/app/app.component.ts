import { Component, Inject } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Observable, Subject } from 'rxjs';
import { filter,takeUntil } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { UtilityHttpService } from './services/utility-http.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'elog';
  emp_name: any;
  isIframe = false;
  loginDisplay = false;
  activeuser: any;
  currdate=new Date();
  private readonly _destroying$ = new Subject<void>();
  constructor(private http: HttpClient, private authService: MsalService, @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private msalBroadcastService: MsalBroadcastService,public httpService:UtilityHttpService,private router: Router){}

ngOnInit() {
try{
  
  this.httpService.isLoading = true;
  if (performance.navigation.type === 1) {  // Detect page refresh
    this.router.navigate(['/']);
  }

  this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
     this.setLoginDisplay(); 
     this.getProfile(); 
     this.msalBroadcastService.inProgress$ 
       .pipe( 
         filter((status: InteractionStatus) => status === InteractionStatus.None), 
         takeUntil(this._destroying$) 
       ) 
       .subscribe(() => {
         this.setLoginDisplay();
         this.checkAndSetActiveAccount();
       })
      }catch (error) {
        console.error('Error fetching data:', error);
        this.httpService.isLoading = false;
      } finally {
        console.log('Loader stopped.');
        this.httpService.isLoading = false;
      }
  
 }
 
setLoginDisplay() {
  this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
}

checkAndSetActiveAccount() {
  /**
   * If no active account set but there are accounts signed in, sets first account to active account
   * To use active account set here, subscribe to inProgress$ first in your component
   * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
   */
  let activeAccount = this.authService.instance.getActiveAccount();
  if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
    let accounts = this.authService.instance.getAllAccounts();
    this.authService.instance.setActiveAccount(accounts[0]);
  }
  if (activeAccount) {
    this.activeuser = activeAccount.username;
    //checkmarx
    //sessionStorage.setItem('username', this.activeuser)
  }
}

getProfile()
{
  
  let rolemenuObj = {
    empid:"",
    empname:"",
    empemail:"",
    empmbnum:"",
    role: "",
    roledisplayname:"",
    menu: [],
    roleinchargeflag:false,
    currshiftmaster:{},
    shiftdate:new Date(),
    shiftname:"",
    location:"Haldia",
    unit:"Unit 1",
    currshiftmanning:{},
    prevshiftmanning:{},
    addeditflag: false
  }
    this.http.get('https://graph.microsoft.com/beta/me').subscribe(res=>
      {
         console.log("login user details",res);
        this.httpService.setloginObj(res);      
        let response:any = res;
        rolemenuObj.empid = response['extension_6d1109881ca84719973dbff443d7b820_employeeNumber'];
        rolemenuObj.empname = response['loginempname'];
        rolemenuObj.empemail = response['loginempmailid'];
        rolemenuObj.empmbnum = response['loginempmob'];
        let currshiftObj:any = {}
      //get shift details
      this.httpService.post("shiftdata",{}).subscribe(
        data => {
          console.log("see if you can see shiftdata data",data);
          let shiftdata = data.data;
          let currenttime=moment(this.currdate).format('HH:mm:ss');
          for(let i=0;i<shiftdata.length;i++){
            if(currenttime>=shiftdata[i].shiftstarttime  && currenttime <= shiftdata[i].shiftendtime){
            currshiftObj = shiftdata[i];
            if(currenttime <= shiftdata[i].shiftbufferendtime){
              rolemenuObj.addeditflag = true; 
            }
            break;
          }else{
            let shiftmasterarr=shiftdata
            currshiftObj = shiftmasterarr.filter((shiftmasterarr: any) => shiftmasterarr.shiftname ==='Shift A')?shiftmasterarr.filter((shiftmasterarr: { shiftname: string; }) => shiftmasterarr.shiftname ==='Shift A')[0]:{};
          }
          }  
          console.log("curr shift obj",currshiftObj);
          let currshiftname = currshiftObj?.shiftname; 
          rolemenuObj.currshiftmaster = currshiftObj;   
          rolemenuObj.shiftname = currshiftname;   
          this.httpService.post("shiftmanningdata",{
            shiftdate:moment(this.currdate).format('YYYY-MM-DD'),
            shiftname:currshiftname,
            empid:rolemenuObj.empid
          }).subscribe(
            manningdata => {
              console.log("see if you can see shiftmanningdata data",manningdata);   
              rolemenuObj.currshiftmanning=manningdata.currshiftmanning;
              rolemenuObj.prevshiftmanning=manningdata.prevshiftmanning;
              rolemenuObj.role = 'shiftincharge';
              rolemenuObj.menu = manningdata.data.menu;
              this.httpService.setRolemenuObj(rolemenuObj);  
          }
          );
        }
      );
      
       });
  
       this.httpService.setRolemenuObj(rolemenuObj);  
}

getRoleDisplayName(rolename:string): string {
  let roledisplayname: string;

  switch (rolename) {
    case 'fieldengineer':
      roledisplayname = 'Field engineer';
      break;      
    case 'shiftincharge':
      roledisplayname = 'Shift Incharge';
      break;
    case 'controlroomengineer':
      roledisplayname = 'Control room engineer';
      break;
    case 'roleincharge':
      roledisplayname = 'Shift Incharge';
      // roledisplayname = 'Super user';
      break;
    case 'user':
      roledisplayname = 'User';
      break;
    default:
      roledisplayname = 'Unauthorized';
      break;
  }

  return roledisplayname;
}

login() {
  this.authService.loginPopup()
    .subscribe({
      next: (result) => {
        this.setLoginDisplay();
      },
      error: (error) => console.log(error)
    });
}

loginRedirect() {
  if (this.msalGuardConfig.authRequest) {
    this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
  } else {
    this.authService.loginRedirect();
  }
}

loginPopup() {
  if (this.msalGuardConfig.authRequest) {
    this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
      });
  } else {
    this.authService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
      });
  }
}

logout(popup?: boolean) {
  if (popup) {
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
  } else {
    this.authService.logoutRedirect();
  }
}

ngOnDestroy(): void {
  this._destroying$.next(undefined);
  this._destroying$.complete();
}
showWelcomeMessage() {
  this.authService.instance.getActiveAccount + " to Microsoft Graph API";
}

}
