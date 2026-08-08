import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TicketFormComponent,
    TicketListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // habilita las peticiones HTTP asíncronas hacia la API REST
    FormsModule,       // habilita ngModel para el formulario reactivo por template
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
