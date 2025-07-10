import { Component } from '@angular/core';
import { envirnment } from '../../../../../environments/environment';

@Component({
  selector: 'app-about-us',
  standalone: false,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  imageUrl = `${envirnment.baseUrl}/images/about-factory.jpg`;
}
