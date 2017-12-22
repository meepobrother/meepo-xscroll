import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XscrollService } from './xscroll.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [],
    providers: [],
})
export class XscrollModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: XscrollModule,
            providers: [
                XscrollService
            ]
        }
    }
}
export { XscrollService } from './xscroll.service';
