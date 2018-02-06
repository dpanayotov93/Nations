import { Component, Input } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { UtilsService } from './../../../core/utils.service';
import { NationModel } from './../../../core/models/nation.model';

@Component({
  selector: 'app-nation-detail',
  templateUrl: './nation-detail.component.html',
  styleUrls: ['./nation-detail.component.scss']
})
export class NationDetailComponent {
  @Input() nation: NationModel;

  constructor(public utils: UtilsService, public auth: AuthService) { }

}