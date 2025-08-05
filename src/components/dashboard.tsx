'use client';

import { DollarSign, TrendingUp, Calendar, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@/types/expense';
import { formatCurrency, getExpenseSummary } from '@/lib/utils';

interface DashboardProps {
  expenses: Expense[];
}

export function Dashboard({ expenses }: DashboardProps) {
  const summary = getExpenseSummary(expenses);

  const stats = [
    {
      title: 'Total Spent',
      value: formatCurrency(summary.total),
      icon: DollarSign,
      description: 'All time total',
      color: 'text-blue-600'
    },
    {
      title: 'This Month',
      value: formatCurrency(summary.monthlyTotal),
      icon: Calendar,
      description: 'Current month spending',
      color: 'text-green-600'
    },
    {
      title: 'Total Expenses',
      value: expenses.length.toString(),
      icon: TrendingUp,
      description: 'Number of transactions',
      color: 'text-purple-600'
    },
    {
      title: 'Categories Used',
      value: Object.values(summary.categorySummary).filter(amount => amount > 0).length.toString(),
      icon: PieChart,
      description: 'Active categories',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {summary.topCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Spending Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary.topCategories.map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    <span className="font-medium">{category.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(category.amount)}</div>
                    <div className="text-xs text-muted-foreground">
                      {category.percentage.toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {expenses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(summary.categorySummary)
                .filter(([, amount]) => amount > 0)
                .sort(([, a], [, b]) => b - a)
                .map(([category, amount]) => {
                  const percentage = summary.total > 0 ? (amount / summary.total) * 100 : 0;
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}