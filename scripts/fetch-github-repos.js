// Script to fetch GitHub repositories for swayam8624
const GITHUB_USERNAME = 'swayam8624';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

async function fetchGitHubRepos() {
  try {
    console.log(`Fetching repositories for ${GITHUB_USERNAME}...`);
    
    const response = await fetch(GITHUB_API_URL);
    const repos = await response.json();
    
    if (!Array.isArray(repos)) {
      console.error('Error fetching repositories:', repos.message);
      return;
    }
    
    // Filter and sort repositories
    const filteredRepos = repos
      .filter(repo => !repo.fork && repo.description) // Exclude forks and repos without description
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort by last updated
      .slice(0, 6); // Get top 6 repositories
    
    console.log(`Found ${filteredRepos.length} repositories:`);
    
    filteredRepos.forEach((repo, index) => {
      console.log(`\n${index + 1}. ${repo.name}`);
      console.log(`   Description: ${repo.description}`);
      console.log(`   Language: ${repo.language || 'Not specified'}`);
      console.log(`   Stars: ${repo.stargazers_count}`);
      console.log(`   Forks: ${repo.forks_count}`);
      console.log(`   URL: ${repo.html_url}`);
      console.log(`   Homepage: ${repo.homepage || 'None'}`);
      console.log(`   Topics: ${repo.topics?.join(', ') || 'None'}`);
      console.log(`   Last updated: ${new Date(repo.updated_at).toLocaleDateString()}`);
    });
    
    // Generate project data structure
    console.log('\n--- Project Data Structure ---');
    const projectsData = filteredRepos.map(repo => ({
      title: repo.name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      description: repo.description,
      tech: [
        repo.language,
        ...repo.topics?.slice(0, 4) || []
      ].filter(Boolean),
      github: repo.html_url,
      live: repo.homepage || '#',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      lastUpdated: repo.updated_at
    }));
    
    console.log(JSON.stringify(projectsData, null, 2));
    
    return projectsData;
    
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
  }
}

// Execute the function
fetchGitHubRepos();
