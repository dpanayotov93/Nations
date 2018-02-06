import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { NationModel } from './../../core/models/nation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle = 'Nations';
  nationListSub: Subscription;
  nationList: NationModel[];
  filteredNations: NationModel[];
  loading: boolean;
  error: boolean;
  query: '';  

  constructor(
  	private title: Title, 
  	public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getNationList();
  }

  private _getNationList() {
    this.loading = true;
    // Get future, public nations
    this.nationListSub = this.api
      .getNations$()
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
    this.nationListSub.unsubscribe();
  }  

}
