import { Navigate, useRoutes } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { mainRoutes } from './main';
import { suiviRoutes } from './suivi';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    },

    // Dashboard
    ...suiviRoutes,

    // Main
    ...mainRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
