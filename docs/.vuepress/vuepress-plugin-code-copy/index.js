const path = require('path')

module.exports = (options, ctx) => {
  return {
    name: 'vuepress-plugin-code-copy',
    define: {
      copyButtonText: options.copyButtonText || 'copy',
      copiedButtonText: options.copiedButtonText || 'copied!'
    },
    clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
  }
}
