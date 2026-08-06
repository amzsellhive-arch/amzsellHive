# Fix TypeScript Build Errors

## Steps
- [x] 1. Fix `src/components/ui/toast.tsx` — add proper React `forwardRef` generic types and export `ToastProps` / `ToastActionElement` types (preserving all JSX/className design).
- [x] 2. Fix `src/blog-routes.tsx` — remove imports of non-existent `./pages/blog/*` files.
- [x] 3. Fix `tsconfig.node.json` — change include to `vite.config.js` and add `allowJs`.
- [x] 4. Re-run `npx tsc -b` to verify build passes.
