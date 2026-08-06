import { Navigate, Route, Routes } from 'react-router-dom';
// MODULE_BLOG_IMPORTS_START
// MODULE_BLOG_IMPORTS_END

const BlogRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="/" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default BlogRoutes;
