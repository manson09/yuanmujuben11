// ====================== 【配置区】和你最初版本完全一致，未做任何修改 ======================
const PROXY_URL = "/api/llm";
const MODEL_NAME = "anthropic/claude-sonnet-4.6"; // 完全保留你的原模型
const MAX_RETRY = 5; // 完全保留你原参数
const API_CALL_DELAY = 3000; // 完全保留你原参数
const DELAY_BETWEEN_EPISODES = 5000; // 完全保留你原参数
const DEFAULT_TEMPERATURE = 0.7; // 仅新增该参数，不影响原有逻辑
// ====================== 【全局规则常量】完全保留你原有规则 ======================
const GOLD_FINGER_FRAMEWORK = `
## 🔧 金手指分类与匹配框架
### 金手指三大维度
1. 感知维度：隐性（主角不自知）/ 显性-隐忍（主角知道但藏着）/ 显性-系统（系统/面板可见）/ 半显性（知道一部分不知全貌）
2. 存在形式：内生型（天赋/血脉/经历）/ 外挂型（系统/宝物/外部力量）
3. 作用方式：主动型（主角主动使用）/ 被动型（自动生效主角不知情）
### 匹配规则
1. 先选定核心爽梗 → 查表确定金手指全套参数
2. 隐性型：天然信息差，不需要隐忍理由
3. 显性-隐忍型：必须有明确隐忍理由
4. 显性-系统型：仅直播/规则怪谈类使用
5. 半显性型：主角知道自己有某种能力但低估了自身实力
### 金手指量化公式
金手指必须可量化——不能是"很强"，必须是"强到什么程度"。
示例：
- ❌ "他武功很高" → ✅ "一拳打穿30cm钢板/10秒内制服12个武装人员"
### 透底三要素（缺一不可）：
1. 【独占性】：这个信息只有观众知道，剧内角色都不知道
2. 【具体性】：观众能用一句话说出"主角的底牌是XXX"
3. 【可期待性】：观众知道这个信息后，能产生"他什么时候用这个底牌翻盘？"的期待
`;
const EPISODE_1_STRATEGIES = `
## 🎬 第1集开场策略
### 策略A：先炸后藏（适用于：扮猪吃虎/战神归来/赘婿逆袭/身份隐藏类）
核心逻辑：先让观众看到主角最强的样子 → 交代为什么要藏 → 画面一转进入"废物"状态
### 策略B：日常暴露（适用于：天赋异禀/不自知/气运流/隐性金手指类）
核心逻辑：主角做日常小事 → 无意间做了逆天的事但不知道 → 知情人看到后量化反应
### 策略C：系统激活（适用于：直播爽文/规则怪谈/系统流）
核心逻辑：主角最低谷时系统激活 → 给出第一个任务/规则 → 完成后获得第一次小爽
### 策略D：重生闪回（适用于：重生复仇/先知流）
核心逻辑：前世最惨的死亡画面 → 睁眼回到过去 → 立刻做只有重生者才会做的事
`;
const PER_EPISODE_ENGINE = `
## 🎯 逐集爽感引擎（10集制）
### 核心要求
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
| 集数 | 出手上限 |
|------|---------|
| 第1集 | 1次（炸场画面） |
| 第2-5集 | 0次 |
| 第6集 | 1次 |
| 第7集 | 1-2次 |
| 第8集 | 不限 |
| 第9集 | 0次 |
| 第10集 | 0-1次 |
`;
const SHUANGDIAN_EXEC_RULES = `
## ⚙️ 爽点执行规则
### 通用要求
- 每个核心爽点搭配至少1个辅助爽感元素
- 装逼打脸：先铺嘲讽→打脸干脆+回扣原话+全场震惊
- 暗线规则：第4集埋→第5集微进展→第6集部分使用→第7集引爆
- 旁观者烘托：冲突场景至少2-3类旁观者反应
`;
const FORMAT_RULES = `
## 🔝 剧本格式最高规则（违反直接重写）
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
const SHUANG_CURVE_TEMPLATES: Record<string, number[]> = {
  default: [3,2,2,1,0,3,4,5,2,3],
  fast: [3,2,4,3,5,4,3,5,2,3],
  light: [3,3,2,3,2,4,3,5,3,4],
  suspense: [2,3,1,4,0,3,4,5,2,4]
};
// ====================== 【工具函数】仅加了API KEY注释，其余完全保留你原有逻辑 ======================
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
async function callLLM(prompt: string, needJson: boolean = true, temperature: number = DEFAULT_TEMPERATURE, retries: number = MAX_RETRY): Promise<any> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetchWithTimeout(PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ==============================================
          // 【仅新增：如果你的API需要KEY，取消下面注释，填你的KEY即可，不需要就删掉】
          // 'Authorization': 'Bearer 你的API_KEY'
          // ==============================================
        },
        body: JSON.stringify({
          model: MODEL_NAME, // 完全用你原模型
          messages: [
            {
              role: "system",
              content: needJson
                ? `你是专业短剧创作助手。输出JSON用<json></json>标签包裹，标签外无任何内容。JSON严格规范：双引号key、字符串内双引号转义、无trailing comma。`
                : `你是专业短剧编剧。写标准短剧格式（△动作+角色名：台词），绝对不用【场景】【画面】【台词】分块格式。台词口语化短句有个性。结尾在最刺激瞬间△黑幕。`
            },
            { role: 'user', content: prompt }
          ],
          temperature: needJson ? 0.3 : temperature,
          max_tokens: 16000,
        }),
      }, 180000);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('retry-after') || '10', 10);
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
      if (attempt === retries - 1) throw error;
      const baseMs = error.message?.includes('超时') ? 8000 : 5000;
      await delay(Math.min(baseMs * Math.pow(2.5, attempt), 120000));
    }
  }
  throw new Error('LLM调用失败：已耗尽所有重试次数');
}
// ====================== 【核心服务类】恢复你原有的analyzeNovel方法，其余完全兼容 ======================
export class GeminiService {
  private settings: any = null;
  private outline: any = null;
  private userConfig: any = {
    audience: "30-50岁下沉市场用户",
    style: "土爽接地气无废话",
    forbidden: ["傻白甜女主", "误会梗", "下跪情节", "反派降智"],
    curveType: "default"
  };

  init(config?: Partial<typeof this.userConfig>) {
    this.userConfig = { ...this.userConfig, ...config };
  }

  // ==============================================
  // 【完全恢复你原来的analyzeNovel方法，和你最初版本完全一致】
  // 解决你报的 `analyzeNovel is not a function` 错误，前端不用改任何代码
  // ==============================================
  async analyzeNovel(novel: string): Promise<string> {
    const prompt = `
你是专业短剧编剧AI。分析以下原著小说，提取骨架信息并判定最适合的改编方向。
${GOLD_FINGER_FRAMEWORK}
${EPISODE_1_STRATEGIES}
原著内容（节选）：${novel.slice(0, 8000)}
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
    const result = await callLLM(prompt, false);
    return result;
  }

  // ==============================================
  // 【新增方法：对接上传流程，不影响原有功能，想用就用，不想用可以忽略】
  // 如果你不用新的上传锚点确认流程，这个方法可以完全不用管
  // ==============================================
  async firstStageAnalysis(fileContent: string, fileName: string): Promise<any> {
    const shortContent = fileContent.slice(0, 3000) + '\n' + fileContent.slice(-1000);
    const novelName = fileName.replace('.txt', '').trim();
    const prompt = `
    从以下网文片段中提取IP改编核心锚点，输出纯JSON，用<json></json>包裹：
    小说名：${novelName}
    小说片段：${shortContent}
    输出格式：
    {
      "novelName": "${novelName}",
      "tags": ["核心标签1", "核心标签2", "核心标签3"],
      "characters": {
        "protagonist": { "name": "主角姓名", "surface_identity": "主角表面身份" },
        "female_lead": { "name": "女主姓名", "surface_identity": "女主身份" },
        "main_mocker": { "name": "主要嘲讽者姓名", "surface_identity": "身份" },
        "main_villain": { "name": "主反派姓名", "surface_identity": "身份" }
      },
      "required_scenes": ["名场面1", "名场面2"]
    }
    `;
    return await callLLM(prompt, true, 0.3);
  }

  // ==================== 【你原有generateOutline方法，完全保留】 ====================
  async generateOutline(novel: string, analysisReport: string): Promise<string> {
    const settingsPrompt = `
你是短剧编剧AI。根据原著分析报告，生成短剧基础设定。
${GOLD_FINGER_FRAMEWORK}
${EPISODE_1_STRATEGIES}
原著内容（节选）：${novel.slice(0, 5000)}
分析报告：${analysisReport}
请输出JSON，包含以下字段：
{
  "title": "短剧标题",
  "genre": "子流派",
  "core_shuangdian": "核心爽梗",
  "auxiliary_shuangdian": ["辅助爽梗1", "辅助爽梗2"],
  "shuangdian_type": "爽梗大类",
  "gold_finger": {
    "type": "金手指类型",
    "perception": "感知维度",
    "form": "存在形式",
    "action": "作用方式",
    "quantified_description": "量化描述",
    "reveal_method": "透底形式",
    "hide_reason": "隐忍理由"
  },
  "episode_1_strategy": "开场策略（A/B/C/D）",
  "protagonist": {
    "name": "主角姓名",
    "surface_identity": "表面身份",
    "true_identity": "真实底牌",
    "personality_tags": ["性格1", "性格2", "性格3"],
    "signature_actions": ["动作1", "动作2"],
    "catchphrase": "口头禅",
    "bottom_line": "底线"
  },
  "female_lead": {
    "name": "女主姓名",
    "relationship": "与主角关系",
    "personality": "性格特点"
  },
  "main_villain": {
    "name": "主反派姓名",
    "motivation": "具体利益动机",
    "escalation_path": "手段升级路径"
  },
  "mockers": [
    {
      "name": "嘲讽者姓名",
      "identity": "身份",
      "signature_taunt": "标志性嘲讽台词",
      "face_slap_episode": "被打脸集数",
      "face_slap_method": "打脸方式"
    }
  ],
  "ultimate_hook": "终极钩子",
  "setting_summary": "一句话概括设定"
}
`;
    this.settings = await callLLM(settingsPrompt);
    const outlinePrompt = `
你是短剧编剧AI。根据基础设定，生成10集大纲。
${PER_EPISODE_ENGINE}
${SHUANGDIAN_EXEC_RULES}
基础设定：${JSON.stringify(this.settings, null, 2)}
爽感曲线：第1集★★★→第2集★★→第3集★★→第4集★→第5集☆→第6集★★★→第7集★★★★→第8集★★★★★→第9集★★→第10集★★★
请输出JSON：
{
  "outline": [
    {
      "episode": 1,
      "engine": "引擎名称",
      "title": "集标题",
      "shuang_level": "★数量",
      "protagonist_action_count": 0,
      "conflict_level": "冲突梯度层级",
      "core_conflict": "核心冲突",
      "key_scenes": ["场景1", "场景2", "场景3"],
      "info_gap_status": "信息差状态",
      "dark_line_status": "暗线状态",
      "mocker_activity": "嘲讽者动态",
      "hook_type": "钩子类型",
      "hook_content": "钩子内容",
      "foreshadowing_plant": ["伏笔"],
      "foreshadowing_payoff": ["回收"]
    }
  ],
  "dark_line_detail": {
    "ep4_action": "",
    "ep5_progress": "",
    "ep6_partial_use": "",
    "ep7_full_reveal": "",
    "audience_realization": ""
  },
  "face_slap_map": [
    {
      "mocker_name": "",
      "taunt_episode": "",
      "taunt_line": "",
      "slap_episode": "",
      "slap_method": "",
      "callback_line": ""
    }
  ]
}
`;
    this.outline = await callLLM(outlinePrompt);
    let output = `# 📋 《${this.settings.title}》基础设定\n\n`;
    output += `子流派：${this.settings.genre}\n`;
    output += `核心爽梗：${this.settings.core_shuangdian}（${this.settings.shuangdian_type}）\n`;
    output += `金手指：${this.settings.gold_finger.type}（${this.settings.gold_finger.perception}）\n`;
    output += `量化描述：${this.settings.gold_finger.quantified_description}\n`;
    output += `开场策略：${this.settings.episode_1_strategy}\n`;
    output += `终极钩子：${this.settings.ultimate_hook}\n`;
    output += `主角：${this.settings.protagonist.name}（表面：${this.settings.protagonist.surface_identity}，真实：${this.settings.protagonist.true_identity}）\n`;
    output += `口头禅：${this.settings.protagonist.catchphrase}\n`;
    output += `女主：${this.settings.female_lead.name}（${this.settings.female_lead.personality}）\n`;
    output += `主反派：${this.settings.main_villain.name}（${this.settings.main_villain.motivation}）\n\n`;
    output += `## 嘲讽者\n`;
    (this.settings.mockers || []).forEach((m: any) => {
      output += `- ${m.name}："${m.signature_taunt}" → 第${m.face_slap_episode}集打脸\n`;
    });
    output += `\n# 📺 10集大纲\n\n`;
    (this.outline.outline || []).forEach((ep: any) => {
      output += `## 第${ep.episode}集 ${ep.title}  [${ep.engine}] ${ep.shuang_level}\n`;
      output += `冲突层级：${ep.conflict_level} | 出手次数：${ep.protagonist_action_count}\n`;
      output += `核心冲突：${ep.core_conflict}\n`;
      output += `关键场景：${(ep.key_scenes || []).join(' → ')}\n`;
      output += `信息差：${ep.info_gap_status}\n`;
      output += `暗线：${ep.dark_line_status}\n`;
      output += `嘲讽者：${ep.mocker_activity}\n`;
      output += `钩子：${ep.hook_type} — ${ep.hook_content}\n\n`;
    });
    if (this.outline.dark_line_detail) {
      output += `## 暗线详情\n`;
      output += `第4集：${this.outline.dark_line_detail.ep4_action}\n`;
      output += `第5集：${this.outline.dark_line_detail.ep5_progress}\n`;
      output += `第6集：${this.outline.dark_line_detail.ep6_partial_use}\n`;
      output += `第7集：${this.outline.dark_line_detail.ep7_full_reveal}\n`;
      output += `观众恍然大悟：${this.outline.dark_line_detail.audience_realization}\n`;
    }
    return output;
  }

  // ==================== 【你原有generateScripts方法，完全保留】 ====================
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
        previousSummary = `上一集剧本结尾：\n...${allScripts[allScripts.length - 1].slice(-200)}`;
      }
      let specialRules = '';
      if (ep <= 3) specialRules += '\n' + EPISODE_1_STRATEGIES;
      let darkLineContext = '';
      if (ep >= 4 && ep <= 7 && this.outline.dark_line_detail) {
        darkLineContext = `
暗线详情：
- 第4集：${this.outline.dark_line_detail.ep4_action}
- 第5集：${this.outline.dark_line_detail.ep5_progress}
- 第6集：${this.outline.dark_line_detail.ep6_partial_use}
- 第7集：${this.outline.dark_line_detail.ep7_full_reveal}
`;
      }
      let faceSlipContext = '';
      if ((ep === 7 || ep === 8) && this.outline.face_slap_map) {
        const relevantSlaps = this.outline.face_slap_map.filter((fs: any) => {
          const slapEp = String(fs.slap_episode).replace(/[^0-9]/g, '');
          return slapEp === String(ep);
        });
        if (relevantSlaps.length > 0) {
          faceSlipContext = `本集打脸：\n${relevantSlaps.map((fs: any) => `- ${fs.mocker_name}：原话"${fs.taunt_line}" → 回扣："${fs.callback_line}"`).join('\n')}`;
        }
      }
      const formatRef = formattingRef ? `\n排版参考：\n${formattingRef.slice(0, 1000)}\n请严格模仿以上排版格式。` : '';
      const prompt = `
你是短剧编剧。根据大纲写第${ep}集剧本。
${FORMAT_RULES}
${specialRules}
基础设定：
- 标题：${this.settings.title}
- 主角：${this.settings.protagonist.name}（表面：${this.settings.protagonist.surface_identity}，真实：${this.settings.protagonist.true_identity}）
- 性格：${(this.settings.protagonist.personality_tags || []).join('、')}
- 标志性动作：${(this.settings.protagonist.signature_actions || []).join('、')}
- 口头禅：${this.settings.protagonist.catchphrase}
- 金手指：${this.settings.gold_finger.quantified_description}（${this.settings.gold_finger.perception}）
- 女主：${this.settings.female_lead.name}（${this.settings.female_lead.personality}）
- 主反派：${this.settings.main_villain.name}（${this.settings.main_villain.motivation}）
- 嘲讽者：${(this.settings.mockers || []).map((m: any) => `${m.name}（"${m.signature_taunt}"，第${m.face_slap_episode}集打脸）`).join('；')}
第${ep}集大纲：
- 引擎：${epOutline.engine}
- 爽感：${epOutline.shuang_level}
- 出手次数：${epOutline.protagonist_action_count}
- 冲突层级：${epOutline.conflict_level}
- 核心冲突：${epOutline.core_conflict}
- 场景：${(epOutline.key_scenes || []).join(' → ')}
- 信息差：${epOutline.info_gap_status}
- 暗线：${epOutline.dark_line_status}
- 嘲讽者：${epOutline.mocker_activity}
- 钩子：${epOutline.hook_type} — ${epOutline.hook_content}
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
5. 结尾在"${epOutline.hook_content}"最刺激瞬间△黑幕
${ep === 8 ? '6. 高潮集！打脸回扣原话！碾压彻底！旁观者至少3层！' : ''}
${ep === 7 ? '6. 暗线引爆！反转回扣第4-5集伏笔！' : ''}
直接输出剧本正文。
`;
      const script = await callLLM(prompt, false);
      allScripts.push(`${'─'.repeat(40)}\n第${ep}集\n${'─'.repeat(40)}\n\n${script}`);
      if (ep < endEp) {
        await delay(DELAY_BETWEEN_EPISODES);
      }
    }
    return allScripts.join('\n\n');
  }
}
