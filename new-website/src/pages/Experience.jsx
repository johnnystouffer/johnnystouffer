import './css/Experience.css'

// Pulled from public/John_Stouffer_Resume_Master.pdf.

const EXPERIENCE = [
    {
        title: 'Software Engineer I',
        dates: '2026 – Present',
        subtitle: 'Collins Aerospace',
        current: true,
        points: ['Just started full time. More to come.'],
    },
    {
        title: 'Software Engineering Intern',
        dates: 'May 2025 – Aug. 2025',
        subtitle: 'Collins Aerospace',
        location: 'Cedar Rapids, IA',
        points: [
            'Improved field test accuracy by 80% by integrating a real-time map framework predicting GPS jammer locations, error radius, and vehicle positions.',
            'Increased operator satisfaction by 50% by refining UI features and workflows from weekly operator/engineer feedback.',
            'Achieved real-time filtering of 500+ messages per minute with a multi-threaded GPS message parser.',
        ],
    },
    {
        title: 'Software Intern',
        dates: 'May 2024 – Aug. 2024',
        subtitle: 'Tesla',
        location: 'Reno, NV',
        points: [
            'Designed 10+ real-time KPI dashboards in Power BI to monitor 100+ machines on the factory floor.',
            'Reduced planner workload by 15+ hours weekly by developing an automated KPI alerting system.',
            'Automated data refresh pipelines to deliver up-to-date efficiency metrics for 50+ technicians.',
        ],
    },
    {
        title: 'Teaching Assistant (Data Structures and Algorithms)',
        dates: 'Jan. 2025 – Aug. 2025',
        subtitle: 'Michigan State University',
        location: 'East Lansing, MI',
        points: [
            'Collaborated with 15+ ULAs and instructors to design and refine coursework and exams for 300+ students.',
            'Led helprooms and debug sessions, supporting 30+ students weekly on data structure and algorithm projects.',
            'Resolved 100+ student questions on Piazza, improving accessibility outside helproom hours.',
        ],
    },
]

const EDUCATION = [
    {
        title: 'Michigan State University',
        location: 'East Lansing, MI',
        subtitle: 'B.S. Computer Science | Dean’s List 6x | GPA: 3.82',
        dates: 'May 2026',
    },
]

const EXTRACURRICULARS = [
    {
        title: 'Imagine Software',
        tag: 'E-Board, Team Lead',
        dates: 'Jan. 2023 – Present',
        points: [
            'Directed the club’s Educational Pipeline for 50+ members, delivering 5+ tutorials and 15+ lessons per semester.',
            'Helped grow MSU’s largest SWE-focused club to 900+ members and 90+ active participants.',
            'Led a 6-person developer team building an AR/VR mobile app to increase tourism in Aurora, IL.',
        ],
    },
]

// Resume-style entry: title (| tag) and dates on the first line, subtitle and
// location on the second, then bullets.
function Entry({ title, tag, dates, subtitle, location, current, points = [] }) {
    return (
        <li className="exp-entry">
            <div className="exp-entry-row">
                <h3 className="exp-entry-title">
                    {title}
                    {tag && <span className="exp-entry-tag"> | {tag}</span>}
                    {current && <span className="exp-entry-now">(CURRENT)</span>}
                </h3>
                <span className="exp-entry-dates">{dates}</span>
            </div>
            {(subtitle || location) && (
                <div className="exp-entry-row exp-entry-sub">
                    <span>{subtitle}</span>
                    {location && <span>{location}</span>}
                </div>
            )}
            {points.length > 0 && (
                <ul className="exp-entry-points">
                    {points.map((p) => (
                        <li key={p}>{p}</li>
                    ))}
                </ul>
            )}
        </li>
    )
}

function Section({ label, items }) {
    return (
        <section className="exp-section">
            <h2 className="exp-label">{label}</h2>
            <ul className="exp-list">
                {items.map((item) => (
                    <Entry key={`${item.title}-${item.dates}`} {...item} />
                ))}
            </ul>
        </section>
    )
}

export default function Experience() {
    return (
        <div className="exp-page">
            <header className="exp-header">
                <h1 className="exp-heading">Experience</h1>
                <div className="exp-contact">
                    <a
                        className="exp-download"
                        href="/John_Stouffer_Resume_Master.pdf"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Resume [PDF]
                    </a>
                </div>
            </header>

            <Section label="Experience" items={EXPERIENCE} />
            <Section label="Education" items={EDUCATION} />
            <Section label="Extracurriculars" items={EXTRACURRICULARS} />
        </div>
    )
}
