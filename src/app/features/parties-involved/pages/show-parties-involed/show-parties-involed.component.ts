import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BackendApiService } from '../../../../shared/services/backend-api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-show-parties-involed',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    RouterLink,
    ConfirmModalComponent
  ],
  templateUrl: './show-parties-involed.component.html',
  styleUrl: './show-parties-involed.component.scss'
})
export class ShowPartiesInvoledComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;
   parte: any;

  constructor(
    private route: ActivatedRoute,
    private api: BackendApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.get(`/partes-envolvidas/${id}`).subscribe({
        next: (res) => {
          this.parte = res;
        },
        error: () => {
          this.toastr.error('Erro ao carregar detalhes.');
        }
      });
    }
  }

  onDelete() {
    this.confirmModal.open('Tem certeza que deseja excluir esta parte envolvida?');
  }

  onConfirmed(result: boolean) {
    if (result && this.parte?.id) {
      this.api.delete(`/partes-envolvidas/${this.parte.id}`).subscribe({
        next: () => {
          this.toastr.success('Parte envolvida excluída com sucesso!');
          this.router.navigate(['/parties_involved/index']);
        },
        error: () => {
          this.toastr.error('Erro ao excluir.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/parties_involved/index']);
  }

}
