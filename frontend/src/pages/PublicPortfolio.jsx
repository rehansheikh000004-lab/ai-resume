import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PublicPortfolio() {
  const { slug } = useParams();
  const [html, setHtml] = useState("");

  useEffect(() => {
    async function load() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resume/public/${slug}`);
      setHtml(res.data);
    }
    load();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
