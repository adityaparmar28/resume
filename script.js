document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const printBtn = document.getElementById('print-btn');
  const htmlElement = document.documentElement;
  const sunIcon = themeToggleBtn.querySelector('.sun-icon');
  const moonIcon = themeToggleBtn.querySelector('.moon-icon');

  // Load Saved Theme Preference or Default to Dark Mode
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // Theme Toggle Event Listener
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Print Event Listener
  printBtn.addEventListener('click', () => {
    window.print();
  });

  // Helper function to set theme attributes
  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  // --- Photo Lightbox Modal Logic ---
  const photoImg = document.querySelector('.profile-img');
  const photoModal = document.getElementById('photo-modal');
  const closePhotoModal = document.getElementById('close-photo-modal');

  if (photoImg && photoModal && closePhotoModal) {
    photoImg.style.cursor = 'pointer';
    
    photoImg.addEventListener('click', () => {
      photoModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable background scrolling
    });

    const closePhoto = () => {
      photoModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    closePhotoModal.addEventListener('click', closePhoto);
    photoModal.querySelector('.modal-backdrop').addEventListener('click', closePhoto);
  }

  // --- Map Modal Logic ---
  const mapModal = document.getElementById('map-modal');
  const closeMapModal = document.getElementById('close-map-modal');
  const mapTitle = document.getElementById('map-title');
  const mapIframe = document.getElementById('map-iframe');
  const streetViewBtn = document.getElementById('street-view-btn');
  const mapTriggers = document.querySelectorAll('.map-trigger');

  const mapData = {
    ljiet: {
      title: "LJ University (LJIET) Campus",
      // Embed URL with location marker
      embedUrl: "https://maps.google.com/maps?q=LJ+Institute+of+Engineering+and+Technology+Ahmedabad&t=&z=16&ie=UTF8&iwloc=&output=embed",
      // Street View trigger query parameter
      streetViewUrl: "https://www.google.com/maps?q=LJ+Institute+of+Engineering+and+Technology+Ahmedabad&layer=c"
    },
    jaysomnath: {
      title: "Jay Somnath Higher Secondary School",
      embedUrl: "https://maps.google.com/maps?q=Jay+Somnath+Higher+Secondary+School+Maninagar+Ahmedabad&t=&z=16&ie=UTF8&iwloc=&output=embed",
      streetViewUrl: "https://www.google.com/maps?q=Jay+Somnath+Higher+Secondary+School+Maninagar+Ahmedabad&layer=c"
    },
    vihan: {
      title: "Vihan Infotech Office",
      embedUrl: "https://maps.google.com/maps?q=Vihaan-VT+InfoTech+Pvt.+Ltd.+Ahmedabad&t=&z=16&ie=UTF8&iwloc=&output=embed",
      streetViewUrl: "https://www.google.com/maps?q=Vihaan-VT+InfoTech+Pvt.+Ltd.+Ahmedabad&layer=c"
    }
  };

  if (mapModal && closeMapModal && mapIframe && streetViewBtn) {
    mapTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const locationKey = trigger.getAttribute('data-location');
        const data = mapData[locationKey];
        
        if (data) {
          mapTitle.textContent = data.title;
          mapIframe.src = data.embedUrl;
          streetViewBtn.href = data.streetViewUrl;
          
          mapModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeMap = () => {
      mapModal.classList.remove('active');
      mapIframe.src = ""; // Clear source to stop loading/performance
      document.body.style.overflow = '';
    };

    closeMapModal.addEventListener('click', closeMap);
    mapModal.querySelector('.modal-backdrop').addEventListener('click', closeMap);
  }
});
