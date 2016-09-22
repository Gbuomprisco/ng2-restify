import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";

import {Home} from './home/home';

import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {UsersProvider} from './provider';

@NgModule({
  declarations: [AppComponent, Home],
  imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  providers   : [UsersProvider, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
