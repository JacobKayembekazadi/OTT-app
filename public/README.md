# Public Assets Directory

This directory contains all static assets for the OTT Finance App that are served directly to the browser.

## Directory Structure

```
public/
├── images/
│   ├── avatars/          # User profile pictures and contact avatars
│   ├── logos/            # Company logos, brand assets
│   ├── flags/            # Country flags for international transfers
│   └── cards/            # Credit/debit card brand logos
├── videos/               # Video assets (tutorials, promos)
├── favicon.ico           # App favicon
└── vite.svg             # Vite logo
```

## Usage

### In React Components
```jsx
// For images in the public directory, use absolute paths
<img src="/images/avatars/user-profile.jpg" alt="User Avatar" />
<img src="/images/flags/nigeria.png" alt="Nigeria Flag" />
<video src="/videos/intro.mp4" controls />
```

### Recommended File Formats

**Images:**
- **Avatars**: JPG/PNG (optimized, max 200x200px)
- **Logos**: SVG (preferred) or PNG with transparency
- **Flags**: PNG (32x32px or 64x64px for consistency)
- **Cards**: SVG or PNG (brand guidelines compliant)

**Videos:**
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1080p max for web delivery
- **Size**: Keep under 10MB for good performance

## Asset Guidelines

1. **Optimize all images** before adding them
2. **Use consistent naming** (kebab-case: user-avatar.jpg)
3. **Include alt text** for accessibility
4. **Consider lazy loading** for performance
5. **Respect copyright** and brand guidelines

## Examples for OTT Finance App

### Avatars
- Default user avatars
- Contact profile pictures
- Customer service representative photos

### Logos
- OTT Finance logo variants
- Partner bank logos
- Payment processor logos (Visa, Mastercard, etc.)

### Flags
- Country flags for international remittance
- Consistently sized for UI elements

### Cards
- Credit card brand logos
- Digital wallet icons
- Payment method illustrations

### Videos
- App tutorial videos
- Feature demonstration clips
- Marketing promotional videos