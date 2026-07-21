import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function filePath(name) {
  return path.join(dataDir, `${name}.json`);
}

export function readData(name) {
  try {
    const raw = fs.readFileSync(filePath(name), "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return name === "contact" ? {} : [];
  }
}

export function writeData(name, data) {
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), "utf-8");
  return data;
}

export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
