import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    // ...otros módulos...
    AppRoutingModule, HttpClientModule
  ],
  // ...
})
export class AppModule { }