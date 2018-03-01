import {
  Component, Input, NgZone, ViewEncapsulation, ViewChild, OnInit, NgModule, trigger, state,
  animate, transition, style, OnDestroy
} from '@angular/core';
import {MatSidenav, MatSidenavModule, MatIconModule} from '@angular/material';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {switchMap} from 'rxjs/operators/switchMap';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {startWith} from 'rxjs/operators/startWith';
import {combineLatest} from 'rxjs/observable/combineLatest';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './component-sidenav.html',
  styleUrls: ['./component-sidenav.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentSidenav implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  params: Observable<Params>;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              zone: NgZone) {
    // TODO(josephperrott): Move to CDK breakpoint management once available.
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    // this._router.events.subscribe(() => {
    //   if (this.isScreenSmall()) {
    //     this.sidenav.close();
    //   }
    // });

    // Combine params from all of the path into a single object.
    // this.params = combineLatest(
    //   this._route.pathFromRoot.map(route => route.params),
    //   Object.assign);
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}

@Component({
  selector: 'app-component-nav',
  templateUrl: './component-nav.html',
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class ComponentNav implements OnInit, OnDestroy {

  @Input() params: Observable<Params>;
  expansions = {};
  private _onDestroy = new Subject<void>();

  constructor(private _router: Router) { }

  ngOnInit() {
    // this._router.events.pipe(
    //   startWith(null),
    //   switchMap(() => this.params),
    //   takeUntil(this._onDestroy)
    // ).subscribe(p => this.setExpansions(p));
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Gets the expanded state */
  _getExpandedState(category: string) {
    return this.getExpanded(category) ? 'expanded' : 'collapsed';
  }

  /** Toggles the expanded state */
  toggleExpand(category: string) {
    this.expansions[category] = !this.expansions[category];
  }

  /** Gets whether expanded or not */
  getExpanded(category: string): boolean {
    return this.expansions[category];
  }

  docItems =  [
    {
      id: 'account',
      name: 'Account',
      items: [
        {id: 'cashier', name: 'Cashier'},
        {id: 'current-bets', name: 'Current Bets'},
        {id: 'daily-figure', name: 'Daily Figure'},
        {id: 'weekly-figure', name: 'Weekly Figure'},
        {id: 'bet-history', name: 'Bet History'},
        {id: 'account history', name: 'Account History'},
        {id: 'casino-figure', name: 'Casino Daily Figure'},
        {id: 'cashback', name: 'Cashback'},
        {id: 'credit-registration', name: 'Credit Registration'},

        {id: 'settings', name: 'Settings'},
        {id: 'messenger', name: 'Messenger'},



      ]
    },
    {
      id: 'casino',
      name: 'Casino',
      items: [
        {id: 'casino-mini', name: 'Casino Mini'},
        {id: 'casino-live', name: 'Casino Live'},
        {id: 'live-dealer', name: 'Live Dealer'},
      ]
    },
    {
      id: 'racebook',
      name: 'Racebook',
      items: [
        {id: 'racebook-live', name: 'Racebook'},
        {id: 'racebook-virtual', name: 'Racebook Virtual'},
      ]
    },
    {
      id: 'poker',
      name: 'Poker',
    },
    {
      id: 'live-betting',
      name: 'Live Betting',
      items: [
        {id: 'live', name: 'Heritage Live'},
        {id: 'live-betting-how-to', name: 'How to play'},
      ]
    },
    {
      id: 'player-props',
      name: 'Player Props',
      items: [
        {id: 'player-props-item', name: 'Player Props'},
        {id: 'player-props-how-to', name: 'How to play'},
      ]
    },
    {
      id: 'scores',
      name: 'Scores'
    },
    {
      id: 'feedback',
      name: 'Feedback'
    }
    ];

}


@NgModule({
  imports: [
    MatSidenavModule,
    RouterModule,
    CommonModule,
    MatIconModule,
  ],
  exports: [ComponentSidenav],
  declarations: [ComponentSidenav, ComponentNav],
  providers: [],
})
export class ComponentSidenavModule {}
