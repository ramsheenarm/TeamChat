import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { UserProfileComponent } from './chat/user-profile/user-profile.component';
import { ChatService } from './chat.service';
import { MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChatModule,
    SharedModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule

  ],
  entryComponents: [UserProfileComponent],
  providers: [ChatService],
  bootstrap: [AppComponent,],
  
})
export class AppModule { }
