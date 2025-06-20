import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Smart Supply';

  //// Triggered when the user closes the tab or browser
  //@HostListener('window:beforeunload', ['$event'])
  //clearTokenOnUnload(event: any) {
  //  localStorage.removeItem('token');
  //}

}
