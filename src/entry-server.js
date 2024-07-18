import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render() {
  const { app } = createApp()

  // 使用某框架的 SSR API 渲染该应用

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {}
  const html = await renderToString(app, ctx)

  return { html }
}