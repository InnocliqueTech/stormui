import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    exact: 'true',
    path: '/auth/reset-password-1',
    element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/app/gateway',
        element: lazy(() => import('./views/gateway'))
      },
      {
        exact: 'true',
        path: '/app/gatewaylist',
        element: lazy(() => import('./views/gateway/GatewayList'))
      },
      {
        exact: 'true',
        path: '/app/client',
        element: lazy(() => import('./views/client'))
      },
      {
        exact: 'true',
        path: '/app/clientlist',
        element: lazy(() => import('./views/client/ClientList'))
      },
      {
        exact: 'true',
        path: '/app/zonelist',
        element: lazy(() => import('./views/client/ZoneList'))
      },
      {
        exact: 'true',
        path: '/app/dmalist',
        element: lazy(() => import('./views/client/DmaList'))
      },
      {
        exact: 'true',
        path: '/app/meterlist',
        element: lazy(() => import('./views/client/MeterList'))
      },
      {
        exact: 'true',
        path: '/app/settings',
        element: lazy(() => import('../views/client/settings'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
