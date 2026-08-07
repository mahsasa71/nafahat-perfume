
import { readFile } from "fs/promises";
import path from "path";

export async function GET(req, { params }) {
  try {
    const { filename } = await params;

    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      filename
    );

    const file = await readFile(filePath);

    const extension = path.extname(filename).toLowerCase();

    const contentTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
    };

    return new Response(file, {
      headers: {
        "Content-Type":
          contentTypes[extension] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image serving error:", error);

    return new Response("File not found", {
      status: 404,
    });
  }
}

