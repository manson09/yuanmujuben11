

interface Env {
  // ✅ 改1：删掉原来的OpenRouter变量，换成火山引擎的变量
  VOLC_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // ✅ 改2：读取火山引擎的API Key
  const apiKey = env.VOLC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        // ✅ 改3：修改错误提示
        error: '服务端未配置 API Key 环境变量，请在 Cloudflare Pages Settings > Environment variables 中添加 VOLC_API_KEY'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
   
    const body = await request.text();

    // ✅ 改4：把请求地址换成火山引擎的地址，删掉OpenRouter专属的2个请求头
    const response = await fetch(env.VOLC_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
        // 删掉原来的HTTP-Referer和X-Title头，火山引擎不需要
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
      JSON.stringify({ error: `代理请求失败：${err.message}` }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
