# Intent - Product Management Platform

Modern product management platform with feedback management system.

## Features

### Customer Problems Navigation
The application includes an interactive customer problems section in the sidebar with the following functionality:

- **Hover to Reveal**: Each customer problem item shows action buttons (arrow and trash) when hovered
- **Scroll to Text**: Clicking the arrow button scrolls to the corresponding text in the sidebar content and highlights it
- **Interactive Highlights**: All target texts are permanently highlighted with a light cream background (#FFF5EB)
- **Hover Effects**: Hovering over any highlight changes its color to #FEE4CD
- **Click Highlighting**: Clicking the arrow button also changes the corresponding highlight color to #FEE4CD
- **Floating Menu**: Hovering over highlights shows a floating menu with "Link to" and "Remove" buttons positioned 4px above the left edge of the highlight
- **Scroll Behavior**: The floating menu automatically hides when scrolling to prevent it from floating over other content
- **Color Coding**: Each customer problem has a unique color that matches its corresponding highlight in the text for easy identification
- **Remove Functionality**: Clicking the trash button in either the floating menu or customer problems list removes the highlight styling while keeping the text intact

#### Customer Problem Mappings:
1. "User like bird eye perspective on dashboards" → "Dashboards are really good at providing us bird perspective"
2. "User lacks overview of how customer call was closed with custom field" → "we miss a lot at dashboards to be more valuable is overview of how each customer call was closed - successfully by matching to one of our solutions, or we didn't have a solutions. We basically need to bring a custom fields with those values to dashboards from different system"
3. "Lacks option to analyze granular data by clicking on chart to drill down" → "We lack option to quickly analyze granular data by double clicking on chart value and drill down."
4. "User find dashboard at good usability level" → "Usability vise we don't have really problems with dashboards."
5. "User requested option to create custom templates" → "We would welcome option to create a template for dashboard and share it with team."

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main application page
│   └── globals.css     # Global styles
└── components/
    ├── Avatar.tsx      # Avatar component
    ├── Badge.tsx       # Badge component
    ├── Button.tsx      # Button component
    ├── NavigationItem.tsx # Navigation item component
    └── SearchInput.tsx # Search input component
```
