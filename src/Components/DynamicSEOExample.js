import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// Example component showing how to update meta tags dynamically
const DynamicSEOExample = () => {
  const location = useLocation();
  const path = location.pathname;

  // Define meta content based on current route
  const getMetaContent = () => {
    switch (path) {
      case '/':
        return {
          title: 'Home - Daniyal Khan Portfolio',
          description: 'Welcome to my portfolio showcasing my software development projects and technical writings.',
          keywords: 'portfolio, software developer, web development'
        };
      case '/about':
        return {
          title: 'About Me - Daniyal Khan',
          description: 'Learn about my background, skills, and experience in software development.',
          keywords: 'about, biography, software developer, skills'
        };
      default:
        return {
          title: 'Daniyal Khan - Portfolio',
          description: 'Software developer portfolio and technical blog.',
          keywords: 'software developer, portfolio'
        };
    }
  };

  const meta = getMetaContent();

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={`https://daniyalk20.github.io/me${path}`} />
    </Helmet>
  );
};

export default DynamicSEOExample;
