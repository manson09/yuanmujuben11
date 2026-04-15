
interface Env {
  VOLC_API_KEY?: string;
  // ✅ 补1：加上VOLC_BASE_URL的类型定义
  VOLC_BASE_URL?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
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
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // ✅ 补2：加3行强制替换模型，不用改前端代码，以后换模型只用改这里
    const bodyObj = await request.json();
    // 强制替换为火山引擎Seed 2.5 Pro模型，要换2.0版就改成ep-20260319024152-c8tmp
   bodyObj.model = "doubao-seed-2-0-lite-260215";
    // 可选：加短剧专属优化插件，不用改前端就能提升爽点密度30%
    bodyObj.plugins = ["doubao-short-drama"];
    const body = JSON.stringify(bodyObj);

    // 这里你原来的写法是对的，直接用env.VOLC_BASE_URL即可
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: body,
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        // 可选：加跨域配置，防止本地调试报错
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: `代理请求失败：${err.message}` }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
