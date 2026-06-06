// https://docs.expo.dev/guides/using-eslint/
const expoConfig = require("eslint-config-expo/flat")

module.exports = [
  ...expoConfig,
  {
    // 3D 미리보기(react-three-fiber): three 요소 props와 제스처 콜백의 ref 접근은
    // 이 규칙들의 모델 밖이라 해당 폴더에서만 비활성화한다.
    files: ["components/customizer/**"],
    rules: {
      "react/no-unknown-property": "off",
      "react-hooks/refs": "off",
    },
  },
  {
    ignores: ["dist/*", ".expo/*", "node_modules/*"],
  },
]
