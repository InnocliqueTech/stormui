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
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element />}</Layout>
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
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '/auth/reset-password-1',
    element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        path: '/app/dashboard/location',
        element: lazy(() => import('./views/location/index'))
      },
      {
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard/index'))
      },
      {
        path: '/app/gateway',
        element: lazy(() => import('./views/gateway/GatewayPage'))
      },
      {
        path: '/app/gatewaylist',
        element: lazy(() => import('./views/gateway/GatewayTable'))
      },
      {
        path: '/app/client',
        element: lazy(() => import('./views/client/index'))
      },
      {
        path: '/app/clientlist',
        element: lazy(() => import('./views/client/ZoneList'))
      },
      {
        path: '/app/zonelist',
        element: lazy(() => import('./views/client/ZoneList'))
      },
      {
        path: '/app/dmalist',
        element: lazy(() => import('./views/client/DmaList'))
      },
      {
        path: '/app/gatewaylist',
        element: lazy(() => import('./views/client/GatewayData'))
      },
      {
        path: '/app/meterlist',
        element: lazy(() => import('./views/client/MeterList'))
      },
      {
        path: '/app/setting',
        element: lazy(() => import('./views/client/settings'))
      },
      {
        path: '/app/about',
        element: lazy(() => import('./views/client/aboutus'))
      },
      {
        path: '/app/terms',
        element: lazy(() => import('./views/client/Terms'))
      },
      {
        path: '*',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
