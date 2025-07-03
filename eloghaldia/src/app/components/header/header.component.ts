import { Component } from '@angular/core';

import { UtilityHttpService } from '../../services/utility-http.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(private httpService:UtilityHttpService){}

emp_name:any;

ngOnInit() {
this.httpService.loginObj$
    .subscribe({
      next: (result) => {
        this.emp_name=result.loginObj['displayName'];
      },
      error: (error) => console.log(error)
    });
}
}
