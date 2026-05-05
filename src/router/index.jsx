import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // adjust path as needed
// import other pages/components

const Portfolio = lazy(() => import('../pages/Portfolio'));
const Welcome = lazy(() => import('../pages/Welcome'));
const Contact = lazy(() => import('../pages/Contact'));
const AboutProject = lazy(() => import('../pages/AboutProject'));
const ImmersiveSakuPilot = lazy(() => import('../pages/ImmersiveSakuPilot'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true, // This makes Welcome show up by default at "/"
                element: <Suspense fallback={null}><Welcome /></Suspense>,
            },
            {
                path: 'welcome',
                element: <Suspense fallback={null}><Welcome /></Suspense>,
            },
            {
                path: 'portfolio',
                element: <Suspense fallback={null}><Portfolio /></Suspense>,
            },
            {
                path: 'portfolio/:projectId', 
                element: <Suspense fallback={null}><AboutProject /></Suspense>,
            },
            {
                path: 'contact',
                element: <Suspense fallback={null}><Contact /></Suspense>,
            },
            {
                path: 'sakupilot',
                element: <Suspense fallback={null}><ImmersiveSakuPilot /></Suspense>,
            },
            {
                path: '*',
                element: <div className="p-10 text-center">Page Not Found</div>
            }
        ]
        // children routes if needed
    },
    // add more routes
]);

export default router;
