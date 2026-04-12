const PROXY_URL = "/api/llm";
const MODEL_NAME = "anthropic/claude-sonnet-4.6";
const MAX_RETRY = 5;
const API_CALL_DELAY = 3000;
const DELAY_BETWEEN_EPISODES = 5000;
const DEFAULT_TEMPERATURE = 0.7;

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

const EPISODE_1_STRATEGIES = `
## 第1集开场策略
### 策略A：先炸后藏（适用于：扮猪吃虎/战神归来/赘婿逆袭/身份隐藏类）
核心逻辑：先让观众看到主角最强的样子→交代为什么要藏→画面一转进入"废物"状态
### 策略B：日常暴露（适用于：天赋异禀/不自知/气运流/隐性金手指类）
核心逻辑：主角做日常小事→无意间做了逆天的事但不知道→知情人看到后量化反应
### 策略C：系统激活（适用于：直播爽文/规则怪谈/系统流）
核心逻辑：主角最低谷时系统激活→给出第一个任务/规则→完成后获得第一次小爽
### 策略D：重生闪回（适用于：重生复仇/先知流）
核心逻辑：前世最惨的死亡画面→睁眼回到过去→立刻做只有重生者才会做的事
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
## 爽点执行规则
- 每个核心爽点搭配至少1个辅助爽感元素
- 装逼打脸：先铺嘲讽→打脸干脆+回扣原话+全场震惊
- 暗线规则：第4集埋→第5集微进展→第6集部分使用→第7集引爆
- 旁观者烘托：冲突场景至少2-3类旁观者反应
- 打脸闭环：每个嘲讽者必须有打脸回报，回扣具体嘲讽台词
- 伏笔闭环：所有伏笔本阶段回收
- 禁止连续2集相同冲突
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
  timeoutMs: number = 180000
): Promise<any> {
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
                ? `你是专业短剧创作助手。输出JSON用<json></json>标签包裹，标签外无任何内容。JSON严格规范：双引号key、字符串内双引号转义、无trailing comma。尽量精简输出，不要输出多余解释。`
                : `你是专业短剧编剧。写标准短剧格式（△动作+角色名：台词），绝对不用【场景】【画面】【台词】分块格式。台词口语化短句有个性。结尾在最刺激瞬间△黑幕。`
            },
            { role: 'user', content: prompt }
          ],
          temperature: needJson ? 0.3 : temperature,
          max_tokens: 16000,
        }),
      }, timeoutMs);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 401) throw new Error('API_KEY错误');
        if (response.status === 404) throw new Error('模型未找到');
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
      if (error.message?.includes('API_KEY') || error.message?.includes('模型未找到')) throw error;
      console.warn(`调用出错（第${attempt + 1}/${retries}次）：${error.message}`);
      if (attempt === retries - 1) throw error;
      const baseMs = error.message?.includes('超时') ? 10000 : 5000;
      await delay(Math.min(baseMs * Math.pow(2, attempt), 120000));
    }
  }
  throw new Error('LLM调用失败：已耗尽所有重试次数');
}

export class GeminiService {
  private settings: any = null;
  private outline: any = null;

  async analyzeNovel(novel: string): Promise<string> {
    const prompt = `
你是专业短剧编剧AI。分析以下原著小说，提取骨架信息并判定最适合的改编方向。

${GOLD_FINGER_FRAMEWORK}
${EPISODE_1_STRATEGIES}

原著内容（节选）：
${novel.slice(0, 8000)}

请输出详细的分析报告（纯文本，不需要JSON），包含：

## 一、原著骨架提取
1. 核心人物关系图
2. 核心冲突主线
3. 主角的底层动机
4. 原著中最有爽感潜力的3个情节点

## 二、流派判定
1. 最适合的子流派
2. 判定依据
3. 推荐的核心爽梗
4. 推荐的辅助爽梗

## 三、金手指设计建议
1. 推荐金手指类型及感知维度
2. 量化描述建议
3. 透底形式建议
4. 隐忍理由建议

## 四、魔改方向建议
1. 原著中需要保留的核心骨架
2. 需要强化/魔改的部分
3. 需要删减的部分
4. 建议新增的爽点元素

## 五、终极钩子建议
1. 推荐的终极钩子
2. 观众追到底要看的是什么

请直接输出分析报告，语言专业但易懂。
`;
    return await callLLM(prompt, false, 0.5, MAX_RETRY, 240000);
  }

  async generateOutline(novel: string, analysisReport: string): Promise<string> {
    const settingsPrompt = `
你是短剧编剧AI。根据原著分析报告，生成短剧基础设定。

${GOLD_FINGER_FRAMEWORK}
${EPISODE_1_STRATEGIES}

原著内容（节选）：
${novel.slice(0, 4000)}

分析报告：
${analysisReport.slice(0, 3000)}

请输出精简JSON（不要多余解释），用<json></json>包裹：
{
  "title": "短剧标题",
  "genre": "子流派",
  "core_shuangdian": "核心爽梗",
  "auxiliary_shuangdian": ["辅助1", "辅助2"],
  "shuangdian_type": "爽梗大类",
  "gold_finger": {
    "type": "金手指类型",
    "perception": "感知维度",
    "form": "存在形式",
    "action": "作用方式",
    "quantified_description": "量化描述（必须具体到数字）",
    "reveal_method": "透底形式",
    "hide_reason": "隐忍理由"
  },
  "episode_1_strategy": "A或B或C或D",
  "protagonist": {
    "name": "姓名",
    "surface_identity": "表面身份",
    "true_identity": "真实底牌",
    "personality_tags": ["性格1", "性格2"],
    "signature_actions": ["动作1"],
    "catchphrase": "口头禅",
    "bottom_line": "底线"
  },
  "female_lead": {
    "name": "姓名",
    "relationship": "与主角关系",
    "personality": "性格"
  },
  "main_villain": {
    "name": "姓名",
    "motivation": "动机",
    "escalation_path": "手段升级路径"
  },
  "mockers": [
    {
      "name": "姓名",
      "identity": "身份",
      "signature_taunt": "标志性嘲讽台词",
      "face_slap_episode": 7,
      "face_slap_method": "打脸方式"
    }
  ],
  "ultimate_hook": "终极钩子",
  "setting_summary": "一句话概括"
}
`;

    this.settings = await callLLM(settingsPrompt, true, 0.3, MAX_RETRY, 300000);
    await delay(API_CALL_DELAY);

    const outline1Prompt = `
你是短剧编剧AI。根据基础设定生成第1-5集大纲。

${PER_EPISODE_ENGINE}
${SHUANGDIAN_EXEC_RULES}

基础设定：
- 标题：${this.settings.title}
- 核心爽梗：${this.settings.core_shuangdian}
- 金手指：${this.settings.gold_finger.quantified_description}（${this.settings.gold_finger.perception}）
- 主角：${this.settings.protagonist.name}（表面${this.settings.protagonist.surface_identity}，真实${this.settings.protagonist.true_identity}）
- 女主：${(this.settings.female_lead || {}).name || '无'}
- 主反派：${(this.settings.main_villain || {}).name || '无'}（${(this.settings.main_villain || {}).motivation || ''}）
- 嘲讽者：${(this.settings.mockers || []).map((m: any) => m.name + '："' + m.signature_taunt + '"').join('；')}
- 开场策略：${this.settings.episode_1_strategy}
- 终极钩子：${this.settings.ultimate_hook}

爽感曲线前5集：第1集★★★→第2集★★→第3集★★→第4集★→第5集☆

输出精简JSON，用<json></json>包裹：
{
  "episodes": [
    {
      "episode": 1,
      "engine": "信息差炸弹",
      "title": "集标题",
      "shuang_level": "★★★",
      "protagonist_action_count": 1,
      "conflict_level": "口头嘲讽",
      "core_conflict": "一句话",
      "key_scenes": ["场景1", "场景2", "场景3"],
      "info_gap_status": "信息差状态",
      "dark_line_status": "无",
      "mocker_activity": "嘲讽者动态",
      "hook_type": "反差钩子",
      "hook_content": "钩子内容",
      "foreshadowing_plant": ["伏笔1"],
      "foreshadowing_payoff": []
    }
  ]
}
注意：每集key_scenes最多3个，描述尽量简短。第4集暗线启动，第5集最低谷。
`;

    const outline1 = await callLLM(outline1Prompt, true, 0.3, MAX_RETRY, 300000);
    await delay(API_CALL_DELAY);

    const outline2Prompt = `
你是短剧编剧AI。根据基础设定和前5集大纲，生成第6-10集大纲、暗线详情和打脸映射。

${PER_EPISODE_ENGINE}

基础设定：
- 标题：${this.settings.title}
- 核心爽梗：${this.settings.core_shuangdian}
- 金手指：${this.settings.gold_finger.quantified_description}
- 主角：${this.settings.protagonist.name}
- 嘲讽者：${(this.settings.mockers || []).map((m: any) => m.name + '："' + m.signature_taunt + '"，第' + m.face_slap_episode + '集打脸').join('；')}
- 终极钩子：${this.settings.ultimate_hook}

前5集大纲摘要：
${(outline1.episodes || []).map((ep: any) => `第${ep.episode}集[${ep.engine}]${ep.shuang_level}：${ep.core_conflict}，钩子：${ep.hook_content}`).join('\n')}

爽感曲线后5集：第6集★★★→第7集★★★★→第8集★★★★★→第9集★★→第10集★★★

输出精简JSON，用<json></json>包裹：
{
  "episodes": [
    {
      "episode": 6,
      "engine": "释放一口气",
      "title": "集标题",
      "shuang_level": "★★★",
      "protagonist_action_count": 1,
      "conflict_level": "层级",
      "core_conflict": "一句话",
      "key_scenes": ["场景1", "场景2", "场景3"],
      "info_gap_status": "状态",
      "dark_line_status": "状态",
      "mocker_activity": "动态",
      "hook_type": "钩子类型",
      "hook_content": "内容",
      "foreshadowing_plant": [],
      "foreshadowing_payoff": ["回收1"]
    }
  ],
  "dark_line_detail": {
    "ep4_action": "第4集暗线动作",
    "ep5_progress": "第5集微进展",
    "ep6_partial_use": "第6集部分使用",
    "ep7_full_reveal": "第7集全面引爆",
    "audience_realization": "观众恍然大悟的内容"
  },
  "face_slap_map": [
    {
      "mocker_name": "姓名",
      "taunt_episode": 2,
      "taunt_line": "嘲讽原话",
      "slap_episode": 7,
      "slap_method": "打脸方式",
      "callback_line": "回扣台词"
    }
  ]
}
注意：第7集暗线引爆，第8集全面碾压打脸回扣原话，第9-10集引入新威胁。
`;

    const outline2 = await callLLM(outline2Prompt, true, 0.3, MAX_RETRY, 300000);

    const allEpisodes = [
      ...(outline1.episodes || []),
      ...(outline2.episodes || [])
    ];

    this.outline = {
      outline: allEpisodes,
      dark_line_detail: outline2.dark_line_detail || {
        ep4_action: "待定",
        ep5_progress: "待定",
        ep6_partial_use: "待定",
        ep7_full_reveal: "待定",
        audience_realization: "待定"
      },
      face_slap_map: outline2.face_slap_map || []
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
    allEpisodes.forEach((ep: any) => {
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
    formattingRef?: string
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

      let specialRules = '';
      if (ep === 1) specialRules = EPISODE_1_STRATEGIES;
      if (ep <= 3) specialRules += '\n禁止第2-3集主角正面出手。';

      let darkLineContext = '';
      if (ep >= 4 && ep <= 7 && this.outline.dark_line_detail) {
        const dl = this.outline.dark_line_detail;
        darkLineContext = `暗线详情：第4集${dl.ep4_action}→第5集${dl.ep5_progress}→第6集${dl.ep6_partial_use}→第7集${dl.ep7_full_reveal}`;
      }

      let faceSlipContext = '';
      if ((ep === 7 || ep === 8) && this.outline.face_slap_map) {
        const relevantSlaps = (this.outline.face_slap_map || []).filter((fs: any) => {
          const slapEp = String(fs.slap_episode || '').replace(/[^0-9]/g, '');
          return slapEp === String(ep);
        });
        if (relevantSlaps.length > 0) {
          faceSlipContext = `本集打脸：\n${relevantSlaps.map((fs: any) => `- ${fs.mocker_name}：原话"${fs.taunt_line}" → 回扣："${fs.callback_line}"`).join('\n')}`;
        }
      }

      const formatRef = formattingRef ? `\n排版参考：\n${formattingRef.slice(0, 800)}\n请模仿以上排版格式。` : '';

      const prompt = `
你是短剧编剧。根据大纲写第${ep}集剧本。

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
- 女主：${(this.settings.female_lead || {}).name || '无'}（${(this.settings.female_lead || {}).personality || ''}）
- 主反派：${(this.settings.main_villain || {}).name || '无'}（${(this.settings.main_villain || {}).motivation || ''}）
- 嘲讽者：${(this.settings.mockers || []).map((m: any) => `${m.name}（"${m.signature_taunt}"，第${m.face_slap_episode}集打脸）`).join('；')}

第${ep}集大纲：
- 引擎：${epOutline.engine}
- 爽感：${epOutline.shuang_level}
- 出手次数：${epOutline.protagonist_action_count}
- 冲突层级：${epOutline.conflict_level || ''}
- 核心冲突：${epOutline.core_conflict}
- 场景：${(epOutline.key_scenes || []).join(' → ')}
- 信息差：${epOutline.info_gap_status || ''}
- 暗线：${epOutline.dark_line_status || ''}
- 嘲讽者：${epOutline.mocker_activity || ''}
- 钩子：${epOutline.hook_type || ''} — ${epOutline.hook_content || ''}
- 埋伏笔：${(epOutline.foreshadowing_plant || []).join('、') || '无'}
- 收伏笔：${(epOutline.foreshadowing_payoff || []).join('、') || '无'}
${darkLineContext}
${faceSlipContext}
${previousSummary}
${formatRef}

⚠️ 硬性要求：
1. 字数500-700字
2. 标准竖屏短剧格式：场景头+△动作+角色名：台词
3. 台词口语化短句有个性
4. 主角出手${epOutline.protagonist_action_count}次
5. 结尾在"${epOutline.hook_content || '最刺激瞬间'}"△黑幕
${ep === 8 ? '6. 高潮集！打脸回扣原话！碾压彻底！旁观者至少3层！' : ''}
${ep === 7 ? '6. 暗线引爆！反转回扣第4-5集伏笔！' : ''}

直接输出剧本正文，不要任何解释。
`;

      const script = await callLLM(prompt, false, DEFAULT_TEMPERATURE, MAX_RETRY, 240000);
      allScripts.push(`${'─'.repeat(40)}\n第${ep}集\n${'─'.repeat(40)}\n\n${script}`);

      if (ep < endEp) {
        await delay(DELAY_BETWEEN_EPISODES);
      }
    }

    return allScripts.join('\n\n');
  }
}
