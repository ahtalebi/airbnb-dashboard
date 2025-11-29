import { Injectable } from '@angular/core';

export interface AirbnbListing {
  id: number;
  name: string;
  host_name: string;
  neighbourhood_cleansed: string;
  room_type: string;
  price: number;
  bedrooms: number;
  beds: number;
  bathrooms_text: string;
  number_of_reviews: number;
  review_scores_rating: number;
  availability_365: number;
  host_is_superhost: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  async loadAirbnbData(): Promise<AirbnbListing[]> {
    try {
      const response = await fetch('/listings.csv');
      const csvText = await response.text();
      
      const lines = csvText.split('\n');
      const headers = lines[0].split(',');
      const data: AirbnbListing[] = [];
      
      // Find column indices
      const idIndex = headers.indexOf('id');
      const nameIndex = headers.indexOf('name');
      const hostNameIndex = headers.indexOf('host_name');
      const neighbourhoodIndex = headers.indexOf('neighbourhood_cleansed');
      const roomTypeIndex = headers.indexOf('room_type');
      const priceIndex = headers.indexOf('price');
      const bedroomsIndex = headers.indexOf('bedrooms');
      const bedsIndex = headers.indexOf('beds');
      const bathroomsIndex = headers.indexOf('bathrooms_text');
      const reviewsIndex = headers.indexOf('number_of_reviews');
      const ratingIndex = headers.indexOf('review_scores_rating');
      const availabilityIndex = headers.indexOf('availability_365');
      const superhostIndex = headers.indexOf('host_is_superhost');
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Handle CSV with quoted fields containing commas
        const values = this.parseCSVLine(line);
        
        if (values.length > Math.max(idIndex, priceIndex, roomTypeIndex)) {
          const priceStr = values[priceIndex]?.replace(/[$,]/g, '') || '0';
          const price = parseFloat(priceStr);
          
          if (price > 0) {  // Only include listings with valid prices
            data.push({
              id: parseInt(values[idIndex]) || 0,
              name: values[nameIndex] || 'Unnamed',
              host_name: values[hostNameIndex] || 'Unknown',
              neighbourhood_cleansed: values[neighbourhoodIndex] || 'Unknown',
              room_type: values[roomTypeIndex] || 'Unknown',
              price: price,
              bedrooms: parseFloat(values[bedroomsIndex]) || 0,
              beds: parseFloat(values[bedsIndex]) || 0,
              bathrooms_text: values[bathroomsIndex] || '',
              number_of_reviews: parseInt(values[reviewsIndex]) || 0,
              review_scores_rating: parseFloat(values[ratingIndex]) || 0,
              availability_365: parseInt(values[availabilityIndex]) || 0,
              host_is_superhost: values[superhostIndex] || 'f'
            });
          }
        }
      }
      
      console.log('Loaded listings:', data.length);
      return data;
    } catch (error) {
      console.error('Error loading CSV:', error);
      throw error;
    }
  }
  
  private parseCSVLine(line: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    
    return result;
  }

  getUniqueNeighbourhoods(data: AirbnbListing[]): string[] {
    const neighbourhoods = [...new Set(data.map(d => d.neighbourhood_cleansed))];
    return neighbourhoods.sort();
  }

  getUniqueRoomTypes(data: AirbnbListing[]): string[] {
    return [...new Set(data.map(d => d.room_type))];
  }

  filterData(
    data: AirbnbListing[], 
    neighbourhood?: string, 
    roomType?: string,
    maxPrice?: number
  ): AirbnbListing[] {
    let filtered = data;
    
    if (neighbourhood) {
      filtered = filtered.filter(d => d.neighbourhood_cleansed === neighbourhood);
    }
    
    if (roomType) {
      filtered = filtered.filter(d => d.room_type === roomType);
    }
    
    if (maxPrice) {
      filtered = filtered.filter(d => d.price <= maxPrice);
    }
    
    return filtered;
  }

  getAveragePrice(data: AirbnbListing[]): number {
    if (data.length === 0) return 0;
    return data.reduce((sum, item) => sum + item.price, 0) / data.length;
  }

  getAverageRating(data: AirbnbListing[]): number {
    const withRatings = data.filter(d => d.review_scores_rating > 0);
    if (withRatings.length === 0) return 0;
    return withRatings.reduce((sum, item) => sum + item.review_scores_rating, 0) / withRatings.length;
  }
}
