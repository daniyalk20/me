import React from 'react';
import cvData from './cv.json';

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr === 'Present') return 'Present';
    const dt = new Date(dateStr);
    if (isNaN(dt.getTime())) return dateStr;
    return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

const formatDateRange = (start, end) =>
    `${formatDate(start)} – ${formatDate(end) || 'Present'}`;

const skillLabels = {
    programming: 'Programming Languages',
    frameworks: 'Frameworks & Libraries',
    web: 'Web & API Development',
    databases: 'Databases',
    cloud: 'Cloud & Tools',
    systems: 'Software & Systems',
    languages: 'Languages',
};

function CV() {
    const { fname, lname, contact, links, summary, experience, education, skills, publications } = cvData;

    return (
        <div className="cv-section">
            {/* Resume Header */}
            <header className="cv-header">
                <h1 className="cv-name"><strong>{fname}</strong> {lname}</h1>
                <div className="cv-contact-bar">
                    <span><a href={`mailto:${contact.email}`}>Email: {contact.email}</a></span>
                    <span><a href={links.github} target="_blank" rel="noopener noreferrer">GitHub: /daniyalk20</a></span>
                    <span><a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn: /daniyalk20</a></span>
                    <span><a href={`tel:${contact.phone}`}>Contact: {contact.phone}</a></span>
                </div>
                <a
                    href={links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline cv-download-btn"
                >
                    Download Resume (PDF)
                </a>
            </header>

            {/* Summary */}
            <div className="cv-block">
                <h2 className="cv-block-title">Summary</h2>
                <p className="cv-summary">{summary}</p>
            </div>

            {/* Experience */}
            <div className="cv-block">
                <h2 className="cv-block-title">Experience</h2>
                {experience.map((exp, idx) => (
                    <div key={idx} className="cv-item">
                        <div className="cv-item-header">
                            <div className="cv-item-row">
                                <span className="cv-item-company">{exp.company} | {exp.location}</span>
                            </div>
                            <div className="cv-item-row">
                                <span className="cv-item-title">{exp.title}</span>
                                <span className="cv-item-date">{formatDateRange(exp.start_date, exp.end_date)}</span>
                            </div>
                            {exp.school_or_center && (
                                <span className="cv-item-school">{exp.school_or_center}</span>
                            )}
                        </div>
                        {exp.highlights && (
                            <ul className="cv-item-highlights">
                                {exp.highlights.map((h, i) => (
                                    <li key={i}>{h}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            {/* Skills */}
            <div className="cv-block">
                <h2 className="cv-block-title">Skills</h2>
                <div className="cv-skills-table">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className="cv-skill-row">
                            <span className="cv-skill-label">{skillLabels[category] || category}:</span>
                            <span className="cv-skill-value">{items.join(', ')}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div className="cv-block">
                <h2 className="cv-block-title">Education</h2>
                {education.map((edu, idx) => (
                    <div key={idx} className="cv-item">
                        <div className="cv-item-header">
                            <div className="cv-item-row">
                                <span className="cv-item-company">{edu.institution} | {edu.location}</span>
                            </div>
                            {edu.school && (
                                <span className="cv-item-school">{edu.school}</span>
                            )}
                            <div className="cv-item-row">
                                <span className="cv-item-degree">{edu.degree}</span>
                                <span className="cv-item-date">
                                    {formatDateRange(edu.start_date, edu.end_date)}
                                </span>
                            </div>
                            {edu.gpa && (
                                <span className="cv-item-gpa">CGPA: {edu.gpa}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Publications */}
            <div className="cv-block">
                <h2 className="cv-block-title">Publications</h2>
                <ul className="cv-publications">
                    {publications.map((pub, idx) => (
                        <li key={idx}>
                            <em>{pub.title}</em>, {pub.venue}, {formatDate(pub.date)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CV;
