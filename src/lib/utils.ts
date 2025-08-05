import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Expense, Category, ExpenseSummary, ExpenseFilters } from '@/types/expense';
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(date: string): string {
  return format(parseISO(date), 'MMM dd, yyyy');
}

export function filterExpenses(expenses: Expense[], filters: ExpenseFilters): Expense[] {
  return expenses.filter(expense => {
    if (filters.category && expense.category !== filters.category) {
      return false;
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!expense.description.toLowerCase().includes(searchLower) &&
          !expense.category.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    if (filters.dateFrom || filters.dateTo) {
      const expenseDate = parseISO(expense.date);
      
      if (filters.dateFrom && expenseDate < parseISO(filters.dateFrom)) {
        return false;
      }
      
      if (filters.dateTo && expenseDate > parseISO(filters.dateTo)) {
        return false;
      }
    }

    return true;
  });
}

export function getExpenseSummary(expenses: Expense[]): ExpenseSummary {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, { start: monthStart, end: monthEnd });
  });
  
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categorySummary: Record<Category, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0
  };
  
  expenses.forEach(expense => {
    categorySummary[expense.category] += expense.amount;
  });
  
  const topCategories = Object.entries(categorySummary)
    .map(([category, amount]) => ({
      category: category as Category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)
    .filter(cat => cat.amount > 0);
  
  return {
    total,
    monthlyTotal,
    categorySummary,
    topCategories
  };
}

export function exportToCSV(expenses: Expense[]): void {
  const headers = ['Date', 'Description', 'Category', 'Amount'];
  const csvContent = [
    headers.join(','),
    ...expenses.map(expense => [
      expense.date,
      `"${expense.description}"`,
      expense.category,
      expense.amount.toString()
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}