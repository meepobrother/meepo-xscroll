import {
    Component, OnInit, ViewChild, ElementRef, Input,
    ViewEncapsulation, Output, EventEmitter, TemplateRef, 
    ContentChild, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { XscrollService } from '../xscroll.service';
import { LoaderService, XscrollConfig } from '../loader.service';
import { XscrollRefDirective } from './xscroll.ref';
@Component({
    selector: 'xscroll',
    templateUrl: './xscroll.html',
    styleUrls: [
        './xscroll.scss'
    ],
    providers: [
        XscrollService
    ],
    exportAs: 'xscroll',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class XscrollComponent implements OnInit {
    @Output() onLoad: EventEmitter<any> = new EventEmitter();
    @Output() onRefresh: EventEmitter<any> = new EventEmitter();

    _items: any[] = [];
    @Input() 
    set items(val: any[]){
        if(val){
            this._items = val;
            this.cd.markForCheck();
        }
    }
    get items(){
        return this._items;
    }
    @Input() hasMore = true;
    @Input() hasRefresh = true;

    @ContentChild(XscrollRefDirective) xscrollRef: XscrollRefDirective;
    XScroll: any;
    config: any = {
        scrollbarX: false,
        scrollbarY: true,
        lockX: true,
        lockY: false
    };
    constructor(
        public xscroll: XscrollService,
        public ele: ElementRef,
        public loader: LoaderService,
        public cd: ChangeDetectorRef
    ) {
        // 加载成功后初始化
        this.loader.load$.take(1).subscribe(res => {
            this.xscrollInit(res);
        });
        this.xscroll.pulldown$.subscribe(res => {
            this.onRefresh.emit(this.xscroll.pulldownSuccess$);
        });
        this.xscroll.pullup$.subscribe(res => {
            this.onLoad.emit(this.xscroll.pullupSuccess$);
        });
    }

    xscrollInit(X) {
        const xscroll = new X({
            renderTo: this.ele.nativeElement,
            ...this.config
        });
        this.xscroll.init(X, xscroll,
            { hasMore: this.hasMore, hasRefresh: this.hasRefresh }
        )
    }

    ngOnInit() {
        let cfg: XscrollConfig = new XscrollConfig();
        cfg = { ...cfg, ...{ pulldown: this.hasMore, pullup: this.hasRefresh } };
        this.loader.loadAll(cfg);
    }

    onEnd() {
        this.xscroll.renderSuccess$.next();
    }
}