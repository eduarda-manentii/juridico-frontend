import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { RequiredMarkerDirective } from '../../../../shared/directives/required-marker.directive';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from '../../../../shared/services/backend-api.service';

@Component({
  selector: 'app-new-parties-involed',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    RequiredMarkerDirective,
    NgxMaskDirective
  ],
  templateUrl: './new-parties-involed.component.html',
  styleUrl: './new-parties-involed.component.scss',
  providers: [provideNgxMask()]
})
export class NewPartiesInvoledComponent implements OnInit {
  form!: FormGroup;
  parteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private api: BackendApiService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      tipoParteEnvolvida: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      valorDocumento: ['', Validators.required]
    });

    if (this.parteId) {
      this.api.get(`/partes-envolvidas/${this.parteId}`).subscribe({
        next: (data) => {
          this.form.patchValue({
            nomeCompleto: data.nomeCompleto,
            tipoParteEnvolvida: data.tipoParteEnvolvida,
            email: data.email,
            telefone: data.telefone,
            tipoDocumento: data.documento?.tipoDocumento,
            valorDocumento: data.documento?.valor
          });
        },
        error: () => {
          this.toastr.error('Erro ao carregar dados da parte envolvida.');
          this.router.navigate(['/parties_involved/index']);
        }
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const payload: any = {
        nomeCompleto: this.form.value.nomeCompleto,
        tipoParteEnvolvida: this.form.value.tipoParteEnvolvida,
        email: this.form.value.email,
        telefone: this.form.value.telefone,
        documento: {
          tipoDocumento: this.form.value.tipoDocumento,
          valor: this.form.value.valorDocumento
        }
      };

      if (this.parteId && this.parteId > 0) {
        payload.id = this.parteId;
      }
      const request = this.parteId && this.parteId > 0
        ? this.api.update(`/partes-envolvidas`, payload)
        : this.api.create(`/partes-envolvidas`, payload);
      request.subscribe({
        next: () => {
          this.toastr.success(
            this.parteId
              ? 'Parte envolvida atualizada com sucesso!'
              : 'Parte envolvida cadastrada com sucesso!'
          );
          this.router.navigate(['/parties_involved/index']);
        },
        error: (err) => {
          let mensagem: string;
          if (typeof err.error === 'string') {
            mensagem = err.error;
          } else if (err.error?.message) {
            mensagem = err.error.message;
          } else if (Array.isArray(err.error?.errors) && err.error.errors.length > 0) {
            mensagem = err.error.errors[0];
          } else {
            mensagem = 'Erro ao salvar';
          }
          this.toastr.error(mensagem);
        }
      });
    } else {
      this.toastr.error('Preencha todos os campos obrigatórios.');
    }
  }

  goBack() {
    this.router.navigate(['/parties_involved/index']);
  }

}
