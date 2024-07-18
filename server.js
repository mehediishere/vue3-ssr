// main application server

import fs from 'node:fs/promises'
import express from 'express'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : ''
const ssrManifest = isProduction
    ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
    : undefined

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
    const { createServer } = await import('vite')
    // 以中间件模式创建 Vite 应用，并将 appType 配置为 'custom'
    // 这将禁用 Vite 自身的 HTML 服务逻辑，并让上级服务器接管控制
    vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base
    })
    // 使用 vite 的 Connect 实例作为中间件
    // 如果你使用了自己的 express 路由（express.Router()），你应该使用 router.use
    // 当服务器重启（例如用户修改了 vite.config.js 后），
    // `vite.middlewares` 仍将保持相同的引用
    // （带有 Vite 和插件注入的新的内部中间件堆栈）。
    // 即使在重新启动后，以下内容仍然有效。
    app.use(vite.middlewares)
} else {
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    // compression() returns the compression middleware
    // compress all responses
    app.use(compression())
    // The optimized and lightweight middleware for serving requests to static assets
    app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*', async (req, res) => {
    try {
        const url = req.originalUrl.replace(base, '')

        let template
        let render
        if (!isProduction) {
            // Always read fresh template in development
            template = await fs.readFile('./index.html', 'utf-8')
            // 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，同时也会从 Vite 插件应用 HTML 转换。
            // @vitejs/plugin-react 中的 global preambles
            template = await vite.transformIndexHtml(url, template)
            // 1. 加载服务器入口。
            // vite.ssrLoadModule 将自动转换你的 ESM 源码使之可以在 Node.js 中运行！无需打包
            // 并提供类似 HMR 的根据情况随时失效。
            // 2. 渲染应用的 HTML。
            // 这假设 entry-server.js 导出的 `render`函数调用了适当的 SSR 框架 API。
            // 例如 ReactDOMServer.renderToString()
            render = (await vite.ssrLoadModule('/src/entry-server.js')).render
        } else {
            template = templateHtml
            render = (await import('./dist/server/entry-server.js')).render
        }

        const rendered = await render(url, ssrManifest)

        // 注入渲染后的应用程序 HTML 到模板中。
        const html = template
            .replace(`<!--app-head-->`, rendered.head ?? '')
            .replace(`<!--app-html-->`, rendered.html ?? '')

        // 返回渲染后的 HTML。
        res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (e) {
        // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回你的实际源码中。
        vite?.ssrFixStacktrace(e)
        console.log(e.stack)
        res.status(500).end(e.stack)
    }
})

// Start http server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})