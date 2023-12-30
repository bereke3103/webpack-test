import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LazyAbout } from './pages/allPages/about/About.lazy';
import { ShopIndex } from './pages/allPages/shop';
import { Suspense } from 'react';
const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={'Loading...'}>
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={'Loading...'}>
            <ShopIndex />
          </Suspense>
        ),
      },
    ],
  },
]);

container.render(<RouterProvider router={router} />);
