import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './core/loading.component';
import { CallbackComponent } from './pages/callback/callback.component';

import { AuthService } from './auth/auth.service';
import { ApiService } from './core/api.service';
import { UtilsService } from './core/utils.service';
import { FilterSortService } from './core/filter-sort.service';
import { AdminComponent } from './pages/admin/admin.component';
import { NationComponent } from './pages/nation/nation.component';
import { NationDetailComponent } from './pages/nation/nation-detail/nation-detail.component';
import { EmbassyComponent } from './pages/nation/embassy/embassy.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent,
    AdminComponent,
    NationComponent,
    NationDetailComponent,
    EmbassyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    Title,
    AuthService,
    ApiService,
    UtilsService,
    FilterSortService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
