export interface Profile {
  id: string
  username: string
  full_name: string
  avatar_url?: string
  bio_long: string
  bio_short: string
}

export interface Project {
  id: string
  title: string
  description_short: string
  description_long: string
  cover_image_url?: string
  project_url?: string
  repo_url?: string
  created_at: string
  project_type: string
  effort_level: string
  description_embedding?: number[]
  demo_iframe_url?: string
  model_card_data?: ModelCardData
}

export interface ModelCardData {
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
  abstract_embedding?: number[]
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
  content_embedding?: number[]
  summary_ai?: string
  eli5_ai?: string
  quiz_cards_ai?: QuizCard[]
}

export interface QuizCard {
  q: string
  a: string
}

export interface Skill {
  id: string
  name: string
  category: string
}

export interface AIProjectInsight {
  project_id: string
  summary_ai: string
  improvements_ai: string
  comparison_ai: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
