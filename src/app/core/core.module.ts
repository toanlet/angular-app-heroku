import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fontAwesomIcons } from './icon';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports:[FontAwesomeModule, FormsModule, NgbModule, ReactiveFormsModule]
})
export class CoreModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(...fontAwesomIcons)
  }
 }
