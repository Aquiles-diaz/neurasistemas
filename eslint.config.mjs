import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    // Vendored cult.ui primitives + build output are not ours to lint.
    ignores: ["node_modules/**", ".next/**", "out/**", "components/ui/**"],
  },
];

export default eslintConfig;
