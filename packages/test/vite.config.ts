import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ["react-markdown-typewriter"],
    },
    // resolve: {
    //     alias: {
    //         "react-markdown-typewriter": "../sdk/src", // 直接使用源码，热更新更快
    //     },
    // },
});
