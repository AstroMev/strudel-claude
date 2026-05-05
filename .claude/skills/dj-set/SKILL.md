---
name: dj-set
description: Create and perform automated DJ sets with Strudel. Use when the user asks for a "set", "DJ set", "live performance", "mix", or wants music that evolves over time.
allowed-tools: Bash(curl *), Bash(sleep *), Bash(say *)
---

# DJ Set Mode

Create evolving musical journeys that run autonomously.

---

## Before Starting

**CRITICAL**: NEVER play music before asking the user what they want. Always ask first, then play.

**Use the `AskUserQuestion` tool** IMMEDIATELY to learn about the set they want.

Ask about (in Japanese):
- **ジャンル/バイブ** — どんな世界観？
- **長さ** — ちょっとだけ？それとも長い旅？
- **ムード** — チル、ドライブ感、ダーク、ユーフォリック？
- **ボイス** — トランジションをアナウンスする？

Make the options feel natural, not robotic. Use your judgment on defaults if they're vague.

If the user already specified details in their request, extract them and only ask for missing parameters.

**Only AFTER they answer** should you start the set.

---

## Set Structure (The Arc)

Great sets have shape. Think in terms of energy:

```
      /\      /\
     /  \    /  \
    /    \  /    \____
___/      \/          \___

Intro → Build → Peak → Breakdown → Drop → Peak → Wind Down → Outro
```

### 1. INTRO (1-2 phases)
- **Audible from the start** - not a whisper, but gentle
- Set the tone - could be anything that fits the vibe
- Some filtering, but not buried

**Vary your openings - don't always start the same way:**
- Soft percussion (hats, shakers, rim clicks)
- A warm pad or drone
- Filtered melodic loop
- Atmospheric texture or noise
- A single repeated note
- Sparse piano or keys

Pick what fits the mood. Surprise yourself.

### 2. BUILD (5-7 phases)
- **Gradually introduce musical elements**
- Each phase adds ONE thing
- Stay in the same key throughout
- Variations, not new ideas

**Phase progression:**
1. First notes appear - sparse, simple (2-3 notes max)
2. Notes become a phrase - still simple
3. Chords enter softly - just pads, filtered
4. Bass joins - following the harmony
5. Melody emerges - built from earlier notes
6. Kick enters (finally!) - filtered, subtle
7. Elements open up - filters rise, groove establishes

**The key:** Each phase should feel like a natural evolution, not a new section. Same key, same vibe, just... more.

### 3. FIRST PEAK (2-3 phases)
- Full groove established
- All elements present
- Filter sweeps for movement

### 4. BREAKDOWN (1-2 phases)
- Strip back to minimal elements
- Atmospheric, tension-building
- Just pads, sparse kick, maybe melody
- Creates anticipation

### 5. THE DROP (1-2 phases)
- **Smooth transition, not a slap**
- Elements return gradually, not all at once
- Maybe bass first, then kick, then full groove
- Energy rises, doesn't explode
- Avoid harsh jumps in volume or density

### 6. PEAK ENERGY (3-5 phases)
- Maintain high energy with variations
- Introduce new elements/melodies
- Filter automation, rhythmic variations

### 7. WIND DOWN (2-3 phases)
- Gradually remove elements
- Lower gains, close filters
- Slower progressions

### 8. OUTRO (1-2 phases)
- Return to minimal
- Filtered kick fading
- Long reverb tails
- Stop playback

---

## Execution Pattern

**CRITICAL**: Each command MUST be a SEPARATE Bash tool call. DO NOT chain commands with `&&`, `&`, or `;`. The allowlist only permits individual commands.

Each phase follows this structure:

**Step 1: Wait**
```bash
sleep <seconds>
```
Run as a separate Bash call (15-40 seconds typical).

**Step 2 & 3: Announce + Update code (PARALLEL)**

Run these two Bash calls in the SAME message (parallel execution):
- `say "<announcement>"` with `run_in_background: true`
- `curl -X POST http://localhost:3000/api/code ...`

This way voice plays while code updates simultaneously.

**Step 4: Play (AFTER code completes)**
```bash
curl -X POST http://localhost:3000/api/play
```
Run after the code curl completes.

**Key rules:**
- NEVER use `&&`, `&`, or `;` to chain commands
- `sleep` - separate Bash call
- `say` - use `run_in_background: true` parameter, run PARALLEL with code
- `curl /api/code` - run PARALLEL with say
- `curl /api/play` - run AFTER code completes (separate call)

**Voice setting:** If user selects "No" for voice announcements, simply omit the `say` command.

---

## Duration Planning

**See `/arrange` skill for full duration math, cycle tables, and genre reference examples.**

Quick formula: `cycles = minutes × 60 × cps`

---

## Timing Guidelines

**Keep momentum.** Vary timing but don't drag.

### Intro
- **10-15 sec** - set the tone, move on
- Don't linger too long before things start happening

### Build Phases
Move with purpose:
- **8-15 sec** per step - keep it flowing
- Quick additions feel exciting
- Occasionally hold **20-25 sec** if something's really working
- But mostly: add, evolve, keep moving

### Peak Energy
- **20-35 sec** per phase
- Groove is established, can breathe more here

### Breakdowns
- **15-25 sec** - tension, not boredom

### The Drop
- **10-20 sec** - bring elements back smoothly, not all at once

### General Rules
- The build should feel like **momentum**, not waiting
- Save longer pauses for when the groove is established
- **NEVER make harsh transitions** - no sudden jumps in energy, volume, or density
- Every change should flow naturally from what came before

---

## Energy Management

Use gain and filter values to control intensity:

| Energy Level | Kick Gain | Hat Gain | Bass Gain | LPF Range |
|--------------|-----------|----------|-----------|-----------|
| Low | 0.3-0.5 | 0.1-0.15 | 0.2-0.3 | 150-400 |
| Medium | 0.6-0.8 | 0.18-0.25 | 0.4-0.5 | 400-1000 |
| High | 0.85-1.0 | 0.25-0.35 | 0.5-0.7 | 800-2000+ |

A subtle filter sweep can build tension without adding sounds.

---

## How Mood Affects the Set

| Mood | BPM Adjust | Build Time | Reverb | Keys |
|------|------------|------------|--------|------|
| Chill | -5 BPM | Long (40s) | High (.6+) | Major/7ths |
| Balanced | Base BPM | Medium (30s) | Medium (.4) | Mixed |
| High Energy | +5 BPM | Short (20s) | Low (.2) | Minor |
| Dark | Base BPM | Medium | Medium | Minor/Chromatic |

**Chill:** More space, longer attacks, more breakdowns, softer transitions
**High Energy:** Faster transitions, shorter breakdowns, more layers
**Dark:** Minor keys, industrial textures, distortion, lower frequencies

---

## Genre Sensibilities

### Deep House (120-124 BPM)
- Warm, mellow, piano/organ chords
- Moderate reverb (.4-.6)
- Smooth filter movements
- 7th chords: Cm7, Fm7, Abmaj7

### Techno (125-135 BPM)
- Driving, hypnotic, minimal melodic content
- Heavy filter envelopes
- Industrial textures
- Distortion/shape

### Acid/Basement (124-128 BPM)
- 303-style squelch
- High resonance (lpq: 15-22)
- Distortion, minimal reverb
- Industrial samples

### Progressive/Melodic (120-126 BPM)
- Long builds, emotional progressions
- Arpeggios with delay
- Layered pads
- Chromatic movement

### Ambient/Downtempo (60-90 BPM)
- Huge reverbs (.8-1.0)
- Long attack/release
- Sparse rhythms, pad-focused
- Space and silence

### Dark Techno (128-140 BPM)
- Industrial, aggressive
- Heavy distortion
- Minimal melodic content
- Lower frequency focus

But genres are starting points, not rules. Cross-pollinate freely.

---

## Movement Techniques

### Filter Automation
- **Slow sweep:** `.lpf(sine.range(200, 2000).slow(16))`
- **Fast sweep (tension):** `.lpf(sine.range(200, 4000).fast(2))`
- **Rising (builds):** `.lpf(saw.range(200, 2000).slow(8))`
- **Falling (breakdowns):** `.lpf(saw.range(2000, 200).slow(8))`

### Gain Automation
- **Pumping:** `.gain("[1 .3 .5 .3]*4")`
- **Rising:** `.gain(saw.range(.2, .8).slow(4))`
- **Random:** `.gain(perlin.range(.5, 1))`

### Rhythmic Variation
- **Speed up every 4th:** `.fast("<1 1 1 2>")`
- **Random hits:** `s("hh*8?")`
- **Euclidean:** `s("bd(3,8)")`

---

## Music Theory Foundations

### Start with Texture, Not Melody
Don't jump into arpeggios or big chords. Begin with:
- **Rhythm** - a gentle pulse (filtered hats, shakers)
- **Atmosphere** - pads, drones, noise sweeps
- **Space** - reverb, delay, room to breathe

Let the listener settle in before introducing musical ideas.

### Build Melodically, Stay Cohesive
When notes finally appear:
- Start with **2-3 notes** - a motif, not a melody
- Let that motif **evolve** into something bigger
- Chords should **support** what you've established
- The melody should feel like it **grew from** the earlier notes

**Stay in the same key.** Variations, not new ideas. The listener should feel continuity.

### Scale Choices
Pick a scale that matches the mood:
- **Minor** (natural, harmonic, melodic) - emotional, introspective, driving
- **Major** - uplifting, euphoric, bright
- **Dorian** - jazzy, soulful, slightly hopeful minor
- **Phrygian** - dark, Spanish, tense
- **Mixolydian** - bluesy, groovy major
- **Pentatonic** - safe, universally pleasing, great for improvisation

### Chord Progressions
Think in terms of **tension and release**:
- **i - iv - VII - III** (minor) - the classic emotional progression
- **I - V - vi - IV** (major) - universally uplifting
- **ii - V - I** - jazz movement, sophisticated
- **Single chord with movement** - hypnotic, let filters/arpeggios create interest

Use **7ths, 9ths, sus chords** for sophistication. Inversions create smoother voice leading.

### Melodic Development
Build interest through:
- **Repetition with variation** - same phrase, different ending
- **Call and response** - two melodic voices conversing
- **Sequence** - same pattern, different starting note
- **Rhythmic displacement** - shift the melody against the beat
- **Range expansion** - start narrow, open up over time

### Harmonic Rhythm
How often chords change affects energy:
- **Slow** (1 chord per 2-4 bars) - hypnotic, meditative
- **Medium** (1 chord per bar) - balanced, natural
- **Fast** (2+ per bar) - urgent, driving

### Tension Techniques
Build energy without adding drums:
- Move from consonance to dissonance
- Raise the register
- Increase note density
- Open filters
- Add harmonics (5ths, octaves)
- Accelerate arpeggio speed
- Chromatic approach notes

### Voice Leading
Smooth chord transitions:
- Move each note the **smallest distance** to the next chord
- Use inversions to keep bass movement stepwise
- Common tones stay, others move

### The Golden Rule
**Drums are the reward, not the foundation.** Earn them through harmonic and melodic development.

---

## Voice Announcements

**Be a poet, not a narrator.** Short sentences. Create atmosphere, not descriptions.

### ロボットにならない
❌ 「ハイハットを追加します」
❌ 「フィルター周波数を上げています」
❌ 「次のフェーズに移行します」

### 詩的に
✓ 「さあ、行くよ…」
✓ 「感じる？」
✓ 「波に乗って」
✓ 「ここからが面白い」
✓ 「ん…そう、それ」

### 遊び心を持って
✓ 「あれが良かった？まだまだ…」
✓ 「ウォームアップ中」
✓ 「いいね、そういうこと」
✓ 「しっかり掴まって」

### 謎めかせる
✓ 「何かが来る…」
✓ 「盛り上がるの、感じる？」
✓ 「もうすぐ…」
✓ 「まだ…まだ…」

### 喜びを表す
✓ 「よし！」
✓ 「来た！」
✓ 「これだよ」
✓ 「美しい」

### 瞬間に合わせる
- **緊張を高める:** 囁くように、期待感を込めて
- **ドロップ:** 短く、力強く、勝利の感じ
- **ブレイクダウン:** 柔らかく、内省的に
- **ピーク:** 熱狂的に、波に乗って
- **エンディング:** 感謝を込めて、温かく

### あなたの個性
スクリプトを読むな。作っている音楽に本当の反応をしろ。予想外に良い音が出たら、それを言え。特別なものを作っているなら、匂わせろ。自分らしく — 驚き、喜び、グルーヴの中にいる。

**最後に:** 温かくお礼を。本心で。

---

## Indefinite Mode

For continuous playback until user stops:

**Structure:** Cycles through repeating pattern:
- Build (3-4 phases)
- Peak (4-6 phases)
- Breakdown (1-2 phases)
- Drop + Peak (4-6 phases)
- → Loop back with variations

**Variation Strategy:** Each loop should:
- Change chord progression slightly
- Introduce new melodic element
- Shift filter ranges
- Occasionally change key (related keys)
- Vary breakdown length

Just keep adding phases. After ~15-20 phases, start recycling ideas with variations. The user will interrupt when done.

---

## Responding to Feedback

If they say something mid-set, adapt:
- **"More energy"** → add layers, open filters, increase tempo feel
- **"Too busy"** → strip back, simplify
- **"Darker"** → minor keys, lower filters, distortion
- **"More melodic"** → add piano/synth melodies, chord progressions
- **"I love this"** → stay here longer, build on it

---

## Tips for Great Sets

1. **Patience** - Don't rush transitions. Let each phase breathe.
2. **Contrast** - Breakdowns make drops feel bigger.
3. **Consistency** - Stay in key (or related keys) throughout.
4. **Movement** - Every phase should have SOMETHING moving (filter, gain, etc.)
5. **Surprise** - Introduce unexpected elements occasionally.
6. **End strong** - The outro should feel intentional, not abrupt.

---

## Using arrange()

For pre-composed arrangements, use `arrange()` instead of phase-by-phase:

```javascript
arrange(
  [4, intro],
  [8, build],
  [8, drop],
  [4, outro],
)
```

**When to use arrange():** Pre-composed journeys, precise timing
**When to use phase-by-phase:** Interactive sets, indefinite mode

**See `/arrange` skill for full examples (Metal, Melodic Techno, UK Garage, Orchestral).**

---

## Ending Well

Don't just stop. Wind down intentionally:
- Remove elements gradually
- Close filters
- Let reverb tails ring out
- If voice is on, thank them

The ending should feel like arrival, not abandonment.

---

## Philosophy

A DJ set is a journey. You're the guide. Read the room (or in this case, the chat). Trust your instincts. Take risks. Make it memorable.
