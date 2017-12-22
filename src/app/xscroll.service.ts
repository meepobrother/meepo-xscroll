import { Injectable } from '@angular/core';
declare const require: any;
const xscroll = require('xscroll');

@Injectable()
export class XscrollService {

    constructor() { 
        console.log(xscroll);
    }
}