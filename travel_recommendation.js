function searchRecommendations() {
  const query = document.getElementById("searchInput").value.trim();
  const resultBox = document.getElementById("results");
  if (query) {
    resultBox.innerHTML = `<p>You searched for: <strong>${query}</strong></p>`;
  } else {
    resultBox.innerHTML = "<p>Please enter a keyword to search.</p>";
  }
}
function resetResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
}

/* Fetch Recommendation results */

  async function fetchRecommendations() {
    try {
      const response = await fetch('travel_recommendation_api.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched recommendations:', data); // Check data in console
      return data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  }

  // Display all recommendations on page load (optional)
  window.addEventListener('DOMContentLoaded', async () => {
    const recommendations = await fetchRecommendations();
    displayRecommendations(recommendations);
  });

  function displayRecommendations(recommendations) {
    const resultsDiv = document.getElementById('results');
    if (!recommendations.length) {
      resultsDiv.innerHTML = '<p>No recommendations found.</p>';
      return;
    }
    resultsDiv.innerHTML = recommendations.map(rec => `
      <div style="margin-bottom:20px; background: rgba(255,255,255,0.9); color: #333; padding: 15px; border-radius: 8px; display:flex; gap: 15px; align-items:center;">
        <img src="${rec.imageUrl}" alt="${rec.name}" style="width:120px; height:80px; object-fit: cover; border-radius: 6px;">
        <div>
          <h3 style="margin: 0 0 8px;">${rec.name}</h3>
          <p style="margin: 0;">${rec.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Modify your existing searchRecommendations function to filter results
  async function searchRecommendations() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const recommendations = await fetchRecommendations();
    const filtered = recommendations.filter(rec => rec.name.toLowerCase().includes(query) || rec.description.toLowerCase().includes(query));
    displayRecommendations(filtered);
  }

  function resetResults() {
    document.getElementById('searchInput').value = '';
    fetchRecommendations().then(displayRecommendations);
  }
