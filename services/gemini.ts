// ====================== 【配置区】======================
// API Key 从 Cloudflare 环境变量注入（在 vite.config.ts 中配置）
const API_KEY: string = (import.meta as any).env?.VITE_OPENAI_API_KEY || '';
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const MODEL_NAME = "anthropic/claude-sonnet-4.6";
const MAX_RETRY = 3;
// ======================================================================

// ---------------------- 全局规则常量 ----------------------
const GLOBAL_TOP_RULES = `
## 🔝 全局最高优先级规则（所有流程必须严格遵守，优先级高于其他所有规则）
### 🎯 强制新增规则（必须100%执行）
1. 【强制金手指规则】
   无论原著是否有金手指/穿越设定，必须给主角二选一强加金手指：
   - 选项1：穿越者身份（自带信息差/先知优势，比如穿越回10年前知道房价走势、穿越到古代知道历史走向）
   - 选项2：系统金手指（适配核心爽点类型，比如爽点是慧眼识珠就加鉴宝系统，爽点是扮猪吃虎就加战力检测系统）
   ✅ 金手指定位：仅作为给观众透底的铺垫工具，严格遵守各爽点的金手指使用边界，仅可在约定的铺垫阶段出现1次，绝对不抢核心爽梗的风头，禁止中途乱跳出来刷存在感
2. 【爽感优先魔改规则】
   无需贴合原著剧情，可自由魔改、加冲突、加反派、加爽点，只要保留主角核心人设（比如废柴/赘婿/战神）和核心钩子即可，所有改编以「爽」为第一标准，不需要遵守原著剧情走向
---
### 原有强制规则
### 一、前三集强制规则（不可修改）
1. 第1集强制要求：
   - 开篇3秒必须出强冲突画面（比如主角被押上斩仙台、反派甩离婚协议、女儿被踩在脚下），无冗余铺垫
   - 10秒内出核心矛盾：通过反派台词/旁白带出主角绝境
   - 30秒内完成2个动作：① 抛出全剧终极钩子 ② 仅给观众透底1次核心爽梗的前置信息（强制加的金手指/底牌，仅观众可见，剧内角色不知情），给足安全感
   - 核心爽梗仅做前置铺垫，不释放，禁止插入无关爽点
2. 第2集强制要求：
   - 全程围绕「强化反派/冲突压迫感+烘托大众对主角的轻视/绝境的严重性」走，拉满观众期待值
   - 必须展示核心冲突的严重性（比如反派硬实力、宝物稀缺性、绝境危险度），禁止空口装逼
   - 必须出现对应立场的旁观者，拉满氛围
   - 不释放核心爽点，仅做铺垫
3. 第3集强制要求：
   - 结尾必须留爆炸级钩子，直接关联全剧终极钩子，不能留小悬念
   - 钩子必须停在最极致的临界点（比如反派刀架在主角脖子上、宝物马上要被抢走），戛然而止
   - 可以有小反转，但绝对不释放核心大爽点
### 二、爽梗唯一原则
- 单段剧情/单集仅允许1个S级核心爽梗，其余所有元素（金手指、支线、配角）仅可作为铺垫工具，核心爽梗占比≥80%，辅助元素占比≤20%，绝对不能喧宾夺主
- 辅助元素（比如金手指）仅可在约定的铺垫阶段出现，不能抢核心爽梗的风头
### 三、钩子优先级原则
- 全剧终极钩子 > 10集阶段钩子 > 单集钩子，全剧终极钩子每10集至少强化1次，每集结尾必须留单集钩子，绝不允许断钩
`;

const SHUANGDIAN_LIBRARY = `
## 📚 可选S级核心爽点库（必须从以下分类中选择，禁止自定义）
1. 装逼打脸类：扮猪吃虎 / 实力碾压 / 解决难题 / 上帝视角 / 万千宠爱 / 一呼百应 / 幕后大佬 / 挥金如土 / 天赋异禀 / 不按常理
2. 荣获至宝类：夺宝奇兵 / 慧眼识珠 / 神器认主 / 收服帮派
3. 意外之喜类：无心插柳 / 一夜暴富 / 偷听秘闻 / 因祸得福
4. 惩戒恶人类：大仇得报 / 诛杀坏人 / 劫富济贫
5. 人格魅力类：持之以恒 / 认祖归宗 / 重情重义 / 知恩图报
6. 拯救危难类：力挽狂澜 / 英雄救美
7. 智商碾压类：预判对手 / 渔翁得利
8. 绝地反杀类：绝境逃脱 / 极限反杀
`;

const SUB_GENRE_RULES = `
## 🎭 子流派专属规则（对应流派必须严格遵守）
| 子流派 | 专属钩子规则 | 专属爽梗规则 |
|--------|--------------|--------------|
| 玄幻修仙 | 全剧终极钩子必须绑定「生死危机/终极复仇」，比如「被挖灵根的废柴，能不能在仙门大会上反杀仇人飞升？」；每10集阶段钩子绑定「越阶挑战/秘境夺宝」 | 核心爽梗金手指（混沌体/老爷爷/系统）仅可提前给观众透底1次，打脸必须主角自己出手，禁止代打 |
| 都市赘婿 | 全剧终极钩子必须绑定「身份揭晓/复仇」，比如「隐藏3年的首富继承人，能不能在妻子被赶出家门时反杀所有看不起他的人？」；每10集阶段钩子绑定「妻女受辱→反杀」 | 身份底牌仅可在打脸最高潮揭晓，之前必须把嘲讽拉满 |
| 战神归来 | 全剧终极钩子必须绑定「护妻护女/复仇」，比如「消失5年的战神，能不能在女儿被拐卖前反杀所有仇家？」；每10集阶段钩子绑定「家人受辱→反杀」 | 战力/身份仅可提前给观众透底1次，禁止直接喊手下上场，必须先装弱再打脸 |
| 都市异能 | 全剧终极钩子必须绑定「异能暴露/拯救危机」，比如「有读心术的职员，能不能在公司破产前揪出内奸？」；每10集阶段钩子绑定「异能隐藏→解决危机」 | 异能仅可提前给观众透底1次，爽点突出信息差反差 |
| 穿越历史 | 全剧终极钩子必须绑定「改变命运/夺嫡/救国」，比如「穿越成废太子的现代人，能不能在3个月后的废储大典上保住皇位？」；每10集阶段钩子绑定「朝堂危机→打脸政敌」 | 现代知识/历史记忆仅可提前给观众透底1次，爽点突出知识差 |
| 校园爽文 | 全剧终极钩子必须绑定「逆袭考学/打脸校霸」，比如「常年倒数的学渣，能不能在高考时考上清北反杀所有人？」；每10集阶段钩子绑定「考试/比赛→打脸」 | 金手指（过目不忘/系统）仅可提前给观众透底1次，爽点突出学渣→学霸的反差 |
`;

const SHUANGDIAN_EXEC_RULES = `
## ⚙️ 爽点专属执行规则（对应爽点类型必须严格遵守）
### 1. 装逼打脸类（核心：反差感）
- 核心要求：所有内容围绕「别人看不起主角→主角用实力/身份打脸」走，爽感100%集中在主角反差高光
- 金手指边界：仅可在铺垫阶段向观众透底1次（比如系统提示【宿主是当朝太傅，在场官员品级都比你低】/ 穿越者提示【你知道这个反派下个月就要倒台】），仅此1次，后续全程隐身；禁止打脸过程中弹提示、给buff、替主角打脸
- 铺垫要求：先铺垫他人的轻视/嘲讽→主角可故意示弱放大反差→打脸瞬间干脆利落，跟上全场震惊反应
- 禁入内容：禁止中途插入得宝、升级、无关支线
### 2. 荣获至宝类（核心：价值感）
- 核心要求：所有内容围绕「宝物有多稀有→主角得到它的爽感」走，爽感100%集中在得宝本身
- 金手指边界：仅可在宝物出现时向观众透底1次价值（比如系统提示【这是上古混沌钟，可秒杀金丹】/ 穿越者提示【你知道这块石头里有千年暖玉】），仅此1次；禁止得宝过程中弹其他奖励、直接把宝物塞给主角
- 铺垫要求：先铺垫宝物的稀缺性（所有人抢破头/不识货）→得宝瞬间给特写→跟上旁人嫉妒/震惊反应
- 禁入内容：禁止中途插入反派挑衅、打脸、无关支线
### 3. 意外之喜类（核心：惊喜感）
- 核心要求：所有内容围绕「主角没抱希望→突然得到远超预期的收获」走，爽感100%集中在意外收获瞬间
- 金手指边界：仅可在收获揭晓时出现1次明确价值，仅此1次；禁止提前剧透收获，破坏意外感
- 铺垫要求：先铺垫「这件事没好处/倒霉」→揭晓收获时先给旁人震惊反应，再亮价值
- 禁入内容：禁止提前透底、插入其他爽点
### 4. 惩戒恶人类（核心：宣泄感）
- 核心要求：所有内容围绕「恶人有多坏→得到应有的惩罚」走，爽感100%集中在恶人受罚瞬间
- 金手指边界：仅可在铺垫阶段向观众透底1次主角有惩罚恶人的能力，仅此1次；禁止金手指直接替主角惩罚
- 铺垫要求：先铺垫恶人的恶行（欺负弱小/有前科）→惩罚够解气→跟上受害者拍手称快反应
- 禁入内容：禁止中途插入得宝、升级、洗白恶人
### 5. 人格魅力类（核心：认同感）
- 核心要求：所有内容围绕「主角坚持品格→最终得到认可/回报」走，爽感100%集中在主角品格高光
- 金手指边界：仅可在最终认可时出现1次明确回报价值，仅此1次；禁止金手指引导主角做选择
- 铺垫要求：先铺垫主角的困境（所有人劝他放弃/走捷径）→最终得到认可时跟上质疑者的愧疚/敬佩反应
- 禁入内容：禁止中途插入打脸、得宝等爽点
### 6. 拯救危难类（核心：成就感）
- 核心要求：所有内容围绕「危难有多严重→主角出手拯救」走，爽感100%集中在拯救高光瞬间
- 金手指边界：仅可在铺垫阶段向观众透底1次主角有能力解决危难，仅此1次；禁止金手指直接解决危难
- 铺垫要求：先铺垫危难的严重性（所有人束手无策/死伤惨重）→主角出手干脆利落→跟上所有人感激/崇拜反应
- 禁入内容：禁止中途插入反派挑衅、得宝等无关内容
### 7. 智商碾压类（核心：智力优越感）
- 核心要求：所有内容围绕「对手耍诡计→主角早有预判反坑对手」走，爽感100%集中在主角智商高光
- 金手指边界：仅可在铺垫阶段向观众透底1次主角有预判，仅此1次；禁止金手指直接给答案/证据
- 铺垫要求：先铺垫对手诡计的毒辣（所有人都被骗了）→拆穿时层层递进→跟上对手破防反应
- 禁入内容：禁止中途插入武力打脸、得宝等内容，必须突出智商优势
### 8. 绝地反杀类（核心：刺激感）
- 核心要求：所有内容围绕「主角陷入必死绝境→极限翻盘反杀」走，爽感100%集中在反杀瞬间
- 金手指边界：仅可在绝境铺垫阶段向观众透底1次主角有最后底牌，仅此1次；禁止金手指中途给buff/救场
- 铺垫要求：先铺垫绝境的绝望感（刀架脖子/所有人觉得他死定了）→反杀瞬间快狠准→跟上对手难以置信的反应
- 禁入内容：禁止中途插入第三方救场、得宝等内容
`;

// ---------------------- 通用 LLM 调用函数 ----------------------
async function callLLM(prompt: string, outputJson: boolean = true, retries: number = MAX_RETRY): Promise<any> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
         'HTTP-Referer': window.location.origin,
'X-Title': 'Novel-to-Script-Generator',
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [{ role: 'user', content: prompt }],
   temperature: 0.9,
          max_tokens: 8000,
          ...(outputJson ? { response_format: { type: 'json_object' } } : {}),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('⚠️ API_KEY 错误，请检查 Cloudflare 环境变量中的 OpenRouter 密钥是否正确！');
        }
        if (response.status === 404) {
          throw new Error('⚠️ 模型未找到，请检查 MODEL_NAME 在 OpenRouter 上是否存在！');
        }
        throw new Error(`API 请求失败 (${response.status}): ${JSON.stringify(errData)}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim();

      if (!content) {
        throw new Error('API 返回内容为空');
      }

      if (outputJson) {
        let jsonStr = content;
        // 去除可能的 markdown 代码块包裹
        jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
        jsonStr = jsonStr.trim();
        try {
          return JSON.parse(jsonStr);
        } catch (e) {
          console.error('JSON 解析失败，原始内容：', content);
          throw new Error('模型返回的内容不是有效的 JSON 格式');
        }
      }
      return content;
    } catch (error: any) {
      // 不可重试的错误直接抛出
      if (error.message?.includes('API_KEY') || error.message?.includes('模型未找到')) {
        throw error;
      }
      console.warn(`调用出错（第${attempt + 1}次）：${error.message}，重试中...`);
      if (attempt === retries - 1) {
        throw error;
      }
      // 指数退避等待
      await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, attempt), 10000)));
    }
  }
}

// ---------------------- 爽点类型匹配工具 ----------------------
function matchShuangdianType(coreShuangdian: string): string {
  const typeMap: Record<string, string[]> = {
    '装逼打脸类': ['扮猪吃虎', '实力碾压', '幕后大佬', '挥金如土', '天赋异禀', '不按常理', '万千宠爱', '一呼百应', '解决难题', '上帝视角'],
    '荣获至宝类': ['夺宝奇兵', '慧眼识珠', '神器认主', '收服帮派'],
    '意外之喜类': ['无心插柳', '一夜暴富', '偷听秘闻', '因祸得福'],
    '惩戒恶人类': ['大仇得报', '诛杀坏人', '劫富济贫'],
    '人格魅力类': ['持之以恒', '认祖归宗', '重情重义', '知恩图报'],
    '拯救危难类': ['力挽狂澜', '英雄救美'],
    '智商碾压类': ['预判对手', '渔翁得利'],
    '绝地反杀类': ['绝境逃脱', '极限反杀'],
  };

  for (const [type, keywords] of Object.entries(typeMap)) {
    if (keywords.some(kw => coreShuangdian.includes(kw))) {
      return type;
    }
  }
  return '';
}

// ---------------------- GeminiService 类（供 App.tsx 调用）----------------------
export class GeminiService {

  // 第一阶段：分析小说骨架
  async analyzeNovel(novelContent: string): Promise<string> {
    const prompt = `
    ${GLOBAL_TOP_RULES}
    ${SHUANGDIAN_LIBRARY}
    ${SUB_GENRE_RULES}
    
    【任务】
    基于输入的小说内容提炼核心卖点，可自由魔改，爽感优先，必须给主角强加穿越/系统金手指二选一，输出标准化的小说核心骨架。
    【输出要求（必须严格按照JSON格式输出，不要有多余内容）】
    {
        "base_info": {
            "book_name": "书名，可魔改得更有爽感",
            "core_genre": "男频/女频",
            "sub_genre": "从子流派规则表中选对应标签，最多3个",
            "protagonist": "主角姓名+身份+核心性格+隐藏底牌，必须包含强制加的穿越/系统金手指",
            "gold_finger": "强制加的金手指类型+能力+触发条件，明确使用边界（仅铺垫阶段出现1次）",
            "final_boss": "最终BOSS姓名+身份+核心战力+和主角的核心仇恨，可魔改得更嚣张更坏",
            "final_goal": "主角最终要完成的终极目标，可魔改得更有爽感"
        },
        "ultimate_hook": {
            "content": "全剧终极二元悬念，必须是明确的是非疑问，比如「被打入斩仙台的废仙，能不能在3日问斩前反杀所有众神？」，禁止模糊表述",
            "strengthen_nodes": ["第10集强化内容", "第20集强化内容", "...每10集1个"]
        },
        "shuangdian_tags": [
            {
                "episode_range": "爽点对应的集数范围，比如1-5集",
                "core_shuangdian": "从爽点库中选1个S级核心爽点",
                "forbidden_elements": ["该爽点的禁入元素，比如频繁系统提示、无关支线"],
                "gold_finger_boundary": "金手指的使用边界，比如仅在第1集铺垫阶段出现1次"
            }
        ],
        "sub_genre_rules": "对应子流派的专属钩子+爽梗规则，从子流派规则表中提取"
    }
    
    【校验规则】
    1. 必须给主角强加穿越/系统金手指二选一，没有则直接重写
    2. 终极钩子必须符合要求，不能模糊
    3. 核心爽点必须从给定的爽点库中选择，禁止自定义
    4. 所有字段不能为空，缺项直接重写
    
    【输入的小说内容】：
    ${novelContent.slice(0, 10000)}
    `;

    const result = await callLLM(prompt, true);
    return this.formatAnalysisReport(result);
  }

  // 格式化分析报告为可读文本
  private formatAnalysisReport(skeleton: any): string {
    const info = skeleton.base_info;
    const hook = skeleton.ultimate_hook;
    let report = `📖 书名：${info.book_name}\n`;
    report += `📂 流派：${info.core_genre} / ${info.sub_genre}\n`;
    report += `👤 主角：${info.protagonist}\n`;
    report += `🔧 金手指：${info.gold_finger}\n`;
    report += `👿 终极BOSS：${info.final_boss}\n`;
    report += `🎯 终极目标：${info.final_goal}\n\n`;
    report += `🪝 全剧终极钩子：${hook.content}\n`;
    report += `📍 钩子强化节点：${hook.strengthen_nodes.join('、')}\n\n`;
    report += `⚡ 爽点规划：\n`;
    skeleton.shuangdian_tags.forEach((tag: any) => {
      report += `  - ${tag.episode_range}：${tag.core_shuangdian}（金手指边界：${tag.gold_finger_boundary}）\n`;
    });
    report += `\n🎭 子流派规则：${skeleton.sub_genre_rules}\n`;

    // 把原始 JSON 存在末尾，供后续阶段使用
    report += `\n\n<!--SKELETON_JSON_START-->${JSON.stringify(skeleton)}<!--SKELETON_JSON_END-->`;
    return report;
  }

  // 从分析报告中提取骨架 JSON
  private extractSkeleton(analysisReport: string): any {
    const match = analysisReport.match(/<!--SKELETON_JSON_START-->(.+?)<!--SKELETON_JSON_END-->/);
    if (match) {
      return JSON.parse(match[1]);
    }
    throw new Error('无法从分析报告中提取骨架数据，请重新运行分析');
  }

  // 第二阶段：生成分集大纲
  async generateOutline(novelContent: string, analysisReport: string): Promise<string> {
    const skeleton = this.extractSkeleton(analysisReport);
    const unitNum = 1;
    const unitStart = (unitNum - 1) * 10 + 1;
    const unitEnd = unitNum * 10;

    const prompt = `
    ${GLOBAL_TOP_RULES}
    ${SHUANGDIAN_LIBRARY}
    ${SHUANGDIAN_EXEC_RULES}
    子流派规则：${skeleton.sub_genre_rules}
    
    【基础信息】
    全剧终极钩子：${skeleton.ultimate_hook.content}
    本单元对应集数：${unitStart}-${unitEnd}集
    本单元核心爽点：从以下爽点标签中匹配对应集数的爽点：${JSON.stringify(skeleton.shuangdian_tags)}
    强制金手指：${skeleton.base_info.gold_finger}
    
    【任务】
    生成符合竖屏短剧要求的10集单元大纲，可自由魔改剧情、加冲突、加反派，爽感优先，无需拘泥原著细节。
    【输出要求（必须严格按照JSON格式输出，不要有多余内容）】
    {
        "unit_base_info": {
            "unit_num": ${unitNum},
            "episode_range": "${unitStart}-${unitEnd}集",
            "stage_goal": "本单元主角要完成的核心任务，可魔改得更有爽感",
            "stage_hook": "本单元的核心阶段悬念",
            "core_shuangdian": "本单元的S级核心爽点，从爽点库中选1个",
            "core_villain": "本单元核心反派的战力/智商/势力优势",
            "bystanders": ["踩主角的人群", "同情主角的人群", "看热闹的人群"]
        },
        "episode_outlines": [
            {
                "episode_num": 1,
                "core_plot": "30字以内概括本集核心剧情",
                "single_hook": "本集结尾的单集悬念",
                "shuangdian_padding": "本集对应的爽点铺垫内容，没有则填无",
                "ultimate_hook_strengthen": "本集是否强化全剧终极钩子，没有则填无"
            }
        ]
    }
    
    【校验规则】
    1. 必须有三层钩子：全剧终极钩子每10集至少强化1次，本单元有阶段钩子，每集有单集结尾钩子
    2. 核心爽点占比≥80%，辅助元素不越界，没有双核心爽点
    3. 反派足够强、足够坏，有明确的旁观者阵营
    4. 严格遵守对应子流派和爽点的专属规则，金手指不越界
    `;

    const outlineData = await callLLM(prompt, true);
    let text = this.formatOutline(outlineData);
    text += `\n\n<!--OUTLINE_JSON_START-->${JSON.stringify({ outline: outlineData, skeleton })}<!--OUTLINE_JSON_END-->`;
    return text;
  }

  private formatOutline(outline: any): string {
    const info = outline.unit_base_info;
    let text = `📋 单元大纲：${info.episode_range}\n`;
    text += `🎯 核心任务：${info.stage_goal}\n`;
    text += `🪝 阶段悬念：${info.stage_hook}\n`;
    text += `⚡ 核心爽点：${info.core_shuangdian}\n`;
    text += `👿 核心反派：${info.core_villain}\n`;
    text += `👥 旁观者：${info.bystanders.join(' / ')}\n\n`;
    text += `--- 分集大纲 ---\n\n`;

    outline.episode_outlines.forEach((ep: any) => {
      text += `【第${ep.episode_num}集】${ep.core_plot}\n`;
      text += `  钩子：${ep.single_hook}\n`;
      text += `  爽点铺垫：${ep.shuangdian_padding}\n`;
      text += `  终极钩子强化：${ep.ultimate_hook_strengthen}\n\n`;
    });

    return text;
  }

  // 第三阶段：生成全部脚本
  async generateScripts(outlineText: string, phase: number, novelContent: string, formattingRef?: string): Promise<string> {
    const match = outlineText.match(/<!--OUTLINE_JSON_START-->(.+?)<!--OUTLINE_JSON_END-->/);
    if (!match) {
      throw new Error('无法从大纲中提取数据，请重新生成大纲');
    }

    const { outline, skeleton } = JSON.parse(match[1]);
    const coreShuangdian = outline.unit_base_info.core_shuangdian;
    const shuangdianType = matchShuangdianType(coreShuangdian);

    const allScripts: string[] = [];

    for (const episode of outline.episode_outlines) {
      const prompt = `
      ${GLOBAL_TOP_RULES}
      ${SHUANGDIAN_EXEC_RULES}
      本集核心爽点类型：${shuangdianType}，核心爽点：${coreShuangdian}
      对应子流派规则：${skeleton.sub_genre_rules}
      全剧终极钩子：${skeleton.ultimate_hook.content}
      强制金手指：${skeleton.base_info.gold_finger}
      ${formattingRef ? `\n【排版参考】请严格模仿以下排版风格：\n${formattingRef.slice(0, 2000)}` : ''}
      
      【任务】
      基于单集大纲生成1-2分钟的竖屏短剧脚本，300-500字，节奏快、冲突强、爽感足，可自由加细节加台词，不需要拘泥原著。
      【格式要求】
      严格按照以下格式输出，不要有多余内容：
      ### 第${episode.episode_num}集
      【场景】：一句话说明场景，比如「斩仙台 日 外」
      【画面】：分点描述画面，聚焦人物上半身/表情，每3秒一个小冲突点，适配竖屏
      【台词】：对应画面的人物台词，短句为主，无长句、无书面语，反派要够狂，主角要够稳
      【字幕/系统提示】：仅出现约定的1次铺垫用金手指提示/关键信息提示，仅观众可见，后续全程隐身
      
      【校验规则】
      1. 符合钩子要求：每集结尾留悬念，按时强化全剧终极钩子
      2. 核心爽梗占比≥80%，辅助元素不越界，金手指仅在约定阶段出现1次，没有抢戏
      3. 严格遵守对应爽点类型的专属规则
      4. 观众看完的第一感受是「爽」，注意力完全集中在核心爽梗上，没有被其他内容分散
      
      【单集大纲】：
      ${JSON.stringify(episode)}
      `;

      const script = await callLLM(prompt, false);
      allScripts.push(script);
      // 避免限流
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return allScripts.join('\n\n---\n\n');
  }
}
