import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BackendApiService } from '../../../../shared/services/backend-api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-show-procedural-progress',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    RouterLink,
    ConfirmModalComponent
  ],
  templateUrl: './show-procedural-progress.component.html',
  styleUrl: './show-procedural-progress.component.scss'
})
export class ShowProceduralProgressComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;
  andamento: any;

  constructor(
    private route: ActivatedRoute,
    private api: BackendApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.get(`/andamentos-processuais/${id}`).subscribe({
        next: (res) => {
          this.andamento = res;
        },
        error: () => {
          this.toastr.error('Erro ao carregar detalhes do andamento processual.');
        }
      });
    }
  }

  onDelete() {
    this.confirmModal.open('Tem certeza que deseja excluir este andamento processual?');
  }

  onConfirmed(result: boolean) {
    if (result && this.andamento?.id) {
      this.api.delete(`/andamentos-processuais/${this.andamento.id}`).subscribe({
        next: () => {
          this.toastr.success('Andamento processual excluído com sucesso!');
          this.router.navigate(['/procedural_progress/index']);
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
            mensagem = 'Erro ao excluir andamento processual.';
          }
          this.toastr.error(mensagem);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/procedural_progress/index']);
  }

}
