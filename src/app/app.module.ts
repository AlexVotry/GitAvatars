import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarsComponent } from './avatars/avatars.component';
import { ApiService } from './service/api.service';
import { AvatarService } from './service/data.service';

@NgModule({
  declarations: [
    AppComponent,
    AvatarsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService, AvatarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
