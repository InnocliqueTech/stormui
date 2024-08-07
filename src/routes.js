// import React, { Suspense, Fragment, lazy } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import Loader from './components/Loader/Loader';
// import AdminLayout from './layouts/AdminLayout';


// import { BASE_URL } from './config/constant';
// import AuthGuard from './views/auth/AuthGuard';

// export const renderRoutes = (routes = []) => (
//   <Suspense fallback={<Loader />}>
//     <Routes>
//       {routes.map((route, i) => {
//         const Guard = route.guard || Fragment;
//         const Layout = route.layout || Fragment;
//         const Element = route.element;

//         return (
//           <Route
//             key={i}
//             path={route.path}
//             element={
//               <Guard>
//                 <Layout>{route.routes ? renderRoutes(route.routes) : <Element />}</Layout>
//               </Guard>
//             }
//           />
//         );
//       })}
//     </Routes>
//   </Suspense>
// );

// const routes = [
//   {
//     path: '/login',
//     element: lazy(() => import('./views/auth/signin/SignIn1'))
//   },
//   {
//     path: '/auth/signin-1',
//     element: lazy(() => import('./views/auth/signin/SignIn1'))
//   },
//   {
//     path: '/auth/signup-1',
//     element: lazy(() => import('./views/auth/signup/SignUp1'))
//   },
//   {
//     path: '/auth/reset-password-1',
//     element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
//   },
//   {
//     path: '*',
//     layout: AdminLayout,
//     routes: [
//       {
//         path: '/app/dashboard/location',
//         element: lazy(() => import('./views/location/index'))
//       },
//       {
//         path: '/app/dashboard/default',
//         element: lazy(() => import('./views/dashboard/index'))
//       },
//       {
//         path: '/app/gateway',
//         element: lazy(() => import('./views/gateway/GatewayPage'))
//       },
//       {
//         path: '/app/gatewaylist',
//         element: lazy(() => import('./views/gateway/GatewayTable'))
//       },
//       {
//         path: '/app/client',
//         element: lazy(() => import('./views/client/index'))
//       },
//       {
//         path: '/app/clientlist',
//         element: lazy(() => import('./views/client/ZoneList'))
//       },
//       {
//         path: '/app/zonelist',
//         element: lazy(() => import('./views/client/ZoneList'))
//       },
//       {
//         path: '/app/dmalist',
//         element: lazy(() => import('./views/client/DmaList'))
//       },
//       {
//         path: '/app/gatewaylist',
//         element: lazy(() => import('./views/client/GatewayData'))
//       },
//       {
//         path: '/app/meterlist',
//         element: lazy(() => import('./views/client/MeterList'))
//       },
//       {
//         path: '/app/setting',
//         element: lazy(() => import('./views/client/settings'))
//       },
//       {
//         path: '/app/about',
//         element: lazy(() => import('./views/client/aboutus'))
//       },
//       {
//         path: '/app/terms',
//         element: lazy(() => import('./views/client/Terms'))
//       },
//       {
//         path: '*',
//         element: () => <Navigate to={BASE_URL} />
//       }
//     ]
//   }
// ];

// export default routes;
import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import { BASE_URL } from './config/constant';
import AuthGuard from './views/auth/AuthGuard';

// Lazy load components
const SignIn1 = lazy(() => import('./views/auth/signin/SignIn1'));
const LocationComponent = lazy(() => import('./views/location/index'));
const DefaultComponent = lazy(() => import('./views/dashboard/index'));
const GatewayComponent = lazy(() => import('./views/gateway/GatewayPage'));
const GatewayListComponent = lazy(() => import('./views/gateway/GatewayTable'));
const ClientComponent = lazy(() => import('./views/client/index'));
const ClientListComponent = lazy(() => import('./views/client/ZoneList'));
const ZoneListComponent = lazy(() => import('./views/client/ZoneList'));
const DmaListComponent = lazy(() => import('./views/client/DmaList'));
const GatewayDataComponent = lazy(() => import('./views/client/GatewayData'));
const MeterListComponent = lazy(() => import('./views/client/MeterList'));
const SettingsComponent = lazy(() => import('./views/client/settings'));
const AboutComponent = lazy(() => import('./views/client/aboutus'));
const TermsComponent = lazy(() => import('./views/client/Terms'));

// Function to render routes
export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment; // Default to Fragment if no guard
        const Layout = route.layout || Fragment;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : route.element}
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

// Define routes
const routes = [
  {
    path: '/login',
    element: <Suspense fallback={<Loader />}><SignIn1 /></Suspense> // Ensure you import SignIn1
  },
  // {
  //   path: '/login',
  //   element: lazy(() => import('./views/auth/signin/SignIn1'))
  // },
  // {
  //   path: '/auth/signin-1',
  //   element: <Suspense fallback={<Loader />}><SignIn1 /></Suspense> // Ensure you import SignIn1
  // },
  // {
  //   path: '/auth/signup-1',
  //   element: <Suspense fallback={<Loader />}><SignUp1 /></Suspense> // Ensure you import SignUp1
  // },
  // {
  //   path: '/auth/reset-password-1',
  //   element: <Suspense fallback={<Loader />}><ResetPassword1 /></Suspense> // Ensure you import ResetPassword1
  // },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        path: '/app/dashboard/location',
        element: <AuthGuard><Suspense fallback={<Loader />}><LocationComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/dashboard/default',
        element: <AuthGuard><Suspense fallback={<Loader />}><DefaultComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/gateway',
        element: <AuthGuard><Suspense fallback={<Loader />}><GatewayComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/gatewaylist',
        element: <AuthGuard><Suspense fallback={<Loader />}><GatewayListComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/client',
        element: <AuthGuard><Suspense fallback={<Loader />}><ClientComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/clientlist',
        element: <AuthGuard><Suspense fallback={<Loader />}><ClientListComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/zonelist',
        element: <AuthGuard><Suspense fallback={<Loader />}><ZoneListComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/dmalist',
        element: <AuthGuard><Suspense fallback={<Loader />}><DmaListComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/gatewaylist',
        element: <AuthGuard><Suspense fallback={<Loader />}><GatewayDataComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/meterlist',
        element: <AuthGuard><Suspense fallback={<Loader />}><MeterListComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/setting',
        element: <AuthGuard><Suspense fallback={<Loader />}><SettingsComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/about',
        element: <AuthGuard><Suspense fallback={<Loader />}><AboutComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '/app/terms',
        element: <AuthGuard><Suspense fallback={<Loader />}><TermsComponent /></Suspense></AuthGuard> // Protected route
      },
      {
        path: '*',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;

