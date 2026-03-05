import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // adjust path as needed
import Portfolio from '../pages/Portfolio'; // adjust path as needed
import Welcome from '../pages/Welcome'; // adjust path as needed
import Contact from '../pages/Contact'; // adjust path as needed
import AboutProject from '../pages/AboutProject';
// import other pages/components

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true, // This makes Welcome show up by default at "/"
                element: <Welcome />,
            },
            {
                path: 'welcome',
                element: <Welcome />,
            },
            {
                path: 'portfolio',
                element: <Portfolio />,
            },
            {
                path: 'portfolio/:projectId', 
                element: <AboutProject />,
            },
            {
                path: 'contact',
                element: <Contact />,
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