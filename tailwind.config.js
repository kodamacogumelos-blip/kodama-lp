/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        'k-green':     '#2D4A10',
        'k-green-mid': '#3D6B1A',
        'k-green-lt':  '#4A7A20',
        'k-gold':      '#C8A96E',
        'k-gold-lt':   '#E0C898',
        'k-bg':        '#F9F6F0',
        'k-bg-warm':   '#F2EDE4',
        'k-text':      '#1A1A1A',
        'k-muted':     '#5A5A5A',
      },
      fontFamily: {
        'heading': ['"Playfair Display"', 'Georgia', 'serif'],
        'body':    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'k-card':   '0 4px 24px rgba(45,74,16,0.10), 0 1px 6px rgba(45,74,16,0.06)',
        'k-hover':  '0 8px 40px rgba(45,74,16,0.18), 0 2px 12px rgba(45,74,16,0.10)',
        'k-btn':    '0 4px 20px rgba(45,74,16,0.35)',
        'k-gold':   '0 4px 20px rgba(200,169,110,0.35)',
      }
    }
  },
  plugins: [],
}
