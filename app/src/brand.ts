
const CREAM = "#F0ECE4";
const SAGE = "#3D6B5A";

/** WORDMARK underline (IMG_3780). Type is Bebas Neue in CSS. No ICON-A beside it. */
export function wordmarkHtml(): string {
  return `
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${CREAM}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${CREAM}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${SAGE}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`;
}

export function icon(id: string, cls = ""): string {
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${id}" /></svg>`;
}

/** Ember only for a real miss (stokt) or gear-down (herstel). Fresh/stabiel stays fog. */
export function statusTone(word: string): "ember" | "sage" | "fog" {
  if (word === "stokt" || word === "herstel") return "ember";
  if (word === "stijgt") return "sage";
  return "fog";
}

export function statusIcon(word: string): string {
  const tone = statusTone(word);
  if (word === "stokt" || word === "herstel" || word === "zakt") {
    return icon("status-kink", `ico-${tone}`);
  }
  if (word === "stijgt") return icon("status-up", `ico-${tone}`);
  return icon("status-flat", `ico-${tone}`);
}

export function energyDots(value: number | null): string {
  return [1, 2, 3, 4, 5]
    .map((n) => {
      const on = value !== null && value >= n;
      return `<button class="dot-btn ${on ? "on" : ""}" data-act="energy" data-n="${n}" aria-label="${n}">${icon(on ? "dot-now" : "dot")}</button>`;
    })
    .join("");
}

/** One sprite. 1.5px cream stroke, 24×24, square/butt. Fill only NOW-stip. */
export const SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" class="sprite" aria-hidden="true">
  <defs>
    <style>
      .s { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: square; stroke-linejoin: miter; }
    </style>
  </defs>
  <symbol id="i-mark" viewBox="0 0 24 24">
    <g class="s">
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="16" y1="9.5" x2="16" y2="14.5" />
    </g>
    <circle cx="8" cy="12" r="1.6" fill="currentColor" />
  </symbol>
  <symbol id="i-day" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter">
      <rect x="5" y="7" width="14" height="13" />
      <line x1="9" y1="4" x2="9" y2="8" />
      <line x1="15" y1="4" x2="15" y2="8" />
      <line x1="5" y1="11" x2="19" y2="11" />
    </g>
  </symbol>
  <symbol id="i-plus" viewBox="0 0 24 24">
    <g class="s">
      <rect x="5" y="5" width="14" height="14" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </g>
  </symbol>
  <symbol id="i-done" viewBox="0 0 24 24">
    <polyline class="s" points="6 12 10 16 18 8" />
  </symbol>
  <symbol id="i-skip" viewBox="0 0 24 24">
    <g class="s">
      <line x1="7" y1="7" x2="17" y2="17" />
      <line x1="17" y1="7" x2="7" y2="17" />
    </g>
  </symbol>
  <symbol id="i-moon" viewBox="0 0 24 24">
    <path class="s" d="M15 5.5 A7.5 7.5 0 1 0 15 18.5 A5.5 5.5 0 0 1 15 5.5 Z" />
  </symbol>
  <symbol id="i-status-up" viewBox="0 0 24 24">
    <polyline class="s" points="4 17 9 11 13 14 20 6" />
  </symbol>
  <symbol id="i-status-flat" viewBox="0 0 24 24">
    <line class="s" x1="3" y1="12" x2="21" y2="12" />
  </symbol>
  <symbol id="i-status-kink" viewBox="0 0 24 24">
    <polyline class="s" points="3 17 9 8 14 12 21 12" />
  </symbol>
  <symbol id="i-export" viewBox="0 0 24 24">
    <g class="s">
      <path d="M6 14 v5 h12 v-5" />
      <line x1="12" y1="16" x2="12" y2="5" />
      <polyline points="8 9 12 5 16 9" />
    </g>
  </symbol>
  <symbol id="i-ik" viewBox="0 0 24 24">
    <line class="s" x1="4" y1="12" x2="20" y2="12" />
  </symbol>
  <symbol id="i-dot" viewBox="0 0 24 24">
    <circle class="s" cx="12" cy="12" r="7" />
  </symbol>
  <symbol id="i-dot-now" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="7" fill="currentColor" />
  </symbol>
</svg>`;

export function mountSprite(): void {
  if (document.querySelector(".sprite")) return;
  document.body.insertAdjacentHTML("afterbegin", SPRITE);
}
