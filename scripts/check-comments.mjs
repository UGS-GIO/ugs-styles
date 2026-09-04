#!/usr/bin/env node
// Reject comments that narrate history instead of describing the code.
// Reads a Claude Code PostToolUse payload on stdin and inspects only the text the edit
// introduced, so untouched files are never re-litigated. Exit 2 = blocking feedback.

const SOURCE = /\.(ts|tsx|js|mjs|cjs|yml|yaml)$/;

const RULES = [
    { name: 'ticket id', re: /\b[A-Z]{2,}-\d{1,6}\b/ },
    { name: 'version reference', re: /\bv\d+\.\d+\.\d+\b/ },
    { name: 'PR or issue reference', re: /(?<![\w#])#\d{1,5}(?!\w)/, skip: (m) => /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(m) },
    {
        name: 'past-functionality narration',
        re: /\b(previously|used to|formerly|originally|historically|no longer|the old |before this|regression|regressed|broke|broken|used to be|we now|now that|this is what|which is why|that is how)\b/i,
    },
];

const commentsOf = (text, file) => {
    const lines = text.split('\n');
    if (/\.(yml|yaml)$/.test(file)) return lines.filter((l) => /^\s*#/.test(l));
    const out = [];
    let block = false;
    for (const line of lines) {
        const t = line.trim();
        if (block) {
            out.push(line);
            if (t.includes('*/')) block = false;
        } else if (t.startsWith('//')) {
            out.push(line);
        } else if (t.startsWith('/*')) {
            out.push(line);
            if (!t.includes('*/')) block = true;
        }
    }
    return out;
};

const read = async () => {
    let raw = '';
    for await (const chunk of process.stdin) raw += chunk;
    return raw;
};

const payload = JSON.parse((await read()) || '{}');
const input = payload.tool_input ?? {};
const file = input.file_path ?? '';
if (!SOURCE.test(file)) process.exit(0);

const added = [input.content, input.new_string, ...(input.edits ?? []).map((e) => e.new_string)]
    .filter((s) => typeof s === 'string')
    .join('\n');
if (!added) process.exit(0);

const found = [];
for (const line of commentsOf(added, file)) {
    for (const rule of RULES) {
        const m = line.match(rule.re);
        if (m && !(rule.skip?.(m[0]))) found.push(`  ${rule.name} "${m[0]}" in: ${line.trim()}`);
    }
}
if (!found.length) process.exit(0);

console.error(
    `Comments must describe what the code does now — no tickets, versions, PR refs, or history.\n${found.join('\n')}\n` +
    `Rewrite the rule instead of its backstory, and put the reasoning in the PR. ` +
    `If a defensive branch is justified only by history, delete the branch.`,
);
process.exit(2);
