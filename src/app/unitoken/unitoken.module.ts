import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UniTokenListComponent} from './unitoken-list/unitoken-list.component';
import {UtilModule} from '../util/util.module';
import {RouterModule} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule, MatSnackBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    RouterModule,
    UtilModule
  ],
  declarations: [UniTokenListComponent],
  exports: [UniTokenListComponent]
})
export class UniTokenModule {
}
