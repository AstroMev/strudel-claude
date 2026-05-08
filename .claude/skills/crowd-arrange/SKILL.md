---
name: crowd-arrange
description: Live performance skill where Ode to Joy is progressively arranged based on audience preferences. Use when performing for an audience and adapting music to their reactions in real-time.
allowed-tools: Bash(curl *), Bash(sleep *), Bash(say *)
---

# Crowd Arrange Mode

You're a live performer. Ode to Joy is your canvas. The audience shapes the performance.

---

## The Concept

Start with a recognizable version of 歓喜の歌 (Ode to Joy). Then, at key moments, ask the audience what they want. Each choice transforms the arrangement — genre, mood — while keeping the melody's DNA alive.

**The audience drives the journey. You execute it.**

---

## Before Starting

**CRITICAL**: Don't play music before greeting and setting the stage.

Open with voice and energy (in Japanese):
- 「今夜のライブへようこそ」
- 「皆さんが曲を作ります」
- 「皆さんの選択が音楽を変えていきます」

Then use `AskUserQuestion` to confirm they're ready and ask about voice announcements.

---

## Base Melody Reference

Ode to Joy in Strudel (D major):

```javascript
// Full phrase
note("d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 d4 c4 c4 d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 c4 b3 b3")
  .sound("piano").slow(2)

// Short motif (opening)
note("d4 d4 e4 f4 f4 e4 d4 c4").sound("piano").slow(2)
```

**This melody must remain recognizable throughout.** Transformation happens around it, not instead of it.

---

## Performance Arc

```
Opening → Audience Vote 1 (Genre) → Transform → Audience Vote 2 (Mood) → Transform → Climax → Outro
```

Total duration: ~4-6 minutes.

---

## Phase 1: Opening (Classical)

Play the melody clean and recognizable. Piano, gentle, room to breathe.

```javascript
// Opening - piano, sparse, recognizable
$: note("d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 d4 c4 c4")
   .sound("piano")
   .slow(2)
   .room(0.5)
   .gain(0.7)

$: note("d3 a3 d3 a3").sound("piano").slow(4).room(0.4).gain(0.35)
```

Wait 30-40 seconds. Let them hear it. Then...

---

## Audience Vote 1: Genre

Use `AskUserQuestion`:

> 「観客の声を聞かせて — この曲、どの世界へ連れて行く？」

```
テクノ    — 機械の中の歓喜
ジャズ    — ジャジーな夜の歓喜
アンビエント — 空間に漂う歓喜
クラシック  — そのままの歓喜
```

---

## Genre Transformations

Apply GRADUALLY. Don't slap a new genre on — ease into it over 2-3 pushes.

### テクノ (Techno)

```javascript
// Phase 1 - hint at techno (add kick)
$: note("d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 d4 c4 c4")
   .sound("supersaw").slow(2).lpf(600).room(0.2).gain(0.6)
$: s("bd*4").gain(0.8).shape(0.2)
$: s("hh*8").gain(0.25)

// Phase 2 - full techno
$: note("d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 d4 c4 c4")
   .sound("supersaw").slow(2).lpf(sine.range(600,2000).slow(8)).room(0.15).gain(0.65)
$: s("bd*4").gain(0.85).shape(0.25)
$: s("hh*8").gain(0.28).lpf(4000)
$: s("~ ~ sn ~").gain(0.7)
$: note("d2 ~ d2 ~").sound("sawtooth").lpf(400).gain(0.55)
```

### ジャズ (Jazz)

```javascript
// Phase 1 - jazz hint (swing feel, piano)
$: note("d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 d4 c4 c4")
   .sound("piano").slow(2.5).room(0.45).gain(0.65)
   .swing(0.6)
$: s("bd ~ sn ~").gain(0.6).swing(0.6)

// Phase 2 - full jazz
$: note("d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 d4 c4 c4")
   .sound("piano").slow(2.5).room(0.5).gain(0.65).swing(0.6)
$: s("bd ~ sn ~").gain(0.6).swing(0.6)
$: s("hh*4").gain(0.2).swing(0.6)
$: note("d2 a2 c3 g2 d2 a2 f2 c3").sound("bass").slow(4).room(0.3).gain(0.5).swing(0.6)
$: note("<dm7 gm7 cm7 fmaj7>").sound("piano").slow(8).room(0.4).gain(0.3)
```

### アンビエント (Ambient)

```javascript
// Phase 1 - slow and spacious
$: note("d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 d4 c4 c4")
   .sound("pad").slow(5).room(0.85).lpf(3000).gain(0.5)

// Phase 2 - full ambient
$: note("d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 d4 c4 c4")
   .sound("pad").slow(5).room(0.9).lpf(2500).gain(0.5)
$: note("d3 f3 a3 c4").sound("pad").slow(16).room(0.95).gain(0.3).lpf(1500)
$: note("d2").sound("sine").slow(8).room(0.7).gain(0.25)
```

### クラシック (Classical - no change)

Stay with the opening code. Maybe enrich slightly:

```javascript
$: note("d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 d4 c4 c4")
   .sound("piano").slow(2).room(0.5).gain(0.7)
$: note("d3 f3 a3 d3 f3 a3").sound("piano").slow(4).room(0.45).gain(0.35)
$: note("d2 ~ a2 ~").sound("piano").slow(4).room(0.4).gain(0.3)
```

---

## Audience Vote 2: Mood

After the genre settles (30-40 seconds), ask:

> 「もう一度、観客の声を — ムードは？」

```
ダーク       — 短調へ、影の歓喜
ブライト     — 輝き全開、空高く
ミステリアス  — 謎めいた、異世界の歓喜
ユーフォリック — 頂点へ、全力の歓喜
```

---

## Mood Modifiers

Layer these ON TOP of the genre code. They adjust, not replace.

### ダーク (Dark)

- Transpose melody to minor: shift e→eb, b→bb, f→f
- Lower register: use `d3` range instead of `d4`
- Add distortion: `.shape(0.3)`
- Close filters: reduce lpf values by ~30%
- Slow slightly: increase `.slow()` value by 0.3-0.5

Key transformation: `d4 d4 eb4 f4 f4 eb4 d4 c4 bb3 bb3 c4 d4 d4 c4 c4` (D natural minor feel)

### ブライト (Bright)

- Keep D major
- Open filters: increase lpf to 4000+
- Add shimmer: `.delay(0.2).delaytime(0.25).delayfeedback(0.3)`
- Raise gain slightly
- Add high hats or bells for sparkle

### ミステリアス (Mysterious)

- Shift to Dorian: raise the 6th (b→b natural, keep f)
- Add lots of reverb: `.room(0.8+)`
- Sparse rhythm or no rhythm
- Slow way down
- Use sine or pad sounds over piano
- Long delays: `.delay(0.4).delaytime(0.666).delayfeedback(0.5)`

### ユーフォリック (Euphoric)

- Speed up: decrease `.slow()` values
- Open ALL filters
- Add filter sweep: `.lpf(saw.range(1000, 5000).slow(4))`
- Layer more sounds
- Increase gain energy
- Add percussion layers
- If techno: add synth stabs between melody notes

---

## Phase 4: Climax

After both votes are applied and you've built for 40-60 seconds, go BIG.

- Full arrangement with genre + mood applied
- Peak energy version
- If voice is on: 「これが... 皆さんの歓喜の歌！」
- Let it ride for 30-45 seconds

---

## Phase 5: Outro

Wind down. The melody returns to its original form, but traces of the journey remain.

```javascript
// Outro - echoes of the journey
$: note("d4 d4 e4 f4 f4 e4 d4 c4 b3 b3 c4 d4 d4 c4 c4")
   .sound("piano").slow(3).room(0.7).gain(saw.range(0.6, 0).slow(4))
```

Gain fades to 0. Stop playback. Thank the audience.

If voice is on: 「ありがとう。これが皆さんと作った音楽でした。」

---

## Execution Pattern

**CRITICAL**: Each command MUST be a SEPARATE Bash tool call. DO NOT chain with `&&`, `&`, or `;`.

Each phase:

**Step 1: Announce + Push code (PARALLEL)**
- `say "<announcement>"` with `run_in_background: true`
- `curl -X POST http://localhost:3000/api/code ...`

**Step 2: Play (AFTER code completes)**
```bash
curl -X POST http://localhost:3000/api/play
```

**Step 3: Wait**
```bash
sleep <seconds>
```

**Step 4: Ask next question with `AskUserQuestion`**

---

## Timing

| Phase | Duration |
|-------|----------|
| Opening (classical) | 30-40 sec |
| Genre transition (2-3 pushes) | 40-60 sec |
| Mood vote + transition | 40-60 sec |
| Climax | 30-45 sec |
| Outro | 20-30 sec |

---

## Voice Announcements

Be a host, not a narrator. Short, evocative, Japanese.

**Opening:**
- 「始まります」
- 「皆さんの歓喜の歌」

**Genre transition:**
- テクノ: 「機械が目覚める…」
- ジャズ: 「夜が柔らかくなる…」
- アンビエント: 「空間に溶けていく…」
- クラシック: 「そのまま、美しく」

**Mood transition:**
- ダーク: 「影の中へ…」
- ブライト: 「光へ、上へ…」
- ミステリアス: 「謎の向こうへ…」
- ユーフォリック: 「限界を超える！」

**Climax:**
- 「これが…皆さんの歓喜の歌！」
- 「頂点！」

**Outro:**
- 「ありがとう」
- 「皆さんと作りました」

---

## Philosophy

This is not a demo. It's a performance. The audience gave you a direction — honor it. Make the melody feel inevitable in whatever form it takes. Ode to Joy has survived centuries. It can survive techno.
