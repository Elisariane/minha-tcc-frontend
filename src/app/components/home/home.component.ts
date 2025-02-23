import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/IUser';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  currentUser: IUser | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

}
