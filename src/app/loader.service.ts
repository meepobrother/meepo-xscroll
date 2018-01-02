import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export const loadMaps: any = {};
import { DOCUMENT } from '@angular/common';
import { LoaderService as Loader } from 'meepo-loader';
@Injectable()
export class LoaderService {
    load$: Subject<any> = new Subject();
    XScroll: any;
    libs: any = XSCROLL_CONFIG;
    constructor(
        public loader: Loader
    ) { }

    xscrollInit(XScroll: any) {
        this.XScroll = XScroll;
        this.load$.next(this.XScroll);
    }

    loadAll(cfg: any) {
        let srcs: string[] = [];
        srcs.push(this.libs.baseUrl + this.libs.xscroll);
        if (cfg.infinite) {
            srcs.push(this.libs.baseUrl + this.libs.infinite);
        }
        if (cfg.pullup) {
            srcs.push(this.libs.baseUrl + this.libs.pullup);
        }
        if (cfg.pulldown) {
            srcs.push(this.libs.baseUrl + this.libs.pulldown);
        }
        if (cfg.lazyload) {
            srcs.push(this.libs.baseUrl + this.libs.lazyload);
        }
        if (cfg.snap) {
            srcs.push(this.libs.baseUrl + this.libs.snap);
        }
        if (cfg.scale) {
            srcs.push(this.libs.baseUrl + this.libs.scale);
        }
        this.loader.import(srcs).subscribe(res => {
            if (res) {
                this.xscrollInit(window['XScroll']);
            }
        });
    }
}

export class XscrollConfig {
    infinite: boolean = false;
    pullup: boolean = false;
    pulldown: boolean = false;
    lazyload: boolean = false;
    snap: boolean = false;
    scale: boolean = false;
}


export const XSCROLL_CONFIG = {
    baseUrl: 'https://xscroll.github.io/node_modules/xscroll/build/standalone/',
    snap: 'plugins/snap.min.js',
    scale: 'plugins/scale.min.js',
    xscroll: 'xscroll.min.js',
    infinite: 'plugins/infinite.min.js',
    pullup: 'plugins/pullup.min.js',
    lazyload: 'plugins/lazyload.min.js',
    pulldown: 'plugins/pulldown.min.js',
}