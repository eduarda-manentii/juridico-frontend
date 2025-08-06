import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackendApiService } from '../../../../shared/services/backend-api.service';

@Component({
  selector: 'app-index-procedural-progress',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './index-procedural-progress.component.html',
  styleUrl: './index-procedural-progress.component.scss'
})
export class IndexProceduralProgressComponent implements OnInit {
  andamentos: any[] = [];
  totalPages = 0;
  currentPage = 0;
  loading = true;

  constructor(private api: BackendApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData(0);
  }

  loadData(page: number = 0) {
    this.loading = true;
    this.api.get(`/andamentos-processuais?page=${page}&size=10`).subscribe({
      next: (res: any) => {
        this.andamentos = res.content;
        this.totalPages = res.totalPages;
        this.currentPage = res.number;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar andamentos processuais', err);
        this.loading = false;
      }
    });
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.loadData(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage + 1 < this.totalPages) {
      this.loadData(this.currentPage + 1);
    }
  }

}
