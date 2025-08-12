import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Card,
  CardContent,
  Link as MUILink,
  Stack,
  Divider,
  Grid,
  Fade,
  Slide,
  useTheme,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import {
  School as SchoolIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Build as BuildIcon,
  Person as PersonIcon,
  Article as ArticleIcon,
  CalendarToday as CalendarTodayIcon,
  Grade as GradeIcon,
  Business as BusinessIcon,
  Memory as MemoryIcon,
  Terminal as TerminalIcon,
  Storage as StorageIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon,
  BugReport as BugReportIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";
import cvData from "./cv.json";
import "./cv.css";

/* ---------- Theme tokens ---------- */
const PRIMARY = "#FFC000";
const SECONDARY = "#F5F5F5";
const TEXT_LIGHT = "#E0E0E0";
const TEXT_MUTED = "#B0B0B0";

const safeDate = (d) => (d && d !== "Present" ? new Date(d) : null);
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  if (dateStr === "Present") return "Present";
  const dt = safeDate(dateStr);
  if (!dt || isNaN(dt.getTime())) return dateStr;
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};
const formatDateRange = (start, end) =>
  [formatDate(start), formatDate(end) || "Present"].filter(Boolean).join(" – ");

const extractTechnologies = (highlights = []) => {
  const patterns = [
    "React(\\.js)?","Django","Vue(\\.js)?","TensorFlow","PyTorch","LangChain",
    "Python","JavaScript","TypeScript","C\\+\\+","Java\\b","C#","\\.NET( Core)?",
    "Spring Boot","MySQL","PostgreSQL","REST(ful)? API","AWS","Azure","GCP",
    "HTML","CSS","JIRA","Tableau","Power BI","Docker","Kubernetes","GraphQL",
    "Kafka","Redis","MongoDB","CI/CD","Terraform"
  ];
  const rx = new RegExp(`\\b(${patterns.join("|")})\\b`, "gi");
  const found = new Set();
  highlights.join(" ").replace(rx, (m) => found.add(m.replace(/\s+/g, " ").trim()));
  return Array.from(found);
};

const sections = [
  { id: "about", label: "About", icon: PersonIcon },
  { id: "experience", label: "Experience", icon: WorkIcon },
  { id: "projects", label: "Projects", icon: CodeIcon },
  { id: "skills", label: "Skills", icon: BuildIcon },
  { id: "education", label: "Education", icon: SchoolIcon },
  { id: "publications", label: "Publications", icon: ArticleIcon },
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`cv-tabpanel-${index}`} aria-labelledby={`cv-tab-${index}`} {...other}>
      {value === index && (
        <Fade in={value === index} timeout={250}>
          <div>
            <Slide in={value === index} direction="up" timeout={300}>
              <div>{children}</div>
            </Slide>
          </div>
        </Fade>
      )}
    </div>
  );
}

/* ---------- Reusable UI bits ---------- */
const SectionTitle = ({ icon: Icon, children }) => (
  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
    {Icon ? <Icon sx={{ color: PRIMARY }} /> : null}
    <Typography variant="h5" sx={{ color: PRIMARY, fontWeight: 800 }}>{children}</Typography>
  </Stack>
);

const cardSx = {
  borderRadius: "1rem",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 2px 14px rgba(0,0,0,0.18)",
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  color: TEXT_LIGHT,
};

const TimelineDot = () => (
  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: PRIMARY, boxShadow: "0 0 0 3px rgba(255,192,0,0.25)" }} />
);

/* ---------- Main CV ---------- */
export default function CV() {
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);

  // Data shaping
  const personal = {
    name: cvData?.name ?? "Daniyal Khan",
    role: cvData?.role ?? "Software Engineer",
    summary: cvData?.summary ?? "",
    contact: {
      email: cvData?.contact?.email,
      phone: cvData?.contact?.phone,
      location: cvData?.contact?.location,
      github: cvData?.links?.github,
      linkedin: cvData?.links?.linkedin,
    },
  };

  const education = (cvData?.education || []).map((e) => ({
    degree: e?.degree,
    institution: e?.institution,
    location: e?.location,
    period: formatDateRange(e?.start_date, e?.end_date),
    gpa: e?.gpa,
    focus: e?.focus,
    school: e?.school,
  }));

  const experience = (cvData?.experience || []).map((x) => ({
    position: x?.title,
    company: x?.company,
    location: x?.location,
    period: formatDateRange(x?.start_date, x?.end_date),
    highlights: x?.highlights || [],
    technologies: extractTechnologies(x?.highlights || []),
  }));

  const skills = {
    "Programming Languages": cvData?.skills?.programming || [],
    "Web Technologies": cvData?.skills?.web || [],
    "Frameworks & Libraries": cvData?.skills?.frameworks || [],
    Databases: cvData?.skills?.databases || [],
    "Cloud Platforms": cvData?.skills?.cloud || [],
    Languages: cvData?.skills?.languages || [],
  };

  const projects = (cvData?.projects || []).map((p) => ({
    name: p?.name,
    role: p?.role,
    period: p?.period || p?.date || "",
    highlights: p?.highlights || [],
    technologies: p?.tech || [],
    link: p?.link,
  }));

  const publications = (cvData?.publications || []).map((p) => ({
    title: p?.title,
    venue: p?.venue,
    date: formatDate(p?.date),
  }));

  // Build a quick top-technology ribbon for About (first 10 unique tokens)
  const topTech = Array.from(
    new Set([
      ...Object.values(skills).flat(),
      ...experience.flatMap((e) => e.technologies),
    ])
  ).slice(0, 10);

  return (
    <Box className="cv-with-bg" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", py: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Tabs */}
        <Box className="cv-tabs-wrap cv-hide-in-print" sx={{ mb: 2 }}>
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            variant="fullWidth"
            aria-label="CV sections"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                borderRadius: "1rem",
                mx: 0.5,
                px: 2.25,
                py: 1.25,
                minHeight: "auto",
                fontWeight: 700,
                letterSpacing: 0.2,
                color: TEXT_LIGHT,
                border: `1px solid rgba(255,255,255,0.22)`,
                transition: "all .2s ease",
                "&:hover": { transform: "translateY(-1px)", backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.35)", color: SECONDARY },
                "&.Mui-selected": { color: "#111", backgroundColor: PRIMARY, borderColor: PRIMARY },
              },
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTabs-flexContainer": { gap: 1, justifyContent: "space-between" },
            }}
          >
            {sections.map((s, idx) => (
              <Tab key={s.id} id={`cv-tab-${idx}`} aria-controls={`cv-tabpanel-${idx}`} icon={<s.icon />} iconPosition="start" label={s.label} />
            ))}
          </Tabs>
        </Box>

        {/* Content */}
        <Grid container spacing={2} sx={{ flex: 1 }}>
          <Grid item xs={12}>
            {/* ABOUT */}
            <TabPanel value={tab} index={0}>
              {/* Hero */}
              <Box sx={{ background: 'linear-gradient(135deg, rgba(255,192,0,0.1) 0%, rgba(0,255,255,0.05) 100%)', border: '2px solid rgba(255,192,0,0.3)', borderRadius: '2rem', p: 4, mb: 3, position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, transparent, transparent 98px, rgba(255,192,0,0.05) 100px)', pointerEvents: 'none' } }}>
                <Box sx={{ position: 'absolute', top: 15, right: 25, fontFamily: '"Iceland", monospace', fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: 'rgba(255,192,0,0.3)', letterSpacing: '2px', userSelect: 'none' }}>01001000 01100101 01101100 01101100 01101111</Box>
                <Typography variant="h2" sx={{ fontFamily: '"Iceland", monospace', fontWeight: 800, mb: 1.5, color: PRIMARY, textShadow: '0 0 10px rgba(255,192,0,0.5)', letterSpacing: '1px', fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' } }}>{personal.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CodeIcon sx={{ color: PRIMARY, mr: 1.5, fontSize: '1.8rem' }} />
                  <Typography variant="h4" sx={{ fontFamily: '"Iceland", monospace', color: SECONDARY, letterSpacing: '0.5px', fontWeight: 600, fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}>{personal.role}</Typography>
                </Box>
                {personal.summary && (
                  <Box sx={{ background: 'rgba(0,0,0,0.3)', borderLeft: '4px solid ' + PRIMARY, p: 3, borderRadius: '0.5rem', fontFamily: '"Iceland", sans-serif' }}>
                    <Typography variant="h6" sx={{ lineHeight: 1.8, color: TEXT_LIGHT, fontSize: { xs: '1.05rem', sm: '1.2rem', md: '1.3rem' }, fontFamily: '"Iceland", sans-serif', fontWeight: 400 }}>{personal.summary}</Typography>
                  </Box>
                )}

                {/* Quick tech ribbon */}
                {topTech.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
                    {topTech.map((t, i) => (
                      <Chip key={i} icon={<MemoryIcon sx={{ color: "#111" }} />} label={t} size="small" sx={{ bgcolor: PRIMARY, color: "#111", fontWeight: 700 }} />
                    ))}
                  </Stack>
                )}

                {/* Circuit pattern */}
                <Box sx={{ position: 'absolute', bottom: 10, left: 20, width: '100px', height: '20px', background: `linear-gradient(90deg, ${PRIMARY} 2px, transparent 2px), linear-gradient(0deg, ${PRIMARY} 2px, transparent 2px)`, backgroundSize: '10px 10px', opacity: 0.2 }} />
              </Box>

              {/* Terminal-style Contact */}
              <Box
  sx={{
    background: 'linear-gradient(145deg, rgba(0,20,0,0.95), rgba(0,35,0,0.85))',
    border: `1px solid ${PRIMARY}`,
    borderRadius: '1rem',
    p: 3,
    mb: 2,
    boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
    fontFamily: '"Iceland", monospace',
  }}
>
  {/* Header with “terminal” feel */}
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
    {['#ff5f57', '#ffbd2e', '#28ca42'].map((c, i) => (
      <Box key={i} sx={{ width: 12, height: 12, borderRadius: '50%', background: c, mr: 0.5 }} />
    ))}
    <Typography
      variant="body1"
      sx={{
        color: PRIMARY,
        ml: 1,
        fontSize: { xs: '1rem', sm: '1.15rem' },
        letterSpacing: '0.5px',
      }}
    >
      ~/contact
    </Typography>
  </Box>

  {/* Contact Actions */}
  <Stack spacing={1.2} direction={{ xs: 'column', sm: 'row' }} justifyContent="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
    {personal.contact.location && (
      <Chip
        icon={<LocationOnIcon />}
        label={personal.contact.location}
        component="div"
        sx={{
          bgcolor: 'rgba(255,255,255,0.05)',
          color: PRIMARY,
          fontWeight: 600,
          borderRadius: '2rem',
        }}
      />
    )}
    {personal.contact.email && (
      <Button
        variant="contained"
        startIcon={<EmailIcon />}
        href={`mailto:${personal.contact.email}`}
        sx={{
          bgcolor: PRIMARY,
          color: '#111',
          fontWeight: 700,
          textTransform: 'none',
          borderRadius: '2rem',
          '&:hover': { bgcolor: '#ffd84d' },
        }}
      >
        {personal.contact.email}
      </Button>
    )}
    {personal.contact.phone && (
      <Button
        variant="contained"
        startIcon={<PhoneIcon />}
        href={`tel:${personal.contact.phone}`}
        sx={{
          bgcolor: PRIMARY,
          color: '#111',
          fontWeight: 700,
          textTransform: 'none',
          borderRadius: '2rem',
          '&:hover': { bgcolor: '#ffd84d' },
        }}
      >
        {personal.contact.phone}
      </Button>
    )}
    {personal.contact.github && (
      <Button
        variant="outlined"
        startIcon={<GitHubIcon />}
        href={personal.contact.github}
        target="_blank"
        rel="noopener"
        sx={{
          borderColor: PRIMARY,
          color: PRIMARY,
          fontWeight: 700,
          textTransform: 'none',
          borderRadius: '2rem',
          '&:hover': { borderColor: '#ffd84d', color: '#ffd84d' },
        }}
      >
        {personal.contact.github.replace('https://github.com/', '')}
      </Button>
    )}
    {personal.contact.linkedin && (
      <Button
        variant="outlined"
        startIcon={<LinkedInIcon />}
        href={personal.contact.linkedin}
        target="_blank"
        rel="noopener"
        sx={{
          borderColor: PRIMARY,
          color: PRIMARY,
          fontWeight: 700,
          textTransform: 'none',
          borderRadius: '2rem',
          '&:hover': { borderColor: '#ffd84d', color: '#ffd84d' },
        }}
      >
        LinkedIn Profile
      </Button>
    )}
  </Stack>
</Box>

            </TabPanel>

            {/* EXPERIENCE (timeline style) */}
            <TabPanel value={tab} index={1}>
              <SectionTitle icon={WorkIcon}>Experience</SectionTitle>
              <Box sx={{ position: 'relative', ml: { xs: 0, sm: 1 } }}>
                <Box aria-hidden sx={{ position: 'absolute', top: 6, bottom: 6, left: 10, width: 2, bgcolor: 'rgba(255,255,255,0.12)' }} />
                <Stack spacing={2}>
                  {experience.map((e, i) => (
                    <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                      <Box sx={{ pt: 1.25 }}><TimelineDot /></Box>
                      <Card sx={{ ...cardSx, flex: 1, borderLeft: `3px solid ${PRIMARY}` }}>
                        <CardContent>
                          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={0.5} sx={{ mb: 0.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: SECONDARY }}>{e.position}</Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <CalendarTodayIcon fontSize="small" sx={{ color: TEXT_MUTED }} />
                              <Typography variant="body2" sx={{ color: TEXT_MUTED }}>{e.period}</Typography>
                            </Stack>
                          </Stack>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <BusinessIcon fontSize="small" sx={{ color: TEXT_LIGHT }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_LIGHT }}>{e.company}</Typography>
                            {e.location && (<><Typography variant="body2" sx={{ color: TEXT_MUTED }}>•</Typography><Typography variant="body2" sx={{ color: TEXT_MUTED }}>{e.location}</Typography></>)}
                          </Stack>
                          {e.highlights.length > 0 && (
                            <Box component="ul" className="cv-bullets" sx={{ pl: 2, mb: 1.5 }}>
                              {e.highlights.map((h, idx) => (
                                <Typography key={idx} component="li" variant="body2" sx={{ mb: 0.5, color: TEXT_LIGHT }}>{h}</Typography>
                              ))}
                            </Box>
                          )}
                          {e.technologies.length > 0 && (
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                              {e.technologies.map((t, idx) => (
                                <Chip key={idx} label={t} size="small" sx={{ bgcolor: "rgba(255,255,255,0.12)", color: TEXT_LIGHT }} />
                              ))}
                            </Stack>
                          )}
                        </CardContent>
                      </Card>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </TabPanel>

            {/* PROJECTS */}
            <TabPanel value={tab} index={2}>
              <SectionTitle icon={CodeIcon}>Projects</SectionTitle>
              <Stack spacing={2}>
                {projects.map((p, i) => (
                  <Card key={i} sx={{ ...cardSx, background: "rgba(255,255,255,0.05)" }}>
                    <CardContent>
                      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={0.5} sx={{ mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: SECONDARY }}>{p.name}</Typography>
                        {(p.period || p.role) && (
                          <Typography variant="body2" sx={{ color: TEXT_MUTED }}>{[p.role, p.period].filter(Boolean).join(" • ")}</Typography>
                        )}
                      </Stack>
                      {p.highlights.length > 0 && (
                        <Box component="ul" className="cv-bullets" sx={{ pl: 2, mb: 1.5 }}>
                          {p.highlights.map((h, idx) => (
                            <Typography key={idx} component="li" variant="body2" sx={{ mb: 0.5, color: TEXT_LIGHT }}>{h}</Typography>
                          ))}
                        </Box>
                      )}
                      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                        {p.technologies.map((t, idx) => (
                          <Chip key={idx} label={t} size="small" variant="outlined" sx={{ borderColor: PRIMARY, color: TEXT_LIGHT }} />
                        ))}
                      </Stack>
                      {p.link && (
                        <Tooltip title="Open project">
                          <IconButton size="small" component={MUILink} href={p.link} target="_blank" rel="noopener" sx={{ color: PRIMARY }}>
                            <TerminalIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </TabPanel>

            {/* SKILLS */}
            <TabPanel value={tab} index={3}>
              <SectionTitle icon={BuildIcon}>Skills</SectionTitle>
              <Grid container spacing={2}>
                {Object.entries(skills).filter(([, arr]) => arr.length).map(([cat, arr]) => (
                  <Grid item xs={12} sm={6} key={cat}>
                    <Card sx={{ ...cardSx, background: "rgba(255,255,255,0.05)" }}>
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, color: SECONDARY }}>{cat}</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {arr.map((s, i) => (
                            <Chip key={i} label={s} size="small" className="cv-chip cv-chip--outline" sx={{ borderColor: PRIMARY, color: TEXT_LIGHT }} />
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* EDUCATION */}
            <TabPanel value={tab} index={4}>
              <SectionTitle icon={SchoolIcon}>Education</SectionTitle>
              <Stack spacing={2}>
                {education.map((e, i) => (
                  <Card key={i} sx={{ ...cardSx, background: "rgba(255,255,255,0.05)" }}>
                    <CardContent>
                      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={0.5} sx={{ mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: SECONDARY }}>{e.degree}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CalendarTodayIcon fontSize="small" sx={{ color: TEXT_MUTED }} />
                          <Typography variant="body2" sx={{ color: TEXT_MUTED }}>{e.period}</Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <SchoolIcon fontSize="small" sx={{ color: TEXT_LIGHT }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_LIGHT }}>{e.institution}</Typography>
                        {e.location && (<><Typography variant="body2" sx={{ color: TEXT_MUTED }}>•</Typography><Typography variant="body2" sx={{ color: TEXT_MUTED }}>{e.location}</Typography></>)}
                      </Stack>
                      {(e.gpa || e.focus || e.school) && (
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {e.focus && <Chip label={`Focus: ${e.focus}`} size="small" sx={{ bgcolor: "rgba(255,255,255,0.12)", color: TEXT_LIGHT }} />}
                          {e.school && <Chip label={e.school} size="small" variant="outlined" sx={{ borderColor: PRIMARY, color: TEXT_LIGHT }} />}
                          {e.gpa && (
                            <Chip icon={<GradeIcon sx={{ color: TEXT_LIGHT }} />} label={`GPA: ${e.gpa}`} size="small" variant="outlined" sx={{ borderColor: PRIMARY, color: TEXT_LIGHT }} />
                          )}
                        </Stack>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </TabPanel>

            {/* PUBLICATIONS */}
            <TabPanel value={tab} index={5}>
              <SectionTitle icon={ArticleIcon}>Publications</SectionTitle>
              <Card sx={{ ...cardSx, background: "rgba(255,255,255,0.05)" }}>
                <CardContent>
                  <Stack spacing={1.25}>
                    {publications.map((p, i) => (
                      <Stack key={i} spacing={0.25}>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: SECONDARY }}>{p.title}</Typography>
                        <Typography variant="body2" sx={{ color: TEXT_MUTED }}>{[p.venue, p.date].filter(Boolean).join(" • ")}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </TabPanel>
          </Grid>
        </Grid>

        {/* Print-only sequential content */}
        <Box className="cv-show-in-print" sx={{ display: "none", mt: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>{personal.name} — {personal.role}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>About</Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>{personal.summary || "Results-driven engineer focused on impact."}</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>{[personal.contact.email, personal.contact.phone, personal.contact.location].filter(Boolean).join(" • ")}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Experience</Typography>
          {experience.map((e, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{e.position} — {e.company}</Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>{e.period} {e.location ? `• ${e.location}` : ""}</Typography>
              {e.highlights.length > 0 && (
                <ul style={{ marginTop: 0 }}>
                  {e.highlights.map((h, idx) => (<li key={idx} style={{ marginBottom: 4 }}>{h}</li>))}
                </ul>
              )}
            </Box>
          ))}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, mt: 1.5 }}>Projects</Typography>
          {projects.map((p, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{p.name} {p.role ? `— ${p.role}` : ""}</Typography>
              {p.period && (<Typography variant="body2" sx={{ mb: 0.5 }}>{p.period}</Typography>)}
              {p.highlights.length > 0 && (
                <ul style={{ marginTop: 0 }}>
                  {p.highlights.map((h, idx) => (<li key={idx} style={{ marginBottom: 4 }}>{h}</li>))}
                </ul>
              )}
            </Box>
          ))}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, mt: 1.5 }}>Skills</Typography>
          {Object.entries(skills).filter(([, arr]) => arr.length).map(([cat, arr]) => (
            <Box key={cat} sx={{ mb: 0.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{cat}</Typography>
              <Typography variant="body2">{arr.join(", ")}</Typography>
            </Box>
          ))}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, mt: 1.5 }}>Education</Typography>
          {education.map((e, i) => (
            <Box key={i} sx={{ mb: 0.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{e.degree} — {e.institution}</Typography>
              <Typography variant="body2">{e.period} {e.location ? `• ${e.location}` : ""}</Typography>
              {[e.focus, e.school, e.gpa && `GPA: ${e.gpa}`].filter(Boolean).join(" • ")}
            </Box>
          ))}
          {publications.length > 0 && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, mt: 1.5 }}>Publications</Typography>
              {publications.map((p, i) => (
                <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>{p.title} — {[p.venue, p.date].filter(Boolean).join(", ")}</Typography>
              ))}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}

function ContactRow({ label, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.25 }}>
      <Typography sx={{ color: 'rgba(0,255,0,0.9)', fontFamily: '"Iceland", monospace', fontSize: { xs: '1rem', sm: '1.1rem' }, mr: 1.5, fontWeight: 500 }}>{label}:</Typography>
      {typeof value === 'string' ? (
        <Typography sx={{ color: '#00ff00', fontFamily: '"Iceland", monospace', fontSize: { xs: '1rem', sm: '1.1rem' } }}>{value}</Typography>
      ) : value}
    </Box>
  );
}
