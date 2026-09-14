import { inflateSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { statusTone, wordmarkHtml } from "./brand";
import { LOCAL_STORAGE_KEY } from "./types";

const INK = { r: 0x0c, g: 0x0c, b: 0x0c };
const CREAM = { r: 0xf0, g: 0xec, b: 0xe4 };
const EMBER = "#E8533A";

const publicDir = resolve(import.meta.dirname, "../public");
const appHtml = readFileSync(resolve(import.meta.dirname, "../index.html"), "utf8");
const iconSvg = readFileSync(resolve(publicDir, "favicon.svg"), "utf8");
const manifest = JSON.parse(readFileSync(resolve(publicDir, "manifest.webmanifest"), "utf8")) as {
  name: string;
  short_name: string;
  theme_color: string;
  background_color: string;
  start_url: string;
  scope: string;
  display: string;
  icons: { src: string; sizes: string; type: string }[];
};

function readPng(path: string): { w: number; h: number; data: Buffer } {
  const buf = readFileSync(path);
  expect(buf.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))).toBe(true);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  const parts: Buffer[] = [];
  let offset = 8;
  while (offset + 12 <= buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.subarray(offset + 4, offset + 8).toString("ascii");
    const data = buf.subarray(offset + 8, offset + 8 + len);
    if (type === "IDAT") parts.push(data);
    if (type === "IEND") break;
    offset += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(parts));
  const stride = w * 4;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y += 1) {
    const row = y * (stride + 1);
    expect(raw[row]).toBe(0);
    raw.copy(out, y * stride, row + 1, row + 1 + stride);
  }
  return { w, h, data: out };
}

function near(channel: number, target: number, slack: number): boolean {
  return Math.abs(channel - target) <= slack;
}

describe("statusTone", () => {
  it("keeps a fresh stabiel day off ember", () => {
    expect(statusTone("stabiel")).toBe("fog");
  });

  it("uses ember only for Skip/miss (stokt) or gear-down, not a quiet day", () => {
    expect(statusTone("stokt")).toBe("ember");
    expect(statusTone("herstel")).toBe("ember");
    expect(statusTone("zakt")).toBe("fog");
    expect(statusTone("stijgt")).toBe("sage");
    expect(statusTone("stabiel")).toBe("fog");
  });
});

describe("ICON + PWA lock", () => {
  it("keeps the header as the ARETAN wordmark with no icon-A beside it", () => {
    const html = wordmarkHtml();
    expect(html).toContain('aria-label="ARETAN"');
    expect(html).toContain("wordmark-type");
    expect(html).toContain("ARETAN");
    expect(html).not.toMatch(/polyline/);
    expect(html).not.toMatch(/i-mark|favicon|apple-touch|icon-a/i);
    expect(html).not.toContain(EMBER);
  });

  it("wires favicon 32 and apple-touch 180 for iPhone home screen", () => {
    expect(appHtml).toContain('rel="icon" href="./favicon-32.png"');
    expect(appHtml).toContain('sizes="32x32"');
    expect(appHtml).toContain('rel="apple-touch-icon" href="./apple-touch-icon.png"');
    expect(appHtml).toContain('sizes="180x180"');
    expect(appHtml).toContain('rel="manifest" href="./manifest.webmanifest"');
    expect(appHtml).toContain('apple-mobile-web-app-title" content="ARETAN"');
    expect(appHtml).toContain('theme-color" content="#0c0c0c"');
    expect(appHtml).not.toContain("ember");
    expect(appHtml).not.toContain("vlam");
  });

  it("keeps the PWA on /preview with name ARETAN and theme Ink", () => {
    expect(manifest.name).toBe("ARETAN");
    expect(manifest.short_name).toBe("ARETAN");
    expect(manifest.theme_color.toUpperCase()).toBe("#0C0C0C");
    expect(manifest.background_color.toUpperCase()).toBe("#0C0C0C");
    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBe("./");
    expect(manifest.scope).toBe("./");
    const srcs = manifest.icons.map((icon) => icon.src);
    expect(srcs).toContain("favicon-32.png");
    expect(srcs).toContain("apple-touch-icon.png");
    expect(srcs).not.toContain("favicon-192.png");
    expect(srcs.filter((src) => src.endsWith(".png"))).toHaveLength(2);
  });

  it("draws the ICON as a cream A-line on ink, without Ember", () => {
    expect(iconSvg).toContain('fill="#0C0C0C"');
    expect(iconSvg).toContain('stroke="#F0ECE4"');
    expect(iconSvg).toContain('points="9 27 16 5 23 27"');
    expect(iconSvg).not.toContain(EMBER);
    expect(iconSvg).not.toMatch(/flame|vlam|ember/i);
  });

  it("rasters favicon 32 and apple-touch 180 as cream-on-ink only", () => {
    const favicon = readPng(resolve(publicDir, "favicon-32.png"));
    const touch = readPng(resolve(publicDir, "apple-touch-icon.png"));
    expect(favicon).toMatchObject({ w: 32, h: 32 });
    expect(touch).toMatchObject({ w: 180, h: 180 });

    for (const png of [favicon, touch]) {
      let ink = 0;
      let cream = 0;
      for (let i = 0; i < png.data.length; i += 4) {
        const r = png.data[i];
        const g = png.data[i + 1];
        const b = png.data[i + 2];
        const emberLike = r > 180 && g < 120 && b < 100 && r - g > 80;
        expect(emberLike).toBe(false);
        if (near(r, INK.r, 8) && near(g, INK.g, 8) && near(b, INK.b, 8)) ink += 1;
        if (near(r, CREAM.r, 36) && near(g, CREAM.g, 36) && near(b, CREAM.b, 36)) cream += 1;
      }
      expect(ink).toBeGreaterThan(png.w * png.h * 0.45);
      expect(cream).toBeGreaterThan(10);
    }
  });

  it("does not wipe the live local key", () => {
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
  });
});
