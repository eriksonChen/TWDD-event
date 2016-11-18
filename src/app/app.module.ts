import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { DetailsComponent } from './details/details.component';
import { QaComponent } from './qa/qa.component';
import { PopComponent } from './pop/pop.component';
import { HistoryComponent } from './history/history.component';
import { ExchangeComponent } from './exchange/exchange.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    DetailsComponent,
    QaComponent,
    PopComponent,
    HistoryComponent,
    ExchangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
