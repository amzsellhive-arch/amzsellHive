# Fix frontend proxy errors (ECONNREFUSED)

Goal: Eliminate failing SDK calls that cause Vite proxy errors without changing the frontend design.

1. [ ] ResultsGrid.jsx - Remove `createClient()` call, use fallback data directly
2. [ ] Testimonials.jsx - Remove `createClient()` call, use fallback data directly
3. [ ] FAQ.jsx - Remove `createClient()` call, use fallback data directly
4. [ ] Verify no design output changed
