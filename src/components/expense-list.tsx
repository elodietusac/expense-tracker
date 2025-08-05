'use client';

import { useState } from 'react';
import { Trash2, Edit2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense, Category, CATEGORIES, ExpenseFilters } from '@/types/expense';
import { formatCurrency, formatDate, filterExpenses } from '@/lib/utils';
import { storage } from '@/lib/storage';

interface ExpenseListProps {
  expenses: Expense[];
  onExpenseDeleted: () => void;
  onEditExpense: (expense: Expense) => void;
}

export function ExpenseList({ expenses, onExpenseDeleted, onEditExpense }: ExpenseListProps) {
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const filteredExpenses = filterExpenses(expenses, filters);
  const sortedExpenses = filteredExpenses.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDeleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      storage.deleteExpense(id);
      onExpenseDeleted();
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getCategoryColor = (category: Category): string => {
    const colors = {
      Food: 'bg-blue-100 text-blue-800',
      Transportation: 'bg-green-100 text-green-800',
      Entertainment: 'bg-purple-100 text-purple-800',
      Shopping: 'bg-pink-100 text-pink-800',
      Bills: 'bg-red-100 text-red-800',
      Other: 'bg-gray-100 text-gray-800'
    };
    return colors[category];
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== '');

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Expenses ({sortedExpenses.length})</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search description..."
                    value={filters.search || ''}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value as Category || undefined })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date From</label>
                <Input
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value || undefined })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date To</label>
                <Input
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value || undefined })}
                />
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {sortedExpenses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {expenses.length === 0 ? (
              <div>
                <p className="text-lg font-medium mb-2">No expenses yet</p>
                <p>Start by adding your first expense above!</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">No matching expenses</p>
                <p>Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}
                    >
                      {expense.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(expense.date)}
                    </span>
                  </div>
                  <p className="font-medium truncate pr-4">{expense.description}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-right min-w-0">
                    {formatCurrency(expense.amount)}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditExpense(expense)}
                      className="h-8 w-8"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}