import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    ignores: ["node_modules/**", ".next/**", "out/**"],
  },
  {
    rules: {
      // Patrón "mounted" post-hidratación (export estático): un setState en el
      // primer efecto es intencional. Queda como aviso, no como error.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
