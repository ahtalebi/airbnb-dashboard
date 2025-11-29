# 🏠 Berlin Airbnb Analytics Dashboard

An interactive web-based dashboard for analyzing and visualizing Airbnb listings in Berlin, Germany.

![Dashboard Preview](screenshot.png)

## 🌟 Features

### 📊 Interactive Visualizations
- **Price Distribution** - Histogram showing price ranges across listings
- **Room Type Breakdown** - Pie chart of different accommodation types
- **Top Neighbourhoods** - Bar chart of the 10 most popular areas
- **Rating Distribution** - Analysis of review scores across listings

### 🎯 Real-time Filters
- Filter by neighbourhood
- Filter by room type (Entire home, Private room, Shared room, Hotel room)
- Adjustable maximum price slider

### 📈 Key Metrics Dashboard
- Total number of listings
- Average price per night
- Average rating score
- Number of Superhosts

### 📋 Interactive Data Table
- Sortable and scrollable listing details
- Shows name, host, location, price, ratings
- Superhost badges
- Displays first 100 filtered results

## 🛠️ Tech Stack

- **Framework**: Angular 21
- **Charts**: Chart.js
- **Language**: TypeScript
- **Styling**: CSS3
- **Data Source**: Inside Airbnb (Berlin dataset - September 2025)

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- Angular CLI

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/airbnb-dashboard.git
cd airbnb-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
ng serve
```

4. Open your browser to `http://localhost:4200`

## 📁 Project Structure
```
airbnb-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/              # Main dashboard component
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.css
│   │   ├── data.service.ts         # Data loading & processing service
│   │   └── app.ts                  # Root component
│   └── public/
│       └── listings.csv            # Berlin Airbnb dataset
├── angular.json                    # Angular configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 📊 Data Source

This dashboard uses publicly available data from [Inside Airbnb](http://insideairbnb.com/), specifically:
- **City**: Berlin, Germany
- **Date**: September 23, 2025
- **Dataset**: Listings summary (good for visualizations)

### Key Data Fields
- Listing ID, Name, Host information
- Neighbourhood and location
- Room type, bedrooms, beds, bathrooms
- Price per night
- Number of reviews and ratings
- Availability
- Superhost status

## 🎨 Features Breakdown

### Statistics Cards
Real-time metrics update based on applied filters:
- **Total Listings**: Count of all matching listings
- **Average Price**: Mean price per night in EUR
- **Average Rating**: Mean review score (out of 5)
- **Superhosts**: Count of superhosts in filtered results

### Interactive Filters
All charts and tables update dynamically when filters change:
- **Neighbourhood Dropdown**: Select specific Berlin districts
- **Room Type Dropdown**: Filter by accommodation type
- **Price Slider**: Set maximum price (€20 - €1000)

### Visualizations

**1. Price Distribution**
- Bar chart showing listings grouped by price ranges
- Helps identify the most common price points
- Buckets: €0-50, €50-100, €100-150, €150-200, €200-300, €300-500, €500-1000

**2. Room Type Distribution**
- Pie chart showing proportion of each room type
- Types: Entire home/apt, Private room, Shared room, Hotel room

**3. Top 10 Neighbourhoods**
- Horizontal bar chart ranking neighbourhoods by listing count
- Shows which areas have the most Airbnb presence

**4. Rating Distribution**
- Bar chart showing how ratings are distributed
- Ranges from 0-5 stars in incremental buckets

## 🔧 Building for Production
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 🌐 Deployment

### GitHub Pages

1. Build with correct base href:
```bash
ng build --base-href "/airbnb-dashboard/"
```

2. Deploy to GitHub Pages:
```bash
npx angular-cli-ghpages --dir=dist/airbnb-dashboard/browser
```

Your dashboard will be live at: `https://YOUR_USERNAME.github.io/airbnb-dashboard/`

### Vercel / Netlify
Simply connect your GitHub repository and they'll auto-deploy!

## 📝 Usage Examples

### Finding Affordable Listings
1. Set max price slider to €100
2. Select "Private room" from room type
3. Browse the updated results in the table

### Analyzing Specific Neighbourhoods
1. Select "Mitte" from neighbourhood dropdown
2. Observe price distribution specific to that area
3. Check the average price and rating for that neighbourhood

### Finding Superhosts
1. Check the Superhost count in stats
2. Look for ⭐ badges in the data table
3. Filter by room type to find superhosts in specific categories

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Data provided by [Inside Airbnb](http://insideairbnb.com/)
- Built with [Angular](https://angular.io/)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- Inspired by modern data visualization best practices

## 📧 Contact

Your Name - [Your GitHub Profile](https://github.com/YOUR_USERNAME)

Project Link: [https://github.com/YOUR_USERNAME/airbnb-dashboard](https://github.com/YOUR_USERNAME/airbnb-dashboard)

## 🔮 Future Enhancements

- [ ] Map visualization with listing locations
- [ ] Price trend analysis over time
- [ ] Host analytics (top hosts, multi-listing analysis)
- [ ] Advanced filtering (amenities, minimum stay, etc.)
- [ ] Export data to CSV/Excel
- [ ] Comparison mode between neighbourhoods
- [ ] Predictive pricing model
- [ ] Mobile app version
