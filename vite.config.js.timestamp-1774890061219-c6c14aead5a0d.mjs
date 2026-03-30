// vite.config.js
import path from "path";
import checker from "file:///C:/Users/triosweb/Desktop/suivi-sasgestion/node_modules/vite-plugin-checker/dist/esm/main.js";
import { defineConfig } from "file:///C:/Users/triosweb/Desktop/suivi-sasgestion/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/triosweb/Desktop/suivi-sasgestion/node_modules/@vitejs/plugin-react-swc/index.mjs";
var PORT = 3031;
var vite_config_default = defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        dev: { logLevel: ["error"] }
      },
      overlay: {
        position: "tl",
        initialIsOpen: false
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), "node_modules/$1")
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), "src/$1")
      }
    ]
  },
  server: { port: PORT, host: true },
  preview: { port: PORT, host: true }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0cmlvc3dlYlxcXFxEZXNrdG9wXFxcXHN1aXZpLXNhc2dlc3Rpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHRyaW9zd2ViXFxcXERlc2t0b3BcXFxcc3Vpdmktc2FzZ2VzdGlvblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdHJpb3N3ZWIvRGVza3RvcC9zdWl2aS1zYXNnZXN0aW9uL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgUE9SVCA9IDMwMzE7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGNoZWNrZXIoe1xuICAgICAgZXNsaW50OiB7XG4gICAgICAgIGxpbnRDb21tYW5kOiAnZXNsaW50IFwiLi9zcmMvKiovKi57anMsanN4LHRzLHRzeH1cIicsXG4gICAgICAgIGRldjogeyBsb2dMZXZlbDogWydlcnJvciddIH0sXG4gICAgICB9LFxuICAgICAgb3ZlcmxheToge1xuICAgICAgICBwb3NpdGlvbjogJ3RsJyxcbiAgICAgICAgaW5pdGlhbElzT3BlbjogZmFsc2UsXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHtcbiAgICAgICAgZmluZDogL15+KC4rKS8sXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ25vZGVfbW9kdWxlcy8kMScpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogL15zcmMoLispLyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnc3JjLyQxJyksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHNlcnZlcjogeyBwb3J0OiBQT1JULCBob3N0OiB0cnVlIH0sXG4gIHByZXZpZXc6IHsgcG9ydDogUE9SVCwgaG9zdDogdHJ1ZSB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBULE9BQU8sVUFBVTtBQUMzVSxPQUFPLGFBQWE7QUFDcEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBSWxCLElBQU0sT0FBTztBQUViLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLEtBQUssRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFFO0FBQUEsTUFDN0I7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssS0FBSyxRQUFRLElBQUksR0FBRyxpQkFBaUI7QUFBQSxNQUN6RDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLFFBQVE7QUFBQSxNQUNoRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRLEVBQUUsTUFBTSxNQUFNLE1BQU0sS0FBSztBQUFBLEVBQ2pDLFNBQVMsRUFBRSxNQUFNLE1BQU0sTUFBTSxLQUFLO0FBQ3BDLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
