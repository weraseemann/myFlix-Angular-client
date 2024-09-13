import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Define your application routes here
const routes: Routes = [
  // Example route
  // { path: 'example', component: ExampleComponent },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }