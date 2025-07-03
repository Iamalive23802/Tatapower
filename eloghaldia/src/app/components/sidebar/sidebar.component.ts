import { Component } from '@angular/core';
// import { PrimeIcons, MenuItem } from 'primeng/api';
import { UtilityHttpService } from 'src/app/services/utility-http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 
  constructor(private httpService:UtilityHttpService){}

rolemenuObj:any=[];

ngOnInit() {  
  this.httpService.isLoading = true;
  this.httpService.rolemenuObj$
    .subscribe({
      next: (result) => {
         console.log("result",result);
        // //console.log("result",result.data);
        // //console.log("result",result.data.menu);
        this.rolemenuObj=result?.menu;
      },
      error: (error) => console.log("error in setting role and menu ",error)
    });
    
    this.httpService.isLoading = false;
}
}
