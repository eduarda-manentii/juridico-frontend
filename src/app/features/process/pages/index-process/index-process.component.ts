import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../../../shared/services/backend-api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index-process',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './index-process.component.html',
  styleUrl: './index-process.component.scss'
})
export class IndexProcessComponent implements OnInit {
  processos: any[] = [];
  totalPages = 0;
  currentPage = 0;
  loading = true;

  constructor(
    private api: BackendApiService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData(0);
  }

  loadData(page: number = 0) {
    this.loading = true;
    this.api.get(`/processos?page=${page}&size=10`).subscribe({
      next: (res: any) => {
        this.processos = res.content;
        this.totalPages = res.totalPages;
        this.currentPage = res.number;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar processos', err);
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
