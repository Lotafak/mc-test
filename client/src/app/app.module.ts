import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestHelperComponent } from './test-helper/test-helper.component';
import { EntriesListComponent } from './entries-list/entries-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TestHelperComponent,
    EntriesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
