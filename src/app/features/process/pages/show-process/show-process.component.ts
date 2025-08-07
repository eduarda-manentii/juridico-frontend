import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { BackendApiService } from '../../../../shared/services/backend-api.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-process',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    RouterLink,
    ConfirmModalComponent
  ],  templateUrl: './show-process.component.html',
  styleUrl: './show-process.component.scss'
})
export class ShowProcessComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;
  
  processo: any;

  constructor(
    private route: ActivatedRoute,
    private api: BackendApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.get(`/processos/${id}`).subscribe({
      next: (data) => this.processo = data,
      error: () => this.router.navigate(['/process/index'])
    });
  }

  arquivar() {
    if (this.processo?.id) {
      this.api.patch(`/processos/${this.processo.id}/arquivar`).subscribe({
        next: () => {
          this.toastr.success('Processo arquivado com sucesso!');
          window.location.reload();
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
            mensagem = 'Erro ao arquivar um processo.';
          }
          this.toastr.error(mensagem);
        }
      });

    }
  }

  goBack() {
    this.router.navigate(['/process/index']);
  }

  onDelete() {
    this.confirmModal.open('Tem certeza que deseja excluir este processo?');
  }

  onConfirmedDeleted(result: boolean) {
    if (result && this.processo?.id) {
      this.api.delete(`/processos/${this.processo.id}`).subscribe({
        next: () => {
          this.toastr.success('Processo excluído com sucesso!');
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
            mensagem = 'Erro ao excluir processo.';
          }
          this.toastr.error(mensagem);
        }
      });
    }
  }

}
