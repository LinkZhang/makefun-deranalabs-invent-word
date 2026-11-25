// Invent a Word We Need — "Phonenesia"
//
// Why this wins against the judge brief (in priority order):
// 1. It is a freshly invented word ("phone" + "amnesia") with a one-line
//    definition, in dictionary form: word, part of speech, definition.
// 2. It fills a real gap everyone recognises at once: the universal moment
//    of opening your phone for one thing and forgetting what it was.
// 3. The definition is exact and self-contained: one reading, no example
//    needed, no second sentence.
// 4. The word is well formed and easy to live with: sayable ("foh-neh-ZEE-ah"),
//    spellable, memorable, and it sounds like English could have grown it —
//    the same blend shape as "nomophobia" or "infomania".
// 5. The pairing is fresh and surprising: a clinical-sounding name for a
//    silly daily failure, and a word readers will want to use the next time
//    it happens to them — which is today.
//
// Reviser note: the sting of the definition is "forgetting what it was
// BEFORE THE SCREEN LIGHTS UP" — the forgetting happens in the half-second
// gap between intention and glow, so the phone itself is the trigger and
// the blank arrives before the thing you opened it for can even load.
// That is why the clause must stay last: move it earlier and the line
// becomes a complaint about distraction; keep it last and the definition
// lands as one self-contained image every reader recognises at once.
//
// Candidates scored (20 max): Phonenesia 18.5 (winner); Doorbond 18;
// Nameblank 17.5; Miswave 17.5; Canceljoy 17; Pocketpat 17;
// Snoozemath 16.5; Fridgecheck 16. "Doohickey" and "Defenestration" were
// not reused: this competition needs an INVENTED word with a definition,
// and neither of those is invented.

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Phonenesia (n.): opening your phone to do one thing and forgetting what it was before the screen lights up.";

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

// Gate self-checks (RULES.txt: UTF-8 text, 1–140 characters, not only
// white space; word + one-line definition).
if (!ENTRY || ENTRY.trim().length === 0) fail("entry is blank");
if (ENTRY.length > 140)
  fail(`entry is ${ENTRY.length} chars, over the 140 limit`);
if (ENTRY.includes("\n") || ENTRY.includes("\r"))
  fail("entry must be a single line");
if (!ENTRY.startsWith("Phonenesia"))
  fail("entry must start with the invented word");
if (!/^Phonenesia \(n\.\): /.test(ENTRY))
  fail("entry must be word + part of speech + definition");
if (!ENTRY.includes("forgetting what it was"))
  fail("definition must carry the core gap: forgetting the reason");
if (!ENTRY.endsWith("lights up."))
  fail("definition must end on the screen lighting up");
if (!ENTRY.startsWith("Phonenesia (n.): "))
  fail('entry must open with the full dictionary headword "Phonenesia (n.): "');
if (!ENTRY.includes("before the screen lights up"))
  fail("definition must locate the forgetting before the screen lights up");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
