'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import FloatingMenu from '../components/FloatingMenu';
import { 
  Search, 
  Home as HomeIcon, 
  BarChart3, 
  Package, 
  Users, 
  Globe, 
  FileText, 
  PieChart, 
  Database, 
  MoreHorizontal,
  Settings,
  Plus,
  Filter,
  ChevronDown,
  X,
  Maximize2,
  Tag,
  Calendar,
  MessageSquare,
  User,
  Building,
  Bell,
  ArrowLeftToLine,
  ArrowRightToLine,
  Grid2X2,
  Component,
  Inbox,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  Trash2
} from 'lucide-react';
import NavigationItem from '@/components/NavigationItem';

// Mock data for the design
const navigationItems = [
  { icon: Search, label: 'Search', active: false },
  { icon: HomeIcon, label: 'Home', active: false },
  { icon: BarChart3, label: 'Insights', active: true },
  { icon: Package, label: 'Products', active: false },
  { icon: Users, label: 'Customers', active: false },
  { icon: Globe, label: 'Portals', active: false },
  { icon: FileText, label: 'Docs', active: false },
  { icon: PieChart, label: 'Reports', active: false },
  { icon: Database, label: 'Data', active: false },
];

const secondaryNavItems = [
  { name: 'Analytics', count: '94K', icon: 'barchart', hasBadge: false },
  { name: 'Notes assigned to me', count: '134', icon: 'inbox', badge: 'member' },
  { name: 'Unprocessed notes', count: '12', icon: 'inbox', badge: 'unprocessed' },
  { name: 'Followed notes', count: '140', icon: 'inbox', badge: 'following' },
  { name: 'All notes', count: '94K', icon: 'inbox', hasBadge: false },
  { name: 'Themes', count: '', icon: 'inbox', hasBadge: false },
];

const recentBoards = [
  { name: 'Churn Feedback', count: '25' },
  { name: 'HVC customers', count: '32' },
  { name: 'File sharing', count: '25' },
  { name: 'Real-time notifications', count: '17' },
  { name: 'Last 90 days', count: '19' },
  { name: 'Enterprise customers Q1', count: '17' },
  { name: 'CS feedback', count: '25' },
  { name: 'Latest insights', count: '25' },
  { name: 'Churn 2024', count: '17' },
  { name: '2024 Migration insights', count: '25' },
];

const notes = [
  {
    id: 1,
    company: 'Rave',
    person: 'Jenna Doe',
    segment: 'Enterprise',
    topic: 'Missing ability to drill down from dashboards charts',
    title: 'Feedback session with Jenna Doe',
    content: 'Hey there, I have question about dashboards filters. We are trying to setup deeper analysis and we hit on some limitations I suppose. We wanted to drill down to see underlying/more granular data from the aggregation. That by just clicking on the charts. But seems it is not possible, or are we not getting something?\n\nCould you please help me with it?',
    avatar: 'R',
    avatarColor: '#96fdd1',
    isSelected: true,
    hasBadge: false,
    badgeColor: '#ff4747'
  },
  {
    id: 2,
    company: 'Klatch',
    person: 'Stefanos Dimitriou',
    segment: 'Enterprise',
    topic: 'Missing ability to drill down from dashboards charts',
    title: 'Transcript of meeting with Klatch',
    content: 'Regarding the filtering to support the drilling down, we actually',
    avatar: 'K',
    avatarColor: '#68b4ff',
    hasBadge: false,
    badgeColor: '#ff4747'
  },
  {
    id: 3,
    company: 'Strido',
    person: 'Radosław Kowalski',
    title: 'Email from rk@strido.com',
    content: 'Hello, regarding the dashboard functionality, we are currently stop by',
    avatar: 'S',
    avatarColor: '#f679d1',
    hasBadge: false,
    badgeColor: '#ff4747'
  },
  {
    id: 4,
    company: 'Crispex',
    person: 'Ingrid Álvarez',
    topic: 'Missing ability to drill down from dashboards charts',
    title: 'Granular data analysis',
    content: 'We miss option to analyse more granular data from the aggregated sets',
    avatar: 'C',
    avatarColor: '#fbb06f',
    hasBadge: false,
    badgeColor: '#ff4747'
  },
  {
    id: 5,
    company: 'Dashbank',
    person: 'Ingrid Álvarez',
    topic: 'Missing option to group filters with AND/OR',
    title: 'Filtering feedback',
    content: 'It is very limiting to setup advanced filters with groups and logical operators',
    avatar: 'D',
    avatarColor: '#4dead5',
    hasBadge: false,
    badgeColor: '#ff4747'
  },
  {
    id: 6,
    company: 'Rave',
    person: 'Igor Andersen',
    segment: 'Enterprise',
    topic: 'Missing ability to drill down from dashboards charts',
    title: 'UX issue with the dashboard',
    content: 'I\'m bit lost on this dashboard filtering, where its hard to move things around',
    avatar: 'R',
    avatarColor: '#96fdd1',
    hasBadge: false,
    badgeColor: '#ff4747'
  },
  {
    id: 7,
    company: 'Acme',
    person: 'Tim Johnson',
    segment: 'Enterprise',
    topic: 'Options to customise dashboards',
    title: 'UX issue with the dashboard',
    content: 'I\'m bit lost on this dashboard widgets, where its hard to move things around',
    avatar: 'A',
    avatarColor: '#d7ec83',
    hasBadge: false,
    badgeColor: '#ff4747'
  }
];

const earlierNotes = [
  {
    id: 8,
    company: 'Blinq tech',
    person: 'Darnell O\'Shea',
    topic: 'Dashboards usability issues',
    title: 'Usability test with Darnell O\'Shea',
    content: 'Key takeaways: 1. User was struggling with finding the drag',
    avatar: 'BT',
    avatarColor: '#d7ec83',
    hasBadge: false,
    badgeColor: '#ff4747'
  },
  {
    id: 9,
    company: 'Trilo',
    person: 'Olga Svoboda',
    topic: 'Dashboards usability issues',
    title: 'Conversation with Olga Svoboda',
    content: 'I need help with finding the list of data sources for each dashboard',
    avatar: 'TR',
    avatarColor: '#4dead5',
    hasBadge: false,
    badgeColor: '#ff4747'
  },
  {
    id: 10,
    company: 'Crispex',
    person: 'Quinton Jacobs',
    topic: 'Options to customise dashboards',
    title: 'Portal vote for Dashboard customisation',
    content: 'Move things around will be super helpful. Ship it!',
    avatar: 'CR',
    avatarColor: '#f679d1',
    hasBadge: false,
    badgeColor: '#ff4747',
    importance: 3
  },
  {
    id: 11,
    company: 'Zlyde',
    person: 'Nolwenn Le Roux',
    title: 'Email from nolwen.leroux@zlyde.com',
    content: 'Hello to DashM, I would like to kindly ask you about providing',
    avatar: 'ZL',
    avatarColor: '#68b4ff',
    hasBadge: false,
    badgeColor: '#ff4747',
    importance: 3
  },
  {
    id: 12,
    company: 'KlatchCrop',
    person: 'Calliope Van Der Meer',
    title: 'Discovery interview with Calliope Van Der Meer',
    content: 'Key takeways: 1. Usability of the dashboard widgets',
    avatar: 'KC',
    avatarColor: '#fbb06f',
    hasBadge: false,
    badgeColor: '#ff4747',
    importance: 3
  }
];

// Icon components for Untitled icon set
const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12L6 8L10 10L14 6" stroke="#68707B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InboxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14V12H2V4Z" stroke="#68707B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 8H14" stroke="#68707B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8L8 3L13 8L8 13L3 8Z" stroke="#68707B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="8" r="1" fill="#68707B"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10L8 12L10 10" stroke="#68707B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H13M3 10H13" stroke="#939DA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Home() {
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isNavPinned, setIsNavPinned] = useState(false);
  const [isRecentBoardsCollapsed, setIsRecentBoardsCollapsed] = useState(false);
  const [hoveredProblemIndex, setHoveredProblemIndex] = useState<number | null>(null);
  const [hoveredHighlightIndex, setHoveredHighlightIndex] = useState<number | null>(null);
  const [clickedHighlightIndex, setClickedHighlightIndex] = useState<number | null>(null);
  const [floatingMenuVisible, setFloatingMenuVisible] = useState(false);
  const [floatingMenuPosition, setFloatingMenuPosition] = useState({ x: 0, y: 0 });
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number | null>(null);
  const [removedProblems, setRemovedProblems] = useState<Set<number>>(new Set());
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to handle scroll events and hide floating menu
  useEffect(() => {
    const handleScroll = () => {
      if (floatingMenuVisible) {
        setFloatingMenuVisible(false);
        setActiveHighlightIndex(null);
      }
    };

    // Add scroll listener to the sidebar content area
    const sidebarElement = sidebarRef.current;
    if (sidebarElement) {
      sidebarElement.addEventListener('scroll', handleScroll);
    }

    // Also listen for window scroll events
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (sidebarElement) {
        sidebarElement.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [floatingMenuVisible]);

  // Color palette for customer problems
  const colorPalette = [
    { default: "#FFF5EB", hover: "#FEE4CD", list: "#FEE4CD" }, // Orange
    { default: "#F0FDE8", hover: "#DBF7BA", list: "#DBF7BA" }, // Green
    { default: "#E5FFFA", hover: "#C9FCF4", list: "#C9FCF4" }, // Teal
    { default: "#FDEDF8", hover: "#FBDDF1", list: "#FBDDF1" }, // Pink
    { default: "#FEF7E1", hover: "#FFEDAD", list: "#FFEDAD" }  // Yellow
  ];

  // Customer problems data with target text mapping
  const customerProblems = [
    { 
      id: 1, 
      text: "User like bird eye perspective on dashboards", 
      colorIndex: 0, // Orange
      targetText: "Dashboards are really good at providing us bird perspective"
    },
    { 
      id: 2, 
      text: "User lacks overview of how customer call was closed with custom field", 
      colorIndex: 1, // Green
      targetText: "we miss a lot at dashboards to be more valuable is overview of how each customer call was closed - successfully by matching to one of our solutions, or we didn't have a solutions. We basically need to bring a custom fields with those values to dashboards from different system"
    },
    { 
      id: 3, 
      text: "Lacks option to analyze granular data by clicking on chart to drill down", 
      colorIndex: 2, // Teal
      targetText: "We lack option to quickly analyze granular data by double clicking on chart value and drill down."
    },
    { 
      id: 4, 
      text: "User find dashboard at good usability level", 
      colorIndex: 3, // Pink
      targetText: "Usability vise we don&apos;t have really problems with dashboards."
    },
    { 
      id: 5, 
      text: "User requested option to create custom templates", 
      colorIndex: 4, // Yellow
      targetText: "We would welcome option to create a template for dashboard and share it with team."
    }
  ];

  // Function to scroll to text
  const scrollToText = (targetText: string, highlightIndex: number) => {
    if (!sidebarRef.current) return;
    
    // Set the clicked highlight index
    setClickedHighlightIndex(highlightIndex);
    
    const sidebarContent = sidebarRef.current;
    const textNodes = [];
    
    // Find all text nodes in the sidebar content
    const walker = document.createTreeWalker(
      sidebarContent,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent && node.textContent.includes(targetText)) {
        textNodes.push(node);
      }
    }
    
    if (textNodes.length > 0) {
      const targetNode = textNodes[0];
      const parentElement = targetNode.parentElement;
      
      if (parentElement) {
        // Scroll to the element
        parentElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  };

  // Function to handle highlight hover for floating menu
  const handleHighlightHover = (event: React.MouseEvent, index: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left, // Use left edge of highlight
      y: rect.top
    };
    setFloatingMenuPosition(position);
    setActiveHighlightIndex(index);
    setFloatingMenuVisible(true);
  };

  // Function to handle highlight mouse leave
  const handleHighlightMouseLeave = () => {
    // Clear any existing timeout
    if (menuHideTimeoutRef.current) {
      clearTimeout(menuHideTimeoutRef.current);
    }
    // Add a small delay to allow moving to the menu
    menuHideTimeoutRef.current = setTimeout(() => {
      setFloatingMenuVisible(false);
      setActiveHighlightIndex(null);
      menuHideTimeoutRef.current = null;
    }, 150);
  };

  // Function to handle link button click
  const handleLinkClick = () => {
    // TODO: Implement linking functionality
    console.log('Link clicked for highlight:', activeHighlightIndex);
    setFloatingMenuVisible(false);
  };

  // Function to handle remove button click
  const handleRemoveClick = () => {
    if (activeHighlightIndex !== null) {
      setRemovedProblems(prev => new Set([...prev, activeHighlightIndex]));
      setFloatingMenuVisible(false);
      setActiveHighlightIndex(null);
    }
  };

  // Function to handle menu mouse enter
  const handleMenuMouseEnter = () => {
    // Keep menu visible when hovering over it
    setFloatingMenuVisible(true);
    // Clear any pending hide timeout
    if (menuHideTimeoutRef.current) {
      clearTimeout(menuHideTimeoutRef.current);
      menuHideTimeoutRef.current = null;
    }
  };

  // Function to handle menu mouse leave
  const handleMenuMouseLeave = () => {
    // Hide menu when leaving it
    setFloatingMenuVisible(false);
    setActiveHighlightIndex(null);
  };

  // Function to handle removing from customer problems list
  const handleRemoveFromList = (problemIndex: number) => {
    setRemovedProblems(prev => new Set([...prev, problemIndex]));
  };



  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'inbox':
        return <Inbox size={16} className="text-[#68707b]" />;
      case 'barchart':
        return <BarChart3 size={16} className="text-[#68707b]" />;
      case 'tag':
        return <TagIcon />;
      case 'component':
        return <Component size={16} className="text-[#68707b]" />;
      default:
        return <Inbox size={16} className="text-[#68707b]" />;
    }
  };

  const getBadgeIcon = (badgeType: string) => {
    switch (badgeType) {
      case 'member':
        return (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L3.5 5.5L6 3" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'unprocessed':
        return (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 2V4L5.5 5.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'following':
        return (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L3.5 5.5L6 3" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#f2f5f7] h-screen flex overflow-hidden">
      {/* 1st Level Navigation */}
      <div 
        className="w-[60px] bg-white border-r border-[#e1e6ea] flex flex-col items-center justify-between py-4 px-2 relative"
        onMouseEnter={() => !isNavPinned && setIsNavCollapsed(false)}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="w-8 h-8 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.0002 8L29 16L20.9998 24L13.0004 16L21.0002 8Z" fill="#0071E1"/>
              <path d="M20.9996 8L12.9998 16L5 8H20.9996Z" fill="#FFC600"/>
              <path d="M12.9998 16L20.9996 24H5L12.9998 16Z" fill="#F84136"/>
            </svg>
          </div>
          
          {/* Global Create */}
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Plus size={16} className="text-[#68707b]" />
          </div>
          
          {/* Navigation Items */}
          {navigationItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-0.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                item.active ? 'bg-[#e2effd]' : 'hover:bg-gray-100'
              }`}>
                <item.icon size={16} className={`${
                  item.active ? 'text-[#2693ff]' : 'text-[#68707b]'
                }`} />
              </div>
              <span className={`text-[10px] font-semibold ${
                item.active ? 'text-[#68707b]' : 'text-[#68707b]'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col items-center gap-4">
          {/* More with notification */}
          <div className="flex flex-col items-center gap-0.5 relative">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100">
              <Bell size={16} className="text-[#68707b]" />
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#f00000] rounded-full border-2 border-white"></div>
            </div>
            <span className="text-[10px] font-semibold text-[#68707b]">More</span>
          </div>
          
          {/* Settings */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100">
              <Settings size={16} className="text-[#68707b]" />
            </div>
            <span className="text-[10px] font-semibold text-[#68707b]">Settings</span>
          </div>
        </div>
      </div>

      {/* 2nd Level Navigation */}
      <div 
        className={`bg-white border-r border-[#e1e6ea] flex flex-col transition-all duration-300 ${
          isNavCollapsed ? 'w-0 opacity-0' : 'w-60 opacity-100'
        }`}
        onMouseEnter={() => !isNavPinned && setIsNavCollapsed(false)}
        onMouseLeave={() => !isNavPinned && setIsNavCollapsed(true)}
      >
        {/* Header */}
        <div className="h-16 p-3 flex items-center">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[16px] font-bold text-[#30363c]">Insights</h1>
            <button 
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => {
                if (isNavCollapsed) {
                  // If collapsed, show and pin
                  setIsNavCollapsed(false);
                  setIsNavPinned(true);
                } else if (isNavPinned) {
                  // If pinned, hide and unpin
                  setIsNavCollapsed(true);
                  setIsNavPinned(false);
                } else {
                  // If in hover state (not pinned), pin it
                  setIsNavPinned(true);
                }
              }}
            >
              {isNavPinned ? (
                <ArrowLeftToLine size={16} className="text-[#939DA7]" />
              ) : (
                <ArrowRightToLine size={16} className="text-[#939DA7]" />
              )}
            </button>
          </div>
        </div>
        
        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-1.5">
            {/* Boards Section */}
            <div className="mb-4">
              <NavigationItem
                icon={<Grid2X2 size={16} className="text-[#68707b]" />}
                label="Boards"
                isActive={false}
              />
              
              <div className="space-y-px">
                {secondaryNavItems.map((item, index) => (
                  <NavigationItem
                    key={index}
                    icon={getIcon(item.icon)}
                    label={item.name}
                    count={item.count}
                    isActive={item.name === 'All notes'}
                    badge={item.badge ? getBadgeIcon(item.badge) : undefined}
                  />
                ))}
              </div>
            </div>
            
            {/* Recent Insights Boards */}
            <div>
              <div 
                className="px-2 h-8 flex items-center gap-2 rounded cursor-pointer hover:bg-gray-50"
                onClick={() => setIsRecentBoardsCollapsed(!isRecentBoardsCollapsed)}
              >
                <div className="w-4 h-4 flex items-center justify-center relative">
                  {isRecentBoardsCollapsed ? (
                    <ChevronRight size={16} className="text-[#68707b]" />
                  ) : (
                    <ChevronDown size={16} className="text-[#68707b]" />
                  )}
                </div>
                <span className="text-[12px] font-semibold flex-1 text-[#30363c]">Recent insights boards</span>
              </div>
              
              <AnimatePresence>
                {!isRecentBoardsCollapsed && (
                  <motion.div 
                    className="space-y-px"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    {recentBoards.map((board, index) => (
                      <NavigationItem
                        key={index}
                        icon={<Inbox size={16} className="text-[#68707b]" />}
                        label={board.name}
                        count={board.count}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-[#e1e6ea]">
          {/* Main Header */}
          <div className="h-16 flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-[#68707b]" />
                <h1 className="text-[16px] font-bold text-[#202428]">All notes</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-60 h-9 pl-9 pr-4 bg-[#f8fafb] rounded text-[14px] text-[#68707b] focus:outline-none"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#68707b]" />
              </div>
              
              {/* Share Button */}
              <button className="h-9 px-2 py-1.5 border border-[#d4dbe1] rounded text-[14px] font-semibold text-[#68707b] hover:bg-gray-50">
                Share
              </button>
              
              {/* More Button */}
              <button className="p-1.5 rounded hover:bg-gray-100">
                <MoreHorizontal size={16} className="text-[#68707b]" />
              </button>
            </div>
          </div>
          
          {/* Secondary Header */}
          <div className="h-12 flex items-center justify-between px-3 py-0">
            <div className="flex items-center gap-2">
              <button className="h-8 px-2 py-1.5 rounded text-[14px] font-semibold text-[#68707b] hover:bg-gray-100 flex items-center gap-1">
                <Filter size={16} />
                Filtered by
              </button>
              <button className="h-8 px-2 py-1.5 border border-[#d4dbe1] rounded text-[14px] font-semibold text-[#68707b] hover:bg-gray-50 flex items-center gap-1">
                <Calendar size={16} />
                Last 30 days
              </button>
            </div>
            
            <div className="flex items-center gap-1">
              <button className="h-8 px-2 py-1.5 rounded text-[14px] font-semibold text-[#68707b] hover:bg-gray-100 flex items-center gap-1">
                <Settings size={16} />
                Board controls
              </button>
              <button className="h-8 px-1.5 py-1 bg-[#8811e7] rounded shadow-lg text-[12px] font-semibold text-white flex items-center gap-1">
                <BarChart3 size={16} />
                Analyze
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Notes Feed */}
          <div className="flex-1 flex flex-col bg-[#f2f5f7]">
            <div className="flex-1 overflow-y-auto p-5">
              {/* Today Section */}
              <div className="mb-5">
                <div className="h-4 mb-3">
                  <span className="text-[12px] font-bold text-[#68707b]">Today</span>
                </div>
                
                <div className="space-y-2">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className={`bg-white rounded-lg border border-[#e1e6ea] p-4 cursor-pointer hover:shadow-sm ${
                        note.isSelected ? 'bg-[#f1f8fe] border-[#94c7fa]' : ''
                      }`}
                      onClick={() => setSelectedNote(note)}
                    >
                      <div className="flex items-start gap-3 mb-1">
                        {/* Avatar */}
                        <div className="w-7 h-7 rounded bg-[#f8fafb] flex items-center justify-center">
                          <div 
                            className="w-7 h-7 rounded flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: note.avatarColor }}
                          >
                            {note.avatar}
                          </div>
                        </div>
                        
                        {/* Company and Person Info */}
                        <div className="flex-1 flex items-center gap-3 text-[14px]">
                          <span className="font-semibold text-[#30363c]">{note.company}</span>
                          {note.person && (
                            <>
                              <div className="w-px h-3 bg-[#e1e6ea]"></div>
                              <span className="font-semibold text-[#30363c]">{note.person}</span>
                            </>
                          )}
                          {note.segment && (
                            <>
                              <div className="w-px h-3 bg-[#e1e6ea]"></div>
                              <div className="flex items-center gap-1">
                                <Building size={12} className="text-[#68707b]" />
                                <span className="font-semibold text-[#68707b] text-[13px]">{note.segment}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-7"></div>
                        <div className="flex-1">
                          <div className="text-[14px] text-[#202428] mb-1">{note.title}</div>
                          <div className="text-[14px] text-[#202428] leading-5">{note.content}</div>
                        </div>
                      </div>
                      
                      {note.hasBadge && (
                        <div 
                          className="absolute top-0 right-0 w-2 h-2 rounded-full border-2 border-white"
                          style={{ backgroundColor: note.badgeColor }}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Earlier Section */}
              <div>
                <div className="h-4 mb-3">
                  <span className="text-[12px] font-bold text-[#68707b]">Earlier</span>
                </div>
                
                <div className="space-y-2">
                  {earlierNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white rounded-lg border border-[#e1e6ea] p-4 cursor-pointer hover:shadow-sm"
                      onClick={() => setSelectedNote(note)}
                    >
                      <div className="flex items-start gap-3 mb-1">
                        {/* Avatar */}
                        <div className="w-7 h-7 rounded bg-[#f8fafb] flex items-center justify-center">
                          <div 
                            className="w-7 h-7 rounded flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: note.avatarColor }}
                          >
                            {note.avatar}
                          </div>
                        </div>
                        
                        {/* Company and Person Info */}
                        <div className="flex items-center gap-3 text-[14px]">
                          <span className="font-semibold text-[#30363c]">{note.company}</span>
                          {note.person && (
                            <>
                              <div className="w-px h-3 bg-[#e1e6ea]"></div>
                              <span className="font-semibold text-[#30363c]">{note.person}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-7">
                          {note.importance && (
                            <div className="flex gap-0.5 py-1">
                              {[...Array(note.importance)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-[#ff4747] rounded-full"></div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-[14px] text-[#202428] mb-1">{note.title}</div>
                          <div className="text-[14px] text-[#202428] leading-5">{note.content}</div>
                        </div>
                      </div>
                      
                      {note.hasBadge && (
                        <div 
                          className="absolute top-0 right-0 w-2 h-2 rounded-full border-2 border-white"
                          style={{ backgroundColor: note.badgeColor }}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-[800px] bg-white border-l border-[#d4dbe1] shadow-lg flex flex-col">
            <div className="flex flex-col h-full">
                              {/* Sidebar Header */}
                <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <button className="h-8 px-2 py-1.5 rounded text-[14px] font-semibold text-[#68707b] hover:bg-gray-100 flex items-center gap-1">
                      <MessageSquare size={16} />
                      Note
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="h-8 px-2 py-1.5 rounded text-[14px] font-semibold text-[#68707b] hover:bg-gray-100">
                      <Maximize2 size={16} />
                    </button>
                    <button className="h-8 px-2 py-1.5 rounded text-[14px] font-semibold text-[#68707b] hover:bg-gray-100">
                      <MoreHorizontal size={16} />
                    </button>
                    <button className="h-8 px-2 py-1.5 rounded text-[14px] font-semibold text-[#68707b] hover:bg-gray-100">
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <h2 className="text-[20px] font-bold text-[#30363c]">{selectedNote.title}</h2>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto" ref={sidebarRef}>
                <div className="p-4 flex-1">
                  {/* Attributes */}
                  <div className="space-y-2 mb-4">
                    {/* Customer */}
                    <div className="flex items-center">
                      <div className="w-[200px] flex items-center gap-2 px-2 py-1">
                        <User size={16} className="text-[#68707b]" />
                        <span className="text-[14px] text-[#30363c]">Customer</span>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex items-center gap-2 px-2 py-1 rounded">
                          <div className="w-6 h-6 rounded bg-[#96fdd1] flex items-center justify-center">
                            <Building size={16} className="text-[#30363c]" />
                          </div>
                          <span className="text-[14px] font-semibold text-[#30363c]">Rave</span>
                        </div>
                        <div className="w-px h-[22px] bg-[#e1e6ea]"></div>
                        <div className="flex items-center gap-2 px-2 py-1 rounded">
                          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                              <User size={12} className="text-gray-600" />
                            </div>
                          </div>
                          <span className="text-[14px] font-semibold text-[#30363c]">Jenna Doe</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center">
                      <div className="w-[200px] flex items-center gap-2 px-2 py-1">
                        <Tag size={16} className="text-[#68707b]" />
                        <span className="text-[14px] text-[#30363c]">Tags</span>
                      </div>
                      <div className="flex-1">
                        <div className="inline-flex items-center px-2 py-1.5 border border-[#e1e6ea] rounded text-[13px] text-[#30363c]">
                          ‼️ Churn risk
                        </div>
                      </div>
                    </div>

                    {/* Theme */}
                    <div className="flex items-center">
                      <div className="w-[200px] flex items-center gap-2 px-2 py-1">
                        <Tag size={16} className="text-[#68707b]" />
                        <span className="text-[14px] text-[#30363c]">Theme</span>
                      </div>
                      <div className="flex-1">
                        <span className="text-[14px] font-semibold text-[#30363c]">Dashboards usability</span>
                      </div>
                    </div>

                    {/* Customer Problems */}
                    <div className="flex items-start">
                      <div className="w-[200px] flex items-center gap-2 px-2 py-1">
                        <MessageSquare size={16} className="text-[#68707b]" />
                        <span className="text-[14px] text-[#30363c]">Customer problems</span>
                      </div>
                                            <div className="flex-1 space-y-px">
                        {customerProblems.filter((_, index) => !removedProblems.has(index)).map((problem, index) => (
                            <div 
                              key={problem.id}
                              className="flex items-center justify-between gap-2 pl-1.5 pr-1 h-8 rounded hover:bg-gray-50 group relative"
                              onMouseEnter={() => setHoveredProblemIndex(index)}
                              onMouseLeave={() => setHoveredProblemIndex(null)}
                            >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <div 
                                className="w-[1.5px] h-[19px] rounded-full flex-shrink-0"
                                style={{ backgroundColor: colorPalette[problem.colorIndex].list }}
                              ></div>
                              <span className="text-[14px] font-semibold text-[#30363c] truncate">{problem.text}</span>
                            </div>
                            
                            {/* Action buttons - only show on hover */}
                            {hoveredProblemIndex === index && (
                              <div className="flex items-center gap-0.5 pr-1">
                                <button 
                                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#f2f5f7] transition-colors"
                                  onClick={() => scrollToText(problem.targetText, index)}
                                >
                                  <ArrowRight size={14} className="text-[#939DA7]" />
                                </button>
                                <button 
                                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#f2f5f7] transition-colors"
                                  onClick={() => handleRemoveFromList(index)}
                                >
                                  <Trash2 size={14} className="text-[#939DA7]" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* New Field Button */}
                    <div className="flex items-center">
                      <div className="w-[200px]">
                        <button className="h-8 px-2 py-1.5 rounded text-[14px] font-semibold text-[#68707b] hover:bg-gray-100 flex items-center gap-1">
                          <Plus size={16} />
                          New field
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Show All Button */}
                  <button className="px-2 py-1.5 rounded text-[14px] font-bold text-[#68707b] hover:bg-gray-100">
                    Show all...
                  </button>
                </div>

                {/* Content Editor */}
                <div className="border-t border-[#e1e6ea] pt-6 px-6 overflow-y-auto flex-1">
                  <div className="max-w-[800px] pb-[60px] pt-2">
                    <div className="relative">
                      {/* Floating Menu */}
                      <FloatingMenu
                        isVisible={floatingMenuVisible}
                        onLink={handleLinkClick}
                        onRemove={handleRemoveClick}
                        position={floatingMenuPosition}
                        onMouseEnter={handleMenuMouseEnter}
                        onMouseLeave={handleMenuMouseLeave}
                      />
                      <div className="text-[16px] font-bold mb-2">Meeting context</div>
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        Rave team is using dashboards for monitoring the usage of their customer support channels. They use them also for reporting to the senior management. Currently they are at churn risk due to gaps mentioned long time ago.
                      </div>
                      
                      <div className="text-[16px] font-bold mb-2">Interview notes</div>
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        {!removedProblems.has(0) ? (
                          <span 
                            className="px-1 rounded cursor-pointer relative" 
                            style={{ 
                              backgroundColor: hoveredHighlightIndex === 0 || clickedHighlightIndex === 0 ? colorPalette[0].hover : colorPalette[0].default, 
                              height: '24px', 
                              lineHeight: '24px', 
                              display: 'inline-block' 
                            }}
                            onMouseEnter={(e) => {
                              setHoveredHighlightIndex(0);
                              handleHighlightHover(e, 0);
                            }}
                            onMouseLeave={() => {
                              setHoveredHighlightIndex(null);
                              handleHighlightMouseLeave();
                            }}
                          >
                            Dashboards are really good at providing us bird perspective
                          </span>
                        ) : (
                          "Dashboards are really good at providing us bird perspective"
                        )} on how our customer support is handling the tasks, but                         {!removedProblems.has(1) ? (
                          <span 
                            className="px-1 rounded cursor-pointer relative" 
                            style={{ 
                              backgroundColor: hoveredHighlightIndex === 1 || clickedHighlightIndex === 1 ? colorPalette[1].hover : colorPalette[1].default, 
                              height: '24px', 
                              lineHeight: '24px', 
                              display: 'inline-block' 
                            }}
                            onMouseEnter={(e) => {
                              setHoveredHighlightIndex(1);
                              handleHighlightHover(e, 1);
                            }}
                            onMouseLeave={() => {
                              setHoveredHighlightIndex(null);
                              handleHighlightMouseLeave();
                            }}
                          >
                            what we miss a lot at dashboards to be more valuable is overview of how each customer call was closed - successfully by matching to one of our solutions, or we didn&apos;t have a solutions. We basically need to bring a custom fields with those values to dashboards from different system
                          </span>
                        ) : (
                                                      "what we miss a lot at dashboards to be more valuable is overview of how each customer call was closed - successfully by matching to one of our solutions, or we didn&apos;t have a solutions. We basically need to bring a custom fields with those values to dashboards from different system"
                        )}. This kind of overview would give us valuable signals that we might miss something in our knowledge base, that would be important for our customers to quickly resolve their queries.
                      </div>
                      
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        Another think to double click when analysts use data.
                      </div>
                      
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        {!removedProblems.has(2) ? (
                          <span 
                            className="px-1 rounded cursor-pointer relative" 
                            style={{ 
                              backgroundColor: hoveredHighlightIndex === 2 || clickedHighlightIndex === 2 ? colorPalette[2].hover : colorPalette[2].default, 
                              height: '24px', 
                              lineHeight: '24px', 
                              display: 'inline-block' 
                            }}
                            onMouseEnter={(e) => {
                              setHoveredHighlightIndex(2);
                              handleHighlightHover(e, 2);
                            }}
                            onMouseLeave={() => {
                              setHoveredHighlightIndex(null);
                              handleHighlightMouseLeave();
                            }}
                          >
                            We lack option to quickly analyze granular data by double clicking on chart value and drill down.
                          </span>
                        ) : (
                          "We lack option to quickly analyze granular data by double clicking on chart value and drill down."
                        )} Analysts needs to always check what filters to apply, then go find them in filtering pane and apply them and create new view. This is not really fitting our drill down workflows.
                      </div>
                      
                      <div className="text-[14px] font-bold mb-2">Usability</div>
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        {!removedProblems.has(3) ? (
                          <span 
                            className="px-1 rounded cursor-pointer relative" 
                            style={{ 
                              backgroundColor: hoveredHighlightIndex === 3 || clickedHighlightIndex === 3 ? colorPalette[3].hover : colorPalette[3].default, 
                              height: '24px', 
                              lineHeight: '24px', 
                              display: 'inline-block' 
                            }}
                            onMouseEnter={(e) => {
                              setHoveredHighlightIndex(3);
                              handleHighlightHover(e, 3);
                            }}
                            onMouseLeave={() => {
                              setHoveredHighlightIndex(null);
                              handleHighlightMouseLeave();
                            }}
                          >
                            Usability vise we don&apos;t have really problems with dashboards.
                          </span>
                        ) : (
                          "Usability vise we don&apos;t have really problems with dashboards."
                        )} Some individuals will of course find something. But nothing major that would cause this conversation.
                      </div>
                      
                      <div className="text-[14px] font-bold mb-2">Custom templates of dashboards</div>
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        Big thing is the templates. Our team is repeating reports in regular periods. We need to always create and setup new dashboard, which is again time consuming and over time we have a lot of inconsistencies. {!removedProblems.has(4) ? (
                          <span 
                            className="px-1 rounded cursor-pointer relative" 
                            style={{ 
                              backgroundColor: hoveredHighlightIndex === 4 || clickedHighlightIndex === 4 ? colorPalette[4].hover : colorPalette[4].default, 
                              height: '24px', 
                              lineHeight: '24px', 
                              display: 'inline-block' 
                            }}
                            onMouseEnter={(e) => {
                              setHoveredHighlightIndex(4);
                              handleHighlightHover(e, 4);
                            }}
                            onMouseLeave={() => {
                              setHoveredHighlightIndex(null);
                              handleHighlightMouseLeave();
                            }}
                          >
                            We would welcome option to create a template for dashboard and share it with team.
                          </span>
                        ) : (
                          "We would welcome option to create a template for dashboard and share it with team."
                        )}
                      </div>
                      
                      <div className="text-[14px] font-bold mb-2">Priorities</div>
                      <div className="text-[14px] text-[#202428] leading-6">
                        The most priority would go to drill down and templates.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
