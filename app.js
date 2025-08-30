// Application Data
const appData = {
  cities: [
    {"id": 1, "name": "Mumbai", "state": "Maharashtra"},
    {"id": 2, "name": "Delhi", "state": "Delhi"},
    {"id": 3, "name": "Bangalore", "state": "Karnataka"},
    {"id": 4, "name": "Chennai", "state": "Tamil Nadu"},
    {"id": 5, "name": "Kolkata", "state": "West Bengal"},
    {"id": 6, "name": "Hyderabad", "state": "Telangana"},
    {"id": 7, "name": "Pune", "state": "Maharashtra"},
    {"id": 8, "name": "Ahmedabad", "state": "Gujarat"},
    {"id": 9, "name": "Jaipur", "state": "Rajasthan"},
    {"id": 10, "name": "Surat", "state": "Gujarat"}
  ],
  busOperators: [
    {"id": 1, "name": "SRS Travels", "rating": 4.2},
    {"id": 2, "name": "VRL Travels", "rating": 4.0},
    {"id": 3, "name": "Kallada Travels", "rating": 4.5},
    {"id": 4, "name": "Orange Travels", "rating": 3.8},
    {"id": 5, "name": "Jabbar Travels", "rating": 4.1},
    {"id": 6, "name": "Parveen Travels", "rating": 3.9},
    {"id": 7, "name": "Greenline Travels", "rating": 4.3}
  ],
  sampleBuses: [
    {
      "id": 1,
      "operator": "SRS Travels",
      "from": "Mumbai",
      "to": "Pune",
      "departureTime": "06:00",
      "arrivalTime": "09:30",
      "duration": "3h 30m",
      "price": 450,
      "availableSeats": 12,
      "totalSeats": 40,
      "busType": "AC Sleeper",
      "amenities": ["AC", "WiFi", "Charging Point", "Blanket", "Water Bottle"],
      "rating": 4.2,
      "reviews": 1248
    },
    {
      "id": 2,
      "operator": "VRL Travels",
      "from": "Mumbai",
      "to": "Pune",
      "departureTime": "08:15",
      "arrivalTime": "11:45",
      "duration": "3h 30m",
      "price": 380,
      "availableSeats": 8,
      "totalSeats": 35,
      "busType": "Non-AC Seater",
      "amenities": ["Charging Point", "Water Bottle"],
      "rating": 4.0,
      "reviews": 892
    },
    {
      "id": 3,
      "operator": "Kallada Travels",
      "from": "Mumbai",
      "to": "Pune",
      "departureTime": "10:30",
      "arrivalTime": "14:00",
      "duration": "3h 30m",
      "price": 520,
      "availableSeats": 15,
      "totalSeats": 42,
      "busType": "Volvo AC",
      "amenities": ["AC", "WiFi", "Charging Point", "Entertainment", "Snacks"],
      "rating": 4.5,
      "reviews": 1567
    },
    {
      "id": 4,
      "operator": "Orange Travels",
      "from": "Delhi",
      "to": "Jaipur",
      "departureTime": "07:00",
      "arrivalTime": "12:30",
      "duration": "5h 30m",
      "price": 450,
      "availableSeats": 20,
      "totalSeats": 45,
      "busType": "AC Sleeper",
      "amenities": ["AC", "WiFi", "Charging Point", "Blanket"],
      "rating": 3.8,
      "reviews": 654
    },
    {
      "id": 5,
      "operator": "Greenline Travels",
      "from": "Bangalore",
      "to": "Chennai",
      "departureTime": "22:00",
      "arrivalTime": "06:00",
      "duration": "8h 0m",
      "price": 520,
      "availableSeats": 18,
      "totalSeats": 40,
      "busType": "Volvo AC",
      "amenities": ["AC", "WiFi", "Charging Point", "Entertainment", "Blanket"],
      "rating": 4.3,
      "reviews": 987
    }
  ],
  amenityIcons: {
    "AC": "❄️",
    "WiFi": "📶",
    "Charging Point": "🔌",
    "Blanket": "🛏️",
    "Water Bottle": "💧",
    "Entertainment": "📺",
    "Snacks": "🍿"
  }
};

// Application State
let currentState = {
  searchParams: {},
  selectedBus: null,
  selectedSeats: [],
  passengerDetails: [],
  totalFare: 0,
  filteredBuses: []
};

// DOM Elements
const elements = {
  fromCity: document.getElementById('from-city'),
  toCity: document.getElementById('to-city'),
  travelDate: document.getElementById('travel-date'),
  searchBtn: document.getElementById('search-buses'),
  swapCitiesBtn: document.getElementById('swap-cities'),
  busesList: document.getElementById('buses-list'),
  priceRange: document.getElementById('price-range'),
  maxPrice: document.getElementById('max-price'),
  sortSelect: document.getElementById('sort-select'),
  lowerDeck: document.getElementById('lower-deck'),
  upperDeck: document.getElementById('upper-deck'),
  selectedSeatsList: document.getElementById('selected-seats-list'),
  baseFare: document.getElementById('base-fare'),
  taxes: document.getElementById('taxes'),
  totalFare: document.getElementById('total-fare'),
  proceedToBookingBtn: document.getElementById('proceed-to-booking'),
  passengerDetails: document.getElementById('passenger-details'),
  completeBookingBtn: document.getElementById('complete-booking')
};

// Navigation Functions
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show target section
  const targetSection = document.getElementById(`${sectionId}-section`);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Update nav links
  document.querySelectorAll('.nav__link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });
}

// Initialize Application
function initApp() {
  populateCityDropdowns();
  setMinDate();
  setupEventListeners();
  generateSampleBuses();
}

// Populate city dropdowns
function populateCityDropdowns() {
  const fromOptions = appData.cities.map(city => 
    `<option value="${city.name}">${city.name}, ${city.state}</option>`
  ).join('');
  
  const toOptions = appData.cities.map(city => 
    `<option value="${city.name}">${city.name}, ${city.state}</option>`
  ).join('');
  
  elements.fromCity.innerHTML = '<option value="">Select departure city</option>' + fromOptions;
  elements.toCity.innerHTML = '<option value="">Select destination city</option>' + toOptions;
}

// Set minimum date to today
function setMinDate() {
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  elements.travelDate.min = minDate;
  elements.travelDate.value = minDate;
}

// Generate additional sample buses for better demo
function generateSampleBuses() {
  const additionalBuses = [];
  const operators = appData.busOperators;
  const cities = appData.cities;
  
  // Generate more sample buses for variety
  for (let i = 6; i <= 15; i++) {
    const fromCity = cities[Math.floor(Math.random() * cities.length)];
    let toCity = cities[Math.floor(Math.random() * cities.length)];
    while (toCity.name === fromCity.name) {
      toCity = cities[Math.floor(Math.random() * cities.length)];
    }
    
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const departureHour = 6 + Math.floor(Math.random() * 18);
    const departureTime = `${departureHour.toString().padStart(2, '0')}:${['00', '15', '30', '45'][Math.floor(Math.random() * 4)]}`;
    const duration = `${4 + Math.floor(Math.random() * 8)}h ${['0', '15', '30', '45'][Math.floor(Math.random() * 4)]}m`;
    
    const busTypes = ["AC Sleeper", "Non-AC Seater", "Volvo AC", "AC Seater", "Semi Sleeper"];
    const busType = busTypes[Math.floor(Math.random() * busTypes.length)];
    
    const basePrice = 300 + Math.floor(Math.random() * 400);
    const availableSeats = 5 + Math.floor(Math.random() * 25);
    
    const allAmenities = Object.keys(appData.amenityIcons);
    const numAmenities = 2 + Math.floor(Math.random() * 4);
    const amenities = [];
    for (let j = 0; j < numAmenities; j++) {
      const amenity = allAmenities[Math.floor(Math.random() * allAmenities.length)];
      if (!amenities.includes(amenity)) {
        amenities.push(amenity);
      }
    }
    
    additionalBuses.push({
      id: i,
      operator: operator.name,
      from: fromCity.name,
      to: toCity.name,
      departureTime: departureTime,
      arrivalTime: calculateArrivalTime(departureTime, duration),
      duration: duration,
      price: basePrice,
      availableSeats: availableSeats,
      totalSeats: availableSeats + Math.floor(Math.random() * 20),
      busType: busType,
      amenities: amenities,
      rating: operator.rating + (Math.random() - 0.5) * 0.4,
      reviews: 100 + Math.floor(Math.random() * 1000)
    });
  }
  
  appData.sampleBuses = [...appData.sampleBuses, ...additionalBuses];
}

function calculateArrivalTime(departureTime, duration) {
  const [depHour, depMin] = departureTime.split(':').map(Number);
  const [durHour, durMin] = duration.match(/(\d+)h (\d+)m/).slice(1, 3).map(Number);
  
  const totalMinutes = (depHour * 60 + depMin) + (durHour * 60 + durMin);
  const arrHour = Math.floor(totalMinutes / 60) % 24;
  const arrMin = totalMinutes % 60;
  
  return `${arrHour.toString().padStart(2, '0')}:${arrMin.toString().padStart(2, '0')}`;
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      showSection(section);
    });
  });
  
  // Search functionality
  elements.searchBtn.addEventListener('click', handleSearch);
  elements.swapCitiesBtn.addEventListener('click', swapCities);
  
  // Filters
  elements.priceRange.addEventListener('input', updatePriceRange);
  elements.sortSelect.addEventListener('change', handleSort);
  
  document.querySelectorAll('.time-filter').forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });
  
  document.querySelectorAll('.type-filter').forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });
  
  // Back buttons
  document.getElementById('back-to-buses').addEventListener('click', () => showSection('bus-listing'));
  document.getElementById('back-to-seats').addEventListener('click', () => showSection('seat-selection'));
  document.getElementById('modify-search').addEventListener('click', () => showSection('home'));
  
  // Booking flow
  elements.proceedToBookingBtn.addEventListener('click', () => {
    generatePassengerForms();
    updateBookingSummary();
    showSection('booking-form');
  });
  
  elements.completeBookingBtn.addEventListener('click', completeBooking);
  
  // Route cards
  document.querySelectorAll('.route-card').forEach(card => {
    card.addEventListener('click', () => {
      const routeText = card.querySelector('.route').textContent;
      const [from, to] = routeText.split(' → ');
      elements.fromCity.value = from;
      elements.toCity.value = to;
      handleSearch();
    });
  });
}

// Search functionality
function handleSearch() {
  const fromCity = elements.fromCity.value;
  const toCity = elements.toCity.value;
  const travelDate = elements.travelDate.value;
  
  if (!fromCity || !toCity || !travelDate) {
    alert('Please fill in all search fields');
    return;
  }
  
  if (fromCity === toCity) {
    alert('Departure and destination cities cannot be the same');
    return;
  }
  
  currentState.searchParams = { fromCity, toCity, travelDate };
  searchBuses(fromCity, toCity, travelDate);
}

function searchBuses(fromCity, toCity, travelDate) {
  // Filter buses based on route
  const availableBuses = appData.sampleBuses.filter(bus => 
    bus.from === fromCity && bus.to === toCity
  );
  
  currentState.filteredBuses = availableBuses;
  displayBuses(availableBuses);
  updateSearchSummary(fromCity, toCity, travelDate);
  showSection('bus-listing');
}

function displayBuses(buses) {
  if (buses.length === 0) {
    elements.busesList.innerHTML = `
      <div class="empty-state">
        <p>No buses found for this route. Please try a different route or date.</p>
        <button class="btn btn--primary" onclick="showSection('home')">Search Again</button>
      </div>
    `;
    return;
  }
  
  elements.busesList.innerHTML = buses.map(bus => `
    <div class="bus-card fade-in">
      <div class="bus-card__content">
        <div class="bus-info">
          <h4>${bus.operator}</h4>
          <div class="bus-type">${bus.busType}</div>
          <div class="rating">
            <span class="rating-value">${bus.rating.toFixed(1)}</span>
            <span class="rating-reviews">(${bus.reviews} reviews)</span>
          </div>
          <div class="bus-amenities">
            ${bus.amenities.map(amenity => `
              <span class="amenity">
                <span>${appData.amenityIcons[amenity] || '•'}</span>
                ${amenity}
              </span>
            `).join('')}
          </div>
        </div>
        
        <div class="bus-timing">
          <div class="time">${bus.departureTime}</div>
          <div class="duration">${bus.duration}</div>
          <div class="time">${bus.arrivalTime}</div>
        </div>
        
        <div class="bus-pricing">
          <div class="price">₹${bus.price}</div>
          <div class="seats-available">${bus.availableSeats} seats available</div>
          <button class="select-bus-btn" onclick="selectBus(${bus.id})">
            Select Seats
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function updateSearchSummary(fromCity, toCity, travelDate) {
  const formattedDate = new Date(travelDate).toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
  document.getElementById('search-summary-text').textContent = 
    `${fromCity} → ${toCity} | ${formattedDate}`;
}

function swapCities() {
  const temp = elements.fromCity.value;
  elements.fromCity.value = elements.toCity.value;
  elements.toCity.value = temp;
}

// Filtering and Sorting
function updatePriceRange() {
  elements.maxPrice.textContent = `₹${elements.priceRange.value}`;
  applyFilters();
}

function applyFilters() {
  const maxPrice = parseInt(elements.priceRange.value);
  const timeFilters = Array.from(document.querySelectorAll('.time-filter:checked')).map(f => f.value);
  const typeFilters = Array.from(document.querySelectorAll('.type-filter:checked')).map(f => f.value);
  
  let filtered = currentState.filteredBuses.filter(bus => bus.price <= maxPrice);
  
  // Apply time filters
  if (timeFilters.length > 0) {
    filtered = filtered.filter(bus => {
      const hour = parseInt(bus.departureTime.split(':')[0]);
      return timeFilters.some(filter => {
        switch (filter) {
          case 'early-morning': return hour < 6;
          case 'morning': return hour >= 6 && hour < 12;
          case 'afternoon': return hour >= 12 && hour < 18;
          case 'night': return hour >= 18;
          default: return true;
        }
      });
    });
  }
  
  // Apply type filters
  if (typeFilters.length > 0) {
    filtered = filtered.filter(bus => {
      return typeFilters.some(filter => bus.busType.includes(filter));
    });
  }
  
  displayBuses(filtered);
}

function handleSort() {
  const sortBy = elements.sortSelect.value;
  const buses = Array.from(document.querySelectorAll('.bus-card'));
  
  // Get current buses data
  const currentBuses = currentState.filteredBuses;
  
  let sortedBuses = [...currentBuses];
  
  switch (sortBy) {
    case 'departure':
      sortedBuses.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
      break;
    case 'price-low':
      sortedBuses.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sortedBuses.sort((a, b) => b.price - a.price);
      break;
    case 'duration':
      sortedBuses.sort((a, b) => {
        const aDuration = parseInt(a.duration.match(/(\d+)h/)[1]) * 60 + parseInt(a.duration.match(/(\d+)m/)[1]);
        const bDuration = parseInt(b.duration.match(/(\d+)h/)[1]) * 60 + parseInt(b.duration.match(/(\d+)m/)[1]);
        return aDuration - bDuration;
      });
      break;
    case 'rating':
      sortedBuses.sort((a, b) => b.rating - a.rating);
      break;
  }
  
  displayBuses(sortedBuses);
}

// Bus Selection and Seat Layout
function selectBus(busId) {
  const bus = appData.sampleBuses.find(b => b.id === busId);
  if (!bus) return;
  
  currentState.selectedBus = bus;
  generateSeatLayout(bus);
  updateSelectedBusInfo(bus);
  showSection('seat-selection');
}

function generateSeatLayout(bus) {
  // Generate seat layout for lower deck
  const lowerSeats = generateSeats('L', 20, bus.totalSeats);
  elements.lowerDeck.innerHTML = lowerSeats;
  
  // Generate seat layout for upper deck
  const upperSeats = generateSeats('U', 20, bus.totalSeats);
  elements.upperDeck.innerHTML = upperSeats;
  
  // Add seat click listeners
  document.querySelectorAll('.seat.available').forEach(seat => {
    seat.addEventListener('click', () => toggleSeat(seat));
  });
}

function generateSeats(deck, count, totalSeats) {
  let seats = '';
  const bookedSeats = Math.floor(totalSeats * 0.7); // 70% booked for demo
  
  for (let i = 1; i <= count; i++) {
    const seatNumber = `${deck}${i}`;
    const isBooked = Math.random() < 0.3; // 30% chance of being booked
    const seatClass = isBooked ? 'booked' : 'available';
    
    seats += `
      <div class="seat ${seatClass}" data-seat="${seatNumber}" data-price="${currentState.selectedBus.price}">
        ${seatNumber}
      </div>
    `;
  }
  
  return seats;
}

function toggleSeat(seatElement) {
  const seatNumber = seatElement.getAttribute('data-seat');
  const seatPrice = parseInt(seatElement.getAttribute('data-price'));
  
  if (seatElement.classList.contains('selected')) {
    // Deselect seat
    seatElement.classList.remove('selected');
    seatElement.classList.add('available');
    currentState.selectedSeats = currentState.selectedSeats.filter(seat => seat.number !== seatNumber);
  } else {
    // Select seat (max 4 seats)
    if (currentState.selectedSeats.length >= 4) {
      alert('You can select maximum 4 seats');
      return;
    }
    
    seatElement.classList.remove('available');
    seatElement.classList.add('selected');
    currentState.selectedSeats.push({
      number: seatNumber,
      price: seatPrice
    });
  }
  
  updateSelectedSeatsDisplay();
  updateFareCalculation();
}

function updateSelectedSeatsDisplay() {
  if (currentState.selectedSeats.length === 0) {
    elements.selectedSeatsList.innerHTML = '<p class="no-seats">No seats selected</p>';
  } else {
    elements.selectedSeatsList.innerHTML = currentState.selectedSeats.map(seat => `
      <div class="selected-seat-item">
        <span class="seat-number">${seat.number}</span>
        <span class="seat-price">₹${seat.price}</span>
      </div>
    `).join('');
  }
  
  // Enable/disable proceed button
  elements.proceedToBookingBtn.disabled = currentState.selectedSeats.length === 0;
}

function updateFareCalculation() {
  const baseFare = currentState.selectedSeats.reduce((total, seat) => total + seat.price, 0);
  const taxes = Math.round(baseFare * 0.05); // 5% tax
  const totalFare = baseFare + taxes;
  
  elements.baseFare.textContent = `₹${baseFare}`;
  elements.taxes.textContent = `₹${taxes}`;
  elements.totalFare.textContent = `₹${totalFare}`;
  
  currentState.totalFare = totalFare;
}

function updateSelectedBusInfo(bus) {
  document.getElementById('selected-bus-info').textContent = 
    `${bus.operator} - ${bus.from} → ${bus.to}`;
}

// Booking Form
function generatePassengerForms() {
  const seatCount = currentState.selectedSeats.length;
  let formsHtml = '';
  
  for (let i = 0; i < seatCount; i++) {
    const seat = currentState.selectedSeats[i];
    formsHtml += `
      <div class="passenger-form">
        <h5>Passenger ${i + 1} - Seat ${seat.number}</h5>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">First Name *</label>
            <input type="text" class="form-control passenger-fname" required>
          </div>
          <div class="form-group">
            <label class="form-label">Last Name *</label>
            <input type="text" class="form-control passenger-lname" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Age *</label>
            <input type="number" class="form-control passenger-age" min="1" max="120" required>
          </div>
          <div class="form-group">
            <label class="form-label">Gender *</label>
            <select class="form-control passenger-gender" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }
  
  elements.passengerDetails.innerHTML = formsHtml;
}

function updateBookingSummary() {
  const bus = currentState.selectedBus;
  const searchParams = currentState.searchParams;
  
  // Update trip info
  document.getElementById('summary-route').textContent = `${bus.from} → ${bus.to}`;
  document.getElementById('summary-date').textContent = new Date(searchParams.travelDate).toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
  document.getElementById('summary-time').textContent = bus.departureTime;
  document.getElementById('summary-operator').textContent = bus.operator;
  document.getElementById('summary-bus-type').textContent = bus.busType;
  
  // Update fare
  document.getElementById('summary-base-fare').textContent = elements.baseFare.textContent;
  document.getElementById('summary-taxes').textContent = elements.taxes.textContent;
  document.getElementById('summary-total').textContent = elements.totalFare.textContent;
  
  // Update passengers summary
  const passengersHtml = currentState.selectedSeats.map(seat => `
    <div class="passenger-summary">
      <span>Seat ${seat.number}</span>
      <span>₹${seat.price}</span>
    </div>
  `).join('');
  
  document.getElementById('summary-passengers').innerHTML = passengersHtml;
}

function completeBooking() {
  // Validate passenger details
  const passengerInputs = document.querySelectorAll('#passenger-details input[required], #passenger-details select[required]');
  const contactEmail = document.getElementById('contact-email');
  const contactMobile = document.getElementById('contact-mobile');
  
  let isValid = true;
  
  passengerInputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = 'var(--color-error)';
      isValid = false;
    } else {
      input.style.borderColor = '';
    }
  });
  
  if (!contactEmail.value.trim() || !contactMobile.value.trim()) {
    if (!contactEmail.value.trim()) contactEmail.style.borderColor = 'var(--color-error)';
    if (!contactMobile.value.trim()) contactMobile.style.borderColor = 'var(--color-error)';
    isValid = false;
  }
  
  if (!isValid) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Show loading state
  elements.completeBookingBtn.textContent = 'Processing...';
  elements.completeBookingBtn.disabled = true;
  
  // Simulate booking process
  setTimeout(() => {
    showBookingConfirmation();
    elements.completeBookingBtn.textContent = 'Pay & Complete Booking';
    elements.completeBookingBtn.disabled = false;
  }, 2000);
}

function showBookingConfirmation() {
  // Generate booking ID
  const bookingId = 'TB' + Math.random().toString(36).substr(2, 8).toUpperCase();
  document.getElementById('booking-id').textContent = bookingId;
  
  // Show modal
  document.getElementById('success-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('success-modal').classList.add('hidden');
  resetBookingFlow();
  showSection('home');
}

function resetBookingFlow() {
  currentState.selectedSeats = [];
  currentState.selectedBus = null;
  currentState.totalFare = 0;
  currentState.passengerDetails = [];
  
  // Clear forms
  elements.fromCity.value = '';
  elements.toCity.value = '';
  elements.travelDate.value = new Date().toISOString().split('T')[0];
  
  // Reset price range
  elements.priceRange.value = 1000;
  elements.maxPrice.textContent = '₹1000';
  
  // Clear filters
  document.querySelectorAll('.time-filter, .type-filter').forEach(filter => {
    filter.checked = false;
  });
}

// Modal close on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal();
  }
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);