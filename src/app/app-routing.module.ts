import { ExchangeComponent } from './exchange/exchange.component';
import { DetailsComponent } from './details/details.component';
import { QaComponent } from './qa/qa.component';
import { HistoryComponent } from './history/history.component';
import { NoteComponent } from './note/note.component';
import { AppComponent } from './app.component';
import { PopComponent } from './pop/pop.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'pop',
    component:PopComponent,
    children: [
      { path: 'note', component: NoteComponent, data: {page: 'note'} },
      { path: 'history', component: HistoryComponent, data: {page: 'history'} },
      { path: 'details', component: DetailsComponent, data: {page: 'details'} },
      { path: 'qa', component: QaComponent, data: {page: 'qa'} },
      { path: 'exchange', component: ExchangeComponent, data: {page: 'exchange'} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
