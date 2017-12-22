import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XscrollService } from './xscroll.service';
import { XscrollComponent } from './xscroll/xscroll';
import { XscrollRefDirective } from './xscroll/xscroll.ref';

import { LoaderService } from './loader.service';
import { IsEndDirective } from './isend';

@NgModule({
    declarations: [
        XscrollComponent,
        IsEndDirective,
        XscrollRefDirective
    ],
    imports: [CommonModule],
    exports: [
        XscrollComponent,
        IsEndDirective,
        XscrollRefDirective
    ],
    providers: [],
})
export class XscrollModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: XscrollModule,
            providers: [
                XscrollService,
                LoaderService
            ]
        }
    }
}
export { XscrollService } from './xscroll.service';
