import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { XscrollModule } from '../../src/app/app';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    XscrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

