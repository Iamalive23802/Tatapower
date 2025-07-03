import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication } from '@azure/msal-browser';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { TgdcsComponent } from './components/allformats/tgdcs/tgdcs.component';
import { BoilerandbopComponent } from './components/allformats/boilerandbop/boilerandbop.component';
import { FieldoperationComponent } from './components/allformats/fieldoperation/fieldoperation.component';
import { ManningComponent } from './components/allformats/manning/manning.component';
import { ShiftactivitiessiComponent } from './components/allformats/shiftactivitiessi/shiftactivitiessi.component';
import { ShiftactivitiesComponent } from './components/allformats/shiftactivities/shiftactivities.component';
import { Lstgunit1Component } from './components/allformats/tgdcscomponents/lstgunit1/lstgunit1.component';
import { Lstgunit2Component } from './components/allformats/tgdcscomponents/lstgunit2/lstgunit2.component';
import { Lstgunit3Component } from './components/allformats/tgdcscomponents/lstgunit3/lstgunit3.component';
import { Lstsiunit1Component } from './components/allformats/tgdcscomponents/lstsiunit1/lstsiunit1.component';
import { Lstsiunit2Component } from './components/allformats/tgdcscomponents/lstsiunit2/lstsiunit2.component';
import { Lstsiunit3Component } from './components/allformats/tgdcscomponents/lstsiunit3/lstsiunit3.component';
import { LsauxeqpmntComponent } from './components/allformats/tgdcscomponents/lsauxeqpmnt/lsauxeqpmnt.component';
import { LsislandingComponent } from './components/allformats/tgdcscomponents/lsislanding/lsislanding.component';
import { BoilerLogsheetComponent } from './components/allformats/boilerandbopcomponents/boiler-logsheet/boiler-logsheet.component';
import { BoilerHpdpAgitatorComponent } from './components/allformats/boilerandbopcomponents/boiler-hpdp-agitator/boiler-hpdp-agitator.component';
import { BoilerIdfanStatusComponent } from './components/allformats/boilerandbopcomponents/boiler-idfan-status/boiler-idfan-status.component';
import { BopLogsheetComponent } from './components/allformats/boilerandbopcomponents/bop-logsheet/bop-logsheet.component';
import { BoilerDamperStatusComponent } from './components/allformats/boilerandbopcomponents/boiler-damper-status/boiler-damper-status.component';
import { BoilerRow12FieldComponent } from './components/fieldoperationscomponents/boiler-row1-2-field/boiler-row1-2-field.component';
import { BoilerRow34FieldComponent } from './components/fieldoperationscomponents/boiler-row3-4-field/boiler-row3-4-field.component';
import { TgFieldComponent } from './components/fieldoperationscomponents/tg-field/tg-field.component';
import { LogsheetBoilerRow12Component } from './components/fieldoperationscomponents/logsheet-boiler-row1-2/logsheet-boiler-row1-2.component';
import { LogsheetPumphouseComponent } from './components/fieldoperationscomponents/logsheet-pumphouse/logsheet-pumphouse.component';
import { LogsheetBoilerRow34Component } from './components/fieldoperationscomponents/logsheet-boiler-row3-4/logsheet-boiler-row3-4.component';
import { LogsheetCompressorComponent } from './components/fieldoperationscomponents/logsheet-compressor/logsheet-compressor.component';
import { LogsheetTgZeroUnit1Component } from './components/fieldoperationscomponents/logsheet-tg-zero-unit1/logsheet-tg-zero-unit1.component';
import { LogsheetTgZeroUnit2Component } from './components/fieldoperationscomponents/logsheet-tg-zero-unit2/logsheet-tg-zero-unit2.component';
import { LogsheetTgZeroUnit3Component } from './components/fieldoperationscomponents/logsheet-tg-zero-unit3/logsheet-tg-zero-unit3.component';
import { LogsheetTgCommonComponent } from './components/fieldoperationscomponents/logsheet-tg-common/logsheet-tg-common.component';
import { LogsheetElectricalEqComponent } from './components/fieldoperationscomponents/logsheet-electrical-eq/logsheet-electrical-eq.component';
import { TsiUnit1Component } from './components/fieldoperationscomponents/tsi-unit1/tsi-unit1.component';
import { TsiUnit2Component } from './components/fieldoperationscomponents/tsi-unit2/tsi-unit2.component';
import { TsiUnit3Component } from './components/fieldoperationscomponents/tsi-unit3/tsi-unit3.component';
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
export function loggerCallback(logLevel: LogLevel, message: string) {}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId:'5f9be723-437a-4a3f-9737-8839f57e0cf1',
      authority:'https://login.microsoftonline.com/04ea39e3-ac5b-4971-937c-8344c97a4509/',
      redirectUri:'http://localhost:4200/'
      //uat redirect url
        // redirectUri:'https://webappdev.tatapower.com/eloghaldia/'
        //prod redirect url
        // redirectUri:'https://webapps.tatapower.com/eloghaldia/'
        
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: isIE,
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/beta/me', ['user.read']);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    EquipmentComponent,
    TgdcsComponent,
    BoilerandbopComponent,
    FieldoperationComponent,
    ManningComponent,
    ShiftactivitiessiComponent,
    ShiftactivitiesComponent,
    Lstgunit1Component,
    Lstgunit2Component,
    Lstgunit3Component,
    Lstsiunit1Component,
    Lstsiunit2Component,
    Lstsiunit3Component,
    LsauxeqpmntComponent,
    LsislandingComponent,
    BoilerLogsheetComponent,
    BoilerandbopComponent,
    BoilerHpdpAgitatorComponent,
    BoilerIdfanStatusComponent,
    BoilerDamperStatusComponent,
    BopLogsheetComponent,
    BoilerRow12FieldComponent,
    BoilerRow34FieldComponent,
    TgFieldComponent,
    LogsheetBoilerRow12Component,
    LogsheetPumphouseComponent,
    LogsheetBoilerRow34Component,
    LogsheetCompressorComponent,
    LogsheetTgZeroUnit1Component,
    LogsheetTgZeroUnit2Component,
    LogsheetTgZeroUnit3Component,
    LogsheetTgCommonComponent,
    LogsheetElectricalEqComponent,
    TsiUnit1Component,
    TsiUnit2Component,
    TsiUnit3Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    CalendarModule,
    ToastModule,
    PanelModule,
    TabViewModule,
    ChipModule,
    AutoCompleteModule,
    AngularEditorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
