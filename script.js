const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const catchInput = $("#catchInput");
const catchPreview = $("#catchPreview");
const catchPreviewText = $("#catchPreviewText");
const catchCount = $("#catchCount");
const styleTagPreview = $("#styleTagPreviewText");
const styleTagInputs = $$('input[name="styleTag"]');

const I18N = {
  ja: {
    navCreate: "つくる",
    createSectionHeading: "つくる",
    heroTitle: '<span class="hero-line">お気に入りのミラプリを、</span><span class="hero-line">もっと魅せる一枚に。</span>',
    heroDescription: "複数のスクリーンショットと装備情報を組み合わせて、雑誌のようなミラプリ紹介画像を作成できる非公式Webツールです。",
    communityButton: "みんなの投稿を見る",
    editHeading: "編集",
    commentLabel: "ひとこと（最大150文字）",
    commentPlaceholder: "ミラプリのテーマやこだわりをひとこと",
    image1Heading: "画像1",
    image2Heading: "画像2",
    image3Heading: "画像3",
    zoomLabel: "拡大率",
    equipmentControlHeading: "使用装備",
    equipmentControlNote: "各部位を開き、装備名を検索して候補から選択してください。染色1・染色2は色系統ごとの一覧から選べます。",
    resetButton: "画像位置・拡大率を初期状態に戻す",
    exportButton: "画像を書き出す",
    exportWorking: "画像を作成しています…",
    exportDone: "PNGを書き出しました。",
    exportError: "画像の書き出しに失敗しました。ネット接続や画像読み込み状態を確認してください。",
    equipmentSearchPlaceholder: "装備名を入力",
    equipmentSearchButton: "検索",
    equipmentSearching: "検索中…",
    equipmentNoResults: "この部位で一致する装備が見つかりませんでした。",
    equipmentSearchError: "検索に失敗しました。ネット接続を確認してください。",
    equipmentSelect: "選択",
    equipmentClear: "選択解除",
    dye1: "染色1",
    dye2: "染色2",
    dyeNone: "なし",
    dyeLoading: "染色一覧を読み込み中…",
    dyeLoadError: "染色一覧を取得できませんでした。",
    noEquipment: "未選択",
    xPostButton: "Xに投稿する",
    xPostNote: "「#魅せるミラプリ」と選択したSTYLE TAGを投稿文に入れます。",
    placeholder1: "画像1",
    placeholder2: "画像2",
    placeholder3: "画像3",
    equipmentSmall: "使用装備一覧",
    notSelected: "－",
    dyeLabel: "染色：",
    aboutLead: "GLAMOUR LOOKBOOKは、EORZEA PROFILE STUDIOシリーズの一つとして、FINAL FANTASY XIVのミラプリをテーマに、複数のスクリーンショットと装備情報を組み合わせた紹介画像を作成できる非公式Webツールです。",
    disclaimerHeading: "免責事項",
    disclaimerText: "本サイトおよび各ツールは個人が制作・運営する非公式Webツールであり、株式会社スクウェア・エニックスとは関係ありません。本サイトの利用によって生じた損害・不利益について、制作者は責任を負いかねます。",
    controlsAria: "編集パネル",
    previewAria: "完成画像プレビュー",
    commentAria: "ひとこと",
    equipmentAria: "使用装備一覧"
  },
  en: {
    navCreate: "CREATE",
    createSectionHeading: "CREATE",
    heroTitle: '<span class="hero-line">Show your favorite glamour.</span><span class="hero-line">Make it a statement.</span>',
    heroDescription: "Combine multiple screenshots and gear information to create a magazine-style glamour showcase image with this unofficial web tool.",
    communityButton: "VIEW COMMUNITY POSTS",
    editHeading: "EDIT",
    commentLabel: "COMMENT (Max. 150 characters)",
    commentPlaceholder: "Write a short note about the theme or details of your glamour",
    image1Heading: "IMAGE 1",
    image2Heading: "IMAGE 2",
    image3Heading: "IMAGE 3",
    zoomLabel: "ZOOM",
    equipmentControlHeading: "EQUIPMENT",
    equipmentControlNote: "Open a slot, search for an item, and select it from the results. Dye 1 and Dye 2 use color-grouped pickers.",
    resetButton: "RESET IMAGE POSITION / ZOOM",
    exportButton: "EXPORT IMAGE",
    exportWorking: "Rendering image…",
    exportDone: "PNG exported.",
    exportError: "Export failed. Check your connection and image loading status.",
    equipmentSearchPlaceholder: "Search item name",
    equipmentSearchButton: "SEARCH",
    equipmentSearching: "Searching…",
    equipmentNoResults: "No matching item was found for this slot.",
    equipmentSearchError: "Search failed. Check your internet connection.",
    equipmentSelect: "SELECT",
    equipmentClear: "CLEAR",
    dye1: "DYE 1",
    dye2: "DYE 2",
    dyeNone: "None",
    dyeLoading: "Loading dyes…",
    dyeLoadError: "Could not load dye list.",
    noEquipment: "Not selected",
    xPostButton: "POST TO X",
    xPostNote: "The post text keeps #魅せるミラプリ and adds the selected STYLE TAG.",
    placeholder1: "IMAGE 1",
    placeholder2: "IMAGE 2",
    placeholder3: "IMAGE 3",
    equipmentSmall: "EQUIPMENT LIST",
    notSelected: "－",
    dyeLabel: "Dye:",
    aboutLead: "GLAMOUR LOOKBOOK is an unofficial web tool in the EORZEA PROFILE STUDIO series for creating magazine-style glamour showcase images by combining multiple FINAL FANTASY XIV screenshots with gear information.",
    disclaimerHeading: "Disclaimer",
    disclaimerText: "This site and its tools are unofficial web tools independently created and operated by an individual and are not affiliated with Square Enix Co., Ltd. The creator cannot be held responsible for any loss or disadvantage arising from use of this site.",
    controlsAria: "Edit panel",
    previewAria: "Completed image preview",
    commentAria: "Comment",
    equipmentAria: "Equipment list"
  }
};

let currentLang = "ja";

function applyLanguage(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang === "ja" ? "ja" : "en";

  $$('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (I18N[lang][key] != null) node.textContent = I18N[lang][key];
  });

  $$('[data-i18n-html]').forEach((node) => {
    const key = node.dataset.i18nHtml;
    if (I18N[lang][key] != null) node.innerHTML = I18N[lang][key];
  });

  $$('[data-i18n-placeholder]').forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (I18N[lang][key] != null) node.placeholder = I18N[lang][key];
  });

  $$('[data-i18n-aria]').forEach((node) => {
    const key = node.dataset.i18nAria;
    if (I18N[lang][key] != null) node.setAttribute('aria-label', I18N[lang][key]);
  });

  $$('.language-button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === lang);
  });

  try { localStorage.setItem('glamourLookbookLanguage', lang); } catch (_) {}
  if (typeof renderEquipmentEditors === "function") renderEquipmentEditors();
  if (typeof renderAllEquipmentPreview === "function") renderAllEquipmentPreview();
  requestAnimationFrame(fitCatchCopy);
}

$$('.language-button').forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

function fitCatchCopy() {
  if (!catchPreview || !catchPreviewText) return;

  const magazine = $("#magazine");
  const magazineWidth = magazine?.clientWidth || 900;

  const maxPx = Math.max(11, magazineWidth * 0.0218);
  const minPx = Math.max(9.2, magazineWidth * 0.0167);

  const styles = getComputedStyle(catchPreview);
  const paddingTop = parseFloat(styles.paddingTop) || 0;
  const paddingBottom = parseFloat(styles.paddingBottom) || 0;
  const availableTextHeight = Math.max(
    1,
    catchPreview.clientHeight - paddingTop - paddingBottom - 2
  );

  let size = maxPx;
  catchPreviewText.style.lineHeight = "1.20";
  catchPreviewText.style.height = "auto";
  catchPreviewText.style.maxHeight = `${availableTextHeight}px`;

  while (size > minPx) {
    catchPreviewText.style.fontSize = `${size}px`;
    const lineHeight = size * 1.20;
    const estimatedLines = Math.ceil(catchPreviewText.scrollHeight / lineHeight);

    if (
      catchPreviewText.scrollHeight <= availableTextHeight &&
      estimatedLines <= 5
    ) {
      break;
    }

    size -= 0.2;
  }

  catchPreviewText.style.fontSize = `${Math.max(minPx, size)}px`;
}

function updateCatchCopy() {
  catchPreviewText.textContent = catchInput.value;
  catchCount.textContent = catchInput.value.length;
  requestAnimationFrame(fitCatchCopy);
}
catchInput.addEventListener("input", updateCatchCopy);
updateCatchCopy();

function getSelectedStyleTag() {
  return styleTagInputs.find((input) => input.checked)?.value || "CUTE";
}
function updateStyleTag() {
  styleTagPreview.textContent = getSelectedStyleTag();
  requestAnimationFrame(fitCatchCopy);
}
styleTagInputs.forEach((input) => input.addEventListener("change", updateStyleTag));
updateStyleTag();

function bindImage(inputId, previewId, xId, yId, zoomId) {
  const input = $(inputId);
  const image = $(previewId);
  const x = $(xId);
  const y = $(yId);
  const zoom = $(zoomId);
  const frame = image.closest(".image-frame");
  const placeholder = frame.querySelector(".placeholder");
  let objectUrl = null;

  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    image.src = objectUrl;
    image.hidden = false;
    placeholder.hidden = true;
  });

  const updateImageView = () => {
    const xValue = Number(x.value);
    const yValue = Number(y.value);
    const zoomScale = Number(zoom.value) / 100;
    image.style.objectPosition = `${xValue}% ${yValue}%`;
    image.style.transformOrigin = `${xValue}% ${yValue}%`;
    image.style.transform = `scale(${zoomScale})`;
  };

  x.addEventListener("input", updateImageView);
  y.addEventListener("input", updateImageView);
  zoom.addEventListener("input", updateImageView);
  updateImageView();
}

bindImage("#image1Input", "#image1Preview", "#image1X", "#image1Y", "#image1Zoom");
bindImage("#image2Input", "#image2Preview", "#image2X", "#image2Y", "#image2Zoom");
bindImage("#image3Input", "#image3Preview", "#image3X", "#image3Y", "#image3Zoom");

$("#resetButton").addEventListener("click", () => {
  ["#image1X", "#image1Y", "#image2X", "#image2Y", "#image3X", "#image3Y"].forEach((id) => {
    $(id).value = 50;
    $(id).dispatchEvent(new Event("input"));
  });
  ["#image1Zoom", "#image2Zoom", "#image3Zoom"].forEach((id) => {
    $(id).value = 100;
    $(id).dispatchEvent(new Event("input"));
  });
});


// ===== 装備検索 / 選択 =====
// データベースは持たず、XIVAPI v2 の Item 検索を利用する。
// 検索結果は EquipSlotCategory の各フラグで部位ごとに絞り込む。
const XIVAPI_BASE = "https://v2.xivapi.com";
const equipmentEditors = $("#equipmentEditors");

const EQUIPMENT_SLOTS = [
  { key: "head",      preview: "HEAD",      ja: "頭",     en: "HEAD",      apiFields: ["Head"] },
  { key: "body",      preview: "BODY",      ja: "胴",     en: "BODY",      apiFields: ["Body"] },
  { key: "hands",     preview: "HANDS",     ja: "手",     en: "HANDS",     apiFields: ["Gloves"] },
  { key: "legs",      preview: "LEGS",      ja: "脚",     en: "LEGS",      apiFields: ["Legs"] },
  { key: "feet",      preview: "FEET",      ja: "足",     en: "FEET",      apiFields: ["Feet"] },
  { key: "earrings",  preview: "EARRINGS",  ja: "耳",     en: "EARRINGS",  apiFields: ["Ears"] },
  { key: "necklace",  preview: "NECKLACE",  ja: "首",     en: "NECKLACE",  apiFields: ["Neck"] },
  { key: "bracelets", preview: "BRACELETS", ja: "腕",     en: "BRACELETS", apiFields: ["Wrists"] },
  { key: "ring1",     preview: "RING 1",    ja: "指輪1",  en: "RING 1",    apiFields: ["Finger"] },
  { key: "ring2",     preview: "RING 2",    ja: "指輪2",  en: "RING 2",    apiFields: ["Finger"] },
  { key: "weapon",    preview: "WEAPON",    ja: "武器",   en: "WEAPON",    apiFields: ["MainHand", "OffHand"] }
];

const SLOT_FIELD_NAMES = [
  "MainHand", "OffHand", "Head", "Body", "Gloves",
  "Legs", "Feet", "Ears", "Neck", "Wrists", "Finger"
];

const equipmentState = Object.fromEntries(
  EQUIPMENT_SLOTS.map((slot) => [
    slot.key,
    { item: null, dye1: "", dye2: "", results: [], status: "", searching: false, open: false, query: "", openDye: "" }
  ])
);


let dyeCatalog = [];
let dyeCatalogStatus = "loading";

const DYE_GROUP_LABELS = {
  white:   { ja: "白系",               en: "WHITE" },
  red:     { ja: "赤系",               en: "RED" },
  brown:   { ja: "茶系",               en: "BROWN" },
  yellow:  { ja: "黄系",               en: "YELLOW" },
  green:   { ja: "緑系",               en: "GREEN" },
  blue:    { ja: "青系",               en: "BLUE" },
  purple:  { ja: "紫系",               en: "PURPLE" },
  special: { ja: "スペシャルカラー系", en: "SPECIAL COLORS" }
};

const DYE_GROUP_ORDER = [
  "white", "red", "brown", "yellow",
  "green", "blue", "purple", "special"
];

// FFXIVの染色パレットで使われる代表的な色系統を、英語名で明示的に割り当てる。
// APIに将来追加された色は、下の名前判定 → 色相判定の順にフォールバックする。
const FFXIV_DYE_GROUPS = {
  white: new Set([
    "Snow White", "Ash Grey", "Goobbue Grey", "Slate Grey",
    "Charcoal Grey", "Soot Black"
  ]),
  red: new Set([
    "Rose Pink", "Lilac Purple", "Rolanberry Red", "Dalamud Red", "Neon Pink",
    "Rust Red", "Wine Red", "Coral Pink", "Blood Red", "Salmon Pink"
  ]),
  brown: new Set([
    "Sunset Orange", "Mesa Red", "Bark Brown", "Chocolate Brown",
    "Russet Brown", "Kobold Brown", "Cork Brown", "Qiqirn Brown",
    "Opo-opo Brown", "Aldgoat Brown", "Pumpkin Orange", "Acorn Brown",
    "Orchard Brown", "Chestnut Brown", "Gobbiebag Brown", "Shale Brown",
    "Mole Brown", "Loam Brown"
  ]),
  yellow: new Set([
    "Bone White", "Ul Brown", "Desert Yellow", "Honey Yellow", "Neon Yellow",
    "Cream Yellow", "Halatali Yellow"
  ]),
  green: new Set([
    "Mud Green", "Sylph Green", "Lime Green", "Moss Green", "Neon Green",
    "Meadow Green", "Olive Green", "Marsh Green", "Apple Green",
    "Cactuar Green", "Hunter Green", "Ochu Green", "Adamantoise Green",
    "Nophica Green", "Deepwood Green", "Celeste Green",
    "Turquoise Green", "Morbol Green"
  ]),
  blue: new Set([
    "Ice Blue", "Sky Blue", "Seafog Blue", "Peacock Blue",
    "Rhotano Blue", "Corpse Blue", "Ceruleum Blue", "Woad Blue",
    "Ink Blue", "Raptor Blue", "Othard Blue", "Storm Blue",
    "Void Blue", "Royal Blue", "Midnight Blue", "Shadow Blue",
    "Abyssal Blue"
  ]),
  purple: new Set([
    "Lavender Purple", "Gloom Purple", "Currant Purple", "Iris Purple",
    "Grape Purple", "Lotus Pink", "Colibri Pink", "Plum Purple",
    "Regal Purple"
  ])
};

const SPECIAL_DYE_NAMES = new Set([
  "Pure White", "Jet Black",
  "Pastel Pink", "Dark Red", "Dark Brown",
  "Pastel Green", "Dark Green",
  "Pastel Blue", "Dark Blue",
  "Pastel Purple", "Dark Purple",
  "Metallic Silver", "Metallic Gold",
  "Metallic Red", "Metallic Orange", "Metallic Yellow",
  "Metallic Green", "Metallic Sky Blue", "Metallic Blue", "Metallic Purple",
  "Gunmetal Black", "Pearl White", "Metallic Brass",
  "Carmine Red", "Bright Orange",
  "Azure Blue", "Violet Purple",
  "Metallic Pink", "Metallic Ruby Red",
  "Metallic Cobalt Green", "Metallic Dark Blue",
  "Shine Silver"
]);

function colorValueToHex(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return `#${(value >>> 0).toString(16).padStart(6, "0").slice(-6)}`;
  }
  if (typeof value === "string") {
    const raw = value.trim().replace(/^#/, "");
    if (/^[0-9a-f]{6}$/i.test(raw)) return `#${raw}`;
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return `#${(parsed >>> 0).toString(16).padStart(6, "0").slice(-6)}`;
    }
  }
  if (value && typeof value === "object") {
    return colorValueToHex(value.value ?? value.hex ?? value.color ?? 0);
  }
  return "#ffffff";
}

function hexToHsv(hex) {
  const raw = hex.replace("#", "");
  const r = parseInt(raw.slice(0, 2), 16) / 255;
  const g = parseInt(raw.slice(2, 4), 16) / 255;
  const b = parseInt(raw.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * (((b - r) / d) + 2);
    else h = 60 * (((r - g) / d) + 4);
  }
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

function classifyDye(jaName, enName, hex) {
  const english = String(enName || "").trim();

  for (const [group, names] of Object.entries(FFXIV_DYE_GROUPS)) {
    if (names.has(english)) return group;
  }

  if (
    SPECIAL_DYE_NAMES.has(english) ||
    /^(General-purpose )/i.test(english) ||
    /\b(Metallic|Pastel|Neon)\b/i.test(english) ||
    /\b(Pure White|Jet Black|Gunmetal|Pearl White|Brass)\b/i.test(english)
  ) {
    return "special";
  }

  // 名前から明確に判定できる新規色。
  const lower = english.toLowerCase();

  if (
    lower.includes("white") || lower.includes("grey") ||
    lower.includes("gray") || lower.includes("black")
  ) return "white";

  if (
    lower.includes("brown") || lower.includes("orange")
  ) return "brown";

  if (
    lower.includes("yellow") || lower.includes("gold")
  ) return "yellow";

  if (lower.includes("green")) return "green";

  if (
    lower.includes("blue") || lower.includes("cyan") ||
    lower.includes("turquoise")
  ) return "blue";

  if (lower.includes("purple") || lower.includes("violet")) return "purple";

  if (lower.includes("red") || lower.includes("pink")) return "red";

  // 最後のフォールバックのみ色相を利用。
  const { h, s, v } = hexToHsv(hex);

  if (s < 0.16 || v < 0.16) return "white";
  if (h < 20 || h >= 338) return "red";
  if (h < 50) return "brown";
  if (h < 78) return "yellow";
  if (h < 168) return "green";
  if (h < 255) return "blue";
  return "purple";
}

async function fetchAllStains(language) {
  const rows = [];
  let after = null;

  for (let page = 0; page < 5; page++) {
    const params = new URLSearchParams({
      fields: "Name,Color",
      language,
      limit: "500"
    });
    if (after != null) params.set("after", String(after));

    const response = await fetch(`${XIVAPI_BASE}/api/sheet/Stain?${params.toString()}`, { mode: "cors" });
    if (!response.ok) throw new Error(`Stain ${language}: ${response.status}`);
    const data = await response.json();
    const chunk = data.rows || [];
    rows.push(...chunk);

    if (!chunk.length) break;
    const lastId = chunk[chunk.length - 1]?.row_id;
    if (lastId == null || chunk.length < 500) break;
    after = lastId;
  }
  return rows;
}

async function loadDyeCatalog() {
  dyeCatalogStatus = "loading";
  renderEquipmentEditors();

  try {
    const [jaRows, enRows] = await Promise.all([
      fetchAllStains("ja"),
      fetchAllStains("en")
    ]);

    const enMap = new Map(enRows.map((row) => [row.row_id, row]));
    dyeCatalog = jaRows
      .map((row) => {
        const jaName = String(row.fields?.Name || "").trim();
        if (!jaName) return null;
        const enRow = enMap.get(row.row_id);
        const enName = String(enRow?.fields?.Name || jaName).trim();
        const hex = colorValueToHex(row.fields?.Color);
        return {
          id: String(row.row_id),
          ja: jaName,
          en: enName,
          hex,
          group: classifyDye(jaName, enName, hex)
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const groupDiff = DYE_GROUP_ORDER.indexOf(a.group) - DYE_GROUP_ORDER.indexOf(b.group);
        if (groupDiff !== 0) return groupDiff;
        return a.ja.localeCompare(b.ja, "ja");
      });

    dyeCatalogStatus = "ready";
  } catch (error) {
    console.error(error);
    dyeCatalog = [];
    dyeCatalogStatus = "error";
  }

  renderEquipmentEditors();
  renderAllEquipmentPreview();
}

function getDyeById(id) {
  if (!id) return null;
  return dyeCatalog.find((dye) => dye.id === String(id)) || null;
}

function getDyeName(id) {
  const dye = getDyeById(id);
  if (!dye) return "";
  return currentLang === "en" ? dye.en : dye.ja;
}

function getDyeHex(id) {
  return getDyeById(id)?.hex || "";
}

function buildDyeMenu(selectedId, slotKey, dyeKey) {
  if (dyeCatalogStatus === "loading") {
    return `<div class="dye-group-title">${escapeHtml(I18N[currentLang].dyeLoading)}</div>`;
  }
  if (dyeCatalogStatus === "error") {
    return `<div class="dye-group-title">${escapeHtml(I18N[currentLang].dyeLoadError)}</div>`;
  }

  const grouped = {};
  dyeCatalog.forEach((dye) => {
    (grouped[dye.group] ||= []).push(dye);
  });

  const groupOrder = DYE_GROUP_ORDER;
  let html = `
    <button type="button"
      class="dye-option dye-option-none ${!selectedId ? "is-selected" : ""}"
      data-dye-action="choose"
      data-slot="${slotKey}"
      data-dye-key="${dyeKey}"
      data-dye-id="">
      ${escapeHtml(I18N[currentLang].dyeNone)}
    </button>
  `;

  groupOrder.forEach((groupKey) => {
    const dyes = grouped[groupKey] || [];
    if (!dyes.length) return;

    const label = DYE_GROUP_LABELS[groupKey]?.[currentLang] || groupKey.toUpperCase();
    html += `<div class="dye-group-title">${escapeHtml(label)}</div>`;

    dyes.forEach((dye) => {
      const name = currentLang === "en" ? dye.en : dye.ja;
      const selected = String(selectedId || "") === dye.id ? " is-selected" : "";
      html += `
        <button type="button"
          class="dye-option${selected}"
          data-dye-action="choose"
          data-slot="${slotKey}"
          data-dye-key="${dyeKey}"
          data-dye-id="${escapeHtml(dye.id)}">
          <span class="dye-chip" style="background:${escapeHtml(dye.hex)}"></span>
          <span>${escapeHtml(name)}</span>
        </button>
      `;
    });
  });

  return html;
}

function getSlotLabel(slot) {
  return currentLang === "en" ? slot.en : slot.ja;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeSearchValue(value = "") {
  return String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function getEquipSlotFields(result) {
  const equip = result?.fields?.EquipSlotCategory;
  return equip?.fields || {};
}

function itemMatchesSlot(result, slot) {
  const fields = getEquipSlotFields(result);
  return slot.apiFields.some((field) => Number(fields?.[field] || 0) > 0);
}

function getIconPath(result) {
  const icon = result?.fields?.Icon;
  return icon?.path_hr1 || icon?.path || "";
}

function getAssetUrl(path) {
  if (!path) return "";
  return `${XIVAPI_BASE}/api/asset?path=${encodeURIComponent(path)}&format=png`;
}

async function imageUrlToDataUrl(url) {
  if (!url) return "";
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(`asset ${response.status}`);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (_) {
    // 表示だけでも行えるよう、CORS変換失敗時は元URLを保持する。
    return url;
  }
}

function renderEquipmentEditors() {
  if (!equipmentEditors) return;

  equipmentEditors.innerHTML = EQUIPMENT_SLOTS.map((slot) => {
    const state = equipmentState[slot.key];
    const selectedName = state.item?.name || (I18N[currentLang]?.noEquipment || "");
    const openAttr = state.open ? " open" : "";
    const searchingClass = state.searching ? " is-searching" : "";
    const dyeOpenClass = state.openDye ? " has-dye-open" : "";
    const resultsHtml = state.results.map((item) => `
      <button type="button" class="equipment-result" data-equipment-action="select" data-slot="${slot.key}" data-row-id="${item.rowId}">
        ${item.iconUrl ? `<img src="${escapeHtml(item.iconUrl)}" alt="">` : `<span></span>`}
        <span>${escapeHtml(item.name)}</span>
      </button>
    `).join("");

    function dyePickerHtml(dyeKey) {
      const selectedId = state[dyeKey];
      const dye = getDyeById(selectedId);
      const dyeName = dye ? (currentLang === "en" ? dye.en : dye.ja) : I18N[currentLang].dyeNone;
      const isOpen = state.openDye === dyeKey;
      const chipStyle = dye ? `background:${escapeHtml(dye.hex)}` : "";

      return `
        <div class="dye-picker ${isOpen ? "is-open" : ""}">
          <button type="button"
            class="dye-picker-button"
            data-dye-action="toggle"
            data-slot="${slot.key}"
            data-dye-key="${dyeKey}">
            <span class="dye-chip" style="${chipStyle}"></span>
            <span class="dye-picker-label">${escapeHtml(dyeName)}</span>
          </button>
          ${isOpen ? `<div class="dye-menu">${buildDyeMenu(selectedId, slot.key, dyeKey)}</div>` : ""}
        </div>
      `;
    }

    return `
      <details class="equipment-editor${searchingClass}${dyeOpenClass}" data-equipment-editor="${slot.key}"${openAttr}>
        <summary>
          <span class="equipment-editor-slot">${escapeHtml(getSlotLabel(slot))}</span>
          <span class="equipment-editor-current">${escapeHtml(selectedName)}</span>
        </summary>

        <div class="equipment-editor-body">
          <div class="equipment-search-row">
            <input
              class="equipment-search-input"
              type="search"
              maxlength="80"
              data-equipment-search="${slot.key}"
              placeholder="${escapeHtml(I18N[currentLang].equipmentSearchPlaceholder)}"
              value="${escapeHtml(state.query)}"
            >
            <button
              type="button"
              class="equipment-search-button"
              data-equipment-action="search"
              data-slot="${slot.key}"
              ${state.searching ? "disabled" : ""}
            >${escapeHtml(state.searching ? I18N[currentLang].equipmentSearching : I18N[currentLang].equipmentSearchButton)}</button>
          </div>

          <p class="equipment-search-status">${escapeHtml(state.status)}</p>
          <div class="equipment-results">${resultsHtml}</div>

          <div class="equipment-selected ${state.item ? "is-visible" : ""}">
            ${state.item?.iconDataUrl || state.item?.iconUrl
              ? `<img class="equipment-selected-icon" src="${escapeHtml(state.item.iconDataUrl || state.item.iconUrl)}" alt="">`
              : `<span class="equipment-selected-icon"></span>`}
            <p class="equipment-selected-name">${escapeHtml(state.item?.name || "")}</p>

            <div class="equipment-dyes">
              <label class="dye-field">
                <span>${escapeHtml(I18N[currentLang].dye1)}</span>
                ${dyePickerHtml("dye1")}
              </label>
              <label class="dye-field">
                <span>${escapeHtml(I18N[currentLang].dye2)}</span>
                ${dyePickerHtml("dye2")}
              </label>
            </div>

            <div class="equipment-selected-actions">
              <button type="button" class="equipment-clear-button" data-equipment-action="clear" data-slot="${slot.key}">
                ${escapeHtml(I18N[currentLang].equipmentClear)}
              </button>
            </div>
          </div>
        </div>
      </details>
    `;
  }).join("");
}

async function searchEquipment(slotKey, queryText) {
  const slot = EQUIPMENT_SLOTS.find((item) => item.key === slotKey);
  const state = equipmentState[slotKey];
  if (!slot || !state) return;

  state.open = true;
  state.query = queryText;

  const query = queryText.trim();
  if (query.length < 2) {
    state.status = currentLang === "en" ? "Enter at least 2 characters." : "2文字以上入力してください。";
    state.results = [];
    renderEquipmentEditors();
    return;
  }

  state.searching = true;
  state.open = true;
  state.query = queryText;
  state.status = I18N[currentLang].equipmentSearching;
  state.results = [];
  renderEquipmentEditors();

  // XIVAPI側で「装備名」と「装備部位」を必須条件にして検索する。
  // 日本語UIでは Name@ja を指定。武器のみ MainHand / OffHand のOR条件。
  const language = currentLang === "en" ? "en" : "ja";
  const nameField = currentLang === "ja" ? "Name@ja" : "Name";
  const nameClause = `+${nameField}~"${escapeSearchValue(query)}"`;

  const slotClause = slot.apiFields.length === 1
    ? `+EquipSlotCategory.${slot.apiFields[0]}=true`
    : `+(${slot.apiFields.map((field) => `EquipSlotCategory.${field}=true`).join(" ")})`;

  const searchQuery = `${nameClause} ${slotClause}`;
  const fields = "Name,Icon";

  const url = `${XIVAPI_BASE}/api/search?` + new URLSearchParams({
    sheets: "Item",
    fields,
    query: searchQuery,
    language,
    limit: "20"
  }).toString();

  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(`XIVAPI ${response.status}`);
    const data = await response.json();

    const results = (data.results || [])
      .slice(0, 10)
      .map((result) => {
        const iconPath = getIconPath(result);
        return {
          rowId: result.row_id,
          name: result.fields?.Name || `Item ${result.row_id}`,
          iconPath,
          iconUrl: getAssetUrl(iconPath)
        };
      });

    state.results = results;
    state.status = results.length ? "" : I18N[currentLang].equipmentNoResults;
  } catch (error) {
    console.error(error);
    state.results = [];
    state.status = I18N[currentLang].equipmentSearchError;
  } finally {
    state.searching = false;
    renderEquipmentEditors();
  }
}

async function selectEquipment(slotKey, rowId) {
  const state = equipmentState[slotKey];
  const result = state?.results.find((item) => Number(item.rowId) === Number(rowId));
  if (!state || !result) return;

  const iconDataUrl = await imageUrlToDataUrl(result.iconUrl);
  state.item = { ...result, iconDataUrl };
  state.results = [];
  state.status = "";
  state.open = true;
  renderEquipmentEditors();
  renderEquipmentPreview(slotKey);
}

function clearEquipment(slotKey) {
  const state = equipmentState[slotKey];
  if (!state) return;
  state.item = null;
  state.dye1 = "";
  state.dye2 = "";
  state.results = [];
  state.status = "";
  state.open = true;
  renderEquipmentEditors();
  renderEquipmentPreview(slotKey);
}

function renderEquipmentPreview(slotKey) {
  const state = equipmentState[slotKey];
  const slotNode = document.querySelector(`[data-gear-slot="${slotKey}"]`);
  if (!state || !slotNode) return;

  const iconNode = slotNode.querySelector(".gear-icon");
  const nameNode = slotNode.querySelector(".gear-name");
  const dyesNode = slotNode.querySelector(".gear-dyes");
  const slotDef = EQUIPMENT_SLOTS.find((slot) => slot.key === slotKey);
  const initial = slotDef?.preview?.slice(0, 1) || "?";

  if (state.item) {
    const iconSrc = state.item.iconDataUrl || state.item.iconUrl;
    iconNode.innerHTML = iconSrc
      ? `<img src="${escapeHtml(iconSrc)}" alt="">`
      : `<span>${escapeHtml(initial)}</span>`;
    nameNode.textContent = state.item.name;
    nameNode.removeAttribute("data-i18n");
  } else {
    iconNode.innerHTML = `<span>${escapeHtml(initial)}</span>`;
    nameNode.textContent = I18N[currentLang].notSelected;
    nameNode.setAttribute("data-i18n", "notSelected");
  }

  const dyeIds = [state.dye1, state.dye2].filter(Boolean);
  dyesNode.innerHTML = dyeIds.map((id) => {
    const dye = getDyeById(id);
    if (!dye) return "";
    const name = currentLang === "en" ? dye.en : dye.ja;
    return `
      <span class="gear-dye-line">
        <span class="gear-dye-chip" style="background:${escapeHtml(dye.hex)}"></span>
        <span class="gear-dye-name">${escapeHtml(name)}</span>
      </span>
    `;
  }).join("");
  dyesNode.hidden = dyeIds.length === 0;
}

function renderAllEquipmentPreview() {
  EQUIPMENT_SLOTS.forEach((slot) => renderEquipmentPreview(slot.key));
}

equipmentEditors?.addEventListener("click", (event) => {
  const dyeButton = event.target.closest("[data-dye-action]");
  if (dyeButton) {
    event.preventDefault();
    event.stopPropagation();

    const slotKey = dyeButton.dataset.slot;
    const dyeKey = dyeButton.dataset.dyeKey;
    const state = equipmentState[slotKey];
    if (!state) return;

    state.open = true;

    if (dyeButton.dataset.dyeAction === "toggle") {
      state.openDye = state.openDye === dyeKey ? "" : dyeKey;
      renderEquipmentEditors();
      return;
    }

    if (dyeButton.dataset.dyeAction === "choose") {
      state[dyeKey] = dyeButton.dataset.dyeId || "";
      state.openDye = "";
      renderEquipmentEditors();
      renderEquipmentPreview(slotKey);
      return;
    }
  }

  const button = event.target.closest("[data-equipment-action]");
  if (!button) return;

  const slotKey = button.dataset.slot;
  const action = button.dataset.equipmentAction;

  if (action === "search") {
    const input = equipmentEditors.querySelector(`[data-equipment-search="${slotKey}"]`);
    searchEquipment(slotKey, input?.value || "");
  } else if (action === "select") {
    selectEquipment(slotKey, button.dataset.rowId);
  } else if (action === "clear") {
    clearEquipment(slotKey);
  }
});

equipmentEditors?.addEventListener("keydown", (event) => {
  const input = event.target.closest("[data-equipment-search]");
  if (!input || event.key !== "Enter") return;
  event.preventDefault();
  searchEquipment(input.dataset.equipmentSearch, input.value);
});

equipmentEditors?.addEventListener("input", (event) => {
  const searchInput = event.target.closest("[data-equipment-search]");
  if (!searchInput) return;

  const state = equipmentState[searchInput.dataset.equipmentSearch];
  if (!state) return;
  state.query = searchInput.value;
});



document.addEventListener("click", (event) => {
  if (equipmentEditors?.contains(event.target)) return;

  let changed = false;
  EQUIPMENT_SLOTS.forEach((slot) => {
    const state = equipmentState[slot.key];
    if (state.openDye) {
      state.openDye = "";
      changed = true;
    }
  });
  if (changed) renderEquipmentEditors();
});

equipmentEditors?.addEventListener("toggle", (event) => {
  const details = event.target.closest?.("[data-equipment-editor]");
  if (!details) return;

  const state = equipmentState[details.dataset.equipmentEditor];
  if (!state) return;
  state.open = details.open;
}, true);

renderEquipmentEditors();
renderAllEquipmentPreview();
loadDyeCatalog();

// ===== 1200 x 1800 PNG 専用レンダラー =====
const exportButton = $("#exportButton");
const exportStatus = $("#exportStatus");

const OUTPUT_W = 1200;
const OUTPUT_H = 1800;

function pxX(percent) { return OUTPUT_W * percent / 100; }
function pxY(percent) { return OUTPUT_H * percent / 100; }

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    if (!src) return reject(new Error("empty image source"));
    const image = new Image();
    if (!src.startsWith("blob:") && !src.startsWith("data:")) {
      image.crossOrigin = "anonymous";
    }
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function sourceForCanvas(domImage) {
  if (!domImage || domImage.hidden || !domImage.src) return null;
  if (domImage.complete && domImage.naturalWidth > 0) return domImage;
  return await loadCanvasImage(domImage.src);
}

function drawCoverImage(ctx, image, frame, xPercent, yPercent, zoomPercent) {
  const { x, y, w, h } = frame;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  ctx.fillStyle = "#ecebe6";
  ctx.fillRect(x, y, w, h);

  if (!image) {
    ctx.restore();
    return;
  }

  // まずCSS object-fit:cover / object-position相当の基準画像を作る。
  const base = document.createElement("canvas");
  base.width = Math.max(1, Math.round(w));
  base.height = Math.max(1, Math.round(h));
  const bctx = base.getContext("2d");

  const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
  const renderW = image.naturalWidth * scale;
  const renderH = image.naturalHeight * scale;
  const posX = Math.max(0, Math.min(100, Number(xPercent))) / 100;
  const posY = Math.max(0, Math.min(100, Number(yPercent))) / 100;

  const dx = (w - renderW) * posX;
  const dy = (h - renderH) * posY;
  bctx.drawImage(image, dx, dy, renderW, renderH);

  // その上で、画面プレビューと同じく transform:scale() を
  // X/Y位置をtransform-originとして適用する。
  const zoom = Math.max(1, Number(zoomPercent) / 100);
  const originX = w * posX;
  const originY = h * posY;

  ctx.translate(x + originX, y + originY);
  ctx.scale(zoom, zoom);
  ctx.drawImage(base, -originX, -originY, w, h);
  ctx.restore();
}

function wrapCanvasText(ctx, text, maxWidth) {
  const lines = [];
  let line = "";

  for (const ch of String(text || "")) {
    if (ch === "\n") {
      lines.push(line);
      line = "";
      continue;
    }
    const test = line + ch;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line || !lines.length) lines.push(line);
  return lines;
}

function fitCanvasText(ctx, text, maxWidth, maxHeight, maxSize, minSize, family, weight="700", lineRatio=1.24) {
  let size = maxSize;
  let lines = [];

  while (size >= minSize) {
    ctx.font = `${weight} ${size}px ${family}`;
    lines = wrapCanvasText(ctx, text, maxWidth);
    const lineHeight = size * lineRatio;
    if (lines.length * lineHeight <= maxHeight) {
      return { size, lines, lineHeight };
    }
    size -= 1;
  }

  ctx.font = `${weight} ${minSize}px ${family}`;
  lines = wrapCanvasText(ctx, text, maxWidth);
  return { size: minSize, lines, lineHeight: minSize * lineRatio };
}

function drawCompressedText(ctx, text, x, y, font, color, scaleX=0.68, align="left") {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";

  const width = ctx.measureText(text).width * scaleX;
  let drawX = x;
  if (align === "center") drawX = x - width / 2;
  if (align === "right") drawX = x - width;

  ctx.translate(drawX, y);
  ctx.scale(scaleX, 1);
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

function drawVerticalTitle(ctx, text, x, bottomY) {
  const chars = [...text];
  const size = 90;
  const step = 88;
  const totalH = chars.length * step;
  let y = bottomY - totalH + step * 0.7;

  ctx.save();
  ctx.font = `900 ${size}px "Yu Mincho", "Hiragino Mincho ProN", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#ffffff";
  ctx.fillStyle = "#050505";

  chars.forEach((ch) => {
    ctx.strokeText(ch, x, y);
    ctx.fillText(ch, x, y);
    y += step;
  });
  ctx.restore();
}

async function drawEquipmentIcon(ctx, state, x, y, size, fallback) {
  ctx.fillStyle = "#f3f3ef";
  ctx.fillRect(x, y, size, size);
  ctx.strokeStyle = "#d6d6d0";
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, size, size);

  if (state?.item) {
    const src = state.item.iconDataUrl || state.item.iconUrl;
    if (src) {
      try {
        const img = await loadCanvasImage(src);
        ctx.drawImage(img, x, y, size, size);
        return;
      } catch (_) {}
    }
  }

  ctx.fillStyle = "#888";
  ctx.font = `16px Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(fallback, x + size / 2, y + size / 2);
}

function truncateCanvasText(ctx, text, maxWidth) {
  const value = String(text || "");
  if (ctx.measureText(value).width <= maxWidth) return value;

  let out = value;
  while (out.length && ctx.measureText(out + "…").width > maxWidth) {
    out = out.slice(0, -1);
  }
  return out + "…";
}

async function renderMagazineCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_W;
  canvas.height = OUTPUT_H;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, OUTPUT_W, OUTPUT_H);

  // Magazine logo
  const logoRight = OUTPUT_W - pxX(3.1);
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#b08a3e";
  ctx.font = `500 116px "Yu Mincho", "Times New Roman", serif`;
  ctx.fillText("GLAMOUR", logoRight, 106);
  ctx.fillStyle = "#171717";
  ctx.font = `500 77px "Yu Mincho", "Times New Roman", serif`;
  ctx.fillText("LOOKBOOK", logoRight, 170);

  // Comment frame
  const boxX = pxX(3.2);
  const boxY = pxY(6.5);
  const boxW = pxX(52.0);
  const boxH = pxY(8.4);

  // STYLE TAGは枠の「左上」に完全に重ねる。
  // ラベル名に応じて横幅を可変にし、ELEGANT等も欠けないようにする。
  const tag = getSelectedStyleTag();
  const tagH = 36;

  ctx.save();
  ctx.font = '900 22px Arial, "Arial Narrow", sans-serif';
  const measuredTagW = Math.ceil(ctx.measureText(tag).width);
  ctx.restore();

  const tagW = Math.max(88, Math.min(170, measuredTagW + 24));
  const tagX = boxX;
  const tagY = boxY - tagH / 2;

  // 線幅の半分だけ内側へ入れて、PNG上で枠線が外へはみ出さないようにする。
  const frameInset = 1;
  ctx.strokeStyle = "#929292";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(
    boxX + frameInset,
    boxY + frameInset,
    boxW - frameInset * 2,
    boxH - frameInset * 2
  );

  // STYLE TAGの背面だけ白で抜き、上辺の枠線がタグからはみ出して見えないようにする。
  const tagKnockout = 4;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(
    tagX - tagKnockout,
    tagY - tagKnockout,
    tagW + tagKnockout * 2,
    tagH + tagKnockout * 2
  );

  // STYLE TAG本体
  ctx.fillStyle = "#111111";
  ctx.fillRect(tagX, tagY, tagW, tagH);

  // タグ内だけにクリップした上で、白文字を中央に描画。
  // maxWidthも指定して、長いSTYLE TAGでも必ず黒帯内に収める。
  ctx.save();
  ctx.beginPath();
  ctx.rect(tagX, tagY, tagW, tagH);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '900 22px Arial, "Arial Narrow", sans-serif';
  ctx.fillText(
    tag,
    tagX + tagW / 2,
    tagY + tagH / 2 + 1,
    tagW - 16
  );
  ctx.restore();

  const comment = catchInput.value || "";
  if (comment) {
    const padX = 14;
    const padTop = 18;
    const padBottom = 11;
    const textX = boxX + padX;
    const textY = boxY + padTop;
    const textW = boxW - padX * 2;
    const textH = boxH - padTop - padBottom;

    const fitted = fitCanvasText(
      ctx,
      comment,
      textW,
      textH,
      26,
      19,
      '"Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif',
      "700",
      1.20
    );

    ctx.fillStyle = "#3b3b3b";
    ctx.font = `700 ${fitted.size}px "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    // 左揃えのまま、本文ブロック全体を下端基準に配置。
    const textBlockHeight = fitted.lines.length * fitted.lineHeight;
    const startY = textY + Math.max(0, textH - textBlockHeight);

    fitted.lines.forEach((line, i) => {
      ctx.fillText(line, textX, startY + i * fitted.lineHeight);
    });
  }

  // Image frames
  const frames = [
    { image: $("#image1Preview"), xInput: $("#image1X"), yInput: $("#image1Y"), zoomInput: $("#image1Zoom"), label: currentLang === "en" ? "IMAGE 1" : "画像1", frame: { x:pxX(3.2),  y:pxY(15.5), w:pxX(46.3), h:pxY(79.2) } },
    { image: $("#image2Preview"), xInput: $("#image2X"), yInput: $("#image2Y"), zoomInput: $("#image2Zoom"), label: currentLang === "en" ? "IMAGE 2" : "画像2", frame: { x:pxX(52.6), y:pxY(15.5), w:pxX(44.1), h:pxY(28.8) } },
    { image: $("#image3Preview"), xInput: $("#image3X"), yInput: $("#image3Y"), zoomInput: $("#image3Zoom"), label: currentLang === "en" ? "IMAGE 3" : "画像3", frame: { x:pxX(52.6), y:pxY(46.4), w:pxX(44.1), h:pxY(23.3) } }
  ];

  for (const def of frames) {
    const source = await sourceForCanvas(def.image).catch(() => null);
    drawCoverImage(
      ctx,
      source,
      def.frame,
      Number(def.xInput.value),
      Number(def.yInput.value),
      Number(def.zoomInput.value)
    );

    if (!source) {
      ctx.fillStyle = "#777";
      ctx.font = `700 24px "Yu Gothic", sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(def.label, def.frame.x + 16, def.frame.y + 14);
    }
  }

  // Vertical fixed title
  drawVerticalTitle(ctx, "#魅せるミラプリ", pxX(50.1), OUTPUT_H - pxY(8));

  // Equipment panel
  const eqX = pxX(52.6);
  const eqY = pxY(72.2);
  const eqW = pxX(44.1);
  const eqH = pxY(21.8);

  ctx.strokeStyle = "#d6d6d0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(eqX, eqY);
  ctx.lineTo(eqX + eqW, eqY);
  ctx.stroke();

  ctx.fillStyle = "#171717";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = `24px Georgia, "Times New Roman", serif`;
  ctx.fillText("EQUIPMENT", eqX + 14, eqY + 30);
  ctx.fillStyle = "#888";
  ctx.font = `10px "Yu Gothic", sans-serif`;
  ctx.fillText(currentLang === "en" ? "EQUIPMENT LIST" : "使用装備一覧", eqX + 152, eqY + 29);

  const rows = [
    ["head", "earrings"],
    ["body", "necklace"],
    ["hands", "bracelets"],
    ["legs", "ring1"],
    ["feet", "ring2"],
    ["weapon", null]
  ];

  const colGap = 14;
  const colW = (eqW - 28 - colGap) / 2;
  const startX = eqX + 14;
  const startY = eqY + 46;
  const rowH = 54;
  const iconSize = 30;

  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < 2; c++) {
      const key = rows[r][c];
      if (!key) continue;

      const slot = EQUIPMENT_SLOTS.find((s) => s.key === key);
      const state = equipmentState[key];
      const x = startX + c * (colW + colGap);
      const y = startY + r * rowH;

      await drawEquipmentIcon(ctx, state, x, y + 2, iconSize, slot.preview.slice(0, 1));

      const tx = x + iconSize + 8;
      const textW = colW - iconSize - 8;

      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#8f8f8f";
      ctx.font = `700 9px Arial, sans-serif`;
      ctx.fillText(slot.preview, tx, y + 1);

      ctx.fillStyle = "#444";
      ctx.font = `10px "Yu Gothic", sans-serif`;
      const itemName = state.item?.name || "－";
      ctx.fillText(truncateCanvasText(ctx, itemName, textW), tx, y + 13);

      const dyeIds = [state.dye1, state.dye2].filter(Boolean);
      dyeIds.slice(0, 2).forEach((id, dyeIndex) => {
        const dye = getDyeById(id);
        if (!dye) return;
        const dy = y + 27 + dyeIndex * 12;
        ctx.fillStyle = dye.hex;
        ctx.fillRect(tx, dy + 1, 8, 8);
        ctx.strokeStyle = "rgba(0,0,0,.2)";
        ctx.strokeRect(tx, dy + 1, 8, 8);

        ctx.fillStyle = "#777";
        ctx.font = `8px "Yu Gothic", sans-serif`;
        const dyeName = currentLang === "en" ? dye.en : dye.ja;
        ctx.fillText(truncateCanvasText(ctx, dyeName, textW - 13), tx + 13, dy);
      });
    }
  }

  // Footer credits
  const footerY = OUTPUT_H - 24;
  ctx.font = `700 9px Arial, sans-serif`;
  ctx.fillStyle = "#777";
  ctx.textBaseline = "middle";

  ctx.textAlign = "left";
  ctx.fillText("GLAMOUR LOOKBOOK Ver1.01", pxX(3.3), footerY);

  ctx.textAlign = "center";
  ctx.fillText("(C) SQUARE ENIX", OUTPUT_W / 2, footerY);

  ctx.textAlign = "right";
  ctx.fillText("#魅せるミラプリ", OUTPUT_W - pxX(3.3), footerY);

  return canvas;
}

async function exportMagazinePng() {
  exportButton.disabled = true;
  exportStatus.textContent = I18N[currentLang].exportWorking;

  try {
    if (document.fonts?.ready) await document.fonts.ready;
    const canvas = await renderMagazineCanvas();

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((value) => value ? resolve(value) : reject(new Error("toBlob failed")), "image/png");
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "GLAMOUR_LOOKBOOK.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);

    exportStatus.textContent = I18N[currentLang].exportDone;
  } catch (error) {
    console.error(error);
    exportStatus.textContent = I18N[currentLang].exportError;
  } finally {
    exportButton.disabled = false;
  }
}

exportButton?.addEventListener("click", exportMagazinePng);

$("#xPostButton").addEventListener("click", () => {
  const tag = getSelectedStyleTag();
  const text = [
    "#魅せるミラプリ",
    `#${tag}`,
    "",
    "GLAMOUR LOOKBOOK",
    "https://cyanstella.github.io/GLAMOURLOOKBOOK/"
  ].join("\n");

  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
});

// ===== クリック / タップ位置を中心に150%表示 =====
const previewZoom = $("#previewZoom");
const previewZoomViewport = $("#previewZoomViewport");
const previewZoomClose = $("#previewZoomClose");
const magazineElement = $("#magazine");
const ZOOM_SCALE = 1.5;

let zoomClone = null;
let zoomState = null;
let dragState = null;

function stripCloneIds(root) {
  root.removeAttribute("id");
  root.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setZoomPosition(left, top) {
  if (!zoomClone || !zoomState) return;

  zoomState.left = clamp(left, zoomState.minLeft, 0);
  zoomState.top = clamp(top, zoomState.minTop, 0);

  zoomClone.style.left = `${zoomState.left}px`;
  zoomClone.style.top = `${zoomState.top}px`;
}

function openPreviewZoom(event) {
  const rect = magazineElement.getBoundingClientRect();
  const fx = clamp((event.clientX - rect.left) / rect.width, 0, 1);
  const fy = clamp((event.clientY - rect.top) / rect.height, 0, 1);

  zoomClone = magazineElement.cloneNode(true);
  stripCloneIds(zoomClone);
  previewZoomViewport.replaceChildren(zoomClone);

  previewZoom.classList.add("is-open");
  previewZoom.setAttribute("aria-hidden", "false");
  document.body.classList.add("zoom-open");

  requestAnimationFrame(() => {
    const vw = previewZoomViewport.clientWidth;
    const vh = previewZoomViewport.clientHeight;
    const scaledW = vw * ZOOM_SCALE;
    const scaledH = vh * ZOOM_SCALE;

    zoomState = {
      minLeft: vw - scaledW,
      minTop: vh - scaledH,
      left: 0,
      top: 0
    };

    Object.assign(zoomClone.style, {
      width: `${vw}px`,
      height: `${vh}px`,
      transformOrigin: "0 0",
      transform: `scale(${ZOOM_SCALE})`
    });

    // 押した場所ができるだけ中央へ来るよう初期位置を決定。
    setZoomPosition(
      vw / 2 - fx * scaledW,
      vh / 2 - fy * scaledH
    );
  });
}

function closePreviewZoom() {
  previewZoom.classList.remove("is-open");
  previewZoom.setAttribute("aria-hidden", "true");
  previewZoomViewport.replaceChildren();
  previewZoomViewport.classList.remove("is-dragging");
  document.body.classList.remove("zoom-open");
  zoomClone = null;
  zoomState = null;
  dragState = null;
}

magazineElement.addEventListener("click", openPreviewZoom);
previewZoomClose.addEventListener("click", closePreviewZoom);

previewZoom.addEventListener("click", (event) => {
  if (event.target === previewZoom) closePreviewZoom();
});

previewZoomViewport.addEventListener("pointerdown", (event) => {
  if (!zoomState) return;

  dragState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startLeft: zoomState.left,
    startTop: zoomState.top,
    moved: false
  };

  previewZoomViewport.setPointerCapture?.(event.pointerId);
  previewZoomViewport.classList.add("is-dragging");
});

previewZoomViewport.addEventListener("pointermove", (event) => {
  if (!dragState || dragState.pointerId !== event.pointerId) return;

  const dx = event.clientX - dragState.startX;
  const dy = event.clientY - dragState.startY;

  if (Math.hypot(dx, dy) > 7) dragState.moved = true;

  setZoomPosition(
    dragState.startLeft + dx,
    dragState.startTop + dy
  );
});

function finishZoomPointer(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;

  const shouldClose = !dragState.moved;
  previewZoomViewport.releasePointerCapture?.(event.pointerId);
  previewZoomViewport.classList.remove("is-dragging");
  dragState = null;

  // ズーム中にもう一度タップ / クリックすると100%へ戻る。
  if (shouldClose) closePreviewZoom();
}

previewZoomViewport.addEventListener("pointerup", finishZoomPointer);
previewZoomViewport.addEventListener("pointercancel", finishZoomPointer);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && previewZoom.classList.contains("is-open")) {
    closePreviewZoom();
  }
});

// プレビュー本体はデスクトップでブラウザ縦幅の約86%。
function fitMagazineToViewport() {
  const stage = $("#previewStage");
  const magazine = $("#magazine");
  const previewArea = $(".preview-area");
  if (!stage || !magazine || !previewArea) return;

  if (window.innerWidth <= 980) {
    stage.style.width = "";
    magazine.style.height = "";
    requestAnimationFrame(fitCatchCopy);
    return;
  }

  const availableWidth = previewArea.clientWidth;
  const targetViewportHeight = window.innerHeight * 0.86;
  const heightFromWidth = availableWidth * 1.5;
  const targetHeight = Math.min(targetViewportHeight, heightFromWidth);
  const targetWidth = targetHeight * (2 / 3);

  stage.style.width = `${Math.floor(targetWidth)}px`;
  magazine.style.height = `${Math.floor(targetHeight)}px`;
  requestAnimationFrame(fitCatchCopy);
}

window.addEventListener("load", fitMagazineToViewport);
window.addEventListener("resize", fitMagazineToViewport);

// 保存済み言語があれば復元。編集内容には触れないので言語切替で入力は消えない。
let savedLang = "ja";
try { savedLang = localStorage.getItem('glamourLookbookLanguage') || 'ja'; } catch (_) {}
applyLanguage(savedLang === 'en' ? 'en' : 'ja');
