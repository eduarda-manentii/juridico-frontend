import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { RequiredMarkerDirective } from '../../../../shared/directives/required-marker.directive';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from '../../../../shared/services/backend-api.service';

interface Parte {
  id: number;
  nomeCompleto: string;
  tipoParteEnvolvida: string;
  documento: {
    tipoDocumento: string ,
    valor: string
  };
}

interface Andamento {
  id: number;
  tipoAndamentoProcessual: string;
  descricao: string;
  dataRegistro: string;
}

@Component({
  selector: 'app-new-process',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    RequiredMarkerDirective
  ],
  templateUrl: './new-process.component.html',
  styleUrl: './new-process.component.scss'
})
export class NewProcessComponent implements OnInit {
  form!: FormGroup;
  processId: number | null = null;

  partesDisponiveis: Parte[] = [];
  andamentosDisponiveis: Andamento[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private api: BackendApiService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dataAbertura: ['', Validators.required],
      descricaoCaso: ['', Validators.required],
      status: ['', Validators.required],
      andamentoProcessual: ['', Validators.required],
      partesEnvolvidas: [[], Validators.required]
    });

    this.processId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadPartesDisponiveis();
    this.loadAndamentosDisponiveis();

    if (this.processId) {
      this.api.get(`/processos/${this.processId}`).subscribe({
        next: (data: any) => {
          this.form.patchValue({
            dataAbertura: data.dataAbertura,
            descricaoCaso: data.descricaoCaso,
            status: data.status,
            andamentoProcessual: data.andamentoProcessual?.id || '',
            partesEnvolvidas: data.partesEnvolvidas ? data.partesEnvolvidas.map((p: any) => p.id) : []
          });
        },
        error: () => {
          this.toastr.error('Erro ao carregar dados do processo.');
          this.router.navigate(['/process/index']);
        }
      });
    }
  }

  private loadPartesDisponiveis() {
    this.api.get('/partes-envolvidas').subscribe({
      next: (data: any) => {
        this.partesDisponiveis = Array.isArray(data.content) ? data.content : [];
      },
      error: () => {
        this.toastr.error('Erro ao carregar partes disponíveis.');
      }
    });
  }

  private loadAndamentosDisponiveis() {
    this.api.get('/andamentos-processuais').subscribe({
      next: (data: any) => {
        this.andamentosDisponiveis = Array.isArray(data.content) ? data.content : [];
      },
      error: () => {
        this.toastr.error('Erro ao carregar andamentos processuais.');
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const andamentoId = this.form.value.andamentoProcessual;
      const andamentoObj = this.andamentosDisponiveis.find(a => a.id === Number(andamentoId));

      const partesIds = this.form.value.partesEnvolvidas;
      const partesArray = Array.isArray(partesIds) ? partesIds : [partesIds];
      const partesObjs = partesArray
        .map((id: any) => this.partesDisponiveis.find(p => p.id === Number(id)))
        .filter(p => p !== undefined);

      const payload = {
        dataAbertura: this.form.value.dataAbertura,
        descricaoCaso: this.form.value.descricaoCaso,
        status: this.form.value.status,
        andamentoProcessual: andamentoObj,
        partesEnvolvidas: partesObjs
      };

      const request = this.processId
        ? this.api.update(`/processos`, { id: this.processId, ...payload })
        : this.api.create(`/processos`, payload);

      request.subscribe({
        next: () => {
          this.toastr.success(
            this.processId
              ? 'Processo atualizado com sucesso!'
              : 'Processo cadastrado com sucesso!'
          );
          this.router.navigate(['/process/index']);
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
    this.router.navigate(['/process/index']);
  }

}
