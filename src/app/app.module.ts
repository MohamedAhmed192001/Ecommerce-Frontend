import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ProductsModule } from './modules/products/products.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AdminModule } from './modules/admin/admin.module';
import { HomeComponent } from './modules/home/components/home/home.component';
import { HomeModule } from './modules/home/home.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactMessageComponent } from './shared/components/navbar/contact-message/contact-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './shared/components/navbar/about-us/about-us.component';
import { MyMessagesComponent } from './shared/components/navbar/contact-message/my-messages/my-messages.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContactMessageComponent,
    AboutUsComponent,
    MyMessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ProductsModule,
    AdminModule,
    HomeModule,
    PaymentModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true
      }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
