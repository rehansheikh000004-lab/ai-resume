import jwt from "jsonwebtoken";
export default function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No auth header" });
  const parts = header.split(" ");
  if (parts.length !== 2) return res.status(401).json({ message: "Bad auth format" });
  try {
    const payload = jwt.verify(parts[1], process.env.JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
