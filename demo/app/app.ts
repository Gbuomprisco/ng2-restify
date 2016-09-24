import {Component} from '@angular/core';
import {RestifyProvider} from '../../src/index';

@Component({
  selector   : 'app',
  templateUrl: './app.html',
})
export class AppComponent {
    constructor(private restify: RestifyProvider) {
        restify.configurator.setUniversalHeaders([{
            'Authentication': 'Basic 123'
        }]);
    }
}
