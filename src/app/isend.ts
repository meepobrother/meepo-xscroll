import { Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[isEnd]' })
export class IsEndDirective {
    @Input()
    set isEnd(val: boolean) {
        if (val) {
            this.onEnd.emit(val);
        }
    }
    @Output() onEnd: EventEmitter<any> = new EventEmitter();
    constructor() { }
}