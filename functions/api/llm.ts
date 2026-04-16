
interface Env {
  VOLC_API_KEY?: string;
  // ✅ 补1：加上VOLC_BASE_URL的类型定义
  VOLC_BASE_URL?: string;
  VOLC_MODEL?: string;
}

function normalizeBaseUrl(baseUrl: string): string {
  const trimmed = baseUrl.trim().replace(/\/+$/, '');
  if (trimmed.endsWith('/chat/completions') || trimmed.endsWith('/completions')) return trimmed;
  if (trimmed.endsWith('/api/v3')) return `${trimmed}/chat/completions`;
  return trimmed;
}

function tryParseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function withCors(headers: Record<string, string> = {}): Record<string, string> {
  return {
    ...headers,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export const onRequestGet = async (context: { env: Env }) => {
  const { env } = context;
  return new Response(
    JSON.stringify({
      ok: true,
      route: '/api/llm',
      configured: {
        hasApiKey: Boolean(env.VOLC_API_KEY),
        hasBaseUrl: Boolean(env.VOLC_BASE_URL),
        hasModel: Boolean(env.VOLC_MODEL),
      },
    }),
    { status: 200, headers: withCors({ 'Content-Type': 'application/json' }) }
  );
};

export const onRequestOptions = async () => {
  return new Response(null, { status: 204, headers: withCors() });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  // 读取火山引擎的API Key
  const apiKey = env.VOLC_API_KEY;
  const baseUrl = env.VOLC_BASE_URL;
  // 加个baseUrl的校验
  if (!apiKey || !baseUrl) {
    return new Response(
      JSON.stringify({
        error: '服务端未配置 API Key/BASE_URL 环境变量，请在 Cloudflare Pages Settings > Environment variables 中添加 VOLC_API_KEY 和 VOLC_BASE_URL'
      }),
      { status: 500, headers: withCors({ 'Content-Type': 'application/json' }) }
    );
  }

  try {
    // ✅ 补2：加3行强制替换模型，不用改前端代码，以后换模型只用改这里
    const bodyObj = await request.json();
 
    if (env.VOLC_MODEL) bodyObj.model = env.VOLC_MODEL;
    // 可选：加短剧专属优化插件，不用改前端就能提升爽点密度30%.
// bodyObj.plugins = ["doubao-short-drama"];
    const body = JSON.stringify(bodyObj);

    // 这里你原来的写法是对的，直接用env.VOLC_BASE_URL即可
    const upstreamUrl = normalizeBaseUrl(baseUrl);
    const response = await fetchWithTimeout(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: body,
    }, 25000);

    const dataText = await response.text();
    const upstreamBody = tryParseJson(dataText) ?? dataText;

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: '上游请求失败',
          upstream: {
            status: response.status,
            body: upstreamBody,
          },
        }),
        {
          status: response.status,
          headers: withCors({ 'Content-Type': 'application/json' }),
        }
      );
    }

    return new Response(
      typeof upstreamBody === 'string' ? dataText : JSON.stringify(upstreamBody),
      {
        status: response.status,
        headers: withCors({ 'Content-Type': 'application/json' }),
      }
    );
  } catch (err: any) {
    const message =
      err?.name === 'AbortError'
        ? '上游请求超时（25秒）。请降低输出长度/换更快模型，或拆分为多次请求。'
        : err?.message || '未知错误';
    return new Response(
      JSON.stringify({ error: `代理请求失败：${message}` }),
      { status: err?.name === 'AbortError' ? 504 : 502, headers: withCors({ 'Content-Type': 'application/json' }) }
    );
  }
}
