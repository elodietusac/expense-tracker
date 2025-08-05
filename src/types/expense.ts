export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  createdAt: string;
}

export type Category = 'Food' | 'Transportation' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other';

export const CATEGORIES: Category[] = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];

export interface ExpenseFormData {
  amount: string;
  category: Category;
  description: string;
  date: string;
}

export interface ExpenseFilters {
  category?: Category;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface ExpenseSummary {
  total: number;
  monthlyTotal: number;
  categorySummary: Record<Category, number>;
  topCategories: Array<{ category: Category; amount: number; percentage: number }>;
}