import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NationModel } from './../../core/models/nation.model';

@Component({
  selector: 'app-nation',
  templateUrl: './nation.component.html',
  styleUrls: ['./nation.component.scss']
})
export class NationComponent implements OnInit, OnDestroy {
  pageTitle: string;
  id: string;
  routeSub: Subscription;
  tabSub: Subscription;
  nationSub: Subscription;
  nation: NationModel;
  loading: boolean;
  error: boolean;
  tab: string;
  nationPast: boolean;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    private title: Title) { }

  ngOnInit() {
    // Set nation ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this._getNation();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'details';
      });
  }

  private _getNation() {
    this.loading = true;
    // GET nation by ID
    this.nationSub = this.api
      .getNationById$(this.id)
      .subscribe(
        res => {
          this.nation = res;
          this._setPageTitle(this.nation.title);
          this.loading = false;
          this.nationPast = this.utils.nationPast(this.nation.creationDatetime);
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
          this._setPageTitle('Nation Details');
        }
      );
  }

  private _setPageTitle(title: string) {
    this.pageTitle = title;
    this.title.setTitle(title);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.tabSub.unsubscribe();
    this.nationSub.unsubscribe();
  }

}