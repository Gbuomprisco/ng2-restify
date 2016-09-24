import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './app.routes';
import {AppComponent} from './app';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, Http} from '@angular/http';

import {Home} from './home/home';

import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {UsersProvider} from './provider';
import {RestifyProvider} from '../../src/index';

@NgModule({
  declarations: [AppComponent, Home],
  imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  providers   : [UsersProvider,
        {
            provide: RestifyProvider,
            useFactory: (http: Http) => {
                return new RestifyProvider(http);
            },
            deps: [Http]
        },
        {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
