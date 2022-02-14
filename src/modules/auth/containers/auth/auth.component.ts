import { Component, OnInit } from '@angular/core';
import { Store } from 'src/store';
import { Router } from '@angular/router';

// Services
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/shared/services/user.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  private readonly jwtHelper = new JwtHelperService();

  constructor(private store: Store,
              private router: Router,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private readonly userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      const token = this.jwtHelper.decodeToken(localStorage.getItem('token'))
      this.userService.get(token.user.uuid).subscribe({
        next: () => this.router.navigateByUrl('dashboard'),
        error: () => this.toastrService.danger(this.translate.instant('errors.http-not-found'), this.translate.instant('errors.title'))
      });
    }
  }

}
