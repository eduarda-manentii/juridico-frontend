import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendApiService } from '../../../../shared/services/backend-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {
  isRegisterMode = false;

  formData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private apiService: BackendApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onSubmit() {
    if (this.isRegisterMode) {
      this.apiService.register({
        nome: this.formData.name,
        email: this.formData.email,
        senha: this.formData.password
      }).subscribe({
        next: () => {
          this.toastr.success('Cadastro realizado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: err => {
          const mensagem = typeof err.error === 'string'
            ? err.error
            : err.error?.message || 'Erro no cadastro';
          this.toastr.error(mensagem);
        }
      });
    } else {
      this.apiService.login({
        email: this.formData.email,
        senha: this.formData.password
      }).subscribe({
        next: res => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.toastr.success('Login realizado com sucesso!');
            this.router.navigate(['/home']);
          } else {
            this.toastr.error('Token não recebido do servidor.');
          }
        },
        error: err => {
          let mensagem = 'Erro no cadastro';
           if (typeof err.error === 'string') {
             mensagem = err.error;
           } else if (err.error?.message) {
             mensagem = err.error.message;
           } else if (Array.isArray(err.error?.errors) && err.error.errors.length > 0) {
             mensagem = err.error.errors[0];
     }
     this.toastr.error(mensagem);
    }
    });
    }
  }

}
