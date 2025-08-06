export interface Project {
  id: string
  title: string
  description_short: string
  description_long: string
  cover_image_url: string
  project_url?: string
  repo_url?: string
  created_at: string
  project_type: string
  effort_level: string
  tags?: string[]
  model_card_data?: ModelCard
  demo_iframe_url?: string
}

export interface ModelCard {
  architecture: string
  dataset: string
  prompt_methods: string
  evaluation_metrics: Array<{
    metric: string
    value: string
  }>
}

export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  publication_date: string
  pdf_url?: string
  abstract: string
}

export interface Experience {
  id: string
  role: string
  company: string
  start_date: string
  end_date?: string
  description: string
}

export interface BlogPost {
  id: string
  title: string
  content_markdown: string
  published_at: string
  slug: string
}

export interface Skill {
  id: string
  name: string
  category: string
}

export interface Profile {
  id: string
  username: string
  full_name: string
  avatar_url?: string
  bio_short: string
  bio_long: string
}
