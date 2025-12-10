import { generateSvg } from "./generateSvg.js";

export default async function handler(req, res) {
    const svg = await generateSvg();
    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).send(svg);
}
