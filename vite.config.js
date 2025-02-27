import { defineConfig } from 'vite'


export default defineConfig(() => {
  if (process.env.LOCAL_BUILD === 'local') {
    return {}
  }
  return {
    base: process.env.NODE_ENV === 'production' ? '/3d-vis-sprint/' : '/',
  }
})

// import { readFileSync, existsSync, unlinkSync, writeFileSync } from 'fs'
// import path from 'path'
// export default {
//   // 設定オプション
//   build: {
//     minify: false,
//     rollupOptions: {
//       external: (id) => id.startsWith('three') || id === 'lil-gui', // `three` と `lil-gui` を除外
//       output: {
//         entryFileNames: 'index.js', // メインのJSファイル名を `index.js` に固定
//         chunkFileNames: '[name].js', // チャンクのファイル名を変更しない
//         assetFileNames: '[name][extname]',
//       },
//     },

//     target: 'esnext',
//     polyfillModulePreload: false,
//   },
//   plugins: [
//     {
//       name: 'inject-script',
//       writeBundle() {
//         const distPath = path.resolve('./', 'dist')
//         console.log(distPath)
//         const htmlPath = path.join(distPath, 'index.html')
//         const jsPath = path.join(distPath, 'index.js')

//         if (existsSync(htmlPath) && existsSync(jsPath)) {
//           let html = readFileSync(htmlPath, 'utf-8')
//           const scriptContent = readFileSync(jsPath, 'utf-8')

//           // 既存の <script> タグを削除して新しいスクリプトを追加
//           html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
//           html = html.replace('</body>', `<script>\n${scriptContent}\n</script>\n</body>`)

//           writeFileSync(htmlPath, html, 'utf-8')
//           unlinkSync(jsPath) // index.js を削除

//           console.log('✅ index.js を index.html に埋め込みました')
//         }
//       },
//     },
//   ],
// }
