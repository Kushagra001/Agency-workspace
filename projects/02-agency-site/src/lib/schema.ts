import type { SchemaTypeDefinition } from "@sanity/types";

export const projectSchema: SchemaTypeDefinition = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "client", title: "Client", type: "string" },
    { name: "year", title: "Year", type: "string" },
    { name: "services", title: "Services", type: "array", of: [{ type: "string" }] },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "overview", title: "Overview", type: "text" },
    { name: "challenge", title: "Challenge", type: "text" },
    { name: "solution", title: "Solution", type: "text" },
    {
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "object", fields: [{ name: "value", type: "string" }, { name: "label", type: "string" }] }],
    },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    { name: "coverImage", title: "Cover image", type: "image" },
  ],
};
