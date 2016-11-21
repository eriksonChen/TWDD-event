import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RecaptchaModule } from 'ng2-recaptcha';
// import { Ng2GoogleRecaptchaModule }  from 'ng2-google-recaptcha';
import { AppRoutingModule } from './app-routing.module';
import { TwddServiceService } from './twdd-service.service';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { DetailsComponent } from './details/details.component';
import { QaComponent } from './qa/qa.component';
import { PopComponent } from './pop/pop.component';
import { HistoryComponent } from './history/history.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    DetailsComponent,
    QaComponent,
    PopComponent,
    HistoryComponent,
    ExchangeComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot()
  ],
  providers: [TwddServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
