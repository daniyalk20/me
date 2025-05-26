import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import Typography from '@mui/material/Typography';

export default function CV() {
  return (
    <div className='CV'>
      <Timeline position="alternate" >
        {/* Personal Information Section Heading */}
        {/* Education Section Heading */}
        <TimelineItem>
          <TimelineOppositeContent />
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h4" component="span">
              Education
            </Typography>
          </TimelineContent>
        </TimelineItem>

        {/* Education Section */}
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="white"
          >
            2015 - 2019
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Bachelor of Science in Computer Science
            </Typography>
            <Typography>XYZ University</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            2013 - 2015
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              High School Diploma
            </Typography>
            <Typography>ABC High School</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            2020 - 2022
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Master of Science in Data Science
            </Typography>
            <Typography>DEF University</Typography>
          </TimelineContent>
        </TimelineItem>

        {/* Work Experience Section Heading */}
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ py: '12px', px: 2 }}
            align="right"
          >
            <Typography variant="h4" component="span">
              Work Experience
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent />
        </TimelineItem>

        {/* Work Experience Section */}
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.secondary"
          >
            2019 - 2021
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Software Engineer
            </Typography>
            <Typography>ABC Tech Solutions</Typography>
            <Typography variant="body2">
              - Developed and maintained web applications using React and Node.js.
              - Collaborated with cross-functional teams to deliver high-quality software.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.secondary"
          >
            2021 - 2023
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Data Analyst
            </Typography>
            <Typography>GHI Analytics</Typography>
            <Typography variant="body2">
              - Analyzed large datasets to extract actionable insights.
              - Created dashboards and reports using Tableau and Power BI.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.secondary"
          >
            2023 - Present
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Senior Software Developer
            </Typography>
            <Typography>JKL Innovations</Typography>
            <Typography variant="body2">
              - Leading a team of developers to build scalable web applications.
              - Implementing best practices for code quality and performance optimization.
            </Typography>
          </TimelineContent>
        </TimelineItem>

        {/* Skills Section Heading */}
        <TimelineItem>
          <TimelineOppositeContent />
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h4" component="span">
              Skills
            </Typography>
          </TimelineContent>
        </TimelineItem>

        {/* Skills Section */}
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            Skills
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <BuildIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Programming Languages
            </Typography>
            <Typography>JavaScript, Python, Java</Typography>
          </TimelineContent>
        </TimelineItem>

        {/* Projects Section Heading */}
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ py: '12px', px: 2 }}
            align="right"
          >
            <Typography variant="h4" component="span">
              Projects
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent />
        </TimelineItem>

        {/* Projects Section */}
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.secondary"
          >
            2021 - Present
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              <CodeIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Portfolio Website
            </Typography>
            <Typography>Designed and developed a personal portfolio website using React and Material-UI.</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
