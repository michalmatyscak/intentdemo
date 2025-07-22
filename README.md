# Intent - Product Management Platform

A precise recreation of the Figma design for a modern product management platform with a comprehensive feedback management system built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 **Design Recreation**

This project is an exact recreation of the Figma design from the Intent hackathon, featuring:

### **1st Level Navigation**
- **Vertical Sidebar**: 60px width with platform-wide navigation
- **Icons**: Search, Home, Insights (active), Products, Customers, Portals, Docs, Reports, Data
- **Global Create**: Plus button for creating new items
- **Notifications**: Bell icon with red notification dot
- **Settings**: Bottom navigation item

### **2nd Level Navigation**
- **Insights Section**: 240px width secondary navigation
- **Boards**: Analytics, Notes assigned to me, Unprocessed notes, Followed notes, All notes, Themes
- **Badge Indicators**: Color-coded badges for different note types
- **Recent Insights Boards**: Collapsible section with recent boards
- **Item Counts**: Display of note counts for each board

### **Board Header**
- **Primary Header**: "All notes" title with search, share button, and more options
- **Secondary Header**: Filter controls, date range selector, board controls, and analyze button
- **Search Functionality**: Integrated search with icon
- **Filter Controls**: "Filtered by" and "Last 30 days" buttons
- **Action Buttons**: Board controls and purple "Analyze" button

### **Notes Feed**
- **Today Section**: Recent notes with company avatars and metadata
- **Earlier Section**: Older notes with importance indicators
- **Note Cards**: Company name, person, segment, topic, title, and content
- **Visual Indicators**: Color-coded avatars, badges, and importance dots
- **Interactive Selection**: Click to view details in sidebar

### **Sidebar Details**
- **Note Header**: Note type indicator, action buttons (maximize, more, close)
- **Attributes Panel**: Customer info, tags, themes, customer problems
- **Content Editor**: Meeting context, interview notes, usability feedback
- **Problem Tracking**: Color-coded problem indicators with status
- **Rich Content**: Formatted text with sections and priorities

## 🛠 **Technical Implementation**

### **Framework & Libraries**
- **Next.js 14**: App router with TypeScript
- **Tailwind CSS**: Custom color palette matching Figma design
- **Lucide React**: Icon library for consistent iconography
- **React Hooks**: State management for interactive components

### **Design System**
- **Color Palette**: Exact hex colors from Figma (#f2f5f7, #e1e6ea, #68707b, etc.)
- **Typography**: System fonts with precise font weights and sizes
- **Spacing**: Consistent padding and margins matching design
- **Components**: Reusable UI components with proper variants

### **Key Features**
- **Responsive Layout**: Fixed sidebar widths with flexible content area
- **Interactive Elements**: Hover states, click handlers, and state management
- **Scroll Areas**: Proper overflow handling for long content
- **Visual Hierarchy**: Clear information architecture and visual flow

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd intent

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Development**
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 **Project Structure**

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main feedback management page
│   └── globals.css         # Global styles and design tokens
├── components/             # Reusable UI components
│   ├── Button.tsx          # Button component with variants
│   ├── Badge.tsx           # Badge component for status
│   ├── Avatar.tsx          # Avatar component for users
│   └── SearchInput.tsx     # Search input component
└── types/                  # TypeScript type definitions
```

## 🎨 **Design Tokens**

### **Colors**
- Primary Background: `#f2f5f7`
- White: `#ffffff`
- Text Primary: `#202428`
- Text Secondary: `#30363c`
- Text Muted: `#68707b`
- Text Muted Light: `#939da7`
- Border: `#e1e6ea`
- Border Light: `#d4dbe1`
- Purple Primary: `#8811e7`

### **Typography**
- Font Family: System UI
- Font Sizes: 10px, 12px, 13px, 14px, 16px, 20px
- Font Weights: 400 (normal), 600 (semibold), 700 (bold)

### **Spacing**
- Consistent 4px grid system
- Padding: 4px, 8px, 12px, 16px, 20px, 24px
- Margins: 4px, 8px, 12px, 16px, 20px, 24px

## 🔧 **Customization**

### **Adding New Notes**
Update the `notes` and `earlierNotes` arrays in `src/app/page.tsx` with new note objects following the established structure.

### **Modifying Colors**
Update the color values in `src/app/globals.css` to match your brand colors while maintaining the design system.

### **Adding New Components**
Create new components in the `src/components/` directory following the established patterns and TypeScript interfaces.

## 📱 **Browser Support**

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This is a precise recreation of the Figma design for demonstration purposes. The design and layout match the original Figma specifications exactly.
