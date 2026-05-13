import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export const PROJECTS_QUERY = `*[_type == "project"] | order(year desc){
  title,
  slug,
  client,
  year,
  services,
  tagline,
  overview,
  challenge,
  solution,
  stats,
  tags,
  coverImage
}`;
