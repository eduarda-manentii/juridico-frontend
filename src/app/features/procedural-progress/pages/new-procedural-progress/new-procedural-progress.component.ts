import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { RequiredMarkerDirective } from '../../../../shared/directives/required-marker.directive';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from '../../../../shared/services/backend-api.service';

@Component({
  selector: 'app-new-procedural-progress',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    RequiredMarkerDirective
  ],
  templateUrl: './new-procedural-progress.component.html',
  styleUrl: './new-procedural-progress.component.scss'
})
export class NewProceduralProgressComponent implements OnInit {
  form!: FormGroup;
  andamentoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private api: BackendApiService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      tipoAndamentoProcessual: ['', Validators.required],
      dataRegistro: ['', Validators.required],
      descricao: ['', Validators.required]
    });

    this.andamentoId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.andamentoId) {
      this.api.get(`/andamentos-processuais/${this.andamentoId}`).subscribe({
        next: (data) => {
          this.form.patchValue({
            tipoAndamentoProcessual: data.tipoAndamentoProcessual,
            dataRegistro: data.dataRegistro,
            descricao: data.descricao
          });
        },
        error: () => {
          this.toastr.error('Erro ao carregar dados do andamento processual.');
          this.router.navigate(['/procedural_progress/index']);
        }
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = {
        id: this.andamentoId,
        tipoAndamentoProcessual: this.form.value.tipoAndamentoProcessual,
        dataRegistro: this.form.value.dataRegistro,
        descricao: this.form.value.descricao
      };

      const request = this.andamentoId
        ? this.api.update(`/andamentos-processuais`, payload)
        : this.api.create(`/andamentos-processuais`, payload);

      request.subscribe({
        next: () => {
          this.toastr.success(
            this.andamentoId
              ? 'Andamento processual atualizado com sucesso!'
              : 'Andamento processual cadastrado com sucesso!'
          );
          this.router.navigate(['/procedural_progress/index']);
        },
        error: (err) => {
          console.error('Erro da API:', err);
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
    this.router.navigate(['/procedural_progress/index']);
  }

}
