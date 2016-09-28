import {Component} from '@angular/core';
import {RestifyProvider} from '../../src/index';

@Component({
  selector   : 'app',
  template: require('./app.html'),
})
export class AppComponent {
    constructor(private restify: RestifyProvider) {
        restify.configurator.setUniversalHeaders([{
            'Authentication': 'Basic 123'
        }]);
    }
}
