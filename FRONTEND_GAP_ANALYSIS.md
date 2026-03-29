# Frontend Gap Analysis (vs existing backend APIs)

This document lists frontend features that appear missing or incomplete based on the current React codebase and existing service/API wrappers.

## 1) Authentication & session flow gaps
- No route guard for `/dashboard/*`; users can open dashboard pages without checking auth token/session.
- No startup auth bootstrap using `fetchCurrentUser()` to restore user profile/session on refresh.
- No logout implementation (sidebar dropdown has static `Logout` text only).
- No token-expiry / 401 handling interceptor in API client (currently only request token injection is present).

## 2) Market/search experience gaps
- Global topbar search input is UI-only and not connected to `searchStocks()`.
- No symbol details page, despite `fetchStockBySymbol()` service.
- No stock chart/timeframe UI, despite `fetchStockHistory()` service.
- Market index values in topbar are hardcoded; no live quote source.

## 3) Watchlist module gaps
- Watchlist uses local fallback seed data and only fetches once; no loading/error/empty states are shown.
- Add/remove watchlist actions are not wired to `addToWatchlist()` / `removeFromWatchlist()`.
- Watchlist capacity indicator is hardcoded as `/50`, not derived from server rules.
- Sell / Analytics / More actions are present visually but not implemented.
- Watchlist item identity relies on `stock.name`; no explicit unique id/symbol normalization logic.

## 4) Orders module gaps
- Orders page supports only list-read (`fetchOrders()`); no order filters (date/status/type) or pagination.
- No cancel-order action in UI, even though `cancelOrder()` API wrapper exists.
- No order detail drill-down despite `fetchOrderById()`.
- Buy flow uses `createOrder()` but lacks validation, submission states, and user feedback (success/failure toasts).
- "Get started" CTA in Orders empty-state links to `/` instead of a trading/search action inside dashboard.

## 5) Positions & holdings gaps
- Holdings/positions pages do not support refresh/retry controls.
- No pagination/virtualization/sorting for larger datasets.
- No row-level actions (exit/square-off/convert) for positions.
- P&L metrics are computed from assumed fields (`avg`, `price`, `qty`) without defensive mapping for alternate backend payload shapes.
- No realized vs unrealized P&L split, day P&L aggregates, or portfolio allocation breakdown.

## 6) Funds module gaps
- Funds page uses hardcoded defaults and silent fallback behavior; no visible API error state.
- Add funds action posts a hardcoded amount (1000) with no amount input/modal.
- Withdraw button has no handler.
- No transaction ledger UI even though `fetchFundTransactions()` service exists.
- No pending transfer states, reconciliation statuses, or payment method selection UI.

## 7) Apps/page-level completeness gaps
- `Apps` page is placeholder-only (`<h1>Apps</h1>`).
- Summary/dashboard metrics are static mock values (equity/holdings cards not API-backed).
- No trade history page even though `fetchTrades()` service exists.
- No dedicated portfolio overview page that unifies funds, holdings, positions, and P&L trends.

## 8) UX resilience & product-quality gaps
- Most pages have basic loading/error text only; no skeleton states, retry buttons, or structured empty states.
- No optimistic updates or cache strategy for repeated API reads.
- No notification/toast system for action outcomes.
- No accessibility affordances noted (keyboard navigation focus states for trading actions, ARIA labels for icon-only buttons).
- No internationalization/currency toggle despite INR-specific hardcoding across UI.

## 9) Technical/frontend architecture gaps
- API response normalization exists in a few services, but frontend components still assume fixed field names.
- No centralized query state manager (e.g., React Query) for caching/retries/background refresh.
- No environment-driven feature flags for staged rollout of backend-ready features.
- No frontend test coverage visible (unit/integration/e2e).
- README is still starter template and does not document app architecture, routes, or API contracts.

## 10) Suggested implementation order (quick win to deep integration)
1. Auth guard + logout + `/auth/me` bootstrap.
2. Wire topbar/watchlist search and add/remove watchlist actions.
3. Complete order lifecycle (place, list filters, cancel, detail).
4. Funds input/withdraw + transaction history.
5. Build stock detail + history chart page.
6. Add robust loading/error/retry/toast patterns and tests.

