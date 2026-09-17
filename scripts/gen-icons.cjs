// Generates PWA icons: rounded emerald square + white "L" monogram.
// Pure Node (zlib) — no image deps needed.
const zlib = require('zlib');
const fs = require('fs');

const crcTable = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

function makeIcon(size) {
  const W = size, H = size;
  const bg = [16, 185, 129];   // #10b981 emerald
  const white = [255, 255, 255];
  const r = Math.round(size * 0.18);          // corner radius
  // "L" geometry (fractions of size)
  const stemW = Math.round(size * 0.16);
  const barH = Math.round(size * 0.16);
  const stemX = Math.round(size * 0.30);
  const stemTop = Math.round(size * 0.24);
  const barBottom = Math.round(size * 0.78);

  const raw = Buffer.alloc(H * (1 + W * 4));
  const insideRounded = (x, y) => {
    const cx = Math.min(Math.max(x, r), W - r);
    const cy = Math.min(Math.max(y, r), H - r);
    return (x - cx) ** 2 + (y - cy) ** 2 <= r * r || (x >= r && x < W - r) || (y >= r && y < H - r);
  };
  for (let y = 0; y < H; y++) {
    const row = y * (1 + W * 4);
    raw[row] = 0; // filter: none
    for (let x = 0; x < W; x++) {
      const px = row + 1 + x * 4;
      let c = [0, 0, 0, 0];
      if (insideRounded(x, y)) {
        c = [...bg, 255];
        const inStem = x >= stemX && x < stemX + stemW && y >= stemTop && y < barBottom;
        const inBar = y >= barBottom - barH && y < barBottom && x >= stemX && x < stemX + Math.round(size * 0.42);
        if (inStem || inBar) c = [...white, 255];
      }
      raw[px] = c[0]; raw[px + 1] = c[1]; raw[px + 2] = c[2]; raw[px + 3] = c[3];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  fs.writeFileSync(`public/${name}`, makeIcon(size));
  console.log(`wrote public/${name} (${size}x${size})`);
}
