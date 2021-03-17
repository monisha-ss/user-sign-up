import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SignUpService } from './sign-up.service';
import { SignUpModel } from '../models/sign-up.model';

describe('SignUpService', () => {
  let signUpservice: SignUpService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [SignUpService],
    });
    //Instantaites HttpClient, HttpTestingController and SignUpService
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    signUpservice = TestBed.inject(SignUpService);
  });

  afterEach(() => {
    //Verifies that no requests are outstanding.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(signUpservice).toBeTruthy();
  });

  it('should add an user and return it', () => {
    const signUp: SignUpModel[] = [
      {
        firstName: 'Gerald',
        lastName: 'Velsudhien',
        email: 'gerald@gmail.com',
        password: 'Amsterdam',
      },
    ];
    signUpservice
      .createSignUp(signUp)
      .subscribe(
        (data) =>
          expect(data).toEqual(signUp, 'should return the user details'),
        fail
      );
    const req = httpTestingController.expectOne(signUpservice.apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(signUp);
    const expectedResponse = new HttpResponse({
      status: 200,
      statusText: 'Created',
      body: signUp,
    });
    req.event(expectedResponse);
  });
});
