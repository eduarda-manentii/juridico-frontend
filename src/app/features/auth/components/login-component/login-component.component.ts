import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendApiService } from '../../../../shared/services/backend-api.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
        next: res => {
          this.toastr.success('Cadastro realizado com sucesso!');
        },
        error: err => {
          this.toastr.error('Erro no cadastro: ' + err.error?.message || err.message);
        }
      });
    } else {
      this.apiService.login({
      email: this.formData.email,
      senha: this.formData.password
      }).subscribe({
        next: res => {
          localStorage.setItem('token', res.token);
          this.toastr.success('Login realizado com sucesso!');
        },
        error: err => {
          this.toastr.error('Erro no login: ' + err.error?.message || err.message);
        }
      });
    }
  }

}
