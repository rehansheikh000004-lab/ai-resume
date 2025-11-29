import pdf from "html-pdf-node";
import path from "path";
import fs from "fs";

export async function htmlToPdfBuffer(html) {
  const options = { format: "A4", margin: { top: "10mm", bottom: "10mm" } };
  const file = { content: html };
  const result = await pdf.generatePdf(file, options);
  // result is a Buffer
  return result;
}
