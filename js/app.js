// DARK MODE & LANGUAGE
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const htmlEl = document.documentElement;
let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (darkMode) htmlEl.classList.add('dark');

// Initialize language
htmlEl.lang = 'en';
langToggle.textContent = 'NL';

// PWA Install functionality
const installBtn = document.getElementById('install-btn');
let deferredPrompt;

// Handle install button click
installBtn.addEventListener('click', () => {
  showInstallPage();
});

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
});

themeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  htmlEl.classList.toggle('dark', darkMode);
});

langToggle.addEventListener('click', () => {
  const currentLang = htmlEl.lang;
  htmlEl.lang = currentLang === 'en' ? 'nl' : 'en';
  langToggle.textContent = htmlEl.lang === 'en' ? 'NL' : 'EN';
  renderInfo(); renderActs(); renderSchedule();
  
  // Update install page if it's currently showing
  if (!document.getElementById('pwa-install').classList.contains('hidden')) {
    renderInstallPage();
  }
});

// NAVIGATION
document.querySelectorAll('nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(btn.dataset.screen).classList.remove('hidden');
  });
});

// ACTS DATA
const acts = [
  { 
    name: 'Armin van Buuren', 
    desc: 'trance icon', 
    fullDesc: 'Five-time "World\'s No. 1 DJ" and trance icon, Armin delivers euphoric, high-energy sets that have headlined festivals from Tomorrowland to Ultra. His uplifting melodies and impeccable mixing keep crowds dancing for hours.',
    image: 'css/images/ArminvanBuuren.png',
    video: 'https://www.youtube.com/embed/TxvpctgU_s8?autoplay=0&controls=1&rel=0' 
  },
  { 
    name: 'Martin Garrix', 
    desc: 'EDM superstar', 
    fullDesc: 'Broke through as a teenager with "Animals," Martin Garrix has become one of the biggest names in EDM. His anthemic big-room tracks and stadium-sized drops make him a festival favorite across Europe.',
    image: 'css/images/MartinGarrix.png',
    video: 'https://www.youtube.com/embed/Zv1QV6lrc_Y?autoplay=0&controls=1&rel=0' 
  },
  { 
    name: 'Kensington', 
    desc: 'indie rock anthems', 
    fullDesc: 'Rotterdam-born indie rock quintet known for soaring choruses and driving guitar riffs. Hits like "Streets" and "Riddles" showcase their knack for arena-ready hooks and emotionally charged lyricism.',
    image: 'css/images/Kensington.png',
    video: 'https://www.youtube.com/embed/IH77eOyV95o?autoplay=0&controls=1&rel=0' 
  },
  { 
    name: 'Within Temptation', 
    desc: 'symphonic metal pioneers', 
    fullDesc: 'Symphonic metal pioneers fronted by Sharon den Adel. Their cinematic soundscapes and operatic vocals (think "Ice Queen," "Mother Earth") translate into dramatic, visually stunning festival performances.',
    image: 'css/images/WithinTemptation.png',
    video: 'https://www.youtube.com/embed/iQVei5C2N4E?autoplay=0&controls=1&rel=0' 
  },
  { 
    name: 'De Staat', 
    desc: 'experimental rock innovators', 
    fullDesc: 'Experimental rock outfit from Nijmegen, blending funky grooves with angular guitar work and theatrical stagecraft. Tracks like "Witch Doctor" and "Down Town" highlight their genre-bending approach and infectious energy.',
    image: 'css/images/DeStaat.png',
    video: 'https://www.youtube.com/embed/0ttGgIQpAUc?autoplay=0&controls=1&rel=0' 
  },
  { 
    name: 'Chef\'Special', 
    desc: 'genre-blending funk-pop', 
    fullDesc: 'A four-piece from Haarlem mixing funk, pop, rock and hip-hop. Their upbeat, genre-fluid sound on songs like "Amigo" and "In Your Arms" makes for joyous, dance-floor-friendly live shows.',
    image: 'css/images/ChefSpecial.png',
    video: 'https://www.youtube.com/embed/l3jRIr44lss?autoplay=0&controls=1&rel=0' 
  },
  { 
    name: 'Navarone', 
    desc: 'hard-hitting rock four-piece', 
    fullDesc: 'Utrecht\'s hard-hitting rock four-piece, delivering riff-driven anthems and dynamic vocals. With a live reputation for raw intensity, they\'re tailor-made for late-night main stages.',
    image: 'css/images/Navarone.png',
    video: 'https://www.youtube.com/embed/EvLpaCSnc4k?autoplay=0&controls=1&rel=0' 
  },
  { 
    name: 'Dotan', 
    desc: 'folk-pop singer-songwriter', 
    fullDesc: 'Folk-pop singer-songwriter whose intimate voice and acoustic arrangements (notably on "Home") have earned him platinum sales and sell-out shows. His heartfelt storytelling connects deeply on festival acoustic stages.',
    image: 'css/images/Dotan.png',
    video: 'https://www.youtube.com/embed/FZEuqzW16Nw?autoplay=0&controls=1&rel=0' 
  },
  { 
    name: 'Eefje de Visser', 
    desc: 'atmospheric indie-pop', 
    fullDesc: 'Indie-pop artist crafting atmospheric, electronic-tinged songs. Her hypnotic vocals and lush production (as heard on "Ongeveer") create a dreamlike vibe perfect for twilight festival slots.',
    image: 'css/images/EefjedeVisser.png',
    video: 'https://www.youtube.com/embed/6IlLJNmLDMg?autoplay=0&controls=1&rel=0' 
  },
  { 
    name: 'Froukje', 
    desc: 'candid pop songwriter', 
    fullDesc: 'Breakthrough pop singer Froukje Veenstra combines candid lyrics with catchy, synth-driven hooks. Since her 2021 debut, she\'s become a voice of her generation—ideal for mid-day festival stages.',
    image: 'css/images/Froukje.png',
    video: 'https://www.youtube.com/embed/g4PlReX9e-E?autoplay=0&controls=1&rel=0' 
  },
  { 
    name: 'Spinvis', 
    desc: 'Poetic lo-fi surrealist in pop form', 
    fullDesc: 'Erik de Jong performs under the moniker Spinvis, crafting poetic, collage-like songs that blend spoken-word snippets, lo-fi electronics and wistful pop. Since his debut album in 2002—recorded in his attic—he\'s become a fixture of Dutch indie, renowned for narratives that feel both intimate and surreal. His live shows turn everyday observations into shared, dreamlike experiences.',
    image: 'css/images/Spinvis.png',
    video: 'https://www.youtube.com/embed/F3ZTrGWSLf4?autoplay=0&controls=1&rel=0' 
  }
];
function renderActs() {
  const container = document.getElementById('acts-list');
  container.innerHTML = '';
  acts.forEach((act, index) => {
    const el = document.createElement('div');
    el.className = 'act-card clickable';
    el.innerHTML = `
      <div class="act-image-container">
        <img src="${act.image}" alt="${act.name}" class="act-image" />
        <div class="act-text-content">
          <h3>${act.name}</h3>
          <p>${act.desc}</p>
        </div>
      </div>
      <div class="act-actions">
        <button class="read-more-btn">📖 Read More</button>
        <button class="play-video-btn">▶️ Watch Video</button>
      </div>
      
      <div class="description-container" id="desc-${index}" style="display: none;">
        <button class="close-description">✕</button>
        <div class="full-description">
          <h4>${act.name}</h4>
          <p>${act.fullDesc}</p>
        </div>
      </div>
      
      <div class="video-container" id="video-${index}" style="display: none;">
        <button class="close-video">✕</button>
        <iframe src="" data-src="${act.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
    
    const readMoreBtn = el.querySelector('.read-more-btn');
    const playVideoBtn = el.querySelector('.play-video-btn');
    const descriptionContainer = el.querySelector('.description-container');
    const videoContainer = el.querySelector('.video-container');
    const closeDescBtn = el.querySelector('.close-description');
    const closeVideoBtn = el.querySelector('.close-video');
    
    // Read More functionality
    readMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close any other open content
      document.querySelectorAll('.description-container, .video-container').forEach(c => c.style.display = 'none');
      document.querySelectorAll('.act-card').forEach(c => c.classList.remove('expanded'));
      document.querySelectorAll('iframe').forEach(iframe => iframe.src = '');
      
      // Open this description
      descriptionContainer.style.display = 'block';
      el.classList.add('expanded');
    });
    
    // Play Video functionality
    playVideoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close any other open content
      document.querySelectorAll('.description-container, .video-container').forEach(c => c.style.display = 'none');
      document.querySelectorAll('.act-card').forEach(c => c.classList.remove('expanded'));
      document.querySelectorAll('iframe').forEach(iframe => iframe.src = '');
      
      // Open this video
      const iframe = videoContainer.querySelector('iframe');
      iframe.src = iframe.dataset.src;
      videoContainer.style.display = 'block';
      el.classList.add('expanded');
    });
    
    // Close description
    closeDescBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      descriptionContainer.style.display = 'none';
      el.classList.remove('expanded');
    });
    
    // Close video
    closeVideoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const iframe = videoContainer.querySelector('iframe');
      iframe.src = '';
      videoContainer.style.display = 'none';
      el.classList.remove('expanded');
    });
    
    container.appendChild(el);
  });
}
renderActs();

// INFO DATA
const info = {
  nl: `
    <h3>Algemeen & contact</h3>
    <p>Locatie: Strijkviertel, Utrecht<br>Datum: 6 sept 2025, 12:00–23:00</p>
    <h3>Bereikbaarheid</h3>
    <p>Fietsstalling gratis; Parkeren P+R Papendorp; OV via 9292.nl; Shuttlebus 12–19h, terug 21h+</p>
    <h3>Lockers</h3><p>Kluisjes aanwezig,</p>
    <h3>FAQ</h3><p>Medicijnen, uit/terug niet toegestaan, kluisjes.</p>
  `,
  en: `
    <h3>General & Contact</h3>
    <p>Location: Strijkviertel, Utrecht<br>Date: Sept 6, 2025, 12:00–23:00</p>
    <h3>Access</h3>
    <p>Free bike parking; Car: P+R Papendorp; Public transport via 9292.nl; Shuttle bus 12–19h, return from 21h</p>
    <h3>Lockers</h3><p>Lockers available,</p>
    <h3>FAQ</h3><p>Medication rules, no re-entry, lockers info.</p>
  `
};
function renderInfo() {
  document.getElementById('info-content').innerHTML = info[htmlEl.lang] || info.en;
}
renderInfo();

// SCHEDULE DATA
const scheduleData = {
  saturday: {
    ponton: [
      { time: '12:00-14:00', name: 'Armin van Buuren' },
      { time: '14:15-16:00', name: 'Kensington' },
      { time: '16:15-18:00', name: 'De Staat' },
      { time: '18:15-20:00', name: 'Navarone' },
      { time: '20:15-21:30', name: 'Dotan' },
      { time: '21:45-23:00', name: 'Froukje' }
    ],
    lake: [
      { time: '12:00-13:00', name: 'Talent Set 1' },
      { time: '13:15-14:15', name: 'Talent Set 2' },
      { time: '14:30-15:30', name: 'Talent Set 3' },
      { time: '15:45-16:45', name: 'Talent Set 4' },
      { time: '17:00-18:00', name: 'Talent Set 5' },
      { time: '18:15-19:15', name: 'Talent Set 6' },
      { time: '19:30-20:30', name: 'Talent Set 7' }
    ],
    club: [
      { time: '12:00-13:30', name: 'Comedy Show' },
      { time: '13:45-15:15', name: 'Lecture' },
      { time: '15:30-17:00', name: 'Theater Performance' },
      { time: '17:15-18:45', name: 'Movie Screening' },
      { time: '19:00-20:30', name: 'Performance Art' },
      { time: '20:45-22:15', name: 'Illusionist Show' }
    ],
    hangar: [
      { time: '12:00-13:30', name: 'DJ Set 1' },
      { time: '13:30-15:00', name: 'DJ Set 2' },
      { time: '15:00-16:30', name: 'DJ Set 3' },
      { time: '16:30-18:00', name: 'DJ Set 4' },
      { time: '18:00-19:30', name: 'DJ Set 5' },
      { time: '19:30-21:00', name: 'DJ Set 6' },
      { time: '21:00-22:30', name: 'DJ Set 7' },
      { time: '22:30-24:00', name: 'DJ Set 8' }
    ]
  },
  sunday: {
    ponton: [
      { time: '12:00-14:00', name: 'Martin Garrix' },
      { time: '14:15-16:00', name: 'Within Temptation' },
      { time: '16:15-18:00', name: 'Chef\'Special' },
      { time: '18:15-20:00', name: 'Eefje de Visser' },
      { time: '20:15-22:00', name: 'Spinvis' }
    ],
    lake: [
      { time: '12:00-13:15', name: 'Talent Set 1' },
      { time: '13:30-14:45', name: 'Talent Set 2' },
      { time: '15:00-16:15', name: 'Talent Set 3' },
      { time: '16:30-17:45', name: 'Talent Set 4' },
      { time: '18:00-19:15', name: 'Talent Set 5' },
      { time: '19:30-20:45', name: 'Talent Set 6' }
    ],
    club: [
      { time: '12:00-13:30', name: 'Comedy Show' },
      { time: '13:45-15:15', name: 'Lecture' },
      { time: '15:30-17:00', name: 'Theater Performance' },
      { time: '17:15-18:45', name: 'Movie Screening' },
      { time: '19:00-20:30', name: 'Magic Show' }
    ],
    hangar: [
      { time: '12:00-13:30', name: 'DJ Set 1' },
      { time: '13:30-15:00', name: 'DJ Set 2' },
      { time: '15:00-16:30', name: 'DJ Set 3' },
      { time: '16:30-18:00', name: 'DJ Set 4' },
      { time: '18:00-19:30', name: 'DJ Set 5' },
      { time: '19:30-21:00', name: 'DJ Set 6' },
      { time: '21:00-22:30', name: 'DJ Set 7' },
      { time: '22:30-24:00', name: 'DJ Set 8' }
    ]
  }
};

let currentDay = 'saturday';
function renderSchedule() {
  const grid = document.getElementById('schedule-grid');
  const currentSchedule = scheduleData[currentDay];
  
  grid.innerHTML = `
    <div class="schedule-header">
      <div class="day-selector">
        <button class="day-btn ${currentDay === 'saturday' ? 'active' : ''}" data-day="saturday">
          ${htmlEl.lang === 'nl' ? 'Zaterdag' : 'Saturday'}
        </button>
        <button class="day-btn ${currentDay === 'sunday' ? 'active' : ''}" data-day="sunday">
          ${htmlEl.lang === 'nl' ? 'Zondag' : 'Sunday'}
        </button>
      </div>
    </div>
    
    <div class="schedule-stages">
      <div class="stage-column">
        <h4>Ponton (Main Stage)</h4>
        ${currentSchedule.ponton.map(event => `
          <div class="schedule-card main-stage">
            <strong>${event.time}</strong>
            <p>${event.name}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="stage-column">
        <h4>The Lake</h4>
        ${currentSchedule.lake.map(event => `
          <div class="schedule-card lake-stage">
            <strong>${event.time}</strong>
            <p>${event.name}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="stage-column">
        <h4>The Club</h4>
        ${currentSchedule.club.map(event => `
          <div class="schedule-card club-stage">
            <strong>${event.time}</strong>
            <p>${event.name}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="stage-column">
        <h4>Hangar</h4>
        ${currentSchedule.hangar.map(event => `
          <div class="schedule-card hangar-stage">
            <strong>${event.time}</strong>
            <p>${event.name}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // Add day selector event listeners
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentDay = e.target.dataset.day;
      renderSchedule();
    });
  });
}
renderSchedule();

// FESTIVAL MAP DATA
const festivalLocations = [
  { 
    id: 'ponton', 
    name: 'Ponton', 
    type: 'Main Stage', 
    description: 'Hoofdacts en main performances',
    currentAct: 'Armin van Buuren',
    nextAct: 'Martin Garrix',
    image: 'css/images/Ponton.png',
    coordinates: { x: 12, y: 18, width: 5, height: 5 } // Matching number 1 on map
  },
  { 
    id: 'lake', 
    name: 'The Lake', 
    type: 'Discovery Stage', 
    description: 'Onbekend talent en nieuwe acts',
    currentAct: 'Local Band',
    nextAct: 'Emerging Artist',
    image: 'css/images/TheLake.png',
    coordinates: { x: 52, y: 22, width: 5, height: 5 } // Matching number 2 on map
  },
  { 
    id: 'club', 
    name: 'The Club', 
    type: 'Theater', 
    description: 'Theater en stand-up comedy',
    currentAct: 'Comedy Show',
    nextAct: 'Theater Performance',
    image: 'css/images/TheClub.png',
    coordinates: { x: 18, y: 75, width: 5, height: 5 } // Matching number 3 on map
  },
  { 
    id: 'hangar', 
    name: 'Hangar', 
    type: 'Dance Floor', 
    description: 'Non-stop house/techno/dance',
    currentAct: 'DJ Set',
    nextAct: 'Techno Mix',
    image: 'css/images/Hangar.png',
    coordinates: { x: 82, y: 28, width: 5, height: 5 } // Matching number 4 on map
  }
];

// INTERACTIVE MAP INITIALIZATION
function initInteractiveMap() {
  const mapContainer = document.getElementById('mapid');
  mapContainer.innerHTML = `
    <div class="map-placeholder">
      <div class="map-header">
        <h3>❤️U Festival - Interactive Map</h3>
        <p>Tap numbered locations for live information</p>
        <div class="location-status" id="location-status">
          <span class="location-text">📍 Getting your location...</span>
        </div>
      </div>
      
      <div class="festival-map-container">
        <div class="map-wrapper">
          <img src="css/images/festivalmap.png" alt="Festival Map" class="festival-map-image" />
          
          <!-- Interactive Clickable Areas -->
          ${festivalLocations.map(location => `
            <div class="location-hotspot" 
                 data-location="${location.id}"
                 style="left: ${location.coordinates.x}%; 
                        top: ${location.coordinates.y}%; 
                        width: ${location.coordinates.width}%; 
                        height: ${location.coordinates.height}%;">
              <div class="hotspot-pulse"></div>
              <span class="hotspot-number">${festivalLocations.indexOf(location) + 1}</span>
            </div>
          `).join('')}
          
          <!-- User Location Indicator -->
          <div class="user-location-marker" id="user-location" style="left: 50%; top: 50%; display: none;">
            <div class="user-pulse"></div>
            <span class="user-text">📍</span>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="map-legend">
          <img src="css/images/guide.png" alt="Map Guide" class="guide-image" />
        </div>
      </div>
      
      <div class="map-controls">
        <button class="map-btn" id="zoom-in">🔍+</button>
        <button class="map-btn" id="zoom-out">🔍−</button>
        <button class="map-btn" id="center-map">📍</button>
        <button class="map-btn" id="toggle-guide">📋</button>
        <button class="map-btn" id="refresh-location">🔄</button>
      </div>
      
      <div class="location-info" id="location-info" style="display: none;">
        <div class="info-content">
          <img id="info-image" class="location-image" src="" alt="" />
          <div class="info-text">
            <h4 id="info-title"></h4>
            <p id="info-description"></p>
            <div class="live-info">
              <span><strong>Nu:</strong> <span id="current-act"></span></span>
              <span><strong>Straks:</strong> <span id="next-act"></span></span>
            </div>
          </div>
        </div>
        <button class="close-info" id="close-info">✕</button>
      </div>
    </div>
  `;
  
  // Initialize geolocation
  initGeolocation();
  
  // Add click handlers for location hotspots
  document.querySelectorAll('.location-hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      const locationId = hotspot.dataset.location;
      const location = festivalLocations.find(loc => loc.id === locationId);
      showLocationInfo(location);
    });
  });
  
  // Close info panel
  document.getElementById('close-info').addEventListener('click', () => {
    document.getElementById('location-info').style.display = 'none';
  });
  
  // Map controls
  document.getElementById('zoom-in').addEventListener('click', () => {
    console.log('Zoom in - Feature coming soon!');
  });
  
  document.getElementById('zoom-out').addEventListener('click', () => {
    console.log('Zoom out - Feature coming soon!');
  });
  
  document.getElementById('center-map').addEventListener('click', () => {
    centerOnUserLocation();
  });
  
  document.getElementById('refresh-location').addEventListener('click', () => {
    initGeolocation();
  });
  
  // Toggle guide visibility
  document.getElementById('toggle-guide').addEventListener('click', () => {
    const legend = document.querySelector('.map-legend');
    legend.style.display = legend.style.display === 'none' ? 'block' : 'none';
  });
}

// GEOLOCATION FUNCTIONALITY
let userLocation = null;
let watchId = null;

// Festival ground bounds (approximate coordinates for Utrecht, Netherlands area)
const festivalBounds = {
  // These are approximate coordinates - adjust based on actual festival location
  north: 52.1,     // Northern boundary
  south: 52.07,    // Southern boundary  
  east: 5.18,      // Eastern boundary
  west: 5.15       // Western boundary
};

function initGeolocation() {
  const statusElement = document.getElementById('location-status');
  const userLocationMarker = document.getElementById('user-location');
  
  if (!navigator.geolocation) {
    updateLocationStatus('❌ Geolocation not supported', 'error');
    return;
  }
  
  updateLocationStatus('📍 Getting your location...', 'loading');
  
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 30000
  };
  
  // Get initial position
  navigator.geolocation.getCurrentPosition(
    (position) => {
      updateUserLocation(position);
      startLocationWatching();
    },
    (error) => {
      handleLocationError(error);
    },
    options
  );
}

function startLocationWatching() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
  }
  
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 10000
  };
  
  watchId = navigator.geolocation.watchPosition(
    updateUserLocation,
    handleLocationError,
    options
  );
}

function updateUserLocation(position) {
  const { latitude, longitude, accuracy } = position.coords;
  userLocation = { latitude, longitude, accuracy };
  
  // Convert GPS coordinates to map coordinates
  const mapCoords = gpsToMapCoordinates(latitude, longitude);
  
  const userLocationMarker = document.getElementById('user-location');
  if (userLocationMarker && mapCoords) {
    userLocationMarker.style.left = `${mapCoords.x}%`;
    userLocationMarker.style.top = `${mapCoords.y}%`;
    userLocationMarker.style.display = 'block';
    
    // Add click handler for user location marker
    userLocationMarker.onclick = () => {
      showUserLocationInfo();
    };
    
    // Update accuracy indicator
    const accuracyText = accuracy < 20 ? '(High accuracy)' : 
                        accuracy < 100 ? '(Medium accuracy)' : '(Low accuracy)';
    updateLocationStatus(`📍 Location found ${accuracyText}`, 'success');
  } else {
    // Show user location even if outside festival area, but in a different position
    if (userLocationMarker) {
      userLocationMarker.style.left = '50%';
      userLocationMarker.style.top = '10%';
      userLocationMarker.style.display = 'block';
      userLocationMarker.onclick = () => {
        showUserLocationInfo();
      };
    }
    updateLocationStatus('📍 You are outside the festival area', 'warning');
  }
}

function showUserLocationInfo() {
  if (!userLocation) return;
  
  const infoPanel = document.getElementById('location-info');
  const isNL = htmlEl.lang === 'nl';
  
  // Clear and rebuild the user location info panel
  infoPanel.innerHTML = `
    <div class="info-content">
      <div class="user-location-info">
        <h4>${isNL ? '📍 Jouw Locatie' : '📍 Your Location'}</h4>
        <div class="location-details">
          <p><strong>${isNL ? 'Coördinaten:' : 'Coordinates:'}</strong><br>
             ${userLocation.latitude.toFixed(6)}, ${userLocation.longitude.toFixed(6)}</p>
          <p><strong>${isNL ? 'Nauwkeurigheid:' : 'Accuracy:'}</strong><br>
             ±${Math.round(userLocation.accuracy)}m</p>
          <p><strong>${isNL ? 'Status:' : 'Status:'}</strong><br>
             ${userLocation.accuracy < 20 ? 
               (isNL ? 'Hoge precisie' : 'High precision') : 
               userLocation.accuracy < 100 ? 
               (isNL ? 'Gemiddelde precisie' : 'Medium precision') : 
               (isNL ? 'Lage precisie' : 'Low precision')}</p>
        </div>
      </div>
    </div>
    <button class="close-info" id="close-info">✕</button>
  `;
  
  infoPanel.style.display = 'block';
  
  // Add close handler
  document.getElementById('close-info').addEventListener('click', () => {
    infoPanel.style.display = 'none';
  });
}

function gpsToMapCoordinates(lat, lng) {
  // Check if user is within festival bounds
  if (lat < festivalBounds.south || lat > festivalBounds.north || 
      lng < festivalBounds.west || lng > festivalBounds.east) {
    return null; // Outside festival area
  }
  
  // Convert GPS coordinates to percentage coordinates on the map
  const x = ((lng - festivalBounds.west) / (festivalBounds.east - festivalBounds.west)) * 100;
  const y = ((festivalBounds.north - lat) / (festivalBounds.north - festivalBounds.south)) * 100;
  
  return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
}

function handleLocationError(error) {
  let message = '❌ Location unavailable';
  
  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = '❌ Location access denied';
      break;
    case error.POSITION_UNAVAILABLE:
      message = '❌ Location information unavailable';
      break;
    case error.TIMEOUT:
      message = '⏱️ Location request timed out';
      break;
  }
  
  updateLocationStatus(message, 'error');
}

function updateLocationStatus(text, type) {
  const statusElement = document.getElementById('location-status');
  if (statusElement) {
    statusElement.innerHTML = `<span class="location-text ${type}">${text}</span>`;
  }
}

function centerOnUserLocation() {
  if (!userLocation) {
    updateLocationStatus('📍 Getting your location...', 'loading');
    initGeolocation();
    return;
  }
  
  const userLocationMarker = document.getElementById('user-location');
  if (userLocationMarker && userLocationMarker.style.display !== 'none') {
    // Smooth scroll to user location (simulate centering)
    userLocationMarker.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center', 
      inline: 'center' 
    });
    updateLocationStatus('📍 Centered on your location', 'success');
  } else {
    updateLocationStatus('📍 Location not available', 'error');
  }
}

function showLocationInfo(location) {
  const infoPanel = document.getElementById('location-info');
  
  // Clear any existing content and rebuild the stage info panel
  infoPanel.innerHTML = `
    <div class="info-content">
      <img id="info-image" class="location-image" src="${location.image}" alt="${location.name}" />
      <div class="info-text">
        <h4 id="info-title">${location.name} - ${location.type}</h4>
        <p id="info-description">${location.description}</p>
        <div class="live-info">
          <span><strong>Nu:</strong> <span id="current-act">${location.currentAct}</span></span>
          <span><strong>Straks:</strong> <span id="next-act">${location.nextAct}</span></span>
        </div>
      </div>
    </div>
    <button class="close-info" id="close-info">✕</button>
  `;
  
  infoPanel.style.display = 'block';
  
  // Add close handler
  document.getElementById('close-info').addEventListener('click', () => {
    infoPanel.style.display = 'none';
  });
}

// LOCKER RESERVATION SYSTEM
const lockerData = {
  sizes: [
    { id: 'small', name: 'Small', price: 5, dimensions: '30x40x60cm', description: 'Perfect for phones, wallets, and small items' },
    { id: 'medium', name: 'Medium', price: 8, dimensions: '40x50x80cm', description: 'Ideal for bags, jackets, and personal belongings' },
    { id: 'large', name: 'Large', price: 12, dimensions: '50x60x100cm', description: 'Great for backpacks, camping gear, and large items' }
  ],
  locations: [
    { id: 'main-entrance', name: 'Main Entrance', available: { small: 15, medium: 8, large: 3 } },
    { id: 'ponton-stage', name: 'Near Ponton Stage', available: { small: 12, medium: 6, large: 2 } },
    { id: 'food-court', name: 'Food Court Area', available: { small: 20, medium: 10, large: 4 } },
    { id: 'vip-area', name: 'VIP Area', available: { small: 8, medium: 5, large: 2 } }
  ]
};

let selectedLocker = null;

function renderLockerReservation() {
  const container = document.getElementById('locker-content');
  container.innerHTML = `
    <div class="locker-reservation">
      <div class="locker-intro">
        <p>Secure your belongings during the festival! Choose from our available locker sizes and locations.</p>
        <div class="locker-features">
          <span class="feature">🔒 Secure Digital Lock</span>
          <span class="feature">📱 Mobile Access</span>
          <span class="feature">🕒 24/7 Access</span>
          <span class="feature">💧 Weather Protected</span>
        </div>
      </div>

      <div class="locker-selection">
        <h3>Select Locker Size</h3>
        <div class="locker-sizes">
          ${lockerData.sizes.map(size => `
            <div class="locker-size-card" data-size="${size.id}">
              <h4>${size.name}</h4>
              <div class="locker-price">€${size.price}</div>
              <div class="locker-dimensions">${size.dimensions}</div>
              <p>${size.description}</p>
              <button class="select-size-btn" data-size="${size.id}">Select ${size.name}</button>
            </div>
          `).join('')}
        </div>

        <div id="location-selection" class="location-selection hidden">
          <h3>Select Location</h3>
          <div class="locker-locations" id="locker-locations">
            <!-- Locations will be populated when size is selected -->
          </div>
        </div>

        <div id="reservation-form" class="reservation-form hidden">
          <h3>Complete Reservation</h3>
          <form id="locker-form">
            <div class="form-group">
              <label for="customer-name">Name *</label>
              <input type="text" id="customer-name" required placeholder="Your full name">
            </div>
            <div class="form-group">
              <label for="customer-email">Email *</label>
              <input type="email" id="customer-email" required placeholder="your.email@example.com">
            </div>
            <div class="form-group">
              <label for="customer-phone">Phone</label>
              <input type="tel" id="customer-phone" placeholder="+31 6 12345678">
            </div>
            <div class="form-group">
              <label for="access-code">Create 4-digit PIN *</label>
              <input type="password" id="access-code" required pattern="[0-9]{4}" maxlength="4" placeholder="1234">
            </div>
            
            <div class="reservation-summary" id="reservation-summary">
              <!-- Summary will be populated -->
            </div>
            
            <button type="submit" class="reserve-btn">Reserve Locker - €<span id="total-price">0</span></button>
          </form>
        </div>
      </div>
    </div>
  `;

  // Add event listeners
  setupLockerEventListeners();
}

function setupLockerEventListeners() {
  // Size selection
  document.querySelectorAll('.select-size-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sizeId = e.target.dataset.size;
      const size = lockerData.sizes.find(s => s.id === sizeId);
      selectLockerSize(size);
    });
  });

  // Form submission
  document.getElementById('locker-form').addEventListener('submit', (e) => {
    e.preventDefault();
    submitLockerReservation();
  });
}

function selectLockerSize(size) {
  selectedLocker = { size };
  
  // Update UI
  document.querySelectorAll('.locker-size-card').forEach(card => {
    card.classList.remove('selected');
  });
  document.querySelector(`[data-size="${size.id}"]`).classList.add('selected');
  
  // Show location selection
  document.getElementById('location-selection').classList.remove('hidden');
  
  // Populate locations
  const locationsContainer = document.getElementById('locker-locations');
  locationsContainer.innerHTML = lockerData.locations.map(location => {
    const available = location.available[size.id];
    return `
      <div class="location-card ${available > 0 ? '' : 'unavailable'}" data-location="${location.id}">
        <h4>${location.name}</h4>
        <div class="availability">
          ${available > 0 ? 
            `<span class="available">✅ ${available} available</span>` : 
            `<span class="unavailable">❌ Sold out</span>`
          }
        </div>
        ${available > 0 ? 
          `<button class="select-location-btn" data-location="${location.id}">Select Location</button>` : 
          ''
        }
      </div>
    `;
  }).join('');
  
  // Add location selection listeners
  document.querySelectorAll('.select-location-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const locationId = e.target.dataset.location;
      const location = lockerData.locations.find(l => l.id === locationId);
      selectLockerLocation(location);
    });
  });
}

function selectLockerLocation(location) {
  selectedLocker.location = location;
  
  // Update UI
  document.querySelectorAll('.location-card').forEach(card => {
    card.classList.remove('selected');
  });
  document.querySelector(`[data-location="${location.id}"]`).classList.add('selected');
  
  // Show reservation form
  document.getElementById('reservation-form').classList.remove('hidden');
  
  // Update summary and price
  updateReservationSummary();
}

function updateReservationSummary() {
  const summary = document.getElementById('reservation-summary');
  const totalPrice = document.getElementById('total-price');
  
  summary.innerHTML = `
    <div class="summary-item">
      <span>Size:</span>
      <span>${selectedLocker.size.name} (${selectedLocker.size.dimensions})</span>
    </div>
    <div class="summary-item">
      <span>Location:</span>
      <span>${selectedLocker.location.name}</span>
    </div>
    <div class="summary-item">
      <span>Duration:</span>
      <span>Full festival day</span>
    </div>
    <div class="summary-item total">
      <span>Total:</span>
      <span>€${selectedLocker.size.price}</span>
    </div>
  `;
  
  totalPrice.textContent = selectedLocker.size.price;
}

function submitLockerReservation() {
  const formData = {
    name: document.getElementById('customer-name').value,
    email: document.getElementById('customer-email').value,
    phone: document.getElementById('customer-phone').value,
    pin: document.getElementById('access-code').value,
    locker: selectedLocker
  };
  
  // Simulate reservation process
  const reserveBtn = document.querySelector('.reserve-btn');
  reserveBtn.textContent = 'Processing...';
  reserveBtn.disabled = true;
  
  setTimeout(() => {
    showReservationSuccess(formData);
  }, 2000);
}

function showReservationSuccess(reservation) {
  const container = document.getElementById('locker-content');
  const lockerNumber = Math.floor(Math.random() * 999) + 1;
  
  container.innerHTML = `
    <div class="reservation-success">
      <div class="success-icon">✅</div>
      <h3>Reservation Confirmed!</h3>
      
      <div class="confirmation-details">
        <div class="locker-info">
          <h4>Your Locker Details</h4>
          <div class="detail-item">
            <span>Locker Number:</span>
            <span class="highlight">#${lockerNumber.toString().padStart(3, '0')}</span>
          </div>
          <div class="detail-item">
            <span>Size:</span>
            <span>${reservation.locker.size.name}</span>
          </div>
          <div class="detail-item">
            <span>Location:</span>
            <span>${reservation.locker.location.name}</span>
          </div>
          <div class="detail-item">
            <span>Access PIN:</span>
            <span class="highlight">••••</span>
          </div>
        </div>
        
        <div class="instructions">
          <h4>How to Access Your Locker</h4>
          <ol>
            <li>Find locker #${lockerNumber.toString().padStart(3, '0')} at ${reservation.locker.location.name}</li>
            <li>Enter your 4-digit PIN on the digital keypad</li>
            <li>Press the unlock button</li>
            <li>To lock: Close door and press lock button</li>
          </ol>
        </div>
        
        <div class="contact-info">
          <p><strong>Need help?</strong> Visit the Information Desk or call +31 30 123 4567</p>
          <p>A confirmation email has been sent to: <strong>${reservation.email}</strong></p>
        </div>
      </div>
      
      <button onclick="renderLockerReservation()" class="new-reservation-btn">Make Another Reservation</button>
    </div>
  `;
}

// PWA INSTALLATION PAGE
function showInstallPage() {
  // Hide all other screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  
  // Show install screen
  document.getElementById('pwa-install').classList.remove('hidden');
  
  // Render install content
  renderInstallPage();
}

function renderInstallPage() {
  const container = document.getElementById('install-content');
  const currentUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}`;
  
  const isNL = htmlEl.lang === 'nl';
  const text = {
    title: isNL ? '📱 Installeer ❤️U Festival App' : '📱 Install ❤️U Festival App',
    subtitle: isNL ? 'Krijg de volledige festivalervaring met offline toegang, push notificaties en snellere laadtijden!' : 'Get the full festival experience with offline access, push notifications, and faster loading!',
    scanQR: isNL ? '📷 Scan QR Code' : '📷 Scan QR Code',
    scanInstructions: isNL ? 'Scan deze QR code met je telefoon camera om de app te openen en installeren' : 'Scan this QR code with your phone\'s camera to open and install the app',
    manualInstall: isNL ? '🔧 Handmatige Installatie' : '🔧 Manual Installation',
    installNow: isNL ? '📲 Nu Installeren' : '📲 Install Now',
    benefits: isNL ? '✨ App Voordelen' : '✨ App Benefits',
    fasterLoading: isNL ? 'Sneller Laden' : 'Faster Loading',
    fasterDesc: isNL ? 'Bliksemsnelle prestaties, zelfs met langzaam internet' : 'Lightning-fast performance, even with slow internet',
    offlineAccess: isNL ? 'Offline Toegang' : 'Offline Access',
    offlineDesc: isNL ? 'Bekijk festivalinfo zelfs zonder internetverbinding' : 'View festival info even without internet connection',
    pushNotifications: isNL ? 'Push Notificaties' : 'Push Notifications',
    pushDesc: isNL ? 'Ontvang updates over je favoriete artiesten en evenementen' : 'Get updates about your favorite artists and events',
    homeAccess: isNL ? 'Startscherm Toegang' : 'Home Screen Access',
    homeDesc: isNL ? 'Snelle toegang vanaf het startscherm van je telefoon' : 'Quick access from your phone\'s home screen',
    currentUrl: isNL ? 'Huidige URL:' : 'Current URL:',
    copyLink: isNL ? '📋 Link Kopiëren' : '📋 Copy Link',
    backToApp: isNL ? '← Terug naar Festival' : '← Back to Festival'
  };
  
  container.innerHTML = `
    <div class="install-page">
      <div class="install-intro">
        <h3>${text.title}</h3>
        <p>${text.subtitle}</p>
      </div>

      <div class="install-methods">
        <div class="qr-section">
          <h4>${text.scanQR}</h4>
          <div class="qr-container">
            <img src="${qrCodeUrl}" alt="QR Code to install app" class="qr-code" />
            <p>${text.scanInstructions}</p>
          </div>
        </div>

        <div class="manual-install">
          <h4>${text.manualInstall}</h4>
          
          <div class="install-instructions">
            <div class="browser-instruction" data-browser="chrome">
              <h5>Google Chrome / Edge</h5>
              <ol>
                <li>Tap the <strong>menu (⋮)</strong> in the top right</li>
                <li>Select <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong></li>
                <li>Tap <strong>"Add"</strong> to confirm</li>
              </ol>
            </div>

            <div class="browser-instruction" data-browser="safari">
              <h5>Safari (iPhone/iPad)</h5>
              <ol>
                <li>Tap the <strong>Share button (📤)</strong> at the bottom</li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                <li>Tap <strong>"Add"</strong> to confirm</li>
              </ol>
            </div>

            <div class="browser-instruction" data-browser="firefox">
              <h5>Firefox</h5>
              <ol>
                <li>Tap the <strong>menu (⋮)</strong> in the top right</li>
                <li>Select <strong>"Install"</strong> or <strong>"Add to Home Screen"</strong></li>
                <li>Tap <strong>"Add"</strong> to confirm</li>
              </ol>
            </div>
          </div>

          ${deferredPrompt ? `
            <button id="direct-install-btn" class="direct-install-btn">
              ${text.installNow}
            </button>
          ` : ''}
        </div>

        <div class="install-benefits">
          <h4>${text.benefits}</h4>
          <div class="benefits-list">
            <div class="benefit">
              <span class="benefit-icon">🚀</span>
              <div>
                <strong>${text.fasterLoading}</strong>
                <p>${text.fasterDesc}</p>
              </div>
            </div>
            <div class="benefit">
              <span class="benefit-icon">📲</span>
              <div>
                <strong>${text.offlineAccess}</strong>
                <p>${text.offlineDesc}</p>
              </div>
            </div>
            <div class="benefit">
              <span class="benefit-icon">🔔</span>
              <div>
                <strong>${text.pushNotifications}</strong>
                <p>${text.pushDesc}</p>
              </div>
            </div>
            <div class="benefit">
              <span class="benefit-icon">🏠</span>
              <div>
                <strong>${text.homeAccess}</strong>
                <p>${text.homeDesc}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="install-footer">
          <p><strong>${text.currentUrl}</strong></p>
          <div class="url-display">${currentUrl}</div>
          <button onclick="copyToClipboard('${currentUrl}')" class="copy-url-btn">${text.copyLink}</button>
        </div>
      </div>

      <button onclick="goBackToApp()" class="back-to-app-btn">${text.backToApp}</button>
    </div>
  `;

  // Add direct install functionality if available
  if (deferredPrompt) {
    document.getElementById('direct-install-btn').addEventListener('click', async () => {
      const result = await deferredPrompt.prompt();
      console.log('Install prompt result:', result);
      deferredPrompt = null;
    });
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Show temporary feedback
    const btn = document.querySelector('.copy-url-btn');
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.style.background = '#28a745';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  });
}

function goBackToApp() {
  // Hide install screen and show home
  document.getElementById('pwa-install').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');
}

window.onload = () => { 
  initInteractiveMap();
  renderLockerReservation();
};
