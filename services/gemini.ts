const PROXY_URL = "/api/llm"; 
const MODEL_NAME = "doubao-seed-2-0-pro-260215"; 
const MAX_RETRY = 5; // ✅ 不用改
const API_CALL_DELAY = 3000; // ✅ 不用改
const DELAY_BETWEEN_EPISODES = 5000; 
const DEFAULT_TEMPERATURE = 0.85;

const GOLD_FINGER_FRAMEWORK = `
## 金手指分类与匹配框架
### 金手指三大维度
1. 感知维度：隐性（主角不自知）/ 显性-隐忍（主角知道但藏着）/ 显性-系统（系统/面板可见）/ 半显性（知道一部分不知全貌）
2. 存在形式：内生型（天赋/血脉/经历）/ 外挂型（系统/宝物/外部力量）
3. 作用方式：主动型（主角主动使用）/ 被动型（自动生效主角不知情）
### 匹配规则
1. 先选定核心爽梗→查表确定金手指全套参数
2. 隐性型：天然信息差，不需要隐忍理由
3. 显性-隐忍型：必须有明确隐忍理由
4. 显性-系统型：仅直播/规则怪谈类使用
5. 半显性型：主角知道自己有某种能力但低估了自身实力
### 金手指量化公式
金手指必须可量化——不能是"很强"，必须是"强到什么程度"。
示例：
- ❌ "他武功很高" → ✅ "一拳打穿30cm钢板/10秒内制服12个武装人员"
- ❌ "他很有钱" → ✅ "个人可调动资产9700亿/一个电话能借调军方直升机"
### 透底三要素（缺一不可）：
1. 【独占性】：这个信息只有观众知道，剧内角色都不知道
2. 【具体性】：观众能用一句话说出"主角的底牌是XXX"
3. 【可期待性】：观众知道这个信息后，能产生"他什么时候用这个底牌翻盘？"的期待
`;

// ✅ 仅修改此处：细化第一集开场策略，强制零铺垫炸场
// ✅ 仅修改此处：细化第一集开场策略，强制零铺垫炸场
const EPISODE_1_STRATEGIES = `
## 第1集开场策略（爽剧强制版：所有策略必须前3个镜头出爽点，绝对禁止先拍废物场景再铺垫）
### 【通用炸场前提】全类型巅峰场景量化要求（前1镜头必须满足）
禁止模糊说「主角很强」，必须同时出现3个元素：①强视觉特写 ②量化数字字幕 ③大场面烘托，不同类型对应参考：
- 战神/兵王类：军功章特写+「狙杀127名敌特/麾下30万西北军」字幕+全军单膝跪地喊主帅
- 赘婿/首富类：港交所敲钟特写+「市值破2.7万亿/个人可调动资金9700亿」字幕+全场股东起立鼓掌
- 修仙/玄幻类：飞升雷劫特写+「修为99999层/随手可斩仙尊」字幕+万仙朝拜大场面
- 神医/鉴宝类：金针救万人特写+「医术圣级/一眼辨千年赝品」字幕+全体病患下跪感谢
- 规则怪谈/系统类：SSS级通关特写+「积分10亿/全服排名第一」字幕+全球玩家刷屏祝贺
- 重生/复仇类：被捅死特写+「名下千亿资产被夺/全家被害」字幕+死亡瞬间的仇人狞笑慢放
---
### 策略A：先炸后藏（适用于：扮猪吃虎/战神归来/赘婿逆袭/身份隐藏类）
核心逻辑：【正序先炸】第1个镜头直接拍主角最强巅峰时刻（配上述对应类型的量化展示）→ 第2个镜头1秒交代隐忍理由（特写关键信物/对话+字幕/OS：「还有3个月授勋/还有7天婚约到期/还有10天秘境开启，不许闹事」）→ 第3个镜头直接切到「废物」状态被嘲讽的场景，全程10秒内完成反差，绝对禁止先拍废物场景再闪回
### 策略B：日常暴露（适用于：天赋异禀/不自知/气运流/隐性金手指类）
核心逻辑：【开场先透底】第1个镜头直接给观众展示主角的隐性金手指（配量化字幕，比如「他的气运值是全宇宙第一」「他随手画的符是仙级可斩仙尊」）→ 第2个镜头拍主角做日常小事→ 无意间做了逆天的事但不知道→ 知情人看到后量化反应，前2个镜头就给观众上帝视角
### 策略C：系统激活（适用于：直播爽文/规则怪谈/系统流）
核心逻辑：【开场先踩】第1个镜头直接拍主角最低谷被踩死的边缘（配量化惨状，比如「欠了1000万被打断腿扔在雨里」「规则怪谈倒数第一马上被抹杀」）→ 第2个镜头系统直接激活弹窗给观众看（量化初始奖励）→ 给出第一个任务/规则→ 完成后获得第一次小爽，前3个镜头完成「踩→激活→爽」的节奏
### 策略D：重生闪回（适用于：重生复仇/先知流）
核心逻辑：【开场先惨】第1个镜头直接拍前世最惨的死亡画面（配量化损失，比如「被最信任的人背叛捅死，千亿资产被夺/满门被灭」）→ 第2个镜头直接睁眼回到过去（特写时间点+字幕给观众透底）→ 第3个镜头立刻做只有重生者才会做的事（比如直接甩了背叛他的前女友/抢走前世被夺的宝物），前3个镜头完成「惨→重生→爽」的节奏
`;

const PER_EPISODE_ENGINE = `
## 逐集爽感引擎（10集制）
第1集引擎：信息差炸弹（观众知道主角强，其他人不知道）
第2集引擎：忍耐极限（被骂还忍，观众期待爆发）
第3集引擎：情感绑定（反派欺负主角在意的人，拉仇恨）
第4集引擎：底线触碰（观众觉得忍不住了，主角悄悄布局）
第5集引擎：绝境感（最低谷，暗线微小进展，观众憋到极致）
第6集引擎：释放一口气（主角第一次出手解决1个小问题）
第7集引擎：反转揭底（暗线全面引爆，智商碾压）
第8集引擎：全面碾压（所有憋屈清算，高潮）
第9集引擎：新悬念（新威胁出现）
第10集引擎：升级恐惧（新威胁展示实力，留终极钩子）
### 主角出手次数硬控制
第1集1次（炸场）|第2-5集0次|第6集1次|第7集1-2次|第8集不限|第9集0次|第10集0-1次
### 爽感曲线
第1集★★★→第2集★★→第3集★★→第4集★→第5集☆→第6集★★★→第7集★★★★→第8集★★★★★→第9集★★→第10集★★★
第5集必须最低谷，第8集必须最高潮。前5集越惨→第8集越爽。
`;

const SHUANGDIAN_EXEC_RULES = `
## 爽点执行规则（爽剧强制版）
- 每个核心爽点搭配至少1个辅助爽感元素
- 装逼打脸：先铺嘲讽→打脸干脆+回扣原话+全场震惊（至少3层旁观者反应）
- 暗线规则：第4集埋→第5集微进展→第6集部分使用→第7集引爆
- 旁观者烘托：冲突场景至少2-3类旁观者反应（下人/亲戚/外人分层）
- 打脸闭环：每个嘲讽者必须有打脸回报，回扣具体嘲讽台词
- 伏笔闭环：所有伏笔本阶段回收
- 禁止连续2集相同冲突
- 嘲讽台词必须直接戳主角核心痛点（比如赘婿骂「吃软饭的野狗」，战神骂「逃兵废物」），不能软绵绵
`;

const FORMAT_RULES = `
## 剧本格式最高规则（违反直接重写）
标准竖屏短剧剧本格式：
- 场景头：序号、日/夜、内/外、出场人物
- 动作描写：△开头，一句话一个镜头
- 台词：角色名：台词 / 角色名（情绪）：台词
- 内心独白：角色名（情绪）OS：内容
- 字幕：行内（字幕：XXX）
- 切场：△切
- 集结尾：△黑幕。
绝对禁止【场景】【画面】【台词】分块式结构，单集字数500-700字，台词口语化短句。
`;

const SCRIPT_FORMAT_EXAMPLE = `
## 标准剧本格式范本（学习格式，禁止照搬内容）
第一集
1、日、外、林凡、逍遥子
△山巅，云雾缭绕，茅草屋旁的深潭，林凡戴着斗笠，嘴角吊着一根狗尾巴坐在那里闭着眼（字幕：林凡），一旁是竹竿鱼竿。
△水下镜头，水潭内，黑龙游动，面前蚯蚓闪烁金光，黑龙冲上去一口吞下，疯狂挣扎。
△水上，鱼漂猛然下坠，林凡睁眼一把抓住鱼竿，嘴角带笑。
林凡：上钩了！
△深潭中黑龙被鱼线拉着急速向上。
△砰！黑龙破水而出，水花漫天金光闪烁，黑龙悲鸣变成黑鱼掉在地上，林凡嘿嘿一笑。
△切
△火堆前，黑鱼被木棍串着架在火上烤，林凡哼着小曲往黑鱼上撒作料。
林凡：来点葱花，撒点香菜，这小味挠一下就上来了！
△金光一闪，逍遥子入镜（字幕：逍遥子，林凡师父，绝世高人），看着被烤的黑鱼气急败坏。
逍遥子：逆徒！老夫圈养了万年的金仙境黑龙，你就这么给我烤了？
林凡（翻白眼）：什么黑龙？不就是一条黑鱼吗？小气扒拉的！
逍遥子（瞪眼）OS：你丫头两个月修炼到了练气九十九万层，弹指间仙帝都要飞灰湮灭！你还想怎样？
林凡：我想下山了。
逍遥子（瞬间大喜）：下山好啊！不过徒儿啊！山下金丹多如狗，元婴满地走，你一个小小的练气，切记低调行事。
林凡（认真点头）：我记住了！
△林凡起身化作金光消失。
△黑幕。
`;

const ANTI_BUG_RULES = `
## 防踩坑规则
1. 显性-隐忍型必须有隐忍理由；隐性型无需理由
2. 隐性金手指：主角不可主动使用不知道的能力
3. 伏笔本阶段回收
4. 打脸闭环：所有嘲讽者有打脸回报，必须回扣原话
5. 禁止连续2集相同冲突/手段
6. 每集必须有新信息/新冲突/新人物
7. 禁止第1集主角全程不出场只靠配角念简历透底
8. 禁止前3集主角全程沉默被动
9. 透底必须通过三要素检验
10. 主角出手硬控制：第2-5集禁止出手
11. 暗线必须从第4集埋设、第7集引爆
12. 每集结尾钩子类型不能与相邻集重复
13. 嘲讽者必须有名有姓有标志性台词
14. 第5集必须是最低谷，第8集必须是最高潮
15. 第8集打脸必须精确回扣嘲讽者原话
16. 相邻集钩子类型必须不同，仅限「反差钩子/悬念钩子/情感钩子/危机钩子」四类
17. 冲突场景必须包含至少3类不同身份旁观者的分层反应
18. 金手指能力展示必须严格匹配量化数值，前后表述完全统一
19. 每集必须至少出现1次主角标志性动作、1次主角口头禅（如有）
20. 暗线进展必须添加观众专属上帝视角提示，明确信息差
// 以下为爽剧专属新增通用规则
21. 第一集绝对禁止先拍主角落魄/被嘲讽场景，再闪回/补设定巅峰身份，必须先给巅峰高光，再切落魄，反差拉满
22. 第一集前3个镜头必须完成「观众透底」，明确告知观众主角的真实底牌/金手指，信息差必须开场就建立
23. 所有爽点必须搭配量化展示：实力爽点配具体数值，财富爽点配具体金额，打脸爽点配至少3层旁观者反应
24. 主角隐忍时必须加1句观众专属的OS/特写，明确告诉观众主角是故意忍，不是真的窝囊，避免观众弃剧
25. 嘲讽台词必须直接戳主角核心痛点，不能模糊、软绵绵
26. 第一集巅峰场景必须匹配对应类型的量化视觉元素，禁止模糊表述「很牛逼」，必须有数字+大场面特写
27. 单集字数严格控制在500-700字，缺字则补全旁观者反应、细节特写、观众专属OS
28. 暗线埋设时必须给观众专属上帝视角提示，剧内角色全程不知情，强化信息差
`;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 120000): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
      reject(new Error(`请求超时（${timeoutMs / 1000}秒）`));
    }, timeoutMs);
    fetch(url, { ...options, signal: controller.signal })
      .then(response => { clearTimeout(timer); resolve(response); })
      .catch(err => {
        clearTimeout(timer);
        reject(err.name === 'AbortError' ? new Error(`请求超时（${timeoutMs / 1000}秒）`) : err);
      });
  });
}

async function callLLM(
  prompt: string,
  needJson: boolean = true,
  temperature: number = DEFAULT_TEMPERATURE,
  retries: number = MAX_RETRY,
  timeoutMs: number = 180000,
  maxTokens: number = 4096
): Promise<any> {
  let lastError: any = null;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetchWithTimeout(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            {
              role: "system",
              content: needJson
                               ? `你是专业爽剧短剧创作助手。输出JSON用<json></json>标签包裹，标签外无任何内容。JSON严格规范：双引号key、字符串内双引号转义、无trailing comma。尽量精简输出，不要输出多余解释。爽感优先，所有设定服务于爽点。`
                // ✅ 仅修改此处：生成剧本的系统提示加爽剧要求
                : `你是专业爽剧短剧编剧，爽点优先，反差越大越好，打脸越狠越好，绝对不要拖沓铺垫。写标准短剧格式（△动作+角色名：台词），绝对不用【场景】【画面】【台词】分块格式。台词口语化短句有个性。硬性通用要求：①每集严格控制在500-700字，缺字则补全旁观者分层反应、细节特写、观众专属OS ②冲突场景至少3类不同身份旁观者的分层反应 ③主角隐忍时必须加1句观众专属OS，明确是故意忍不是真窝囊 ④爽点必须配量化展示 ⑤结尾在最刺激瞬间△黑幕。`
            },
            { role: 'user', content: prompt }
          ],
          temperature: needJson ? 0.3 : temperature,
          max_tokens: maxTokens,
        }),
      }, timeoutMs);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 401) throw new Error('API_KEY错误');
        if (response.status === 404) {
          throw new Error(
            `请求返回404：可能是 Cloudflare Pages Functions 未生效（/api/llm 不存在），也可能是 VOLC_BASE_URL/模型ID 配置错误。详情：${JSON.stringify(errData)}`
          );
        }
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('retry-after') || '15', 10);
          console.warn(`限流429，等${retryAfter}秒后重试...`);
          await delay(retryAfter * 1000);
          continue;
        }
        throw new Error(`API请求失败(${response.status}): ${JSON.stringify(errData)}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error('API返回内容为空');

      if (needJson) {
        const jsonMatch = content.match(/<json>([\s\S]*?)<\/json>/i);
        if (!jsonMatch) throw new Error('未返回<json>标签包裹的JSON');
        let jsonStr = jsonMatch[1].trim()
          .replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
          .replace(/,\s*([\]}])/g, '$1');
        await delay(API_CALL_DELAY);
        return JSON.parse(jsonStr);
      }
      await delay(API_CALL_DELAY);
      return content;
    } catch (error: any) {
      lastError = error;
      if (error.message?.includes('API_KEY') || error.message?.includes('模型未找到')) throw error;
      console.warn(`调用出错（第${attempt + 1}/${retries}次）：${error.message}`);
      if (attempt === retries - 1) throw error;
      const baseMs = error.message?.includes('超时') ? 10000 : 5000;
      await delay(Math.min(baseMs * Math.pow(2, attempt), 120000));
    }
  }
  throw new Error(`LLM调用失败：已耗尽所有重试次数。最后错误：${lastError?.message || '未知错误'}`);
}

export class GeminiService {
  private settings: any = null;
  private outline: any = null;

  async analyzeNovel(novel: string): Promise<string> {
    const variants = [
      {
        slice: 2500,
        retries: 2,
        timeoutMs: 120000,
        maxTokens: 3072,
        prompt: (text: string) => `
你是专业爽剧短剧编剧AI。请做“快速骨架分析”，输出短、可执行、爽点优先。
要求：总字数800-1200字；Markdown小标题；不要长篇解释；不要引用原文。

原著内容（节选）：
${text}

输出：
## 一、人物与关系（要点）
## 二、核心冲突与爽点（要点）
## 三、金手指建议（含量化数字）
## 四、第1集三镜头开场（先巅峰炸场→再落魄受辱）
## 五、10集走向（每集一句话）
`,
      },
      {
        slice: 1500,
        retries: 1,
        timeoutMs: 90000,
        maxTokens: 2048,
        prompt: (text: string) => `
你是专业爽剧短剧编剧AI。输出极简分析提纲（越短越好），只要可直接用于后续生成大纲。

原著内容（节选）：
${text}

输出格式（纯文本）：
1) 主角一句话底牌（含量化数字）
2) 反派/嘲讽者一句话特征
3) 核心爽梗一句话
4) 第1集三镜头开场（每镜头一句话）
5) 10集走向（每集一句话）
`,
      },
    ] as const;

    let lastErr: any = null;
    for (const v of variants) {
      try {
        return await callLLM(v.prompt(novel.slice(0, v.slice)), false, 0.5, v.retries, v.timeoutMs, v.maxTokens);
      } catch (e: any) {
        lastErr = e;
        const msg = String(e?.message || '');
        const isTimeout = msg.includes('504') || msg.includes('超时') || msg.includes('Failed to fetch') || msg.includes('ERR_CONNECTION_CLOSED') || msg.includes('fetch');
        if (!isTimeout) throw e;
      }
    }
    throw lastErr || new Error('分析失败：未知错误');
  }

  async generateOutline(novel: string, analysisReport: string): Promise<string> {
    const settingsPrompt = `
你是爽剧短剧编剧AI。根据“原著内容节选”和“分析报告节选”生成短剧基础设定。
要求：信息密度高、极简输出、只输出JSON，用<json></json>包裹，标签外不能有任何文字。

原著内容（节选）：
${novel.slice(0, 2000)}

分析报告（节选）：
${analysisReport.slice(0, 1800)}

输出JSON结构：
{
  "title": "短剧标题（带爽点）",
  "genre": "子流派",
  "core_shuangdian": "核心爽梗（一句话）",
  "shuangdian_type": "爽梗大类",
  "gold_finger": {
    "type": "类型",
    "perception": "感知维度",
    "quantified_description": "量化描述（带数字）",
    "reveal_method": "透底形式（前三镜头完成）",
    "hide_reason": "隐忍理由"
  },
  "episode_1_strategy": "A或B或C或D",
  "protagonist": {
    "name": "姓名",
    "surface_identity": "表面身份（够惨）",
    "true_identity": "真实底牌（够强）",
    "catchphrase": "口头禅",
    "signature_actions": ["动作1"]
  },
  "female_lead": { "name": "姓名", "relationship": "关系", "personality": "性格" },
  "main_villain": { "name": "姓名", "motivation": "动机" },
  "mockers": [{ "name": "姓名", "signature_taunt": "嘲讽原话", "face_slap_episode": 7 }],
  "ultimate_hook": "终极钩子"
}
`;

    this.settings = await callLLM(settingsPrompt, true, 0.3, MAX_RETRY, 150000, 3072);
    await delay(API_CALL_DELAY);

    const genEpisodesBatch = async (startEp: number, endEp: number, previousSummary: string) => {
      const prompt = `
你是爽剧短剧编剧AI。生成第${startEp}-${endEp}集大纲（极简版，优先稳定返回）。
硬规则：
1) 第1集必须“先巅峰炸场→再落魄受辱”，前3个镜头完成观众透底
2) 第2-5集主角出手次数严格为0，第5集必须绝对最低谷
3) 第7集暗线引爆，第8集全面碾压并精确回扣嘲讽原话
4) 每集字段必须齐全，字符串尽量短，key_scenes最多3条
5) 只输出JSON，用<json></json>包裹，标签外不能有任何文字

基础设定：
- 标题：${this.settings.title}
- 核心爽梗：${this.settings.core_shuangdian}
- 金手指：${this.settings.gold_finger.quantified_description}（${this.settings.gold_finger.perception}）
- 主角：${this.settings.protagonist.name}（表面${this.settings.protagonist.surface_identity}，真实${this.settings.protagonist.true_identity}）
- 嘲讽者原话：${(this.settings.mockers || []).map((m: any) => `"${m.signature_taunt}"`).join('；')}
- 终极钩子：${this.settings.ultimate_hook}

已生成摘要（如有）：
${previousSummary}

输出JSON结构：
{
  "episodes": [
    {
      "episode": ${startEp},
      "engine": "引擎短句",
      "title": "集标题（带爽点）",
      "shuang_level": "★到★★★★★",
      "protagonist_action_count": 0,
      "conflict_level": "冲突层级短句",
      "core_conflict": "一句话",
      "key_scenes": ["短句1", "短句2", "短句3"],
      "info_gap_status": "一句话",
      "dark_line_status": "一句话",
      "mocker_activity": "一句话",
      "hook_type": "反差钩子/悬念钩子/情感钩子/危机钩子",
      "hook_content": "一句话",
      "foreshadowing_plant": ["短句1"],
      "foreshadowing_payoff": ["短句1"]
    }
  ]
}
`;

      const result = await callLLM(prompt, true, 0.3, MAX_RETRY, 150000, 3072);
      return (result?.episodes || []) as any[];
    };

    const batches: Array<[number, number]> = [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ];

    const allEpisodes: any[] = [];
    for (const [s, e] of batches) {
      const summary = allEpisodes
        .slice(-4)
        .map((ep: any) => `第${ep.episode}集[${ep.engine}]${ep.shuang_level}：${ep.core_conflict}（钩子：${ep.hook_content}）`)
        .join('\n');
      const eps = await genEpisodesBatch(s, e, summary);
      for (const ep of eps) {
        if (typeof ep?.episode !== 'number') continue;
        allEpisodes.push(ep);
      }
      await delay(API_CALL_DELAY);
    }

    const metaPrompt = `
你是爽剧短剧编剧AI。根据设定与10集大纲，输出暗线详情与打脸映射（极简版）。
要求：只输出JSON，用<json></json>包裹，标签外不能有任何文字。

设定：
- 主角：${this.settings.protagonist.name}
- 嘲讽者：${(this.settings.mockers || []).map((m: any) => `${m.name}："${m.signature_taunt}"（第${m.face_slap_episode}集打脸）`).join('；')}

10集摘要：
${allEpisodes.map((ep: any) => `第${ep.episode}集：${ep.core_conflict}；钩子：${ep.hook_content}`).join('\n').slice(0, 1200)}

输出JSON结构：
{
  "dark_line_detail": {
    "ep4_action": "一句话",
    "ep5_progress": "一句话",
    "ep6_partial_use": "一句话",
    "ep7_full_reveal": "一句话",
    "audience_realization": "一句话"
  },
  "face_slap_map": [
    {
      "mocker_name": "姓名",
      "taunt_episode": 2,
      "taunt_line": "嘲讽原话",
      "slap_episode": 7,
      "slap_method": "一句话",
      "callback_line": "精确回扣嘲讽原话"
    }
  ]
}
`;

    const meta = await callLLM(metaPrompt, true, 0.3, MAX_RETRY, 120000, 2048);

    this.outline = {
      outline: allEpisodes,
      dark_line_detail: meta?.dark_line_detail || {
        ep4_action: "待定",
        ep5_progress: "待定",
        ep6_partial_use: "待定",
        ep7_full_reveal: "待定",
        audience_realization: "待定"
      },
      face_slap_map: meta?.face_slap_map || []
    };

    let output = `# 📋 《${this.settings.title}》基础设定\n\n`;
    output += `子流派：${this.settings.genre}\n`;
    output += `核心爽梗：${this.settings.core_shuangdian}（${this.settings.shuangdian_type || ''}）\n`;
    output += `金手指：${this.settings.gold_finger.type}（${this.settings.gold_finger.perception}）\n`;
    output += `量化描述：${this.settings.gold_finger.quantified_description}\n`;
    output += `开场策略：策略${this.settings.episode_1_strategy}\n`;
    output += `终极钩子：${this.settings.ultimate_hook}\n`;
    output += `主角：${this.settings.protagonist.name}（表面：${this.settings.protagonist.surface_identity}，真实：${this.settings.protagonist.true_identity}）\n`;
    output += `口头禅：${this.settings.protagonist.catchphrase}\n`;
    output += `女主：${(this.settings.female_lead || {}).name || '无'}（${(this.settings.female_lead || {}).personality || ''}）\n`;
    output += `主反派：${(this.settings.main_villain || {}).name || '无'}（${(this.settings.main_villain || {}).motivation || ''}）\n\n`;

    output += `## 嘲讽者\n`;
    (this.settings.mockers || []).forEach((m: any) => {
      output += `- ${m.name}："${m.signature_taunt}" → 第${m.face_slap_episode}集打脸\n`;
    });

    output += `\n# 📺 10集大纲\n\n`;
    (this.outline.outline || []).forEach((ep: any) => {
      output += `## 第${ep.episode}集 ${ep.title || ''}  [${ep.engine}] ${ep.shuang_level}\n`;
      output += `冲突层级：${ep.conflict_level || ''} | 出手次数：${ep.protagonist_action_count}\n`;
      output += `核心冲突：${ep.core_conflict}\n`;
      output += `关键场景：${(ep.key_scenes || []).join(' → ')}\n`;
      output += `信息差：${ep.info_gap_status || ''}\n`;
      output += `暗线：${ep.dark_line_status || ''}\n`;
      output += `嘲讽者：${ep.mocker_activity || ''}\n`;
      output += `钩子：${ep.hook_type || ''} — ${ep.hook_content || ''}\n\n`;
    });

    const dl = this.outline.dark_line_detail;
    if (dl) {
      output += `## 暗线详情\n`;
      output += `第4集：${dl.ep4_action}\n`;
      output += `第5集：${dl.ep5_progress}\n`;
      output += `第6集：${dl.ep6_partial_use}\n`;
      output += `第7集：${dl.ep7_full_reveal}\n`;
      output += `观众恍然大悟：${dl.audience_realization}\n\n`;
    }

    const fsm = this.outline.face_slap_map;
    if (fsm && fsm.length > 0) {
      output += `## 打脸映射\n`;
      fsm.forEach((fs: any) => {
        output += `- ${fs.mocker_name}：第${fs.taunt_episode}集嘲讽"${fs.taunt_line}" → 第${fs.slap_episode}集打脸："${fs.callback_line}"\n`;
      });
    }

    return output;
  }

  async generateScripts(
    outlineText: string,
    phase: number,
    novel: string,
    formattingRef?: string,
    onProgress?: (scriptContent: string, currentEp: number) => void
  ): Promise<string> {
    if (!this.settings || !this.outline) {
      throw new Error('请先完成分析和大纲生成');
    }

    const allScripts: string[] = [];
    const startEp = (phase - 1) * 10 + 1;
    const endEp = phase * 10;

    for (let ep = startEp; ep <= endEp; ep++) {
      const epOutline = (this.outline.outline || []).find((e: any) => e.episode === ep);
      if (!epOutline) continue;

      let previousSummary = '';
      if (allScripts.length > 0) {
        previousSummary = `上一集结尾：\n...${allScripts[allScripts.length - 1].slice(-200)}`;
      }

      // ✅ 仅修改此处：第一集加专属炸场强制规则
      let specialRules = '';
      if (ep === 1) specialRules = `${EPISODE_1_STRATEGIES}\n⚠️ 第一集强制零铺垫炸场：前3个镜头严格匹配选定的开场策略（${this.settings.episode_1_strategy}）和对应类型的量化炸场要求，100字以内完成透底，立刻切落魄/日常/重生场景，绝对禁止先拍废物场景再闪回，字数控制在550-750字。`;
      if (ep <= 5) specialRules += '\n第2-5集严格禁止主角任何形式的出手，最多只能有微表情变化，必须加观众专属OS提示主角是故意隐忍，每集至少3类旁观者反应。';

      let darkLineContext = '';
      if (ep >= 4 && ep <= 7 && this.outline.dark_line_detail) {
        const dl = this.outline.dark_line_detail;
        darkLineContext = `暗线详情：第4集${dl.ep4_action}→第5集${dl.ep5_progress}→第6集${dl.ep6_partial_use}→第7集${dl.ep7_full_reveal}。暗线进展必须加观众专属特写提示，剧内角色不知情。`;
      }

      let faceSlipContext = '';
      if ((ep === 7 || ep === 8) && this.outline.face_slap_map) {
        const relevantSlaps = (this.outline.face_slap_map || []).filter((fs: any) => {
          const slapEp = String(fs.slap_episode || '').replace(/[^0-9]/g, '');
          return slapEp === String(ep);
        });
        if (relevantSlaps.length > 0) {
          faceSlipContext = `本集打脸：\n${relevantSlaps.map((fs: any) => `- ${fs.mocker_name}：原话"${fs.taunt_line}" → 回扣："${fs.callback_line}"。打脸必须干脆，至少3层旁观者反应。`).join('\n')}`;
        }
      }

      const formatRef = formattingRef ? `\n排版参考：\n${formattingRef.slice(0, 300)}\n请模仿以上排版格式。` : '';

      const prompt = `
你是爽剧短剧编剧。根据大纲写第${ep}集剧本，爽感优先，打脸够狠。

${FORMAT_RULES}
${SCRIPT_FORMAT_EXAMPLE}
${specialRules}
${ANTI_BUG_RULES}

基础设定：
- 标题：${this.settings.title}
- 主角：${this.settings.protagonist.name}（表面：${this.settings.protagonist.surface_identity}，真实：${this.settings.protagonist.true_identity}）
- 性格：${(this.settings.protagonist.personality_tags || []).join('、')}
- 标志性动作：${(this.settings.protagonist.signature_actions || []).join('、')}
- 口头禅：${this.settings.protagonist.catchphrase}
- 金手指：${this.settings.gold_finger.quantified_description}（${this.settings.gold_finger.perception}）
- 女主：${(this.settings.female_lead || {}).name || '无'}
- 嘲讽者：${(this.settings.mockers || []).map((m: any) => `${m.name}（"${m.signature_taunt}"）`).join('；')}

第${ep}集大纲：
- 核心冲突：${epOutline.core_conflict}
- 场景：${(epOutline.key_scenes || []).join(' → ')}
- 信息差：${epOutline.info_gap_status || ''}
- 嘲讽者动态：${epOutline.mocker_activity || ''}
- 钩子：${epOutline.hook_content || ''}
${darkLineContext}
${faceSlipContext}
${previousSummary}
${formatRef}

⚠️ 硬性要求：
1. 字数400-600字
2. 标准竖屏短剧格式：场景头+△动作+角色名：台词
3. 台词口语化短句有个性
4. 结尾在"${epOutline.hook_content || '最刺激瞬间'}"△黑幕
${ep === 8 ? '5. 高潮集！打脸必须干脆，精确回扣原话！' : ''}
`;

      const script = await callLLM(prompt, false, DEFAULT_TEMPERATURE, 2, 120000, 2048);
      const formattedScript = `${'─'.repeat(40)}\n第${ep}集\n${'─'.repeat(40)}\n\n${script}`;
      allScripts.push(formattedScript);
      
      // 触发回调，让前端每生成一集就能渲染出来，同时避免单次长时间卡死
      if (onProgress) {
        onProgress(formattedScript, ep);
      }

      if (ep < endEp) {
        await delay(DELAY_BETWEEN_EPISODES);
      }
    }

    return allScripts.join('\n\n');
  }
}
