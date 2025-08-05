# 💰 Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS. Track your personal finances with an intuitive interface, visual analytics, and comprehensive expense management features.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 📊 **Dashboard & Analytics**
- Real-time spending summaries with key metrics
- Monthly spending tracking
- Category breakdown with visual progress bars
- Top spending categories analysis

### 💸 **Expense Management**
- ✅ Add, edit, and delete expenses
- ✅ Form validation with error handling
- ✅ Categories: Food, Transportation, Entertainment, Shopping, Bills, Other
- ✅ Date picker for expense dates
- ✅ Currency formatting

### 🔍 **Search & Filter**
- Search expenses by description
- Filter by category and date range
- Advanced filtering with multiple criteria
- Real-time results

### 📈 **Visual Analytics**
- Interactive pie charts for category distribution
- Monthly spending trend charts
- Responsive chart components
- Tooltip information on hover

### 📤 **Data Export**
- Export expenses to CSV format
- Includes all expense data (date, description, category, amount)
- Perfect for backup or external analysis

### 📱 **Modern UI/UX**
- Fully responsive design (desktop, tablet, mobile)
- Clean, professional interface
- Intuitive navigation with functional plus button
- Loading states and visual feedback
- Dark/light mode support ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Storage**: localStorage (client-side)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page component
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── dashboard.tsx     # Dashboard with analytics
│   ├── expense-form.tsx  # Add/edit expense form
│   ├── expense-list.tsx  # Expense list with filters
│   ├── expense-charts.tsx # Chart components
│   ├── export-controls.tsx # CSV export
│   └── navigation.tsx    # Main navigation
├── lib/                  # Utilities and helpers
│   ├── storage.ts       # localStorage operations
│   └── utils.ts         # Helper functions
└── types/               # TypeScript type definitions
    └── expense.ts       # Expense-related types
```

## 🎯 Usage Guide

### Adding Expenses
1. Click the **plus button** in the header or navigate to **Expenses**
2. Fill out the form with amount, category, description, and date
3. Click **"Add Expense"** to save

### Viewing Analytics
1. Navigate to **Dashboard** to see spending summaries
2. View **Charts** for visual analytics and trends
3. Check category breakdowns and monthly patterns

### Managing Expenses
1. Go to **Expenses** to see all transactions
2. Use **filters** to search by description, category, or date
3. **Edit** expenses using the edit icon
4. **Delete** expenses using the trash icon

### Exporting Data
1. Navigate to **Export**
2. Click **"Export to CSV"** to download your data
3. File includes date, description, category, and amount

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎨 Customization

### Adding New Categories
Edit `src/types/expense.ts`:
```typescript
export const CATEGORIES: Category[] = [
  'Food', 'Transportation', 'Entertainment', 
  'Shopping', 'Bills', 'Other', 'YourNewCategory'
];
```

### Styling
- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Component styles use Tailwind CSS classes

## 📊 Data Storage

Currently uses **localStorage** for client-side storage. Data persists across browser sessions but is limited to the current device and browser.

### Future Enhancement Options:
- Database integration (PostgreSQL, MongoDB)
- Cloud storage (Firebase, Supabase)
- User authentication
- Multi-device sync

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
- **Netlify**: Connect your git repository
- **Heroku**: Add heroku/nodejs buildpack
- **Self-hosted**: Use `npm run build && npm start`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/)

---

**🤖 Generated with [Claude Code](https://claude.ai/code)**