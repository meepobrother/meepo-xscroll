import {
    Component, OnInit, ViewChild, ElementRef, Input,
    ViewEncapsulation, Output, EventEmitter, TemplateRef,
    ContentChild, ChangeDetectionStrategy, ChangeDetectorRef,
    AfterContentChecked, AfterContentInit, AfterViewInit,
    HostBinding
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class XscrollComponent implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked {
    @Output() onLoad: EventEmitter<any> = new EventEmitter();
    @Output() onRefresh: EventEmitter<any> = new EventEmitter();
    @Output() onInit: EventEmitter<any> = new EventEmitter();
    _items: any[] = [];
    @Input()
    set items(val: any[]) {
        if (val) {
            this._items = val;
            this.cd.markForCheck();
        }
    }
    get items() {
        return this._items;
    }
    @Input() hasMore = true;
    @Input() hasRefresh = true;

    @HostBinding('class.full') _full: boolean = false;
    @Input()
    set full(val: boolean) {
        this._full = val;
    }

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
        this.xscroll.pulldown$.debounceTime(100).subscribe(res => {
            this.onRefresh.emit(this.xscroll.pulldownSuccess$);
        });
        this.xscroll.pullup$.debounceTime(100).subscribe(res => {
            this.onLoad.emit(this.xscroll.pullupSuccess$);
        });
    }

    xscrollInit(X) {
        if (X) {
            const xscroll = new X({
                renderTo: this.ele.nativeElement,
                ...this.config
            });
            this.xscroll.init(X, xscroll,
                { hasMore: this.hasMore, hasRefresh: this.hasRefresh }
            )
        }
    }

    ngOnInit() {
        let cfg: XscrollConfig = new XscrollConfig();
        cfg = { ...cfg, ...{ pulldown: this.hasMore, pullup: this.hasRefresh } };
        this.onInit.emit(this);
        this.loader.loadAll(cfg);
    }

    scrollTop() {
        this.xscroll.scrollTop();
    }

    ngAfterContentChecked() {
        this.onEnd();
    }

    ngAfterContentInit() {
        this.onEnd();
    }

    ngAfterViewInit() {
        this.onEnd();
    }

    onEnd() {
        this.xscroll.renderSuccess$.next();
    }
}