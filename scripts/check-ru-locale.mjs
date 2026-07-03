import fs from "node:fs";

const en = JSON.parse(
  fs.readFileSync("shared/i18n/locales/en_US/translation.json", "utf8")
);
const ru = JSON.parse(
  fs.readFileSync("shared/i18n/locales/ru_RU/translation.json", "utf8")
);

const enKeys = Object.keys(en);
const ruKeys = Object.keys(ru);
const missing = enKeys.filter((key) => !(key in ru));
const extra = ruKeys.filter((key) => !(key in en));
const englishFallback = enKeys.filter((key) => ru[key] === en[key]);

console.log(`en_US keys: ${enKeys.length}`);
console.log(`ru_RU keys: ${ruKeys.length}`);
console.log(`missing keys: ${missing.length}`);
console.log(`extra keys: ${extra.length}`);
console.log(`english fallback values: ${englishFallback.length}`);

if (missing.length) {
  console.log("\nMissing keys:");
  for (const key of missing) {
    console.log(`- ${key}`);
  }
}

if (extra.length) {
  console.log("\nExtra keys:");
  for (const key of extra) {
    console.log(`- ${key}`);
  }
}

if (englishFallback.length) {
  console.log("\nEnglish fallback values:");
  for (const key of englishFallback) {
    console.log(`- ${key}`);
  }
}

if (missing.length || extra.length) {
  process.exitCode = 1;
}
