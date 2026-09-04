import React from 'react';
import { GitHub, Launch } from '@mui/icons-material';
import projects from './projects.json';

function ProjectLinks({ project }) {
    return (
        <>
            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <GitHub style={{ fontSize: '1rem' }} /> Code
                </a>
            )}
            {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <Launch style={{ fontSize: '1rem' }} /> Live
                </a>
            )}
        </>
    );
}

function Projects() {
    const [featured, ...rest] = projects;

    if (!featured) {
        return null;
    }

    return (
        <div className="projects-layout">
            <div className="project-featured">
                <div className="project-featured-media">
                    {featured.thumbnail ? (
                        <img src={featured.thumbnail} alt={featured.title} />
                    ) : (
                        <span className="project-featured-media-placeholder">screenshot coming soon</span>
                    )}
                </div>
                <div className="project-featured-body">
                    <span className="project-featured-eyebrow">Featured project</span>
                    <h3 className="project-featured-title">{featured.title}</h3>
                    <p className="project-featured-desc">{featured.description}</p>
                    <div className="project-featured-tech">
                        {featured.tech.map((t, i) => (
                            <span key={i} className="chip">{t}</span>
                        ))}
                    </div>
                    <div className="project-featured-links">
                        <ProjectLinks project={featured} />
                    </div>
                </div>
            </div>

            {rest.length > 0 && (
                <div className="project-list">
                    {rest.map((project, idx) => (
                        <div key={idx} className="project-list-item">
                            <h3 className="project-list-item-title">{project.title}</h3>
                            <p className="project-list-item-desc">{project.description}</p>
                            <div className="project-list-item-tech">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="chip">{t}</span>
                                ))}
                            </div>
                            <div className="project-list-item-links">
                                <ProjectLinks project={project} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Projects;
