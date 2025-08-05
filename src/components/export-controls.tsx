'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@/types/expense';
import { exportToCSV } from '@/lib/utils';

interface ExportControlsProps {
  expenses: Expense[];
}

export function ExportControls({ expenses }: ExportControlsProps) {
  const handleExportCSV = () => {
    if (expenses.length === 0) {
      alert('No expenses to export');
      return;
    }
    
    exportToCSV(expenses);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Export your expense data to use in other applications or for backup purposes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleExportCSV}
              disabled={expenses.length === 0}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export to CSV ({expenses.length} expenses)
            </Button>
          </div>
          
          {expenses.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Add some expenses to enable export functionality.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}