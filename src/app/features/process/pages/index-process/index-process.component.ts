import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { RouterLink } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendApiService } from '../../../../shared/services/backend-api.service';
import { CommonModule } from '@angular/common';
import { FilterProcessModalComponent } from '../../components/filter-modal/filter-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index-process',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    CommonModule,
    FilterProcessModalComponent
  ],
  templateUrl: './index-process.component.html',
  styleUrl: './index-process.component.scss'
})
export class IndexProcessComponent implements OnInit {
  processos: any[] = [];
  totalPages = 0;
  currentPage = 0;
  loading = true;
  showFilterModal = false;

  constructor(
    private api: BackendApiService, 
    private toastr: ToastrService,
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

  loadProcessos(params: any = {}) {
    this.loading = true;
    const query = new URLSearchParams();
    for (const key in params) {
      if (params[key]) query.set(key, params[key]);
    }
    this.api.get(`/processos/query?${query.toString()}`).subscribe({
      next: (data: any) => {
        this.processos = Array.isArray(data) ? data : data.content || [];
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Erro ao carregar processos.');
        this.loading = false;
      }
    });
  }

  openFilter() {
    this.showFilterModal = true;
  }

  onFilterApplied(filterData: any) {
    this.showFilterModal = false;
    this.loadProcessos(filterData);
  }

  onFilterClosed() {
    this.showFilterModal = false;
  }

}
