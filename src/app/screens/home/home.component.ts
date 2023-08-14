import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppApiService } from 'src/app/core/services/app-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dogImages: any[] = [];
  numeroPagina: number = 0;
  selectedBreedId: number | null = null; 

  constructor(
    private appService: AppApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = +params['page'] || 0;
      this.numeroPagina = page;
      this.fetchDogImages(page);
      this.selectedBreedId = +params['breed_id'] || null; // Get selected breed_id
    });
  }

  fetchDogImages(page: number): void {
    const limit = 8;

    this.appService.getDogImages(limit, page).subscribe(
      (response) => {
        this.dogImages = response;
      },
      (error) => {
        console.error('Erro ao buscar imagens de cachorro:', error);
      }
    );
  }

  previousPage(): void {
    if (this.numeroPagina > 0) {
      const newPage = this.numeroPagina - 1;
      this.updateQueryParam(newPage);
    }
  }

  nextPage(): void {
    const newPage = this.numeroPagina + 1;
    this.updateQueryParam(newPage);
  }

  updateQueryParam(newPage: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage },
      queryParamsHandling: 'merge'
    });
  }
}
