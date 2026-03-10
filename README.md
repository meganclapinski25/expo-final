# 💰 Finance Tracker

A personal finance tracking app built with React Native and Expo. Track transactions, monitor your monthly budget, and visualize spending by category.

## Features

- Add and delete transactions with category labels
- Dashboard showing real-time balance and total spent
- Budget tab with a donut chart that fills as you spend
- Color-coded remaining budget (green → orange → red)
- Share your budget summary via native iOS share sheet
- Data persists across sessions using AsyncStorage

## Screens

**Transactions** — Log expenses with a label, amount, and category. Tap any transaction to view details. Pull down to refresh.

**Dashboard** — See your current balance (animated count-up) and total spent. Set your starting balance once and it saves automatically.

**Budget** — Set a monthly budget. The donut chart fills in by category as you add transactions. Remaining budget turns orange at 50% used and red at 75%.

## Tech Stack

- React Native + Expo SDK 54
- Redux Toolkit (global state + async thunk)
- AsyncStorage (persistence)
- React Navigation (Bottom Tab + Stack Navigator)
- react-native-gifted-charts (donut chart)
- Expo Share API (native integration)
- Custom theme system

## Requirements Met

| Requirement | Implementation |
|---|---|
| Navigation | Bottom Tab Navigator + nested Stack Navigator with Transaction Detail screen |
| Redux Toolkit | `transactionSlice` with `addTransaction`, `removeTransaction`, and `loadTransactions` async thunk |
| Async / Data | AsyncStorage as simulated backend with loading, error states, and pull-to-refresh |
| Persistence | Transactions, starting balance, and monthly budget all persist via AsyncStorage and restore on launch |
| Native Integration | Share API — share a full budget summary via native iOS share sheet |
| UI / Design | Custom `theme.js` color system across all screens + count-up animation on Dashboard balance |

## Getting Started
```bash
npm install
npx expo start
```

Press `i` for iOS simulator or scan the QR code with Expo Go.

## Project Structure
```
expo-final/
├── App.js                  # Navigation + Redux Provider
├── store.js                # Redux store
├── theme.js                # Color system
├── index.js                # App entry point
├── slices/
│   └── transactionSlice.js # Redux slice + async thunk
└── screens/
    ├── HomeScreen.js           # Dashboard
    ├── TransactionsScreen.js   # Transaction list + form
    ├── BudgetScreen.js         # Budget + donut chart
    └── TransactionDetailScreen.js # Transaction detail
```