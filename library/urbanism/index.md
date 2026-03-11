---
layout: default
title: Urbanism
parent: Library
nav_order: 3
has_children: true
has_toc: false
---

# Urbanism

Case briefs and arguments on urban planning, land use, and walkability — built for community board participation and personal reference.
{: .fs-6 .fw-300 }

<div class="topic-grid">
  <a href="/library/urbanism/parking-subsidies/" class="topic-card">
    <span class="topic-icon">&#128663;</span>
    <span class="topic-title">Parking Subsidies</span>
    <span class="topic-desc">The hidden cost of free parking and minimum parking requirements</span>
  </a>
  <a href="/library/urbanism/true-cost-of-cars/" class="topic-card">
    <span class="topic-icon">&#128664;</span>
    <span class="topic-title">True Cost of Cars</span>
    <span class="topic-desc">Personal, public, health, and climate costs of car dependency</span>
  </a>
  <a href="/library/urbanism/threads/" class="topic-card">
    <span class="topic-icon">&#129523;</span>
    <span class="topic-title">Threads to Explore</span>
    <span class="topic-desc">Loose ideas and rabbit holes not yet fully developed</span>
  </a>
</div>

<style>
.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.topic-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 8px;
  text-decoration: none !important;
  color: var(--body-text-color, #c9d1d9) !important;
  background: var(--feedback-color, rgba(255,255,255,0.04));
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  text-align: center;
}

.topic-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  border-color: var(--link-color, #7253ed);
}

.topic-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.topic-title {
  font-size: 1.15rem;
  font-weight: 600;
}

.topic-desc {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.25rem;
}
</style>
