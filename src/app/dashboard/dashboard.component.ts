import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DataService, AirbnbListing } from '../data.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  allData: AirbnbListing[] = [];
  filteredData: AirbnbListing[] = [];
  neighbourhoods: string[] = [];
  roomTypes: string[] = [];
  
  selectedNeighbourhood: string = '';
  selectedRoomType: string = '';
  maxPrice: number = 1000;
  
  priceChart: Chart | null = null;
  roomTypeChart: Chart | null = null;
  neighbourhoodChart: Chart | null = null;
  ratingChart: Chart | null = null;
  
  loading: boolean = true;
  
  avgPrice: number = 0;
  avgRating: number = 0;
  totalListings: number = 0;
  superhostCount: number = 0;
  
  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}
  
  async ngOnInit() {
    try {
      console.log('Loading Airbnb data...');
      this.allData = await this.dataService.loadAirbnbData();
      this.neighbourhoods = this.dataService.getUniqueNeighbourhoods(this.allData);
      this.roomTypes = this.dataService.getUniqueRoomTypes(this.allData);
      
      this.filteredData = this.allData;
      this.updateStats();
      this.loading = false;
      
      this.cdr.detectChanges();
      
    } catch (error) {
      console.error('ERROR loading data:', error);
      this.loading = false;
    }
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.loading && this.allData.length > 0) {
        this.createAllCharts();
      }
    }, 1000);
  }
  
  updateStats() {
    this.totalListings = this.filteredData.length;
    this.avgPrice = Math.round(this.dataService.getAveragePrice(this.filteredData));
    this.avgRating = Math.round(this.dataService.getAverageRating(this.filteredData) * 10) / 10;
    this.superhostCount = this.filteredData.filter(d => d.host_is_superhost === 't').length;
  }
  
  onFilterChange() {
    this.filteredData = this.dataService.filterData(
      this.allData, 
      this.selectedNeighbourhood || undefined, 
      this.selectedRoomType || undefined,
      this.maxPrice
    );
    this.updateStats();
    this.createAllCharts();
  }
  
  createAllCharts() {
    this.createPriceDistribution();
    this.createRoomTypeChart();
    this.createNeighbourhoodChart();
    this.createRatingDistribution();
  }
  
  createPriceDistribution() {
    if (this.priceChart) this.priceChart.destroy();
    
    const ctx = document.getElementById('priceChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    // Create price buckets
    const buckets = [0, 50, 100, 150, 200, 300, 500, 1000];
    const counts = new Array(buckets.length - 1).fill(0);
    
    this.filteredData.forEach(listing => {
      for (let i = 0; i < buckets.length - 1; i++) {
        if (listing.price >= buckets[i] && listing.price < buckets[i + 1]) {
          counts[i]++;
          break;
        }
      }
    });
    
    const labels = buckets.slice(0, -1).map((v, i) => `€${v}-${buckets[i + 1]}`);
    
    this.priceChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Listings',
          data: counts,
          backgroundColor: 'rgba(102, 126, 234, 0.6)',
          borderColor: 'rgba(102, 126, 234, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Price Distribution',
            font: { size: 16 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Count' }
          }
        }
      }
    });
  }
  
  createRoomTypeChart() {
    if (this.roomTypeChart) this.roomTypeChart.destroy();
    
    const ctx = document.getElementById('roomTypeChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    const roomTypeCounts = new Map<string, number>();
    this.filteredData.forEach(listing => {
      const count = roomTypeCounts.get(listing.room_type) || 0;
      roomTypeCounts.set(listing.room_type, count + 1);
    });
    
    this.roomTypeChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Array.from(roomTypeCounts.keys()),
        datasets: [{
          data: Array.from(roomTypeCounts.values()),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Room Type Distribution',
            font: { size: 16 }
          }
        }
      }
    });
  }
  
  createNeighbourhoodChart() {
    if (this.neighbourhoodChart) this.neighbourhoodChart.destroy();
    
    const ctx = document.getElementById('neighbourhoodChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    const neighbourhoodCounts = new Map<string, number>();
    this.filteredData.forEach(listing => {
      const count = neighbourhoodCounts.get(listing.neighbourhood_cleansed) || 0;
      neighbourhoodCounts.set(listing.neighbourhood_cleansed, count + 1);
    });
    
    const sorted = Array.from(neighbourhoodCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    this.neighbourhoodChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sorted.map(x => x[0]),
        datasets: [{
          label: 'Listings',
          data: sorted.map(x => x[1]),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: 'Top 10 Neighbourhoods',
            font: { size: 16 }
          }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  createRatingDistribution() {
    if (this.ratingChart) this.ratingChart.destroy();
    
    const ctx = document.getElementById('ratingChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    const buckets = [0, 3.0, 3.5, 4.0, 4.5, 4.7, 5.0];
    const counts = new Array(buckets.length - 1).fill(0);
    
    this.filteredData.filter(l => l.review_scores_rating > 0).forEach(listing => {
      for (let i = 0; i < buckets.length - 1; i++) {
        if (listing.review_scores_rating >= buckets[i] && listing.review_scores_rating < buckets[i + 1]) {
          counts[i]++;
          break;
        }
      }
    });
    
    const labels = buckets.slice(0, -1).map((v, i) => `${v}-${buckets[i + 1]}`);
    
    this.ratingChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Listings',
          data: counts,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Rating Distribution',
            font: { size: 16 }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
