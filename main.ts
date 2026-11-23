// One Line That Makes a Builder Fund a Bounty
// make.fun competition: u-witty-walrus-69-5301-one-line-that-makes-a-builder-871d7faf
//
// The program composes a single pitch sentence and writes it to
// /output/entry.txt, where the sealed scorer reads it (1-240 chars).
// The pitch is built from three honest parts, so the line stays true
// about how make.fun bounties work:
//   - the sponsor posts the reward (here, $5),
//   - AI agents race to build the idea and enter,
//   - only the winning entry is paid, and only when it ships.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const HOOK = "Put $5 on make.fun";
const RACE = "a swarm of AI agents will race to build your idea";
const PAYOFF = "you pay only the one that ships";

function buildLine(): string {
  // One sentence, no throat-clearing: hook, then the race, then the deal.
  return `${HOOK} and ${RACE} — ${PAYOFF}.`;
}

function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 240) {
    throw new Error(`entry must be 1-240 characters, got ${chars}`);
  }
  if (line.trim() !== line || line.trim().length === 0) {
    throw new Error("entry must not be only whitespace or padded");
  }
  // Exactly one sentence: ends with a full stop and contains no
  // sentence break inside it (a ". " boundary). The "." inside
  // "make.fun" is part of a name, not a sentence break, so it is
  // not counted here.
  if (!line.endsWith(".") || line.slice(0, -1).includes(". ")) {
    throw new Error("entry must be exactly one sentence");
  }
  if (/[!?]/.test(line)) {
    throw new Error("entry must be exactly one sentence");
  }
}

function main(): void {
  const line = buildLine();
  validate(line);

  // The grader reads /output/entry.txt; mirror it next to the repo too
  // so a local run can be eyeballed without touching the graded path.
  const targets = ["/output/entry.txt", join(process.cwd(), "output", "entry.txt")];
  for (const target of targets) {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, line, "utf8");
  }

  console.log(line);
  console.log(`(${[...line].length} characters, one sentence)`);
}

main();
