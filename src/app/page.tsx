'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { ExpenseForm } from '@/components/expense-form';
import { ExpenseList } from '@/components/expense-list';
import { Dashboard } from '@/components/dashboard';
import { ExpenseCharts } from '@/components/expense-charts';
import { ExportControls } from '@/components/export-controls';
import { Expense } from '@/types/expense';
import { storage } from '@/lib/storage';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentView, setCurrentView] = useState<'dashboard' | 'expenses' | 'charts' | 'export'>('dashboard');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    setIsLoading(true);
    const loadedExpenses = storage.getExpenses();
    setExpenses(loadedExpenses);
    setIsLoading(false);
  };

  const handleExpenseAdded = () => {
    loadExpenses();
  };

  const handleExpenseDeleted = () => {
    loadExpenses();
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setCurrentView('expenses');
  };

  const handleEditComplete = () => {
    setEditingExpense(null);
    loadExpenses();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading expenses...</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard expenses={expenses} />;
      case 'expenses':
        return (
          <div className="space-y-6">
            <ExpenseForm 
              onExpenseAdded={handleExpenseAdded}
              editingExpense={editingExpense || undefined}
              onEditComplete={handleEditComplete}
            />
            <ExpenseList 
              expenses={expenses}
              onExpenseDeleted={handleExpenseDeleted}
              onEditExpense={handleEditExpense}
            />
          </div>
        );
      case 'charts':
        return <ExpenseCharts expenses={expenses} />;
      case 'export':
        return <ExportControls expenses={expenses} />;
      default:
        return <Dashboard expenses={expenses} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js, TypeScript, and Tailwind CSS. Data stored locally in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
}
