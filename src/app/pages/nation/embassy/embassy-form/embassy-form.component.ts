import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../../core/api.service';
import { EmbassyModel } from './../../../../core/models/embassy.model';
import { GUESTS_REGEX } from './../../../../core/forms/formUtils.factory';

@Component({
  selector: 'app-embassy-form',
  templateUrl: './embassy-form.component.html',
  styleUrls: ['./embassy-form.component.scss']
})
export class EmbassyFormComponent implements OnInit, OnDestroy {
  @Input() nationId: string;
  @Input() embassy: EmbassyModel;
  @Output() submitEmbassy = new EventEmitter();
  GUESTS_REGEX = GUESTS_REGEX;
  isEdit: boolean;
  formEmbassy: EmbassyModel;
  submitEmbassySub: Subscription;
  submitting: boolean;
  error: boolean;

  constructor(
    private auth: AuthService,
    private api: ApiService) { }

  ngOnInit() {
    this.isEdit = !!this.embassy;
    this._setFormEmbassy();
  }

  private _setFormEmbassy() {
    if (!this.isEdit) {
      // If creating a new Embassy,
      // create new EmbassyModel with default data
      this.formEmbassy = new EmbassyModel(
        this.auth.userProfile.sub,
        this.auth.userProfile.name,
        this.nationId,
        null,
        0);
    } else {
      // If editing an existing Embassy,
      // create new EmbassyModel from existing data
      this.formEmbassy = new EmbassyModel(
        this.embassy.userId,
        this.embassy.name,
        this.embassy.nationId,
        this.embassy.attending,
        this.embassy.guests,
        this.embassy.comments,
        this.embassy._id
      );
    }
  }

  changeAttendanceSetGuests() {
    // If attendance changed to no, set guests: 0
    if (!this.formEmbassy.attending) {
      this.formEmbassy.guests = 0;
    }
  }

  onSubmit() {
    this.submitting = true;
    if (!this.isEdit) {
      this.submitEmbassySub = this.api
        .postEmbassy$(this.formEmbassy)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitEmbassySub = this.api
        .editEmbassy$(this.embassy._id, this.formEmbassy)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }

  private _handleSubmitSuccess(res) {
    const nationObj = {
      isEdit: this.isEdit,
      embassy: res
    };
    this.submitEmbassy.emit(nationObj);
    this.error = false;
    this.submitting = false;
  }

  private _handleSubmitError(err) {
    const nationObj = {
      isEdit: this.isEdit,
      error: err
    };
    this.submitEmbassy.emit(nationObj);
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy() {
    if (this.submitEmbassySub) {
      this.submitEmbassySub.unsubscribe();
    }
  }

}