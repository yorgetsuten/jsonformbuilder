/** @type {import('stylelint').Config} */
export default {
  extends: ['@logux/stylelint-config'],
  ignoreFiles: ['dist/**/*'],
  rules: {
    'color-no-hex': null,
    'comment-empty-line-before': null,
    'custom-property-empty-line-before': null
  }
}
