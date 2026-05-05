/**
 * =============================================================================
 * CONSTANTS
 * =============================================================================
 *
 * Shared constants used throughout the application.
 */

/** Default Strudel code shown when the editor first loads */
export const DEFAULT_CODE = `// 歓喜の歌 - ベートーヴェン 第9交響曲より
setcpm(120/4)

// メロディ
$: note("[e4@2 e4@2 f4@2 g4@2 g4@2 f4@2 e4@2 d4@2 c4@2 c4@2 d4@2 e4@2 e4@3 d4@1 d4@4 e4@2 e4@2 f4@2 g4@2 g4@2 f4@2 e4@2 d4@2 c4@2 c4@2 d4@2 e4@2 d4@3 c4@1 c4@4]")
  .s("piano").room(0.3).slow(8)

// ベース
$: note("<c2 g2 c2 g2 a2 g2 c2 g2>").s("piano").gain(0.6)

// 和音
$: note("<[c4,e4,g4] [g3,b3,d4] [c4,e4,g4] [g3,b3,d4] [a3,c4,e4] [g3,b3,d4] [c4,e4,g4] [g3,b3,d4]>")
  .s("piano").gain(0.35)
`;
