---
layout: default
title: Bucket List
nav_order: 3
has_children: true
has_toc: false
---

# Bucket List

Things I want to do, try, see, or experience — not urgent, not a todo list, just a running collection of ideas worth keeping.
{: .fs-6 .fw-300 }

<div class="topic-grid">
  <a href="/lists/experiences.html" class="topic-card">
    <span class="topic-icon">&#127775;</span>
    <span class="topic-title">Experiences</span>
    <span class="topic-desc">Music, hobbies, one-off things to try</span>
  </a>
  <a href="/lists/travel.html" class="topic-card">
    <span class="topic-icon">&#9992;</span>
    <span class="topic-title">Travel</span>
    <span class="topic-desc">Places to go, trips to plan</span>
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
