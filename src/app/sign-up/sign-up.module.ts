import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpService } from './services/sign-up.service';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { ToastMessageService } from '../shared/services/toast-message.service';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SignUpRoutingModule,
    //ToastrModule.forRoot({ positionClass: 'toast-top-right' }),
  ],
  providers: [SignUpService],
})
export class SignUpModule {}
