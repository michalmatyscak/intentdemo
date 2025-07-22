'use client';

import { useState } from 'react';
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
  Bell
} from 'lucide-react';

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
  { name: 'Analytics', count: '94K', icon: BarChart3 },
  { name: 'Notes assigned to me', count: '134', icon: MessageSquare, badge: 'member' },
  { name: 'Unprocessed notes', count: '12', icon: MessageSquare, badge: 'unprocessed' },
  { name: 'Followed notes', count: '140', icon: MessageSquare, badge: 'following' },
  { name: 'All notes', count: '94K', icon: MessageSquare },
  { name: 'Themes', count: '', icon: Tag },
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
    hasBadge: true,
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
    hasBadge: true,
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
    hasBadge: true,
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
    hasBadge: true,
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
    hasBadge: true,
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
    hasBadge: true,
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
    hasBadge: true,
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
    hasBadge: true,
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
    hasBadge: true,
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

export default function Home() {
  const [selectedNote, setSelectedNote] = useState(notes[0]);

  return (
    <div className="bg-[#f2f5f7] h-screen flex">
      {/* 1st Level Navigation */}
      <div className="w-[60px] bg-white border-r border-[#e1e6ea] flex flex-col items-center justify-between py-4 px-2">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">I</span>
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
      <div className="w-60 bg-white border-r border-[#e1e6ea] flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-[#e1e6ea]">
          <div className="flex items-center justify-between">
            <h1 className="text-[16px] font-bold text-[#30363c]">Insights</h1>
            <button className="p-1 rounded hover:bg-gray-100">
              <MoreHorizontal size={16} className="text-[#939da7]" />
            </button>
          </div>
        </div>
        
        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-1.5">
          {/* Boards Section */}
          <div className="mb-4">
            <div className="px-2 py-1 mb-1">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded flex items-center justify-center">
                  <BarChart3 size={16} className="text-[#68707b]" />
                </div>
                <span className="text-[12px] font-bold text-[#68707b]">Boards</span>
              </div>
            </div>
            
            {secondaryNavItems.map((item, index) => (
              <div key={index} className="px-2 py-1 hover:bg-gray-50 rounded cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center relative">
                    <item.icon size={16} className="text-[#68707b]" />
                    {item.badge && (
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
                        item.badge === 'member' ? 'bg-blue-500' :
                        item.badge === 'unprocessed' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                    )}
                  </div>
                  <span className="text-[14px] text-[#30363c] flex-1">{item.name}</span>
                  {item.count && (
                    <span className="text-[12px] font-semibold text-[#68707b]">{item.count}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Recent Insights Boards */}
          <div>
            <div className="px-2 py-1 mb-1">
              <div className="flex items-center gap-2">
                <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-gray-100">
                  <ChevronDown size={16} className="text-[#68707b]" />
                </button>
                <span className="text-[12px] font-bold text-[#68707b]">Recent insights boards</span>
              </div>
            </div>
            
            {recentBoards.map((board, index) => (
              <div key={index} className="px-2 py-1 hover:bg-gray-50 rounded cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <MessageSquare size={16} className="text-[#68707b]" />
                  </div>
                  <span className="text-[14px] text-[#30363c] flex-1">{board.name}</span>
                  <span className="text-[12px] font-semibold text-[#687383]">{board.count}</span>
                </div>
              </div>
            ))}
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
        <div className="flex-1 flex">
          {/* Notes Feed */}
          <div className="flex-1 overflow-y-auto bg-[#f2f5f7]">
            <div className="p-5">
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
                          {note.topic && (
                            <>
                              <div className="w-px h-3 bg-[#e1e6ea]"></div>
                              <div className="flex items-center gap-1 flex-1">
                                <Tag size={12} className="text-[#68707b]" />
                                <span className="font-semibold text-[#68707b] text-[13px] truncate">{note.topic}</span>
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
                          {note.topic && (
                            <>
                              <div className="w-px h-3 bg-[#e1e6ea]"></div>
                              <div className="flex items-center gap-1">
                                <Tag size={12} className="text-[#68707b]" />
                                <span className="font-semibold text-[#68707b] text-[13px]">{note.topic}</span>
                              </div>
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
          <div className="w-[800px] bg-white border-l border-[#d4dbe1] shadow-lg">
            <div className="h-full flex flex-col">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-[#e1e6ea]">
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
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
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
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2 pl-1.5 pr-1">
                          <div className="w-[1.5px] h-[19px] bg-[#dbf7ba] rounded-full"></div>
                          <span className="text-[14px] font-semibold text-[#30363c]">User like bird eye perspective on dashboards</span>
                        </div>
                        <div className="flex items-center gap-2 pl-1.5 pr-1">
                          <div className="w-[1.5px] h-[19px] bg-[#fee4cd] rounded-full"></div>
                          <span className="text-[14px] font-semibold text-[#30363c]">User lacks overview of how customer call was closed with custom field</span>
                        </div>
                        <div className="flex items-center gap-2 pl-1.5 pr-1">
                          <div className="w-[1.5px] h-[19px] bg-[#fee4cd] rounded-full"></div>
                          <span className="text-[14px] font-semibold text-[#30363c]">Lacks option to analyze granular data by clicking on chart to drill down</span>
                        </div>
                        <div className="flex items-center gap-2 pl-1.5 pr-1">
                          <div className="w-[1.5px] h-[19px] bg-[#fee4cd] rounded-full"></div>
                          <span className="text-[14px] font-semibold text-[#30363c]">User requested option to create custom templates</span>
                        </div>
                        <div className="flex items-center gap-2 pl-1.5 pr-1">
                          <div className="w-[1.5px] h-[19px] bg-[#5ec200] rounded-full"></div>
                          <span className="text-[14px] font-semibold text-[#30363c]">User find dashboard at good usability level</span>
                        </div>
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
                <div className="border-t border-[#e1e6ea] pt-6 px-6">
                  <div className="max-w-[800px] pb-[60px] pt-2">
                    <div className="relative">
                      <div className="text-[16px] font-bold mb-2">Meeting context</div>
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        Rave team is using dashboards for monitoring the usage of their customer support channels. They use them also for reporting to the senior management. Currently they are at churn risk due to gaps mentioned long time ago.
                      </div>
                      
                      <div className="text-[16px] font-bold mb-2">Interview notes</div>
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        Dashboards are really good at providing us bird perspective on how our customer support is handling the tasks, but what we miss a lot at dashboards to be more valuable is overview of how each customer call was closed - successfully by matching to one of our solutions, or we didn&apos;t have a solutions. We basically need to bring a custom fields with those values to dashboards from different system. This kind of overview would give us valuable signals that we might miss something in our knowledge base, that would be important for our customers to quickly resolve their queries.
                      </div>
                      
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        Another think to double click when analysts use data.
                      </div>
                      
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        We lack option to quickly analyze granular data by double clicking on chart value and drill down. Analysts needs to always check what filters to apply, then go find them in filtering pane and apply them and create new view. This is not really fitting our drill down workflows.
                      </div>
                      
                      <div className="text-[14px] font-bold mb-2">Usability</div>
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        Usability vise we don&apos;t have really problems with dashboards. Some individuals will of course find something. But nothing major that would cause this conversation.
                      </div>
                      
                      <div className="text-[14px] font-bold mb-2">Custom templates of dashboards</div>
                      <div className="text-[14px] text-[#202428] mb-4 leading-6">
                        Big thing is the templates. Our team is repeating reports in regular periods. We need to always create and setup new dashboard, which is again time consuming and over time we have a lot of inconsistencies. We would welcome option to create a template for dashboard and share it with team.
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
