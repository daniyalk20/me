import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFound() {
    return (
        <div className="not-found">
            <Helmet>
                <title>404 - Page Not Found | Daniyal Khan</title>
            </Helmet>
            <h1>404</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-outline">
                Go Home
            </Link>
        </div>
    );
}

export default NotFound;
