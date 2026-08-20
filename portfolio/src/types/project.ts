export type Project = {
  slug: string;
  number: string;
  title: string;
  year: string;
  category: string;
  description: string;
  role: string;
  services: string[];
  thumbnail: string;
  heroImage: string;
  gallery: string[];
  featured: boolean;
  challenge: string;
  approach: string;
  outcome: string;
  palette: string;
};

export type Experiment = {
  slug: string;
  number: string;
  title: string;
  field: string;
  description: string;
  color: string;
  visual: "orbit" | "grid" | "wave" | "type" | "bloom" | "scan" | "stack" | "cursor";
  status: "Live" | "Study" | "Prototype";
  interaction: string;
};
