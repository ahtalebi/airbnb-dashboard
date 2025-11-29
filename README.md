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

Before you begin, ensure you have the following installed:
- **Node.js** (v20 or higher) - [Download here](https://nodejs.org/)
- **npm** (v10 or higher) - Comes with Node.js
- **Angular CLI** - Will be installed in step 2

To check if you have Node.js and npm installed:
```bash
node --version  # Should show v20.x.x or higher
npm --version   # Should show v10.x.x or higher
```

### Installation

**Step 1: Clone the repository**
```bash
git clone https://github.com/ahtalebi/airbnb-dashboard.git
cd airbnb-dashboard
```

**Step 2: Install dependencies**
```bash
npm install
```

This will install:
- Angular framework and CLI
- Chart.js for visualizations
- TypeScript compiler
- All other required packages

**Step 3: Verify the data file**

Make sure the CSV data file exists:
```bash
ls public/listings.csv
```

If it's missing, download it:
```bash
cd public
wget http://data.insideairbnb.com/germany/be/berlin/2025-09-23/data/listings.csv
# Or use curl if wget is not available:
# curl -o listings.csv http://data.insideairbnb.com/germany/be/berlin/2025-09-23/data/listings.csv
cd ..
```

**Step 4: Run the development server**
```bash
ng serve
```

**Step 5: Open in your browser**

Navigate to: **http://localhost:4200**

The application will automatically reload if you change any of the source files.

### 🎯 You should now see:
- ✅ A dashboard header with "Berlin Airbnb Analytics"
- ✅ Four statistics cards showing metrics
- ✅ Filter dropdowns and a price slider
- ✅ Four interactive charts
- ✅ A data table with listings

### ⚠️ Troubleshooting Local Setup

**Problem: "ng: command not found"**
```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Verify installation
ng version
```

**Problem: "Cannot find module 'chart.js'"**
```bash
# Reinstall dependencies
npm install chart.js
```

**Problem: Dashboard shows "Loading data..." forever**
- Open browser console (F12 → Console tab)
- Check for errors
- Verify `public/listings.csv` file exists
- Try hard refresh: `Ctrl + Shift + R`

**Problem: Port 4200 already in use**
```bash
# Use a different port
ng serve --port 4300
# Then open http://localhost:4300
```

**Problem: Charts not displaying**
- Wait a few seconds (large dataset takes time to load)
- Check browser console for JavaScript errors
- Make sure you're using a modern browser (Chrome, Firefox, Edge)

## 📁 Project Structure
```
airbnb-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/              # Main dashboard component
│   │   │   ├── dashboard.component.ts       # Component logic
│   │   │   ├── dashboard.component.html     # Template
│   │   │   └── dashboard.component.css      # Styles
│   │   ├── data.service.ts         # Data loading & processing service
│   │   └── app.ts                  # Root component
│   ├── index.html                  # Entry HTML file
│   ├── main.ts                     # Application bootstrap
│   └── styles.css                  # Global styles
├── public/
│   └── listings.csv                # Berlin Airbnb dataset (~20MB)
├── angular.json                    # Angular workspace configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## 📊 Data Source

This dashboard uses publicly available data from [Inside Airbnb](http://insideairbnb.com/), specifically:
- **City**: Berlin, Germany
- **Date**: September 23, 2025
- **Dataset**: Listings data (detailed version for comprehensive analysis)
- **Size**: ~20MB, ~20,000 listings
- **License**: Creative Commons CC0 1.0 Universal

### Key Data Fields Used
- **Basic Info**: ID, Name, Host name
- **Location**: Neighbourhood
- **Property**: Room type, Bedrooms, Beds, Bathrooms
- **Pricing**: Price per night (EUR)
- **Reviews**: Number of reviews, Review scores/ratings
- **Host**: Superhost status
- **Availability**: Days available per year

## 🎨 Features Breakdown

### Statistics Cards
Real-time metrics that update based on applied filters:
- **Total Listings**: Count of all matching listings
- **Average Price**: Mean price per night in EUR (€)
- **Average Rating**: Mean review score out of 5.0
- **Superhosts**: Count of verified superhosts in filtered results

### Interactive Filters
All charts and the data table update dynamically when filters change:
- **Neighbourhood Dropdown**: Select specific Berlin districts (e.g., Mitte, Kreuzberg, Prenzlauer Berg)
- **Room Type Dropdown**: Filter by accommodation type
  - Entire home/apartment
  - Private room
  - Shared room
  - Hotel room
- **Price Slider**: Set maximum price from €20 to €1000

### Visualizations

**1. Price Distribution Chart**
- Type: Bar chart
- Shows: Number of listings in different price ranges
- Price buckets: €0-50, €50-100, €100-150, €150-200, €200-300, €300-500, €500-1000
- Use case: Identify the most common price points and spot pricing trends

**2. Room Type Distribution Chart**
- Type: Pie chart
- Shows: Proportion of each room type
- Categories: Entire home/apt, Private room, Shared room, Hotel room
- Use case: Understand the accommodation mix in Berlin

**3. Top 10 Neighbourhoods Chart**
- Type: Horizontal bar chart
- Shows: Neighbourhoods ranked by number of listings
- Use case: Identify which areas have the most Airbnb activity

**4. Rating Distribution Chart**
- Type: Bar chart
- Shows: Distribution of review scores
- Rating ranges: 0-3.0, 3.0-3.5, 3.5-4.0, 4.0-4.5, 4.5-4.7, 4.7-5.0
- Use case: Understand quality distribution across listings

### Data Table
- Displays: First 100 results from filtered data
- Columns: Name, Host, Neighbourhood, Room Type, Price, Bedrooms, Reviews, Rating, Superhost badge
- Features: Scrollable, shows superhost status with ⭐ badge
- Updates: Real-time based on active filters

## 🔧 Development Commands
```bash
# Install dependencies
npm install

# Start development server (http://localhost:4200)
ng serve

# Start on different port
ng serve --port 4300

# Build for production
ng build --configuration production

# Run tests (if available)
ng test

# Check for linting errors
ng lint
```

## 🌐 Building for Production

Build the application for production deployment:
```bash
ng build --configuration production
```

The optimized build artifacts will be stored in the `dist/airbnb-dashboard/browser/` directory.

Production build includes:
- Minified JavaScript and CSS
- Tree-shaking to remove unused code
- Ahead-of-time (AOT) compilation
- Optimized bundle sizes

## 🚀 Deployment

### GitHub Pages

**Step 1: Build with correct base URL**
```bash
ng build --base-href "/airbnb-dashboard/"
```

**Step 2: Deploy to GitHub Pages**
```bash
# Install deployment tool if not already installed
npm install -g angular-cli-ghpages

# Deploy
npx angular-cli-ghpages --dir=dist/airbnb-dashboard/browser
```

**Step 3: Access your live dashboard**

Your dashboard will be live at: `https://ahtalebi.github.io/airbnb-dashboard/`

### Alternative: Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Angular and deploy!

### Alternative: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Build command: `ng build --configuration production`
5. Publish directory: `dist/airbnb-dashboard/browser`

## 📝 Usage Examples

### Example 1: Finding Affordable Listings
1. Move the **max price slider** to €100
2. Select **"Private room"** from the room type dropdown
3. Observe the updated statistics and charts
4. Browse affordable options in the data table below

### Example 2: Analyzing Specific Neighbourhoods
1. Select **"Mitte"** (or any neighbourhood) from the dropdown
2. Check the price distribution specific to that area
3. Note the average price and rating in the stats cards
4. See how many listings are in that neighbourhood

### Example 3: Finding High-Quality Superhosts
1. Look at the **Superhosts** count in the stats cards
2. Scroll through the data table
3. Look for **⭐ badges** in the Superhost column
4. Filter by room type to find superhosts in specific categories

### Example 4: Budget Analysis
1. Use the price slider to set different budgets
2. Watch how the total listings count changes
3. Compare average ratings across different price ranges
4. Identify the sweet spot for value

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the project**
2. **Create your feature branch**
```bash
   git checkout -b feature/AmazingFeature
```
3. **Commit your changes**
```bash
   git commit -m 'Add some AmazingFeature'
```
4. **Push to the branch**
```bash
   git push origin feature/AmazingFeature
```
5. **Open a Pull Request**

### Ideas for Contributions
- Add map visualization with leaflet.js
- Implement advanced filtering (amenities, minimum nights)
- Add export functionality (CSV, PDF)
- Create comparison mode for neighbourhoods
- Add time-series analysis if historical data available
- Improve mobile responsiveness
- Add dark mode theme

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Data Provider**: [Inside Airbnb](http://insideairbnb.com/) - Murray Cox
- **Framework**: [Angular](https://angular.io/) by Google
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Icons**: Emoji icons (built-in Unicode)
- **Inspiration**: Modern data visualization best practices and Berlin's vibrant short-term rental market

## 📧 Contact

**Amir Talebi**
- GitHub: [@ahtalebi](https://github.com/ahtalebi)
- Project: [github.com/ahtalebi/airbnb-dashboard](https://github.com/ahtalebi/airbnb-dashboard)
- Live Demo: [ahtalebi.github.io/airbnb-dashboard](https://ahtalebi.github.io/airbnb-dashboard/)

## 🔮 Roadmap & Future Enhancements

- [ ] **Interactive Map**: Geospatial visualization of listings using Leaflet or Mapbox
- [ ] **Historical Trends**: Price and availability trends over time
- [ ] **Host Analytics**: Top hosts, multi-listing analysis, superhost insights
- [ ] **Advanced Filtering**: 
  - Amenities (WiFi, Kitchen, Parking, etc.)
  - Minimum/maximum nights
  - Instant bookable
  - Cancellation policy
- [ ] **Export Features**: Download filtered data as CSV or Excel
- [ ] **Comparison Mode**: Side-by-side neighbourhood comparisons
- [ ] **Predictive Model**: Price prediction based on features
- [ ] **Mobile App**: React Native or Flutter version
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Favorites**: Save and compare favorite listings
- [ ] **Share Filters**: Generate shareable URLs with active filters

## 🐛 Known Issues

- Large dataset may take 2-3 seconds to load initially
- GitHub Pages deployment requires data file to be under 25MB
- Some browsers may show warnings about loading local CSV files (works fine on deployed version)

## 📚 Learn More

- [Angular Documentation](https://angular.io/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Inside Airbnb Data Methodology](http://insideairbnb.com/about/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Made with ❤️ and ☕ by Amir Talebi**

*Last updated: November 2025*
