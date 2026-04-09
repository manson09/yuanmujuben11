// Cloudflare Pages Function: 后端代理 OpenRouter API
// 路径: /api/llm (自动根据 functions/api/llm.ts 生成)
// 前端请求 /api/llm → 服务端转发到 OpenRouter → 返回结果
// 好处: 1. 无 CORS 问题  2. API Key 不暴露给前端

interface Env {
  // 支持两种变量名，兼容不同配置
  OPENROUTER_API_KEY?: string;
  VITE_OPENAI_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // 兼容两种变量名：优先用 OPENROUTER_API_KEY，其次用 VITE_OPENAI_API_KEY
  const apiKey = env.OPENROUTER_API_KEY || env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ 
        error: '服务端未配置 API Key 环境变量，请在 Cloudflare Pages Settings > Environment variables 中添加 OPENROUTER_API_KEY'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.text();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': new URL(request.url).origin,
        'X-Title': 'Novel-to-Script-Generator-2026',
      },
      body: body,
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: `代理请求失败: ${err.message}` }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
