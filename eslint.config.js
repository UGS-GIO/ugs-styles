import js from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
 * Type-aware lint. The point of this config is to keep authored styles free of
 * every escape hatch out of the type system: no `any`, no type assertions
 * (`as X` / `as unknown as X`), no non-null `!`. MapLibre expressions are built
 * with real `ExpressionSpecification` types instead (see src/expressions).
 */
export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    {
        languageOptions: {
            parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
        },
        rules: {
            // The escape-hatch bans — the reason this config exists.
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            // Forbid `as`-style assertions everywhere except `as const`.
            '@typescript-eslint/consistent-type-assertions': ['error', {
                assertionStyle: 'never',
            }],
            // Type safety is the goal, not cosmetics: numbers/booleans in
            // template strings and shorthand void returns are fine.
            '@typescript-eslint/restrict-template-expressions': ['error', {
                allowNumber: true,
                allowBoolean: true,
            }],
            '@typescript-eslint/no-confusing-void-expression': 'off',
            // Allow `_`-prefixed and destructure-omit (`const { drop, ...rest }`) bindings.
            '@typescript-eslint/no-unused-vars': ['error', {
                ignoreRestSiblings: true,
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],
        },
    },
    {
        // Build/validation scripts read dynamic data (dynamic import(), parquet
        // rows, parsed SLD XML) whose libs hand back `any`. Ban the escape
        // hatches (still no explicit any / casts / non-null above), but allow
        // that library-sourced `any` to flow — it isn't authored here.
        files: ['scripts/**/*.ts'],
        rules: {
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
        },
    },
    {
        ignores: ['dist-json/**', 'node_modules/**', 'preview/**', 'eslint.config.js', 'qa/**'],
    },
);
