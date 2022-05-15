class WebpackAssetPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap("WebpackAssetPlugin", (compilation) => {
      compilation.hooks.chunkAsset.tap("WebpackAssetPlugin", (chunk, filename) => {
        console.log(chunk.name || chunk.id, filename);
      });
    });
  }
}

module.exports = WebpackAssetPlugin;
