import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// このプロジェクトをワークスペースルートに固定する。
// （ホームディレクトリに残った package-lock.json を Turbopack が
//  ルートと誤検出する警告を抑止する。）
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
