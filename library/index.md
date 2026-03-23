---
layout: default
title: Library
nav_order: 2
has_children: true
has_toc: false
---

# Library

A collection of deep dives and notes on topics I'm studying.
{: .fs-6 .fw-300 }

<div class="topic-grid">
  <a href="/library/poker/" class="topic-card">
    <span class="topic-icon">&#9824;</span>
    <span class="topic-title">Poker</span>
    <span class="topic-desc">PLO strategy, RFI ranges, session logs</span>
  </a>
  <a href="/library/pc-builds/" class="topic-card">
    <span class="topic-icon">&#128187;</span>
    <span class="topic-title">PC Builds</span>
    <span class="topic-desc">Monitors, GPUs, CPUs, and build planning</span>
  </a>
  <a href="/library/league-of-legends/" class="topic-card">
    <span class="topic-icon">⚔️</span>
    <span class="topic-title">League of Legends</span>
    <span class="topic-desc">Tools, notes, and references</span>
  </a>
  <a href="/library/urbanism/" class="topic-card">
    <span class="topic-icon">&#127961;</span>
    <span class="topic-title">Urbanism</span>
    <span class="topic-desc">Parking, land use, walkability, and community board arguments</span>
  </a>
  <a href="/library/basketball/" class="topic-card">
    <span class="topic-icon">&#127936;</span>
    <span class="topic-title">Basketball</span>
    <span class="topic-desc">Shooting form, drills, and pickup notes</span>
  </a>
  <a href="/library/perfume/" class="topic-card">
    <span class="topic-icon">&#128167;</span>
    <span class="topic-title">Perfume</span>
    <span class="topic-desc">Fragrances, scent families, and first impressions</span>
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
