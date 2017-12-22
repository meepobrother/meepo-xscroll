# xscroll for angular

```ts
import { XscrollModule } from 'meepo-xscroll';
@NgModule({
  imports: [
    XscrollModule.forRoot()
  ]
})
export class AppModule { }


```

```html
<div class="flex">
    <div class="row">
        <xscroll [items]="items" (onLoad)="onLoad($event)" (onRefresh)="onRefresh($event)">
            <ng-template xscrollRef let-item>
                <div>{{item}}</div>
            </ng-template>
        </xscroll>
    </div>
    <div class="row">
        <xscroll [items]="items" (onLoad)="onLoad($event)" (onRefresh)="onRefresh($event)">
            <ng-template xscrollRef let-item>
                <div>{{item}}</div>
            </ng-template>
        </xscroll>
    </div>
</div>
```

```ts
export class AppComponent implements OnInit {
  items: any[] = [];
  constructor(
    public cd: ChangeDetectorRef
  ) { }
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
}

```