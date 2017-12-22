import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { XscrollService } from '../../src/app/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'app';
  items: any[] = [];
  constructor(
    public cd: ChangeDetectorRef
  ) {
    
  }
  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.items.push(i);
    }
  }

  onRefresh(e: any) {
    this.items = [];
    for (let i = 0; i < 10; i++) {
      this.items.push(i);
    }
    e.next();
  }

  onLoad(e: any) {
    let len = this.items.length;
    for (let i = len; i < len + 10; i++) {
      this.items.push(i);
    }
    e.next();
  }

  onEnd(){
    // this.xscroll.renderSuccess$.next();
  }
}
