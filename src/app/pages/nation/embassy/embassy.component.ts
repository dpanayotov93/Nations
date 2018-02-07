import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { ApiService } from './../../../core/api.service';
import { UtilsService } from './../../../core/utils.service';
import { FilterSortService } from './../../../core/filter-sort.service';
import { EmbassyModel } from './../../../core/models/embassy.model';
import { expandCollapse } from './../../../core/expand-collapse.animation';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-embassy',
  templateUrl: './embassy.component.html',
  styleUrls: ['./embassy.component.scss'],
  animations: [expandCollapse]
})
export class EmbassyComponent implements OnInit, OnDestroy {
  @Input() nationId: string;
  @Input() nationPast: boolean;
  embassiesSub: Subscription;
  embassies: EmbassyModel[];
  loading: boolean;
  error: boolean;
  userEmbassy: EmbassyModel;
  totalAttending: number;
  footerTense: string;
  showEditForm: boolean;
  editBtnText: string;
  showAllEmbassies = false;
  showEmbassiesText = 'View All Embassies';

  constructor(
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService) { }

  ngOnInit() {
    this.footerTense = !this.nationPast ? 'plan to attend this nation.' : 'attended this nation.';
    this._getEmbassies();
    this.toggleEditForm(false);
  }

  private _getEmbassies() {
    this.loading = true;
    // Get Embassies by nation ID
    this.embassiesSub = this.api
      .getEmbassiesByNationId$(this.nationId)
      .subscribe(
        res => {
          this.embassies = res;
          this._updateEmbassyState();
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  toggleShowEmbassies() {
    this.showAllEmbassies = !this.showAllEmbassies;
    this.showEmbassiesText = this.showAllEmbassies ? 'Hide Embassies' : 'Show All Embassies';
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit My Embassy';
  }

  onSubmitEmbassy(e) {
    if (e.embassy) {
      this.userEmbassy = e.embassy;
      this._updateEmbassyState(true);
      this.toggleEditForm(false);
    }
  }

  private _updateEmbassyState(changed?: boolean) {
    // If RSVP matching user ID is already
    // in RSVP array, set as initial RSVP
    const _initialUserRsvp = this.embassies.filter(rsvp => {
      return rsvp.userId === this.auth.userProfile.sub;
    })[0];

    // If user has not RSVPed before and has made
    // a change, push new RSVP to local RSVPs store
    if (!_initialUserRsvp && this.userEmbassy && changed) {
      this.embassies.push(this.userEmbassy);
    }
    this._setUserEmbassyGetAttending(changed);
  }

  private _setUserEmbassyGetAttending(changed?: boolean) {
    // Iterate over Embassies to get/set user's Embassy
    // and get total number of attending guests
    let guests = 0;
    const embassyArr = this.embassies.map(embassy => {
      // If user has an existing Embassy
      if (embassy.userId === this.auth.userProfile.sub) {
        if (changed) {
          // If user edited their RSVP, set with updated data
          embassy = this.userEmbassy;
        } else {
          // If no changes were made, set userRsvp property
          // (This applies on ngOnInit)
          this.userEmbassy = embassy;
        }
      }
      // Count total number of attendees
      // + additional guests
      if (embassy.attending) {
        guests++;
        if (embassy.guests) {
          guests += embassy.guests;
        }
      }
      return embassy;
    });
    this.embassies = embassyArr;
    this.totalAttending = guests;
  }

  ngOnDestroy() {
    this.embassiesSub.unsubscribe();
  }

}