import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[xscrollRef]' })
export class XscrollRefDirective {
    constructor(
        public templateRef: TemplateRef<any>
    ) { }
}