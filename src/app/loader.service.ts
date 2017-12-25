import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export const loadMaps: any = {};
import { DOCUMENT } from '@angular/common';
@Injectable()
export class LoaderService {
    load$: Subject<any> = new Subject();

    _xscroll$: Subject<any> = new Subject();
    _infinite$: Subject<any> = new Subject();
    _pullup$: Subject<any> = new Subject();
    _lazyload$: Subject<any> = new Subject();
    _snap$: Subject<any> = new Subject();
    _pulldown$: Subject<any> = new Subject();
    _scale$: Subject<any> = new Subject();

    XScroll: any;

    time: any = new Date().getTime();
    hasLoaded: boolean = false;

    libs: any = {
        xscroll: {
            src: 'https://xscroll.github.io/node_modules/xscroll/build/standalone/xscroll.min.js',
        },
        infinite: {
            src: 'https://xscroll.github.io/node_modules/xscroll/build/standalone/plugins/infinite.min.js',
        },
        pullup: {
            src: 'https://xscroll.github.io/node_modules/xscroll/build/standalone/plugins/pullup.min.js',
        },
        lazyload: {
            src: 'https://xscroll.github.io/node_modules/xscroll/build/standalone/plugins/lazyload.min.js',
        },
        pulldown: {
            src: 'https://xscroll.github.io/node_modules/xscroll/build/standalone/plugins/pulldown.min.js',
        },
        scale: {
            src: 'https://xscroll.github.io/node_modules/xscroll/build/standalone/plugins/scale.min.js',
        },
        snap: {
            src: 'https://xscroll.github.io/node_modules/xscroll/build/standalone/plugins/snap.min.js'
        }
    };
    constructor(
        @Inject(DOCUMENT) public document: any
    ) { }

    loadXscroll() {
        this._loadSrc(this.libs.xscroll.src, 'XScroll', () => {
            this._xscroll$.next(window['XScroll']);
        });
    }

    loadInfinite() {
        this._loadSrc(this.libs.infinite.src, 'XScroll.Plugins.Infinite', () => {
            this._infinite$.next(window['XScroll']);
        });
    }

    loadPullup() {
        this._loadSrc(this.libs.pullup.src, 'XScroll.Plugins.PullUp', () => {
            this._pullup$.next(window['XScroll']);
        });
    }

    loadPulldown() {
        this._loadSrc(this.libs.pulldown.src, 'XScroll.Plugins.PullDown', () => {
            this._pulldown$.next(window['XScroll']);
        });
    }

    loadLazyload() {
        this._loadSrc(this.libs.lazyload.src, 'XScroll.Plugins.LazyLoad', () => {
            this._lazyload$.next(window['XScroll']);
        });
    }

    loadSnap() {
        this._loadSrc(this.libs.snap.src, 'XScroll.Plugins.Snap', () => {
            this._snap$.next(window['XScroll']);
        });
    }

    loadScale() {
        this._loadSrc(this.libs.scale.src, 'XScroll.Plugins.Scale', () => {
            this._scale$.next(window['XScroll']);
        });
    }

    _loadSrc(src: string, name: string, cb?: any) {
        if (loadMaps[name]) {
            this.load$.next({ name: name, libs: loadMaps[name] });
        } else {
            const script = this.document.createElement('script');
            script.src = src;
            script.type = 'text/javascript';
            script.onload = () => {
                loadMaps[name] = window[name];
                if (cb) {
                    cb(window[name]);
                } else {
                    this.load$.next({ name: name, libs: window[name] });
                }
            };
            this.document.getElementsByTagName('head')[0].appendChild(script);
        }
        return this;
    }

    xscrollInit(XScroll: any) {
        this.XScroll = XScroll;
        this.load$.next(this.XScroll);
    }

    loadAll(cfg: any) {
        if (!this.hasLoaded) {
            let srcs: any[] = [];
            if (cfg.infinite) {
                let infinite$ = this._infinite$.asObservable();
                srcs.push(infinite$);
            }
            if (cfg.pullup) {
                let pullup$ = this._pullup$.asObservable();
                srcs.push(pullup$);
            }
            if (cfg.pulldown) {
                let pulldown$ = this._pulldown$.asObservable();
                srcs.push(pulldown$);
            }
            if (cfg.lazyload) {
                let lazyload$ = this._lazyload$.asObservable();
                srcs.push(lazyload$);
            }
            if (cfg.snap) {
                let snap$ = this._snap$.asObservable();
                srcs.push(snap$);
            }
            if (cfg.scale) {
                let scale$ = this._scale$.asObservable();
                srcs.push(scale$);
            }
            let xscroll$ = this._xscroll$.asObservable();
            xscroll$.combineLatest(
                ...srcs
            ).take(1).subscribe((res: any[]) => {
                this.XScroll = res[res.length - 1];
                if (this.XScroll) {
                    this.xscrollInit(this.XScroll);
                }
            });
            this._xscroll$.subscribe(res => {
                if (cfg.infinite) {
                    this.loadInfinite();
                }
                if (cfg.pullup) {
                    this.loadPullup();
                }
                if (cfg.pulldown) {
                    this.loadPulldown();
                }
                if (cfg.lazyload) {
                    this.loadLazyload();
                }
                if (cfg.snap) {
                    this.loadSnap();
                }
                if (cfg.scale) {
                    this.loadScale();
                }
            });
            this.loadXscroll();
            this.hasLoaded = true;
        } else {
            if (this.XScroll) {
                this.xscrollInit(this.XScroll);
            }
        }
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
