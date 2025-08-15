import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// Hook to manage SEO meta data
export const useSEO = (title, description, keywords = '', url = '') => {
  const siteName = 'Daniyal Khan - Portfolio';
  const siteUrl = 'https://daniyalk20.github.io/me';
  
  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title ? `${title} | ${siteName}` : siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | ${siteName}` : siteName} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />
    </Helmet>
  );
};

// Predefined SEO data for different routes
export const seoData = {
  home: {
    title: 'Home',
    description: 'Welcome to Daniyal Khan\'s portfolio. I\'m a software developer passionate about creating innovative solutions and sharing technical knowledge.',
    keywords: 'Daniyal Khan, software developer, portfolio, web development, programming',
    url: '/'
  },
  about: {
    title: 'About Me',
    description: 'Learn more about Daniyal Khan - my background, skills, experience, and journey as a software developer.',
    keywords: 'about, biography, skills, experience, software developer',
    url: '/#about'
  },
  projects: {
    title: 'Projects',
    description: 'Explore my latest software projects and development work. See what I\'ve been building and the technologies I\'ve been working with.',
    keywords: 'projects, software development, programming, applications, portfolio',
    url: '/#projects'
  },
  writings: {
    title: 'Technical Writings',
    description: 'Read my technical blog posts and articles about software development, programming concepts, and technology insights.',
    keywords: 'blog, technical writing, programming articles, software development',
    url: '/#writings'
  },
  gallery: {
    title: 'Gallery',
    description: 'Visual showcase of my work, projects, and creative endeavors.',
    keywords: 'gallery, showcase, visual portfolio, creative work',
    url: '/#gallery'
  },
  notFound: {
    title: '404 - Page Not Found',
    description: 'Sorry, the page you are looking for could not be found. Please check the URL or navigate back to the homepage.',
    keywords: '404, page not found, error',
    url: '/404'
  }
};
