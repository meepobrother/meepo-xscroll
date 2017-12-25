import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/zip";
import "rxjs/add/operator/take";
import "rxjs/add/operator/debounceTime";

import { LoaderService } from './loader.service';
@Injectable()
export class XscrollService {

    inited$: Subject<any> = new Subject();

    pulldown$: Subject<any> = new Subject();
    pullup$: Subject<any> = new Subject();

    pullupSuccess$: Subject<any> = new Subject();
    pulldownSuccess$: Subject<any> = new Subject();

    renderSuccess$: Subject<any> = new Subject();

    XScroll: any;
    // 下拉刷新
    pulldown: any;
    // 上啦加载
    pullup: any;
    // 实例
    _xscroll: any;

    time: any = new Date().getTime();
    cfg: any;

    loading: boolean = false;
    constructor(
        public loader: LoaderService
    ) {
        this.pulldownSuccess$.subscribe(res => {
            this.pulldown.reset(() => {
                this.loading = false;
            });
        });
        this.pullupSuccess$.subscribe(res => {
            this.pullup.complete();
            this.loading = false;
        });
        this.renderSuccess$.debounceTime(300).subscribe(res => {
            if (this._xscroll) {
                this._xscroll.render();
            }
        });
    }

    init(x: any, s: any, cfg: any) {
        // console.log('init');
        this.cfg = cfg;
        this._xscroll = s;
        this.XScroll = x;
        if (cfg.hasRefresh) {
            // 注册下拉刷新组件
            this.pulldown = new this.XScroll.Plugins.PullDown({
                autoRefresh: false,
                downContent: '下拉刷新',
                upContent: '释放刷新',
                loadingContent: `<i class="weui-loading"></i>加载中...`,
                bufferHeight: 0
            });
            this._xscroll.plug(this.pulldown);
            this.pulldown.on("loading", (e) => {
                // 执行下拉刷新
                if (!this.loading) {
                    this.loading = true;
                    this.pulldown$.next(e);
                }
            });
        }
        if (cfg.hasMore) {
            // 注册上啦加载
            this.pullup = new this.XScroll.Plugins.PullUp({
                upContent: "上拉加载更多...",
                downContent: "释放加载...",
                loadingContent: `<i class="weui-loading"></i>加载中...`,
                bufferHeight: 0
            });
            this._xscroll.plug(this.pullup);
            this.pullup.on("loading", (e) => {
                if (!this.loading) {
                    this.loading = true;
                    this.pullup$.next(e);
                }
            });
        }
        this._xscroll.render();
    }

    test() {
        setTimeout(() => {
            this.pulldownSuccess$.next();
            this.pullupSuccess$.next();
        }, 1000)
    }


}