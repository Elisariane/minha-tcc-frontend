import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HeroComponent } from "./components/hero/hero.component";
import { SectionToolsComponent } from "./components/section-tools/section-tools.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, SectionToolsComponent, FooterComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

}
