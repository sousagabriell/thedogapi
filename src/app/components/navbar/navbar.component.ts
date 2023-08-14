import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppApiService } from 'src/app/core/services/app-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  breedOptions: any[] = [];
  currentRoute: string = "";

  constructor(private appService: AppApiService) {}

  ngOnInit(): void {
    
  }

  fetchBreedOptions(breedId: string){
    const limit = 10;
    this.appService.getGroups(limit, breedId).subscribe(
      (response: any) => {
        this.breedOptions = response;
      },
      (error) => {
        console.error('Error fetching breed options:', error);
      }
    );
  }
}
