import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['user/signin']);
  }
}
