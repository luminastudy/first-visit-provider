import agentConfig from 'eslint-config-agent'

export default [
  ...agentConfig,
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.mjs', 'rollup.config.js'],
  },
  {
    files: ['src/types.ts'],
    rules: {
      'single-export/single-export': 'off', // Types files can have multiple exports
    },
  },
  {
    files: ['src/FirstVisitProvider.tsx'],
    rules: {
      'max-lines-per-function': ['error', { max: 120 }], // Allow larger component
    },
  },
]
