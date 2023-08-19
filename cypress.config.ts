import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'rhs3dp',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
