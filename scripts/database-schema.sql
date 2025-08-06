-- Enable pgvector extension for vector embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio_long TEXT NOT NULL,
  bio_short TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description_short TEXT NOT NULL,
  description_long TEXT NOT NULL,
  cover_image_url TEXT,
  project_url TEXT,
  repo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  project_type TEXT NOT NULL,
  effort_level TEXT NOT NULL,
  description_embedding VECTOR(1536),
  demo_iframe_url TEXT,
  model_card_data JSONB
);

-- Publications table
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  authors JSONB NOT NULL,
  venue TEXT NOT NULL,
  publication_date DATE NOT NULL,
  pdf_url TEXT,
  abstract TEXT NOT NULL,
  abstract_embedding VECTOR(1536)
);

-- Experiences table
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT NOT NULL
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  published_at DATE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content_embedding VECTOR(1536),
  summary_ai TEXT,
  eli5_ai TEXT,
  quiz_cards_ai JSONB
);

-- Skills table
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL
);

-- Project-Skills junction table
CREATE TABLE project_skills (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, skill_id)
);

-- AI Project Insights table
CREATE TABLE ai_project_insights (
  project_id UUID PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  summary_ai TEXT,
  improvements_ai TEXT,
  comparison_ai TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge vectors for RAG
CREATE TABLE knowledge_vectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  metadata JSONB NOT NULL,
  embedding VECTOR(1536) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_project_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_vectors ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON publications FOR SELECT USING (true);
CREATE POLICY "Public read access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access" ON project_skills FOR SELECT USING (true);
CREATE POLICY "Public read access" ON ai_project_insights FOR SELECT USING (true);
CREATE POLICY "Public read access" ON knowledge_vectors FOR SELECT USING (true);
