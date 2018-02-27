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
    this._router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });

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

  /** Set the expansions based on the route url */
  setExpansions(params: Params) {
    const categories = [
      {
        id: 'forms',
        name: 'Form Controls',
        items: [
          {id: 'autocomplete', name: 'Autocomplete', examples: ['autocomplete-overview']},
          {id: 'checkbox', name: 'Checkbox', examples: ['checkbox-configurable']},
          {
            id: 'datepicker',
            name: 'Datepicker',
            examples: [
              'datepicker-overview',
              'datepicker-start-view',
              'datepicker-value',
              'datepicker-min-max',
              'datepicker-filter',
              'datepicker-events',
              'datepicker-disabled',
              'datepicker-touch',
              'datepicker-api',
              'datepicker-locale',
              'datepicker-moment',
              'datepicker-formats',

            ]
          },
          {
            id: 'form-field',
            name: 'Form field',
            examples: [
              'form-field-overview',
              'form-field-label',
              'form-field-hint',
              'form-field-error',
              'form-field-prefix-suffix',
              'form-field-theming',
              'form-field-custom-control',
            ]
          },
          {
            id: 'input',
            name: 'Input',
            examples: [
              'input-overview',
              'input-error-state-matcher',
              'input-autosize-textarea',
              'input-clearable',
              'input-errors',
              'input-form',
              'input-hint',
              'input-prefix-suffix',
            ]
          },
          {id: 'radio', name: 'Radio button', examples: ['radio-ng-model']},
          {
            id: 'select',
            name: 'Select',
            examples: [
              'select-overview',
              'select-value-binding',
              'select-form',
              'select-hint-error',
              'select-disabled',
              'select-reset',
              'select-optgroup',
              'select-multiple',
              'select-custom-trigger',
              'select-no-ripple',
              'select-panel-class',
              'select-error-state-matcher',
            ]
          },
          {id: 'slider', name: 'Slider', examples: ['slider-configurable']},
          {id: 'slide-toggle', name: 'Slide toggle', examples: ['slide-toggle-configurable']},
        ]
      },
      {
        id: 'nav',
        name: 'Navigation',
        summary: 'Sidenavs, toolbars, menus',
        items: [
          {id: 'menu', name: 'Menu', examples: ['menu-icons']},
          {
            id: 'sidenav',
            name: 'Sidenav',
            examples: [
              'sidenav-overview',
              'sidenav-drawer-overview',
              'sidenav-position',
              'sidenav-open-close',
              'sidenav-mode',
              'sidenav-disable-close',
              'sidenav-autosize',
              'sidenav-fixed',
              'sidenav-responsive'
            ]
          },
          {id: 'toolbar', name: 'Toolbar', examples: ['toolbar-multirow']},
        ]
      },
      {
        id: 'layout',
        name: 'Layout',
        items: [
          {id: 'card', name: 'Card', examples: ['card-fancy']},
          {id: 'divider', name: 'Divider', examples: ['divider-overview']},
          {id: 'expansion', name: 'Expansion Panel',
            examples: ['expansion-overview', 'expansion-steps']},
          {id: 'grid-list', name: 'Grid list', examples: ['grid-list-dynamic']},
          {id: 'list', name: 'List', examples: ['list-sections']},
          {id: 'stepper', name: 'Stepper', examples: ['stepper-overview']},
          {id: 'tabs', name: 'Tabs', examples: ['tabs-template-label']},
        ]
      }];

    for (const category of categories) {
      if (this.expansions[category.id] === true) {
        continue;
      }

      let match = false;
      for (const item of category.items) {
        if (this._router.url.indexOf(item.id) > -1) {
          match = true;
          break;
        }
      }
      this.expansions[category.id] = match;
    }
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
