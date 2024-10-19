// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterModule]  // Add RouterModule here
})
export class AppComponent {
    title = 'myFlix-Angular-client';
}