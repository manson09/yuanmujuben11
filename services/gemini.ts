// ====================== 【配置区】完全还原你原有设置，未做任何修改 ======================
const PROXY_URL = "/api/llm";
const MODEL_NAME = "anthropic/claude-sonnet-4.6"; // 完全保留你原来的模型，未修改
const MAX_RETRY = 5; // 还原你原来的重试次数
const API_CALL_DELAY = 3000; // 还原你原来的调用间隔
const DELAY_BETWEEN_EPISODES = 5000; // 还原你原来的集数间隔
const DEFAULT_TEMPERATURE = 0.7; // 仅新增该参数，不影响原有逻辑

// ====================== 【全局规则常量】 ======================
// 分流派弹性爽感曲线（0=☆最低谷，1=★，以此类推）
const SHUANG_CURVE_TEMPLATES: Record<string, number[]> = {
  default: [3,2,2,1,0,3,4,5,2,3], // 传统赘婿/战神/复仇流
  fast: [3,2,4,3,5,4,3,5,2,3], // 直播/规则怪谈/快节奏流
  light: [3,3,2,3,2,4,3,5,3,4], // 甜宠/年代/轻爽流
  suspense: [2,3,1,4,0,3,4,5,2,4] // 悬疑/玄学流
};
// 金手指框架（保留你原有规则）
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
// 开场策略（保留你原有规则）
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
// 逐集引擎（保留你原有规则）
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
| 第2-5集 | 0次（允许被动无意识出手） |
| 第6集 | 1次 |
| 第7集 | 1-2次 |
| 第8集 | 不限 |
| 第9集 | 0次 |
| 第10集 | 0-1次 |
`;
// 爽点执行规则（保留你原有规则）
const SHUANGDIAN_EXEC_RULES = `
## ⚙️ 爽点执行规则
### 通用要求
- 每个核心爽点搭配至少1个辅助爽感元素
- 装逼打脸：先铺嘲讽→打脸干脆+回扣原话+全场震惊
- 暗线规则：第4集埋→第5集微进展→第6集部分使用→第7集引爆
- 旁观者烘托：冲突场景至少2-3类旁观者反应
`;
// 格式规则（保留你原有要求）
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

// ====================== 【工具函数】完全保留你原有逻辑 ======================
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL_NAME, // 完全使用你原来的模型，未修改
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

// ====================== 【核心服务类】新增上传逻辑，原有功能全部保留 ======================
export class GeminiService {
  private settings: any = null;
  private outline: any = null;
  private userConfig: {
    audience: string;
    style: string;
    forbidden: string[];
    curveType: keyof typeof SHUANG_CURVE_TEMPLATES;
  } = {
    audience: "30-50岁下沉市场用户",
    style: "土爽接地气无废话",
    forbidden: ["傻白甜女主", "误会梗", "下跪情节", "反派降智"],
    curveType: "default"
  };

  // ==================== 【初始化配置】可选调用 ====================
  init(config?: Partial<typeof this.userConfig>) {
    this.userConfig = { ...this.userConfig, ...config };
  }

  // ==============================================
  // 【新增：对接你现有前端流程→第一阶段判定】
  // 前端点击「开始第一阶段判定」时调用，传入前端读取的TXT文本和文件名
  // 返回提取到的锚点，给前端做用户确认页展示
  // ==============================================
  async firstStageAnalysis(fileContent: string, fileName: string): Promise<{
    novelName: string;
    tags: string[];
    characters: {
      protagonist: { name: string; surface_identity: string };
      female_lead: { name: string; surface_identity: string };
      main_mocker: { name: string; surface_identity: string };
      main_villain: { name: string; surface_identity: string };
    };
    required_scenes: string[];
  }> {
    // 仅取前3000字+最后1000字，足够提取核心信息，避免处理大文件
    const shortContent = fileContent.slice(0, 3000) + '\n' + fileContent.slice(-1000);
    const novelName = fileName.replace('.txt', '').trim();

    const prompt = `
    从以下网文片段中提取IP改编核心锚点，输出纯JSON，用<json></json>包裹，不要其他内容：
    小说名：${novelName}
    小说片段：${shortContent}
    输出格式严格按照以下结构，信息不足时按同类网文通用套路补全，不要留空：
    {
      "novelName": "${novelName}",
      "tags": ["核心标签1", "核心标签2", "核心标签3"],
      "characters": {
        "protagonist": { "name": "主角姓名", "surface_identity": "主角表面身份，比如苏家赘婿" },
        "female_lead": { "name": "女主姓名", "surface_identity": "女主身份，比如苏氏集团总裁" },
        "main_mocker": { "name": "主要嘲讽者姓名", "surface_identity": "身份，比如主角丈母娘" },
        "main_villain": { "name": "主反派姓名", "surface_identity": "身份，比如追求女主的富二代" }
      },
      "required_scenes": ["名场面1", "名场面2"]
    }
    要求：
    1. 标签为短剧爆款关键词，比如「战神赘婿」「重生1998」「玄学天师」
    2. 人物仅提取核心角色，名字和身份必须和片段一致
    3. 名场面为片段中提到的最具爽感的1-2个情节，没有则按同类网文经典爽点补全
    `;
    return await callLLM(prompt, true, 0.3);
  }

  // ==================== 【模式1：基于上传原著生成（对接确认后的锚点）】 ====================
  async generateFromUploadedNovel(confirmedAnchor: any): Promise<string> {
    // 调用原有IP改编逻辑，完全复用之前的爆款模板
    return await this.generateFromIP({
      novelName: confirmedAnchor.novelName,
      genre: confirmedAnchor.tags[0],
      customAnchor: confirmedAnchor
    });
  }

  // ==================== 【模式2：纯原创关键词生成（原有功能保留）】 ====================
  async generateFromKeywords(keywords: string): Promise<string> {
    const prompt = `
    根据用户关键词生成爆款短剧基础设定：
    关键词：${keywords}
    用户要求：受众${this.userConfig.audience}，风格${this.userConfig.style}，禁止${this.userConfig.forbidden.join('、')}
    规则：${GOLD_FINGER_FRAMEWORK}
    输出JSON格式：
    {
      "title": "短剧标题",
      "genre": "子流派",
      "core_shuangdian": "核心爽梗",
      "auxiliary_shuangdian": ["辅助爽梗1", "辅助爽梗2"],
      "gold_finger": {
        "type": "金手指类型",
        "perception": "感知维度",
        "quantified_description": "量化描述",
        "reveal_method": "透底形式",
        "hide_reason": "隐忍理由（如适用）"
      },
      "episode_1_strategy": "开场策略A/B/C/D",
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
        "personality": "性格特点",
        "emotional_bond": "和主角的羁绊"
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
      "ultimate_hook": "终极钩子（二元悬念）"
    }
    `;
    this.settings = await callLLM(prompt, true);
    return await this._generateOutline();
  }

  // ==================== 【模式3：IP离线改编（原有功能保留）】 ====================
  async generateFromIP(ipInfo: {
    novelName: string;
    genre: string;
    customAnchor?: any;
  }): Promise<string> {
    let ipAnchor = ipInfo.customAnchor;
    if (!ipAnchor) {
      const anchorPrompt = `
      已知小说《${ipInfo.novelName}》是${ipInfo.genre}类网络小说，按照这类小说的通用爆款套路，生成IP改编锚点：
      输出JSON：
      {
        "tags": ["核心标签1", "核心标签2", "核心标签3"],
        "characters": {
          "protagonist": { "name": "常见主角名", "surface_identity": "表面身份" },
          "female_lead": { "name": "常见女主名", "surface_identity": "女主身份" },
          "main_mocker": { "name": "常见嘲讽者名", "surface_identity": "嘲讽者身份" },
          "main_villain": { "name": "常见反派名", "surface_identity": "反派身份" }
        },
        "required_scenes": ["名场面1", "名场面2"]
      }
      `;
      ipAnchor = await callLLM(anchorPrompt, true);
    }
    const settingPrompt = `
    改编IP《${ipInfo.novelName}》，严格遵守IP合规红线，其余内容可自由魔改：
    【IP合规红线】
    1. 核心标签：${ipAnchor.tags.join('、')}
    2. 核心人物姓名/表面身份：${JSON.stringify(ipAnchor.characters)}
    3. 必须包含的名场面：${ipAnchor.required_scenes.join('、')}，放到第8集最高潮
    用户要求：受众${this.userConfig.audience}，风格${this.userConfig.style}，禁止${this.userConfig.forbidden.join('、')}
    规则：${GOLD_FINGER_FRAMEWORK}
    输出和模式2完全一致的基础设定JSON。
    `;
    this.settings = await callLLM(settingPrompt, true);
    this.settings.ipAnchor = ipAnchor;
    return await this._generateOutline();
  }

  // ==================== 【模式4：碎片化素材拼接生成（原有功能保留）】 ====================
  async generateFromFragments(keywords: string, fragments: string[]): Promise<string> {
    await this.generateFromKeywords(keywords);
    const outlinePrompt = `
    把用户提供的爽点碎片安到10集爽感曲线的对应位置，补全完整大纲：
    爽点碎片：${fragments.join('、')}
    基础设定：${JSON.stringify(this.settings)}
    爽感曲线：${SHUANG_CURVE_TEMPLATES[this.userConfig.curveType].map(s => '★'.repeat(s)).join('→')}
    规则：${PER_EPISODE_ENGINE} ${SHUANGDIAN_EXEC_RULES}
    输出JSON：
    {
      "outline": [
        {
          "episode": 1,
          "engine": "引擎名称",
          "title": "集标题",
          "shuang_level": "★数量",
          "action_count": 出手上限,
          "conflict_level": "冲突梯度",
          "core_conflict": "核心冲突",
          "key_scenes": ["场景1", "场景2", "场景3"],
          "info_gap": "信息差状态",
          "dark_line": "暗线状态",
          "mocker_activity": "嘲讽者动态",
          "hook": "钩子内容",
          "foreshadowing": ["伏笔"]
        }
      ],
      "dark_line_detail": {
        "ep4_action": "", "ep5_progress": "", "ep6_partial_use": "", "ep7_full_reveal": ""
      },
      "face_slap_map": [
        { "mocker_name": "", "taunt_line": "", "slap_episode": "", "callback_line": "" }
      ]
    }
    `;
    this.outline = await callLLM(outlinePrompt, true);
    return this._formatOutline();
  }

  // ==================== 【生成剧本（原有功能保留）】 ====================
  async generateScripts(phase: number = 1): Promise<string> {
    if (!this.settings || !this.outline) throw new Error('请先生成设定和大纲');
    const allScripts: string[] = [];
    const startEp = (phase - 1) * 10 + 1;
    const endEp = phase * 10;
    for (let ep = startEp; ep <= endEp; ep++) {
      const epOutline = this.outline.outline.find((e: any) => e.episode === ep);
      if (!epOutline) continue;
      const previousSummary = allScripts.length > 0 ? `上集结尾：${allScripts[allScripts.length - 1].slice(-200)}` : '';
      const darkLineContext = ep >=4 && ep <=7 ? `暗线要求：${JSON.stringify(this.outline.dark_line_detail)}` : '';
      const faceSlapContext = (ep ===7 || ep ===8) ? `打脸要求：${JSON.stringify(this.outline.face_slap_map.filter((fs: any) => fs.slap_episode === String(ep)))}` : '';
      const prompt = `
      写《${this.settings.title}》第${ep}集竖屏短剧剧本：
      基础设定：${JSON.stringify(this.settings)}
      本集要求：爽感${epOutline.shuang_level}，主角出手最多${epOutline.action_count}次，钩子是${epOutline.hook}
      核心冲突：${epOutline.core_conflict}
      场景顺序：${epOutline.key_scenes.join('→')}
      ${darkLineContext} ${faceSlapContext} ${previousSummary}
      规则：${FORMAT_RULES} ${SHUANGDIAN_EXEC_RULES}
      用户要求：受众${this.userConfig.audience}，风格${this.userConfig.style}，禁止${this.userConfig.forbidden.join('、')}
      ${this.settings.ipAnchor ? `IP合规要求：必须出现主角名${this.settings.ipAnchor.characters.protagonist.name}、女主名${this.settings.ipAnchor.characters.female_lead.name}` : ''}
      `;
      let script = await callLLM(prompt, false);
      // 内容质量校验
      const checkRes = await this._validateContent(script, epOutline);
      if (!checkRes.pass) {
        console.log(`第${ep}集不合格重写：${checkRes.reason}`);
        script = await callLLM(prompt + `\n⚠️ 之前版本不合格，修改：${checkRes.reason}`, false);
      }
      // IP合规校验
      if (this.settings.ipAnchor) {
        const ipValid = await this._validateIPCompliance(script);
        if (!ipValid) throw new Error(`第${ep}集IP合规校验失败，请检查`);
      }
      allScripts.push(`\n${'─'.repeat(40)}\n第${ep}集\n${'─'.repeat(40)}\n${script}`);
      if (ep < endEp) await delay(DELAY_BETWEEN_EPISODES);
    }
    return allScripts.join('\n');
  }

  // ==================== 【内部私有方法】 ====================
  private async _generateOutline(): Promise<string> {
    const curve = SHUANG_CURVE_TEMPLATES[this.userConfig.curveType];
    const outlinePrompt = `
    生成10集短剧大纲：
    基础设定：${JSON.stringify(this.settings)}
    爽感曲线：${curve.map(s => '★'.repeat(s)).join('→')}，第${curve.indexOf(0)+1}集最低谷，第${curve.indexOf(5)+1}集最高潮
    规则：${PER_EPISODE_ENGINE} ${SHUANGDIAN_EXEC_RULES}
    ${this.settings.ipAnchor ? `必须包含的名场面：${this.settings.ipAnchor.required_scenes.join('、')}，放到第8集` : ''}
    输出和模式4完全一致的大纲JSON。
    `;
    this.outline = await callLLM(outlinePrompt, true);
    return this._formatOutline();
  }
  private _formatOutline(): string {
    let output = `# 📋 《${this.settings.title}》基础设定\n`;
    output += `核心爽梗：${this.settings.core_shuangdian}\n`;
    output += `金手指：${this.settings.gold_finger.quantified_description}\n`;
    output += `终极钩子：${this.settings.ultimate_hook}\n\n`;
    output += `# 📺 10集大纲\n`;
    this.outline.outline.forEach((ep: any) => {
      output += `## 第${ep.episode}集 ${ep.title} [${ep.engine}] ${ep.shuang_level}\n`;
      output += `核心冲突：${ep.core_conflict}\n`;
      output += `钩子：${ep.hook}\n\n`;
    });
    return output;
  }
  private async _validateContent(content: string, epOutline: any): Promise<{ pass: boolean; reason: string }> {
    const checkPrompt = `
    检查短剧剧本是否合格：
    本集要求：爽感${epOutline.shuang_level}，主角最多出手${epOutline.action_count}次，钩子是${epOutline.hook}
    剧本内容：${content.slice(0, 3000)}
    禁止内容：${this.userConfig.forbidden.join('、')}
    输出JSON：{"pass": true/false, "reason": "不合格原因"}
    `;
    return await callLLM(checkPrompt, true, 0.3, 2);
  }
  private async _validateIPCompliance(content: string): Promise<boolean> {
    const anchor = this.settings.ipAnchor;
    const hasProtagonist = content.includes(anchor.characters.protagonist.name);
    const hasFemaleLead = content.includes(anchor.characters.female_lead.name);
    return hasProtagonist && hasFemaleLead;
  }
}
