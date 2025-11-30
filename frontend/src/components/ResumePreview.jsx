import React from "react";
import "./ResumePreview.css";

export default function ResumePreview({ data }) {
  if (!data) return null;

  return (
    <div className="resume-preview">
      {/* HEADER */}
      <div className="header">
        <h1>{data.name || "Your Name"}</h1>
        <p>{data.email || "email@example.com"} • {data.phone || "123-456-7890"}</p>
        <p>{data.address || "City, Country"}</p>
      </div>

      <hr />

      {/* SUMMARY */}
      {data.summary && (
        <section>
          <h2>Professional Summary</h2>
          <p>{data.summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <section>
          <h2>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="item">
              <h3>{exp.role}</h3>
              <p><strong>{exp.company}</strong> — {exp.duration}</p>
              <p>{exp.details}</p>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {data.education && data.education.length > 0 && (
        <section>
          <h2>Education</h2>
          {data.education.map((ed, i) => (
            <div key={i} className="item">
              <h3>{ed.degree}</h3>
              <p><strong>{ed.school}</strong> — {ed.year}</p>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2>Skills</h2>
          <ul className="skills">
            {data.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
