import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { UtilityEndpointsService } from './utility-endpoints.service';
import * as CryptoJS from 'crypto-js';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UtilityHttpService {
  private baseUrl = environment.baseurl;
  public isLoading = true;

  constructor(
    private httpClient: HttpClient,
    private endpointservice: UtilityEndpointsService
  ) {}

  private _rolemenuObj = new Subject<any>();
  public rolemenuObj: any = {};
  rolemenuObj$ = this._rolemenuObj.asObservable();

  setRolemenuObj(rolemenuObj: any) {
    console.log("Role menu object set:", rolemenuObj);
    this._rolemenuObj.next(rolemenuObj);
    this.rolemenuObj = rolemenuObj;
  }

  private _loginObj = new Subject<any>();
  public createdby = '';
  loginObj$ = this._loginObj.asObservable();

  setloginObj(loginObj: any) {
    this.createdby = `${loginObj['extension_6d1109881ca84719973dbff443d7b820_employeeNumber']}:${loginObj['displayName']}:${loginObj['mail']}`;
    this._loginObj.next({
      loginObj,
      loginempid: loginObj['extension_6d1109881ca84719973dbff443d7b820_employeeNumber'],
      loginempname: loginObj['displayName'],
      loginempmailid: loginObj['mail'],
      loginempmob: loginObj['mobilePhone'],
      createdby: this.createdby
    });
  }

  /**
   * 🔥 Generic POST method (previously missing)
   */
  post(endpoint: string, reqbody: any): Observable<any> {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    const body = JSON.stringify(reqbody);
    const encryptedPayload = this.cipher(body);

    return this.httpClient.post(
      this.baseUrl + this.endpointservice.endpointapis[endpoint],
      { encryptedbody: encryptedPayload },
      { headers }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * 🔥 Save or update shift readings
   */
  editShiftReadings(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    const encryptedPayload = this.cipher(JSON.stringify(data));

    return this.httpClient.post(
      this.baseUrl + this.endpointservice.endpointapis.saveLstgunit1Readings,
      { encryptedbody: encryptedPayload },
      { headers }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // /**
  //  * 🔥 Get shift readings
  //  */
  // getShiftReadings(shiftdate: string, shiftname: string): Observable<any> {
  //   const headers = new HttpHeaders({ 'content-type': 'application/json' });
  //   const url = `${this.baseUrl}${this.endpointservice.endpointapis.getLstgunit1Readings}?shiftdate=${shiftdate}&shiftname=${shiftname}`;

  //   return this.httpClient.get(url, { headers }).pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   );
  // }

  /**
   * 🔥 Upload multiple files (CSV, etc.)
   */
  postMultipleUpload(endpoint: string, formData: FormData): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'enctype': 'multipart/form-data' }) };
    httpOptions.headers.delete('Content-Type');

    return this.httpClient.post(
      this.baseUrl + this.endpointservice.endpointapis[endpoint],
      formData,
      httpOptions
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * 🔥 Download file as blob
   */
  downloadFileRequest(url: string, payload?: {}): Observable<any> {
    return this.httpClient.get(this.baseUrl + url, {
      params: payload,
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }).pipe(
      map(res => res),
      catchError(async (err) => {
        console.log("Error in file download:", err);
      })
    );
  }

  /**
   * 🔥 Error handler
   */
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  /**
   * 🔒 AES encryption
   */
  cipher(payload: string): string {
    const key = CryptoJS.enc.Utf8.parse(environment.secretkey);
    const iv = CryptoJS.enc.Utf8.parse(environment.secretkey.substring(0, 16));
    const encryptedData = CryptoJS.AES.encrypt(payload, key, {
      iv: iv,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encryptedData.ciphertext);
  }

  /**
   * 🔓 AES decryption
   */
  decipher(ciphertext: string): string {
    try {
      const iv = CryptoJS.enc.Utf8.parse('elogsecretkey'.substring(0, 16));
      const result = CryptoJS.AES.decrypt(
        ciphertext,
        CryptoJS.enc.Utf8.parse('elogsecretkey'),
        { iv, mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.Pkcs7 }
      );
      return result.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.log("Error in decryption:", error);
      return '';
    }
  }
}
