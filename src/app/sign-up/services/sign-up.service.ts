import { SignUpModel } from './../models/sign-up.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  public apiUrl = environment.API_URL;

  constructor(private https: HttpClient) {}

  /* createSignUp method taking formData as a parameter 
    returns https post response
  */
  public createSignUp(formData: SignUpModel[]): Observable<SignUpModel[]> {
    return this.https.post<SignUpModel[]>(`${this.apiUrl}`, formData);
  }
}
