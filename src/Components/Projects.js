import React from 'react';
import { GitHub, Launch } from '@mui/icons-material';
import projects from './projects.json';

function Projects() {
    return (
        <div className="projects-grid">
            {projects.map((project, idx) => (
                <div key={idx} className="project-card">
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-description">{project.description}</p>
                    <div className="project-card-tech">
                        {project.tech.map((t, i) => (
                            <span key={i} className="chip">{t}</span>
                        ))}
                    </div>
                    <div className="project-card-links">
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Projects;
