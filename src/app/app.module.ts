import { StatisticsComponent } from './statistics/statistics.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { GlobalNavBarComponent } from './global-nav-bar/global-nav-bar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GlobalFooterComponent } from './global-footer/global-footer.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule } from '@angular/material/core';
import { PasswordFieldComponent } from './comonents/password-field/password-field.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    GlobalNavBarComponent,
    GlobalFooterComponent,
    LoginFormComponent,
    AuthComponent,
    RegisterComponent,
    PasswordFieldComponent
  ],
  imports: [
  HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatDatepickerModule,
    MatGridListModule,
    MatNativeDateModule,
    RouterModule.forRoot([
    ])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
