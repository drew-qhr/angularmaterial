import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild(MatSidenav, { static: false }) public sidenav: MatSidenav;
  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px`);

  users: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: string = 'ltr';


  constructor(
    zone: NgZone,
    private userService: UserService,
    private router: Router
  ) {
    this.mediaMatcher.addEventListener('change', (mqlEvent: MediaQueryListEvent) => {
      zone.run(() => this.mediaMatcher = mqlEvent.currentTarget as MediaQueryList);
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    this.sidenav.toggle().then(() => this.sidenav.toggle());
  }
  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });

  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
