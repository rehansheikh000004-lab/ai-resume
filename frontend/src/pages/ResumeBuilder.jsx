import { useState, useEffect, useContext } from "react";
import client from "../api/axiosClient";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilder() {
  const [resume, setResume] = useState({ personal: {}, summary: "", sections: [] });
  const { token } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await client.get("/api/resume");
        setResume(res.data || resume);
      } catch (err) { console.log(err); }
    }
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await client.post("/api/resume", resume);
    nav("/dashboard");
  };

  return (
    <div className="center-box">
      <h2>Resume Builder</h2>
      <form onSubmit={save}>
        <input placeholder="Full name" value={resume.personal.fullName || ""} onChange={e => setResume({...resume, personal: {...resume.personal, fullName: e.target.value }})} />
        <input placeholder="Job title" value={resume.personal.jobTitle || ""} onChange={e => setResume({...resume, personal: {...resume.personal, jobTitle: e.target.value }})} />
        <textarea placeholder="Summary" value={resume.summary || ""} onChange={e => setResume({...resume, summary: e.target.value })} />
        <button>Save</button>
      </form>
    </div>
  );
}
