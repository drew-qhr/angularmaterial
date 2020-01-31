import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ContactManagerAppComponent } from './contact-manager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ContactManagerRoutingModule } from './contact-manager-routing.module';
import { UserService } from './services/user.service';
import { NotesComponent } from './components/notes/notes.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';

@NgModule({
  declarations: [
    ContactManagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SideNavComponent,
    NotesComponent,
    NewContactDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ContactManagerRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [
    UserService
  ],
  entryComponents: [
    NewContactDialogComponent
  ]
})
export class ContactManagerModule { }
