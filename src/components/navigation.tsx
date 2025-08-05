'use client';

import { PlusCircle, BarChart3, List, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  currentView: 'dashboard' | 'expenses' | 'charts' | 'export';
  onViewChange: (view: 'dashboard' | 'expenses' | 'charts' | 'export') => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
    { id: 'expenses' as const, label: 'Expenses', icon: List },
    { id: 'charts' as const, label: 'Charts', icon: BarChart3 },
    { id: 'export' as const, label: 'Export', icon: Download },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('expenses')}
                className="flex items-center space-x-2 hover:bg-primary/10"
                title="Add New Expense"
              >
                <PlusCircle className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Expense Tracker</h1>
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}