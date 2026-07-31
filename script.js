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

  // Interactive links helper - print console warning/log if link check is executed (useful for self-testing)
  const contactLinks = document.querySelectorAll('.contact-link');
  contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Allow default behavior (navigation), but log for diagnostics if needed
      console.log(`Navigating to: ${link.href}`);
    });
  });
});
