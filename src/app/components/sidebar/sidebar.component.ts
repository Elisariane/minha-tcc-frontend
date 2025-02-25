import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { IUser } from '../../../interfaces/IUser';
import { AuthService } from '../../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  currentUser : IUser | null = null;
  isOpen: boolean = true;
  tooltip: string | null = null;

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
  }

  showTooltip(text: string) {
    this.tooltip = text;
  }

  hideTooltip() {
    this.tooltip = null;
  }

}
