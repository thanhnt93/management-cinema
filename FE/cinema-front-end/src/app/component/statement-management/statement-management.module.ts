import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementManagementRoutingModule } from './statement-management-routing.module';
import { MovieStatementComponent } from './movie-statement/movie-statement.component';
import { CustomerStatementComponent } from './customer-statement/customer-statement.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    MovieStatementComponent,
    CustomerStatementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StatementManagementRoutingModule
  ]
})
export class StatementManagementModule { }
