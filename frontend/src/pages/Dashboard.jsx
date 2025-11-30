import React from "react";
import { useContext, useEffect, useState } from "react";
import client from "../api/axiosClient";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [resume, setResume] = useState(null);
  const nav = useNavigate();

  async function load() {
    try {
      const res = await client.get("/api/resume");
      setResume(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {user?.username}</h2>
      <div style={{marginTop:20}}>
        <Link to="/resume-builder"><button>Create / Edit Resume</button></Link>
        <button onClick={async ()=>{
          const r = await client.get("/api/resume/export/pdf", { responseType: "blob" });
          // download
          const url = window.URL.createObjectURL(new Blob([r.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "resume.pdf";
          a.click();
        }}>Download PDF</button>
      </div>

      <div style={{marginTop:20}}>
        {resume ? <pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(resume, null, 2)}</pre> : <p>No resume yet</p>}
      </div>
    </div>
  );
}
