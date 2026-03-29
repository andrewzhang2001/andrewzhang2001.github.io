---
layout: default
title: Home
nav_order: 1
---

# Welcome

{: .fs-6 .fw-300 }

<div class="home-grid">
  <a href="/library/" class="home-card">
    <span class="home-icon">&#128218;</span>
    <span class="home-title">Library</span>
    <span class="home-desc">Notes and deep dives on things I'm learning</span>
  </a>
  <a href="/lists/" class="home-card">
    <span class="home-icon">&#127775;</span>
    <span class="home-title">Bucket List</span>
    <span class="home-desc">Things I want to do, see, and experience</span>
  </a>
</div>

<style>
.home-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-top: 2rem;
}

.home-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 10px;
  text-decoration: none !important;
  color: var(--body-text-color, #c9d1d9) !important;
  background: var(--feedback-color, rgba(255,255,255,0.04));
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  text-align: center;
}

.home-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.35);
  border-color: var(--link-color, #7253ed);
}

.home-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.home-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.home-desc {
  font-size: 0.85rem;
  opacity: 0.65;
}
</style>
