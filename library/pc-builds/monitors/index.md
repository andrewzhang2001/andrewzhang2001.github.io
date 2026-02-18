---
layout: default
title: Monitors
parent: PC Builds
grand_parent: Library
nav_order: 1
---

# Monitors
{: .no_toc }

Figuring out my dual-monitor setup for coding (WFH) and gaming.
{: .fs-6 .fw-300 }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

## What I already own

**Dell S2722QC** — my current monitor.

| Spec | Value |
|:-----|:------|
| Size | 27" |
| Resolution | 4K (3840 x 2160) |
| Refresh rate | 60 Hz |
| Panel type | IPS |
| USB-C | 65W Power Delivery + DisplayPort Alt Mode |
| Other ports | 2x HDMI 2.0, 2x USB-A 3.0, 3.5mm audio |
| Speakers | Dual 3W (mediocre) |
| HDR | Accepts HDR10 signal but no real HDR performance |
| Stand | Full ergonomic (height, tilt, swivel, pivot, VESA) |

**Known issues with this monitor:**
- 60Hz only — fine for work, not great for gaming
- Poor real-world contrast (~270:1 measured in some reviews despite 1000:1 spec)
- HDMI ports are limited — USB-C is the only port that gives full 4K/60Hz quality
- Reported signal drops with Macs on wake from sleep
- Weak HDR (no VESA certification, not enough brightness/contrast to matter)

**Bottom line:** Solid work monitor with great USB-C support. Not a gaming monitor at all.

---

## My requirements

| Requirement | Status |
|:------------|:-------|
| Dual monitors | **Non-negotiable** — coding on one, other stuff on the other |
| 27" or bigger | **Non-negotiable** — 27" is my minimum |
| USB-C with power delivery | **Non-negotiable** — MacBook Pro for work needs this |
| Flat panel | **Decided** — curved looks odd next to a flat monitor in dual setup |
| High refresh rate for gaming | **Researching** — League, Minecraft, Horizon Forbidden West |
| Resolution | **Researching** — 4K vs 1440p, closely tied to GPU budget |
| Panel type | **Researching** — need to understand IPS vs VA vs OLED tradeoffs |

---

## Decision 1: Keep the Dell or replace both?

**Leaning toward: Keep the Dell as secondary.**

The Dell S2722QC is a perfectly good coding/work monitor. The plan would be:
- **Dell S2722QC (secondary)** — code editor, browser, Slack, reference docs
- **New monitor (primary)** — gaming, media, whatever I'm focused on

This saves the cost of a second new monitor (~$230-400) and the Dell already has the USB-C I need for my MacBook.

### Things to know about mismatched dual monitors

If the new monitor is a different resolution and/or refresh rate than the Dell, there are some practical quirks:

**Different resolutions (e.g., 4K Dell + 1440p gaming monitor):**
- Text and UI elements will be different sizes unless you set per-display scaling in your OS (e.g., 150% on the 4K, 100% on the 1440p). Both Windows and macOS support this.
- Mouse cursor can "jump" vertically at the border between screens since pixel rows don't align 1:1. You can offset the monitors in display settings to minimize this.
- Dragging windows between screens may cause momentary blurriness or resizing.

**Different refresh rates (e.g., 60Hz Dell + 144Hz gaming monitor):**
- **Windows refresh rate capping bug** — the 144Hz monitor can get silently capped to 60Hz when content is animating on the 60Hz secondary. Fix: set the high-refresh monitor as your **primary display**.
- **NVIDIA MPO bug** — on NVIDIA GPUs, Multiplane Overlay can cause stuttering on the high-refresh monitor. Fix: disable MPO via registry edit.
- Side-by-side, 60Hz will look noticeably less smooth than 144Hz during scrolling — this is just something you get used to.

**Color mismatch:**
- Two different panels will have different color tones and white points out of the box. Calibrating both (even just matching white point and gamma in OSD) helps.

**None of these are dealbreakers** — millions of people run mismatched dual setups. They're just things to be aware of.

---

## Decision 2: Panel type

This is the technology behind how pixels actually produce light and color. It significantly affects picture quality, response time, and price.

### IPS (In-Plane Switching)

What my Dell S2722QC uses. The most common type.

| Pros | Cons |
|:-----|:-----|
| Good color accuracy and wide viewing angles | Lower contrast ratio (~1000:1) — blacks look grayish |
| No burn-in risk — great for static content like code | "IPS glow" in dark scenes (corners look lighter) |
| Fast response times in modern panels | Not the deepest blacks |
| Widest selection and most affordable |  |

**Best for:** All-around use. Coding, browsing, gaming. The safe pick.

### VA (Vertical Alignment)

| Pros | Cons |
|:-----|:-----|
| Much better contrast (~2500-3000:1) — deeper blacks | Slower pixel response times — can cause "smearing" in fast motion |
| Better dark room experience | Narrower viewing angles than IPS |
| Often cheaper than IPS at similar specs | Color shift when viewed off-angle |

**Best for:** Dark room gaming, movies, people who value deep blacks over speed.

### OLED

| Pros | Cons |
|:-----|:-----|
| Perfect blacks (infinite contrast) — each pixel turns off individually | More expensive than IPS (~$350-500 for 27" QD-OLED) |
| Best response times (near-instant) | Lower peak brightness in full-screen white |
| Stunning HDR (real HDR, not the fake HDR on my Dell) | Burn-in risk exists but is manageable (see below) |
| Best motion clarity for gaming |  |

**Best for:** Gaming and media consumption. Also viable for light daily coding use — see burn-in section below.

#### OLED burn-in: how bad is it really?

**At ~3 hours/day of mixed use, burn-in is basically a non-issue with modern panels.** Here's the data:

The most rigorous independent test (Monitors Unboxed) ran a Gen 3 QD-OLED for **5,000+ hours at ~60 hrs/week** of heavy static productivity use — Windows light mode, dual-window layout, dark taskbar. Burn-in artifacts appeared between months 3-6 but were **only visible on diagnostic grey test patterns**, not in normal content. After 6 months, degradation plateaued and barely changed through month 21. Overall brightness dropped just 2%.

At 3 hrs/day, I'd accumulate 5,000 hours in **~4.5 years** — and my usage would be more varied than a worst-case static test. Gen 4 "Penta Tandem" QD-OLED (2025+) claims **2x lifespan** over those Gen 3 panels.

**Built-in mitigations on modern OLED monitors:**
- Pixel shifting — moves the image by a few pixels every ~3 minutes to spread wear
- Auto brightness limiter — reduces brightness when large areas are bright
- Panel refresh — compensates for voltage drift when monitor powers off
- Static element detection — auto-dims persistent UI elements (taskbar, logos)

**Simple precautions that go a long way:**
- Use dark mode in IDE and OS (less pixel stress)
- Auto-hide the taskbar (single biggest mitigation according to reviewers)
- Keep brightness moderate (~50-60% for SDR content)
- Let panel refresh run when powering off (takes ~1 hour)

**Warranty:** ASUS, MSI, Dell/Alienware, Corsair, Gigabyte, and AOC all offer **3-year burn-in warranty** on OLED monitors. They wouldn't do that if they expected claims.

### Mini-LED (LCD backlight upgrade)

Not a panel type itself — it's an upgrade to the backlight behind an IPS or VA panel. Uses hundreds of tiny LEDs that can dim independently in zones.

| Pros | Cons |
|:-----|:-----|
| Much better HDR than regular IPS/VA | "Blooming" — bright halos around bright objects on dark backgrounds |
| Higher peak brightness (1000+ nits) | More expensive than standard IPS/VA |
| No burn-in risk | Not as good as OLED for true blacks |

**Best for:** HDR gaming (Horizon Forbidden West would look great) without the burn-in worry.

### My thinking so far

{: .note }
OLED is looking very strong. Burn-in is a non-issue at ~3 hrs/day. And the price gap has collapsed — QD-OLED starts at ~$350, only ~$100 more than the best IPS options. For a gaming-focused monitor, OLED's infinite contrast, instant response times, and real HDR are a big upgrade for a small premium.

---

## Decision 3: Resolution

Closely tied to GPU budget — higher resolution means you need a more powerful (expensive) GPU to hit good frame rates.

| Resolution | Pixel count | GPU demand | Gaming sweet spot |
|:-----------|:------------|:-----------|:------------------|
| 1080p (1920x1080) | 2.1M | Low | Easy 200+ fps. Too low pixel density at 27" — text looks fuzzy. **Ruled out.** |
| 1440p (2560x1440) | 3.7M | Medium | 144+ fps achievable on mid-range GPUs. Sharp at 27". **The popular gaming sweet spot.** |
| 4K (3840x2160) | 8.3M | High | Hard to hit 100+ fps without a top-tier GPU. Matches my Dell. |

### 1440p vs 4K — the tradeoff

**1440p (leaning this way):**
- Much easier to hit high frame rates — a mid-range GPU can push 144+ fps in most games
- 27" at 1440p (109 PPI) is sharp enough for gaming and general use
- Monitors are cheaper
- Downside: mismatched resolution with my 4K Dell (scaling quirks described above)

**4K:**
- Matches my Dell — no scaling mismatch
- Sharpest possible image, great for text
- Very GPU-hungry — need a high-end GPU to game at 4K/120Hz+
- 4K at high refresh rates + USB-C is a more expensive monitor category

{: .note }
Still undecided. Leaning 1440p for the better price-to-performance, but need to figure out GPU budget first since they're linked.

---

## Decision 4: Refresh rate

How many times per second the screen updates. Higher = smoother motion.

| Refresh rate | What it feels like |
|:-------------|:-------------------|
| 60 Hz | Standard. What my Dell does. Fine for work, noticeably choppy in fast games once you've seen better. |
| 144 Hz | The biggest single jump in smoothness. Night and day vs 60Hz. The "entry point" for gaming monitors. |
| 165-180 Hz | Slight improvement over 144Hz. Many modern panels land here. |
| 240 Hz+ | Diminishing returns. Competitive esports players notice it, but for most people 144→240 is subtle. |

### What my games need

| Game | Intensity | Notes |
|:-----|:----------|:------|
| League of Legends | Low GPU demand | Can easily hit 200+ fps even at 1440p. Benefits hugely from high refresh rate — smoother teamfights and ability tracking. |
| Minecraft | Low-Medium | Easily 144+ fps. Smooth camera movement feels great exploring. |
| Horizon Forbidden West | Very demanding | At 1440p, expect 60-100 fps depending on GPU. At 4K, even top GPUs struggle to hold 60fps at max settings. |

**The takeaway:** League and Minecraft can take full advantage of 144Hz+ easily. Horizon Forbidden West is the bottleneck — it's so demanding that the GPU is the limiting factor, not the monitor. A 144Hz monitor handles all three well (just won't hit 144fps in Horizon).

{: .note }
144Hz seems like the minimum. 165-180Hz costs about the same these days so there's no reason not to get it. 240Hz+ is probably overkill for my use case.

---

## Monitors I'm considering

All 27", 1440p, flat. Prices as of February 2026.

Since the Dell S2722QC stays as the work/MacBook monitor, the gaming monitor doesn't necessarily need USB-C — it just needs DisplayPort for the PC. This opens up the OLED options.

### IPS options

#### Dell S2725DC — ~$230-250

| Spec | Value |
|:-----|:------|
| Panel | IPS |
| Refresh rate | 144 Hz |
| USB-C | 65W PD + DP Alt Mode + secondary 15W USB-C |
| Contrast | 1500:1 |
| Color | 99% sRGB |
| Features | KVM switch, same Dell design language as my S2722QC |

**Why it's interesting:** Same brand, similar aesthetics to my Dell, matching 65W USB-C, KVM support. Probably the most natural companion to my existing monitor. Best value overall.

#### ASUS ROG Strix XG27ACS — ~$255-270

| Spec | Value |
|:-----|:------|
| Panel | Fast IPS |
| Refresh rate | 180 Hz |
| USB-C | DP Alt Mode only (**7.5W — won't charge a laptop**) |
| Contrast | 1000:1 |
| Color | 97% DCI-P3 (much wider gamut) |
| Features | HDR400, G-SYNC Compatible, ELMB Sync |

**Why it's interesting:** Best color gamut and highest refresh rate in the IPS price range. Better for gaming than the Dell.

### QD-OLED options

OLED monitor prices have dropped ~70% since 2022. Sub-$400 QD-OLED is real.

#### Samsung Odyssey OLED G5 (G50SF) — ~$350

| Spec | Value |
|:-----|:------|
| Panel | QD-OLED |
| Refresh rate | 180 Hz |
| Ports | 1x DisplayPort 1.4, 1x HDMI 2.0 (**no USB-C**) |
| Contrast | Infinite (OLED) |
| Color | Wide gamut |
| HDR | HDR True Black 400 |
| Stand | Tilt-only (no height/swivel/pivot) |

**Why it's interesting:** Cheapest QD-OLED on the market. Only ~$100 more than the Dell IPS. The catch: minimal connectivity, no speakers, and a basic tilt-only stand (would want a monitor arm). But the image quality leap from IPS to OLED is massive — perfect blacks, instant response times, real HDR.

#### AOC Q27GAZD — ~$360

| Spec | Value |
|:-----|:------|
| Panel | QD-OLED |
| Refresh rate | 240 Hz |
| Ports | 1x DisplayPort 1.4, 1x HDMI 2.1 |
| Contrast | Infinite (OLED) |
| Color | Wide gamut |
| HDR | HDR True Black 400 |

**Why it's interesting:** 240Hz for only $10 more than the Samsung. Minimal ports like the Samsung but includes HDMI 2.1. Arguably the best value OLED right now.

#### Acer Predator X27U Z1 — ~$380

| Spec | Value |
|:-----|:------|
| Panel | QD-OLED |
| Refresh rate | 280 Hz |
| Ports | DisplayPort 1.4, HDMI 2.1 |
| Contrast | Infinite (OLED) |
| HDR | HDR True Black 400 |
| Features | FreeSync Premium Pro |

**Why it's interesting:** 280Hz for $380. Good middle ground between the stripped-down Samsung and the pricier options.

#### Alienware AW2725DF — ~$500

| Spec | Value |
|:-----|:------|
| Panel | QD-OLED |
| Refresh rate | 360 Hz |
| Ports | 2x DisplayPort 1.4, 1x HDMI 2.1 |
| Contrast | Infinite (OLED) |
| HDR | DisplayHDR True Black 400 |
| Stand | Full ergonomic (height, tilt, swivel, pivot) |
| Warranty | **3-year burn-in warranty** |

**Why it's interesting:** Premium build, 360Hz, full ergonomic stand, and Dell/Alienware's 3-year burn-in warranty. The "no compromises" OLED pick, but at $500 it's double the Dell IPS.

### Price comparison

| Monitor | Panel | Refresh | Price | vs Dell IPS |
|:--------|:------|:--------|:------|:------------|
| Dell S2725DC | IPS | 144Hz | $230-250 | baseline |
| ASUS XG27ACS | IPS | 180Hz | $255-270 | +$25 |
| Samsung G50SF | QD-OLED | 180Hz | $350 | **+$100** |
| AOC Q27GAZD | QD-OLED | 240Hz | $360 | **+$110** |
| Acer X27U Z1 | QD-OLED | 280Hz | $380 | **+$130** |
| Alienware AW2725DF | QD-OLED | 360Hz | $500 | +$250 |

{: .note }
**The OLED premium is only ~$100-130, not $500+ like I originally thought.** The Samsung G50SF or AOC Q27GAZD at $350-360 deliver a huge jump in image quality (infinite contrast, instant response, real HDR) for roughly the price of a nice dinner out. The main tradeoff is fewer ports and a worse stand — both solvable with a monitor arm. This changes the calculus significantly.

---

## Open questions

- [ ] **GPU budget:** Resolution and refresh rate decisions depend on what GPU I can afford. Need to research GPUs next.
- [x] **Do I actually need USB-C on the gaming monitor?** No — the Dell stays as the work/MacBook monitor. The gaming monitor just needs DisplayPort for the PC. This opens up all the OLED options.
- [ ] **IPS vs OLED?** Burn-in is a non-issue at my usage. The price gap is only ~$100-130. Main tradeoff: budget OLEDs have fewer ports and worse stands (solvable with a monitor arm). Need to decide if the image quality jump is worth it.
- [ ] **Horizon Forbidden West at 1440p vs 4K:** How much visual difference is there? If 1440p looks good enough, it massively simplifies the GPU decision.
- [ ] **Monitor arm vs stands:** Two monitors on stands takes up a lot of desk space. A dual monitor arm might be worth it.
