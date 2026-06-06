// .glb 3D 모델을 에셋으로 번들링하기 위해 assetExts에 추가
const { getDefaultConfig } = require("expo/metro-config")

const config = getDefaultConfig(__dirname)
config.resolver.assetExts.push("glb")

module.exports = config
