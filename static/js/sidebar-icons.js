
// Icon mapping - customize these as needed
const iconMap = {
  'getting-started': '🚀',
  'guide': '📖',
  'configuration': '⚙️',
  'markdown': '📝',
  'syntax-highlighting': '🎨',
  'latex': '📐',
  'diagrams': '📊',
  'shortcodes': '🔧',
  'deploy-site': '🌐',
  'organize-files': '📁',
  'advanced': '⚡',
  'multi-language': '🌍',
  'comments': '💬',
  'customization': '✨'
};

function addIconsToSidebar() {
  // Find all sidebar links
  const sidebarLinks = document.querySelectorAll('.sidebar a, nav a, [class*="sidebar"] a');
  
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    const text = link.textContent.trim();
    
    // Skip if already has an icon (to avoid duplicates)
    if (text && /^[\u{1F300}-\u{1F9FF}]/u.test(text)) {
      return;
    }
    
    // Try to match by href
    if (href) {
      for (const [key, icon] of Object.entries(iconMap)) {
        if (href.includes(key)) {
          link.textContent = icon + ' ' + text;
          return;
        }
      }
    }
    
    // Try to match by text content (case-insensitive)
    const lowerText = text.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerText.includes(key.replace(/-/g, ' '))) {
        link.textContent = icon + ' ' + text;
        return;
      }
    }
  });
}

// Run immediately
addIconsToSidebar();

// Run on DOMContentLoaded as backup
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addIconsToSidebar);
} else {
  addIconsToSidebar();
}

// Watch for dynamic content changes (for SPA-like navigation)
const observer = new MutationObserver(() => {
  addIconsToSidebar();
});

// Start observing when DOM is ready
setTimeout(() => {
  console.log("123")
  const sidebar = document.querySelector('.sidebar, nav, [class*="sidebar"]');
  if (sidebar) {
    observer.observe(sidebar, {
      childList: true,
      subtree: true
    });
  }
}, 100);

// Also run on page navigation events if using Turbo/PJAX
window.addEventListener('popstate', addIconsToSidebar);

console.log("123")