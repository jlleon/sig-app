import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../@core/services/users.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../@core/data/users';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  noExisteUsuario = false;

  constructor(private userService: UsersService,
              private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }

    this.userService.autenticar(f.value.username, f.value.password)
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: User) => {
      if (user._id === null) {
        this.noExisteUsuario = true;
        return;
      }
      localStorage.setItem('usuario', JSON.stringify(user));
      localStorage.setItem('tipoInstitucion', user.tipo_institucion);
      localStorage.setItem('institucion', user.institucion);
      this.router.navigate(['/pages/dashboard']);
    });
  }

  valuechange(elemento: any) {
    this.noExisteUsuario = false;
  }
}
