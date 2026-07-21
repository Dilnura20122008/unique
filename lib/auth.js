import jwt from "jsonwebtoken";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "unique2026";
const SECRET = process.env.JWT_SECRET || "unique-service-secret-key-change-me";
export const COOKIE_NAME = "unique_admin_token";

export function createToken(username) {
  return jwt.sign({ username }, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}
