import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { NationModel } from './../../core/models/nation.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  pageTitle = 'Admin';
  nationsSub: Subscription;
  nationList: NationModel[];
  filteredNations: NationModel[];
  loading: boolean;
  error: boolean;
  query = '';

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getNationList();
  }

  private _getNationList() {
    this.loading = true;
    // Get all (admin) nations
    this.nationsSub = this.api
      .getAdminNations$()
      .subscribe(
        res => {
          this.nationList = res;
          this.filteredNations = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchNations() {
    this.filteredNations = this.fs.search(this.nationList, this.query, '_id', 'mediumDate');
  }

  resetQuery() {
    this.query = '';
    this.filteredNations = this.nationList;
  }

  ngOnDestroy() {
    this.nationsSub.unsubscribe();
  }

}