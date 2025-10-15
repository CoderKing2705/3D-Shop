import fs from "fs/promises";
import path from "path";

/**
 * Generates a unique filename by appending a timestamp to avoid overwriting.
 */
export function makeUniqueFilename(originalName: string) {
    const timestamp = Date.now();
    // sanitize original name (remove spaces / weird chars)
    const safe = originalName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9\-\._]/g, "");
    return `${timestamp}-${safe}`;
}

/**
 * Saves an uploaded file (like image or model) into /public/<folder>
 * @param file - File uploaded from the request
 * @param folder - Subfolder inside /public (e.g. "uploads", "models")
 * @returns The public URL path (e.g. "/uploads/my-image.png")
 */
export async function saveFile(file: File, folder: string): Promise<string> {
    const bytes = Buffer.from(await file.arrayBuffer());
    const dir = path.join(process.cwd(), "public", folder);

    // Ensure the directory exists
    await fs.mkdir(dir, { recursive: true });

    const uniqueName = makeUniqueFilename(file.name);
    const destination = path.join(dir, uniqueName);

    // Write the file asynchronously
    await fs.writeFile(destination, bytes);

    // Return the relative URL that can be served by Next.js
    return `/${folder}/${uniqueName}`;
}
