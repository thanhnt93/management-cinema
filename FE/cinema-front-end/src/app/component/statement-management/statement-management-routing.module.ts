import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieStatementComponent} from './movie-statement/movie-statement.component';
import {CustomerStatementComponent} from './customer-statement/customer-statement.component';

const routes: Routes = [
  {  path: 'movie', component: MovieStatementComponent},
  {  path: 'customer', component: CustomerStatementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementManagementRoutingModule { }
