// ====================== 【配置区】======================
const PROXY_URL = "/api/llm";
const MODEL_NAME = "anthropic/claude-sonnet-4.6";
const MAX_RETRY = 5;
const ENABLE_RULE_CHECK = true;
const API_CALL_DELAY = 3000;
// =====================================================================

// ====================== 【金手指维度化分类体系】======================
const GOLD_FINGER_FRAMEWORK = `
## 🔧 金手指分类与匹配框架

### 金手指三大维度
1. 感知维度：隐性（主角不自知）/ 显性-隐忍（主角知道但藏着）/ 显性-系统（系统/面板可见）/ 半显性（知道一部分不知全貌）
2. 存在形式：内生型（天赋/血脉/经历）/ 外挂型（系统/宝物/外部力量）
3. 作用方式：主动型（主角主动使用）/ 被动型（自动生效主角不知情）

### 爽梗→金手指自动匹配表

| 核心爽梗 | 金手指类型 | 感知维度 | 透底形式 | 配角需求 |
|---------|-----------|---------|---------|---------|
| 扮猪吃虎/天赋异禀/不按常理 | 内生·天赋流 | 隐性 | 知情配角OS/吐槽 | 必须有1个知情长辈/师父 |
| 实力碾压/一呼百应/幕后大佬 | 身份·实力流 | 显性-隐忍 | 旧部下/手下震惊反应 | 至少1个知道身份的旧部 |
| 挥金如土/万千宠爱 | 身份·财富流 | 显性-隐忍 | 主角回忆/证件/旧物 | 可选知情配角 |
| 预判对手/渔翁得利/职场宫斗 | 重生·先知流 | 显性-隐忍 | 主角内心OS+记忆闪回 | 不强制 |
| 信息差赚钱/囤货致富/返城创业 | 重生·先知流 | 显性-隐忍 | 主角内心OS+记忆闪回 | 不强制 |
| 打脸极品亲戚/薅集体羊毛 | 重生·先知流 | 显性-隐忍 | 主角内心OS+记忆闪回 | 不强制 |
| 直播打脸/弹幕封神/花式怼粉/黑料澄清 | 外挂·系统流 | 显性-系统 | 系统弹窗/面板 | 不强制 |
| 反向带货 | 外挂·系统流或内生·眼力流 | 显性-系统或半显性 | 系统提示或行为反差 | 不强制 |
| 破解规则/卡bug刷分/副本通关 | 外挂·系统流或重生·先知流 | 显性-系统或显性-隐忍 | 系统提示或主角OS | 不强制 |
| 极限逃生/戏耍NPC | 重生·先知流 | 显性-隐忍 | 主角OS+行为反差 | 不强制 |
| 开卦算命/风水改运/预知吉凶 | 内生·天赋流 | 半显性 | 主角行为+事主震惊反应 | 不强制 |
| 驱邪破煞/功德加身 | 内生·天赋流+外挂·功德系统 | 半显性 | 主角行为+系统辅助 | 不强制 |
| 夺宝奇兵/慧眼识珠/神器认主 | 内生·眼力流或重生·先知流 | 隐性或显性-隐忍 | 旁人不识货的反差反应 | 不强制 |
| 收服帮派 | 身份·实力流 | 显性-隐忍 | 行为碾压+旁人震惊 | 可选旧部 |
| 绝境逃脱/极限反杀/逆风翻盘/反杀小人 | 内生·潜力流或身份·底牌流 | 隐性或显性-隐忍 | 绝境中知情配角/回忆透底 | 可选 |
| 力挽狂澜/英雄救美/拯救公司/解救家人 | 身份·实力流 | 显性-隐忍 | 行为反差+旁人震惊 | 可选 |
| 大仇得报/诛杀坏人/反向PUA | 重生·先知流或身份·证据流 | 显性-隐忍 | 证据展示+回忆闪回 | 不强制 |
| 劫富济贫 | 身份·实力流或内生·天赋流 | 显性-隐忍或隐性 | 行为反差+旁人震惊 | 可选 |
| 无心插柳/一夜暴富/因祸得福 | 内生·气运流 | 隐性 | 旁人震惊反应 | 不强制 |
| 偷听秘闻 | 内生·天赋流或外挂·异能流 | 半显性 | 主角行为+信息反差 | 不强制 |
| 持之以恒/认祖归宗/重情重义/知恩图报 | 内生·品格流 | 不适用 | 行为本身就是爽点 | 不强制 |

### 匹配规则
1. 先选定核心爽梗 → 查表确定金手指全套参数
2. 隐性型：天然信息差，不需要隐忍理由
3. 显性-隐忍型：必须有明确隐忍理由
4. 显性-系统型：仅直播/规则怪谈类使用
5. 半显性型：主角知道自己有某种能力但低估了自身实力

### 透底形式优先级
Tier 1：知情配角OS/吐槽/震惊反应
Tier 2：主角不经意行为暴露实力
Tier 3：碎片化回忆/闪回
Tier 4：纯文字字幕
Tier 5：系统弹窗（仅直播/怪谈类）

### 禁止事项
- 禁止所有题材一律用系统弹窗
- 禁止金手指类型和爽梗不匹配
- 禁止隐性金手指下主角主动使用
- 禁止无透底
`;

// ====================== 【第1集开场策略】======================
const EPISODE_1_STRATEGIES = `
## 🎬 第1集开场策略（按爽梗类型，严格执行对应策略）

### 策略A：先炸后藏（适用于：扮猪吃虎/战神归来/赘婿逆袭/身份隐藏类）
核心逻辑：先让观众看到主角最强的样子 → 交代为什么要藏 → 画面一转进入"废物"状态 → 反差拉满
执行结构：
  场景1（前30秒·炸场）：直接给主角最强状态的劲爆画面（战场碾压/一击毙敌/单挑几十人），画面有视觉冲击力，动作干脆利落，配角反应衬托碾压
  场景2（藏的理由·不超过30秒）：简短交代退隐/隐藏原因
  场景3（反差登场）：时间跳转，主角以最普通/最狼狈的样子出现在日常场景，被人当废物/被拦/被看不起
⚠️ 禁止：禁止第1集全程都在"藏"的状态；禁止炸场画面只是配角念简历

### 策略B：日常暴露（适用于：天赋异禀/不自知/气运流/隐性金手指类）
核心逻辑：主角做日常小事 → 无意间做了逆天的事但不知道 → 知情人看到后量化反应
执行结构：
  场景1：主角做普通事，过程中做了不可能的事
  场景2：知情配角OS量化碾压级别
  场景3：主角离开安全环境进入主线世界，被人当废物/新人
⚠️ 禁止：禁止知情人不在场下透底

### 策略C：系统激活（适用于：直播爽文/规则怪谈/系统流）
核心逻辑：主角最低谷时系统激活 → 给出第一个任务/规则 → 完成后获得第一次小爽
执行结构：
  场景1：主角在最惨的状态（被开除/被甩/被网暴）
  场景2：系统弹窗激活，1-2句话说明规则
  场景3：主角完成第一个小任务，获得第一次奖励/小爽

### 策略D：重生闪回（适用于：重生复仇/先知流）
核心逻辑：前世最惨的死亡画面 → 睁眼回到过去 → 立刻做只有重生者才会做的事
执行结构：
  场景1（3-5秒）：前世惨死画面
  场景2：主角睁眼，确认回到过去
  场景3：立刻做一件只有重生者才会做的事（买股票/避开陷阱/提前布局）

### 如何选择策略
| 金手指感知维度 | 爽梗类型 | 开场策略 |
|--------------|---------|---------|
| 显性-隐忍 | 扮猪吃虎/战神归来/赘婿/身份隐藏 | 策略A：先炸后藏 |
| 隐性（不自知） | 天赋异禀/不按常理/气运流 | 策略B：日常暴露 |
| 显性-系统 | 直播/规则怪谈/系统流 | 策略C：系统激活 |
| 显性-隐忍 | 重生复仇/先知流 | 策略D：重生闪回 |

### 关键原则
不管用哪个策略，第1集前30秒必须让观众直观看到主角的碾压级底牌。
"直观"标准：观众看完能用一句话说出"这个主角牛在哪"。
`;

// ====================== 【前3集节奏规则】======================
const FIRST_3_EPISODES_RULES = `
## 📐 前3集强制节奏规则

### 策略A（先炸后藏）的前3集
#### 第1集（500-700字）：
- 场景1：劲爆的主角碾压画面（战斗/任务），主角亲自上场
- 配角反应衬托碾压（OS/对话中量化数据）
- 场景2：简短交代隐藏原因（不超过4行）
- 场景3：时间跳转，主角普通人身份出现，遭遇第一个冲突
- 结尾钩子

#### 第2集（500-700字）：
- 反差全面铺开：主角以"废物"身份进入核心场景
- 第一层冲突爆发，旁观者三类到位
- 主角不经意小动作暗示实力（剧内角色没注意到）
- 不释放爽点，反差持续拉大
- 结尾在更大压迫到来时戛然而止

#### 第3集（500-700字）：
- 冲突升级到第二层（经济打压/断生路），不重复第2集
- 反派动用资源打压主角或身边人
- 主角有一个"差点暴露"瞬间但掩饰过去
- 结尾在第三层威胁出现时戛然而止

### 策略B（日常暴露）的前3集
#### 第1集（500-700字）：
- 场景1：主角做日常事，无意间做逆天之事
- 知情配角OS量化透底
- 场景2：主角离开安全区进入主线
- 结尾钩子

#### 第2集（500-700字）：
- 被当废物/新人，遭遇第一层嘲讽
- 主角浑然不觉，做出让旁人困惑的举动
- 三类旁观者到位
- 结尾在更强的人注意到主角时戛然而止

#### 第3集（500-700字）：
- 被逼"出手"，主角以为很普通
- 碾压对手，全场震惊，主角一脸懵
- 结尾在更大势力出现时戛然而止

### 通用禁止项
- 禁止第1集主角全程不出场只靠配角念简历
- 禁止前3集主角全程沉默被动
- 禁止连续2集相同冲突
- 主角前3集至少3句个性台词
`;

// ====================== 【S级核心爽点库】======================
const SHUANGDIAN_LIBRARY = `
## 📚 可选S级核心爽点库
1. 装逼打脸类：扮猪吃虎 / 实力碾压 / 解决难题 / 上帝视角 / 万千宠爱 / 一呼百应 / 幕后大佬 / 挥金如土 / 天赋异禀 / 不按常理
2. 荣获至宝类：夺宝奇兵 / 慧眼识珠 / 神器认主 / 收服帮派
3. 意外之喜类：无心插柳 / 一夜暴富 / 偷听秘闻 / 因祸得福
4. 惩戒恶人类：大仇得报 / 诛杀坏人 / 劫富济贫 / 反向PUA
5. 人格魅力类：持之以恒 / 认祖归宗 / 重情重义 / 知恩图报
6. 拯救危难类：力挽狂澜 / 英雄救美 / 拯救公司 / 解救家人
7. 智商碾压类：预判对手 / 渔翁得利 / 职场宫斗 / 规则破解
8. 绝地反杀类：绝境逃脱 / 极限反杀 / 逆风翻盘 / 反杀小人
9. 直播爽感类：直播打脸 / 弹幕封神 / 反向带货 / 花式怼粉 / 黑料澄清
10. 玄学爽感类：开卦算命 / 风水改运 / 驱邪破煞 / 功德加身 / 预知吉凶
11. 年代逆袭类：信息差赚钱 / 薅集体羊毛 / 打脸极品亲戚 / 返城创业 / 囤货致富
12. 规则怪谈类：破解规则 / 戏耍NPC / 极限逃生 / 副本通关 / 卡bug刷分
`;

// ====================== 【子流派规则】======================
const SUB_GENRE_RULES = `
## 🎭 子流派专属规则
| 子流派 | 核心规则 | 推荐金手指类型 |
|--------|---------|--------------|
| 玄幻修仙 | 终极钩子绑定生死/复仇；打脸主角自己出手 | 隐性·天赋流 |
| 都市赘婿 | 终极钩子绑定身份揭晓；底牌最高潮才揭；女主至少2次暗中维护 | 显性-隐忍·身份流 |
| 战神归来 | 终极钩子绑定护妻护女；先装弱再打脸；隐姓埋名有明确理由 | 显性-隐忍·身份实力流 |
| 都市异能 | 终极钩子绑定异能暴露/救危机 | 半显性·天赋流 |
| 穿越历史 | 终极钩子绑定改命运/夺嫡；核心历史不魔改 | 显性-隐忍·先知流 |
| 校园爽文 | 终极钩子绑定逆袭考学；逆袭有铺垫 | 隐性或显性均可 |
| 年代创业 | 终极钩子绑定发家致富；不出现不符年代物品 | 显性-隐忍·先知流 |
| 玄学爽文 | 终极钩子绑定化劫/积功德；算命有实锤 | 半显性·天赋流 |
| 直播爽文 | 终极钩子绑定成顶流；弹幕分层有梯度 | 显性-系统·系统流 |
| 规则怪谈 | 终极钩子绑定通关所有副本；规则不矛盾 | 显性-系统或显性-隐忍 |
| 都市家庭 | 终极钩子绑定家庭痛点；禁止过度狗血 | 显性-隐忍·证据流 |
`;

// ====================== 【爽点执行规则】======================
const SHUANGDIAN_EXEC_RULES = `
## ⚙️ 爽点执行规则

### 通用要求
- 每个核心爽点搭配至少1个辅助爽感元素，避免单一
- 单阶段核心爽梗1个，可搭配最多2个辅助爽梗，辅助占比≤30%

### 按爽点类型核心要求
| 爽点类型 | 铺垫要求 | 禁止事项 |
|---------|---------|---------|
| 装逼打脸 | 先铺嘲讽→主角可装弱→打脸干脆+全场震惊 | 禁止代打；所有反派有惩罚闭环 |
| 荣获至宝 | 先铺宝物稀缺→得宝特写→旁人嫉妒 | 得宝后隐瞒不显摆 |
| 意外之喜 | 先铺倒霉→揭晓旁人震惊→亮价值 | 禁止提前剧透 |
| 惩戒恶人 | 先铺恶行→惩罚够解气→受害者称快 | 符合公序良俗 |
| 人格魅力 | 先铺困境→坚持品格→质疑者愧疚 | 禁止中途插入打脸 |
| 拯救危难 | 先铺危难→主角出手干脆→所有人感激 | 禁止金手指直接解决 |
| 智商碾压 | 先铺对手诡计→层层拆穿→对手破防 | 预判有线索支撑 |
| 绝地反杀 | 先铺绝境→反杀快狠准→对手难以置信 | 禁止第三方救场 |
| 直播爽感 | 先铺黑粉网暴→装怂引→放大招→弹幕反转 | 每集至少3次弹幕画面 |
| 玄学爽感 | 先铺嚣张不信→点私密细节→事主跪求 | 算命有实锤 |
| 年代逆袭 | 先铺不看好→偷偷做→公布收入全震惊 | 不出现不符年代物品 |
| 规则怪谈 | 先铺规则恐怖→假装遵守偷偷卡bug→通关震惊 | 规则不矛盾 |
`;

// ====================== 【全局规则】======================
const GLOBAL_TOP_RULES = `
## 🔝 全局最高优先级规则

### 最高顶层原则
所有规则为剧情自然度服务。规则与流畅性冲突时优先保证剧情通顺。
核心规则（信息差、旁观者烘托、每集留钩子、冲突梯度）必须达标，细节形式灵活调整。
禁止为了卡规则硬塞内容。

### ⚠️ 格式最高规则（违反直接重写）
标准竖屏短剧剧本格式：
- 场景头：序号、日/夜、内/外、出场人物
- 动作描写：△开头，一句话一个镜头，只写能拍出来的具体画面
- 台词：角色名：台词 / 角色名（情绪）：台词，口语化短句
- 内心独白：角色名（情绪）OS：内容
- 字幕：行内（字幕：XXX）
- 切场：△切
- 集结尾：△黑幕。
绝对禁止【场景】【画面】【台词】分块式结构。

### 核心创作规则

1. 【信息差强制规则】
   所有爽点必须营造至少2层认知差，观众全知：
   - 第一层：主角知道但隐藏 / 主角不自知
   - 第二层：配角/反派完全不知道主角真实底牌

   ⚠️ 信息差量化标准：
   - 底牌必须是具体可量化的碾压级优势
     ✅ "世界狙击手排名第一，悬赏12亿美元"
     ✅ "练气九十九万层，弹指间仙帝飞灰湮灭"
     ❌ "他很厉害"（太笼统）
   - 剧内角色的低估必须是具体的错误判断
     ✅ "一个废掉的残兵，右眼都看不清"
     ❌ "他不行"

2. 【透底规则】
   第1集按开场策略完成透底（查策略表）。
   透底后全程隐身不再重复。

3. 【金手指规则】
   主角必须有碾压级底牌，类型由核心爽梗查匹配表决定。

4. 【旁观者烘托规则】
   冲突场景至少2-3类旁观者。

5. 【钩子规则】
   每集结尾在最刺激瞬间戛然而止，直接△黑幕。
   终极钩子必须是明确的二元悬念，第1集就让观众知道"追下去能看到什么"。

6. 【冲突梯度规则】
   反派手段升级梯度：
   ① 口头嘲讽/社交羞辱
   ② 经济打压/断生路
   ③ 人身威胁/派打手
   ④ 威胁核心关系人
   ⑤ 动用官方/权力/国际势力
   每个层级最多持续2集，禁止同级重复超过2次。

7. 【人物规则】
   - 主角必须有2-3个专属标志性动作/口头禅
   - ⚠️ 频率限制：动作每集最多1次，口头禅全阶段最多3次
   - 台词口语化短句有个性，禁止书面语
   - ⚠️ 主角前3集必须至少有3句展示个性的台词（痞/嘴欠/淡定/搞笑均可）
   - 通过具体行为表现性格，禁止旁白/OS描述
   - 反派有明确利益动机

8. 【爽感优先魔改规则】
   无需贴合原著，可自由魔改，保留核心人设和核心钩子即可。
   ⚠️ 魔改核心原则：让每一集都有画面冲击力、让主角有性格魅力、让观众划不走。

9. 【阶段爽梗闭环·10集制】
   单阶段10集：
   铺垫期（1-2集）→ 冲突升级期（3-5集）→ 小高潮（第6集）→ 大爽点爆发（7-8集）→ 转场期（9-10集）

10. 【伏笔闭环】所有伏笔本阶段回收。

11. 【打脸闭环】每个嘲讽者必须有打脸回报。

12. 【禁止同质化重复】
    禁止连续2集相同冲突/相同手段/每集必须有新信息。
`;

// ====================== 【标准剧本格式范本】======================
const SCRIPT_FORMAT_EXAMPLE = `
## 📝 标准剧本格式范本（学习格式和信息密度，禁止照搬内容）

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
逍遥子（吹胡子瞪眼）：我小气？你来山上这俩月，老夫这里的火凤，真龙，仙药，灵珍都快被你给吃完了！
林凡：切！不就几只鸡，几条鱼，几根草吗？不过话说回来！老头，你当初说我是修仙天才是不是在骗我？我都修炼了两个月了，还是炼气期！
逍遥子（瞪眼）OS：你丫头两个月修炼到了练气九十九万层，弹指间仙帝都要飞灰湮灭！你还想怎样？
林凡：我想下山了。
逍遥子（瞬间大喜）：下山好啊！不过徒儿啊！山下金丹多如狗，元婴满地走，你一个小小的练气，切记低调行事。
林凡（认真点头）：我记住了！
△林凡起身化作金光消失。
逍遥子（笑容阴险）：我的好徒儿，山下可有一个大惊喜等着你呢！
2、日、内、林凡，江清苒
△酒店房间内，江清月面色桃红衣衫凌乱（字幕：江清苒，江家大小姐）。
△金光一闪林凡掉在床上坐起身来，神情迷茫。
林凡：这是给我干哪来了？
△江清月从床上爬起来眼神迷离一把抱住林凡，林凡瞪大双眼。
△江清月亲了上去把林凡扑倒在床上。
△黑幕。

【从范本中必须学习的要点】
1. 格式：场景头+△动作+角色名：台词
2. 信息密度极高：每个场景同时完成多个任务
3. 主角有个性有魅力：台词嘴欠，行为有趣，不是沉默被动的
4. 透底自然：通过行为+反应，不是念简历
5. 钩子：最刺激瞬间△黑幕
`;

// ====================== 【防踩坑规则】======================
const ANTI_BUG_RULES = `
## 🚫 防踩坑规则
1. 显性-隐忍型必须有隐忍理由；隐性型无需理由
2. 隐性金手指：主角不可主动使用不知道的能力
3. 伏笔本阶段回收
4. 正面配角立场转变至少2次暗中维护铺垫
5. 反派密谋私下进行
6. 打脸闭环：所有嘲讽者有打脸回报
7. 禁止连续2集相同冲突/手段
8. 每集必须有新信息/新冲突/新人物
9. 标志性动作每集最多1次，口头禅全阶段最多3次
10. ⚠️ 禁止第1集主角全程不出场只靠配角念简历透底
11. ⚠️ 禁止前3集主角全程沉默被动（必须至少3句个性台词）
12. ⚠️ 策略A（先炸后藏）：第1集必须有主角亲自上场的劲爆画面，不可用配角转述替代
13. 禁止违反公序良俗内容
`;

// ====================== 【工具函数】======================
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

// ====================== 【LLM调用】======================
async function callLLM(prompt: string, needJson: boolean = true, retries: number = MAX_RETRY): Promise<any> {
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
                ? `你是专业短剧创作助手。输出JSON用<json></json>标签包裹，标签外无任何内容。JSON严格规范：双引号key、字符串内双引号转义、无trailing comma。`
                : `你是专业短剧编剧。写标准短剧格式（△动作+角色名：台词），绝对不用【场景】【画面】【台词】分块格式。台词口语化短句有个性。结尾在最刺激瞬间△黑幕。`
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 16000,
        }),
      }, 180000);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 401) throw new Error('⚠️ API_KEY错误');
        if (response.status === 404) throw new Error('⚠️ 模型未找到');
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('retry-after') || '10', 10);
          console.warn(`限流429，等${retryAfter}秒...`);
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
          .replace(/\n/g, ' ').replace(/\t/g, ' ').replace(/\r/g, '')
          .replace(/,\s*([\]}])/g, '$1');
        return JSON.parse(jsonStr);
      }
      return content;
    } catch (error: any) {
      if (error.message?.includes('API_KEY') || error.message?.includes('模型未找到')) throw error;
      console.warn(`调用出错（第${attempt + 1}次）：${error.message}`);
      if (attempt === retries - 1) throw error;
      const baseMs = error.message?.includes('超时') ? 8000 : 5000;
      const backoffMs = Math.min(baseMs * Math.pow(2.5, attempt), 120000);
      await delay(backoffMs);
    }
  }
}

// ====================== 【爽点类型匹配工具】======================
function matchShuangdianType(coreShuangdian: string): string {
  const typeMap: Record<string, string[]> = {
    '装逼打脸类': ['扮猪吃虎', '实力碾压', '幕后大佬', '挥金如土', '天赋异禀', '不按常理', '万千宠爱', '一呼百应', '解决难题', '上帝视角'],
    '荣获至宝类': ['夺宝奇兵', '慧眼识珠', '神器认主', '收服帮派'],
    '意外之喜类': ['无心插柳', '一夜暴富', '偷听秘闻', '因祸得福'],
    '惩戒恶人类': ['大仇得报', '诛杀坏人', '劫富济贫', '反向PUA'],
    '人格魅力类': ['持之以恒', '认祖归宗', '重情重义', '知恩图报'],
    '拯救危难类': ['力挽狂澜', '英雄救美', '拯救公司', '解救家人'],
    '智商碾压类': ['预判对手', '渔翁得利', '职场宫斗', '规则破解'],
    '绝地反杀类': ['绝境逃脱', '极限反杀', '逆风翻盘', '反杀小人'],
    '直播爽感类': ['直播打脸', '弹幕封神', '反向带货', '花式怼粉', '黑料澄清'],
    '玄学爽感类': ['开卦算命', '风水改运', '驱邪破煞', '功德加身', '预知吉凶'],
    '年代逆袭类': ['信息差赚钱', '薅集体羊毛', '打脸极品亲戚', '返城创业', '囤货致富'],
    '规则怪谈类': ['破解规则', '戏耍NPC', '极限逃生', '副本通关', '卡bug刷分'],
  };
  for (const [type, keywords] of Object.entries(typeMap)) {
    if (keywords.some(kw => coreShuangdian.includes(kw))) return type;
  }
  return '';
}

// ====================== 【GeminiService 核心类】======================
export class GeminiService {

  // ==================== 自检 ====================
  private async ruleCheck(
    content: string,
    checkType: 'skeleton' | 'outline' | 'script',
    episodeNum?: number
  ): Promise<{ pass: boolean, error?: string }> {
    let checkPrompt = '';

    if (checkType === 'skeleton') {
      checkPrompt = `检查骨架，输出JSON{"pass":true/false,"error":"原因或无"}：
      1. 底牌是否具体可量化？
      2. 金手指与爽梗匹配？
      3. 感知维度和透底形式一致？
      4. 开场策略正确（显性-隐忍用策略A/隐性用策略B/系统用策略C/重生用策略D）？
      5. episode_1_opening_scene是主角亲自上场的画面（非配角念简历）？
      6. protagonist_voice有3句个性台词示例？
      7. 冲突5层梯度？
      8. 打脸闭环？
      9. 10集制？
      内容：${content.slice(0, 6000)}`;
    } else if (checkType === 'outline') {
      checkPrompt = `检查大纲，输出JSON{"pass":true/false,"error":"原因或无"}：
      1. 共10集？
      2. 每集有钩子？
      3. 冲突有梯度？
      4. 第1集按开场策略执行（策略A先有主角劲爆画面/策略B日常暴露+知情人透底）？
      5. 连续2集无相同冲突？
      6. 打脸闭环？
      内容：${content.slice(0, 6000)}`;
    } else if (checkType === 'script' && episodeNum !== undefined) {
      checkPrompt = `检查第${episodeNum}集脚本，输出JSON{"pass":true/false,"error":"原因或无"}：
      1. 格式标准（△动作+角色名：台词）？
      2. 结尾△黑幕？
      3. 台词口语化有个性？
      ${episodeNum === 1 ? `4. 是否按开场策略执行？策略A：是否有主角亲自上场的劲爆画面（配角念简历不算）？策略B：是否有主角做日常+逆天之事+知情人量化反应？
      5. 主角是否有个性台词（不是全程沉默）？` : ''}
      ${episodeNum <= 3 ? `6. 旁观者？7. 主角个性台词？` : ''}
      ${episodeNum >= 7 && episodeNum <= 8 ? `8. 大爽点干脆利落？打脸闭环？旁观者分层？` : ''}
      内容：${content.slice(0, 6000)}`;
    } else {
      return { pass: true };
    }

    try {
      return await callLLM(checkPrompt, true, 1);
    } catch {
      return { pass: true };
    }
  }

  // ==================== 第一阶段：骨架分析 ====================
  async analyzeNovel(novelContent: string): Promise<string> {
    const prompt = `
    ${GLOBAL_TOP_RULES}
    ${SHUANGDIAN_LIBRARY}
    ${GOLD_FINGER_FRAMEWORK}
    ${SUB_GENRE_RULES}
    ${EPISODE_1_STRATEGIES}

    【任务】
    基于小说内容：
    1. 提炼核心卖点和爽梗
    2. 查金手指匹配表确定全套参数
    3. 根据金手指感知维度查第1集开场策略表，确定用策略A/B/C/D
    4. 基于联合决策规划10集阶段剧情
    可自由魔改，爽感优先。

    【输出JSON】
    {
        "base_info": {
            "book_name": "书名",
            "core_genre": "男频/女频",
            "sub_genre": "子流派/最多3个",
            "protagonist": "主角姓名+身份+核心性格+2-3个专属标志性动作或口头禅（含频率限制）+碾压级底牌（量化）",
            "protagonist_voice": "主角说话风格示例（3句示例台词，体现个性）",
            "gold_finger": {
                "content": "具体内容和量化能力",
                "type": "查表结果",
                "perception": "隐性/显性-隐忍/显性-系统/半显性",
                "reveal_method": "透底形式",
                "reveal_scene": "第1集透底具体场景",
                "supporting_character": "知情配角设定或不适用",
                "conceal_reason": "隐忍理由或不适用-天然信息差",
                "boundary": "使用边界"
            },
            "episode_1_strategy": "A先炸后藏 / B日常暴露 / C系统激活 / D重生闪回",
            "episode_1_opening_scene": "第1集开场劲爆画面具体描述（2-3句话，主角亲自上场的可拍画面）",
            "final_boss": "终极BOSS",
            "final_goal": "主角终极目标"
        },
        "ultimate_hook": {
            "content": "终极二元悬念",
            "strengthen_nodes": ["每10集强化"]
        },
        "conflict_ladder": {
            "level_1": "口头嘲讽/社交羞辱（1-2集）",
            "level_2": "经济打压/断生路（3集）",
            "level_3": "人身威胁/派打手（4集）",
            "level_4": "威胁核心关系人（5-6集）",
            "level_5": "动用权力/国际势力（7-8集触发爆发）"
        },
        "face_slap_map": [
            {"who_mocked": "谁嘲讽", "mock_episode": "第几集", "payback_episode": "第几集打脸", "payback_method": "怎么打脸"}
        ],
        "stage_shuangdian_plan": [
            {
                "stage_num": 1,
                "stage_total_episodes": 10,
                "core_shuangdian": "从爽点库选",
                "stage_hook": "阶段二元悬念",
                "bind_global_hook": "与全局钩子关联",
                "full_link_nodes": {
                    "铺垫期": { "episode_range": "1-2集", "core_task": "第1集按策略X执行开场；第2集..." },
                    "冲突升级期": { "episode_range": "3-5集", "core_task": "每集不同层级冲突" },
                    "small_climax": { "episode_range": "第6集", "core_task": "..." },
                    "big_explosion": { "episode_range": "7-8集", "core_task": "..." },
                    "transition_period": { "episode_range": "9-10集", "core_task": "..." }
                },
                "forbidden_elements": ["禁入内容"],
                "gold_finger_boundary": "本阶段金手指边界"
            }
        ],
        "sub_genre_rules": "对应子流派规则"
    }

    【校验】
    1. 底牌量化可衡量
    2. 金手指与爽梗匹配
    3. 开场策略与感知维度匹配
    4. episode_1_opening_scene是主角亲自上场画面
    5. protagonist_voice有3句个性台词
    6. 冲突5层梯度
    7. 打脸闭环
    8. 10集制

    【输入小说】：
    ${novelContent.slice(0, 10000)}
    `;

    let result = await callLLM(prompt, true);
    if (ENABLE_RULE_CHECK) {
      await delay(API_CALL_DELAY);
      const checkRes = await this.ruleCheck(JSON.stringify(result), 'skeleton');
      if (!checkRes.pass && checkRes.error) {
        console.warn('骨架校验失败：', checkRes.error);
        await delay(API_CALL_DELAY);
        result = await callLLM(prompt + `\n\n校验失败：${checkRes.error}，请修正`, true);
      }
    }
    return this.formatAnalysisReport(result);
  }

  // ==================== 格式化报告 ====================
  private formatAnalysisReport(skeleton: any): string {
    const info = skeleton.base_info;
    const hook = skeleton.ultimate_hook;
    const gf = info.gold_finger;

    let report = `📖 书名：${info.book_name}\n`;
    report += `📂 流派：${info.core_genre} / ${info.sub_genre}\n`;
    report += `👤 主角：${info.protagonist}\n`;
    report += `🗣️ 说话风格：${info.protagonist_voice}\n\n`;
    report += `🔧 金手指：\n`;
    report += `  内容：${gf.content}\n`;
    report += `  类型：${gf.type}\n`;
    report += `  感知维度：${gf.perception}\n`;
    report += `  透底形式：${gf.reveal_method}\n`;
    report += `  透底场景：${gf.reveal_scene}\n`;
    report += `  知情配角：${gf.supporting_character}\n`;
    report += `  隐忍理由：${gf.conceal_reason}\n\n`;
    report += `🎬 开场策略：${info.episode_1_strategy}\n`;
    report += `🎬 开场画面：${info.episode_1_opening_scene}\n\n`;
    report += `👿 终极BOSS：${info.final_boss}\n`;
    report += `🎯 终极目标：${info.final_goal}\n\n`;
    report += `🪝 终极钩子：${hook.content}\n`;
    report += `📍 强化节点：${hook.strengthen_nodes.join('、')}\n\n`;

    if (skeleton.conflict_ladder) {
      report += `⚔️ 冲突梯度：\n`;
      Object.entries(skeleton.conflict_ladder).forEach(([k, v]) => {
        report += `  ${k}：${v}\n`;
      });
      report += `\n`;
    }

    if (skeleton.face_slap_map) {
      report += `👊 打脸闭环：\n`;
      skeleton.face_slap_map.forEach((item: any) => {
        report += `  ${item.who_mocked}（第${item.mock_episode}集）→ 第${item.payback_episode}集：${item.payback_method}\n`;
      });
      report += `\n`;
    }

    report += `⚡ 阶段规划：\n`;
    skeleton.stage_shuangdian_plan.forEach((stage: any) => {
      report += `\n  📌 第${stage.stage_num}阶段（${stage.stage_total_episodes}集）：${stage.core_shuangdian}\n`;
      report += `  🪝 阶段钩子：${stage.stage_hook}\n`;
      report += `  🔗 绑定主线：${stage.bind_global_hook}\n`;
      const nodes = stage.full_link_nodes;
      report += `  📅 链路：\n`;
      report += `    ① 铺垫 ${nodes['铺垫期'].episode_range}：${nodes['铺垫期'].core_task}\n`;
      report += `    ② 升级 ${nodes['冲突升级期'].episode_range}：${nodes['冲突升级期'].core_task}\n`;
      report += `    ③ 小高潮 ${nodes.small_climax.episode_range}：${nodes.small_climax.core_task}\n`;
      report += `    ④ 大爽点 ${nodes.big_explosion.episode_range}：${nodes.big_explosion.core_task}\n`;
      report += `    ⑤ 转场 ${nodes.transition_period.episode_range}：${nodes.transition_period.core_task}\n`;
      report += `  ⚠️ 禁入：${stage.forbidden_elements.join('、')}\n`;
    });

    report += `\n🎭 子流派：${skeleton.sub_genre_rules}\n`;
    report += `\n\n<!--SKELETON_JSON_START-->${JSON.stringify(skeleton)}<!--SKELETON_JSON_END-->`;
    return report;
  }

  // ==================== 提取骨架JSON ====================
  private extractSkeleton(analysisReport: string): any {
    const match = analysisReport.match(/<!--SKELETON_JSON_START-->(.+?)<!--SKELETON_JSON_END-->/);
    if (match) return JSON.parse(match[1]);
    throw new Error('无法提取骨架数据');
  }

  // ==================== 第二阶段：分集大纲 ====================
  async generateOutline(novelContent: string, analysisReport: string, targetStageNum: number = 1): Promise<string> {
    const skeleton = this.extractSkeleton(analysisReport);
    const targetStage = skeleton.stage_shuangdian_plan.find((s: any) => s.stage_num === targetStageNum);
    if (!targetStage) throw new Error(`未找到第${targetStageNum}阶段`);

    const gf = skeleton.base_info.gold_finger;
    const strategy = skeleton.base_info.episode_1_strategy;

    const prompt = `
    ${GLOBAL_TOP_RULES}
    ${FIRST_3_EPISODES_RULES}
    ${SHUANGDIAN_EXEC_RULES}
    ${ANTI_BUG_RULES}
    子流派规则：${skeleton.sub_genre_rules}

    【基础信息】
    终极钩子：${skeleton.ultimate_hook.content}
    当前阶段第${targetStageNum}阶段，共${targetStage.stage_total_episodes}集
    核心爽梗：${targetStage.core_shuangdian}
    阶段钩子：${targetStage.stage_hook}
    链路节点：${JSON.stringify(targetStage.full_link_nodes)}
    禁入：${targetStage.forbidden_elements.join('、')}
    主角：${skeleton.base_info.protagonist}
    主角说话风格：${skeleton.base_info.protagonist_voice}
    冲突梯度：${JSON.stringify(skeleton.conflict_ladder)}
    打脸闭环：${JSON.stringify(skeleton.face_slap_map)}

    【金手指】
    内容：${gf.content}
    感知维度：${gf.perception}
    透底形式：${gf.reveal_method}
    第1集透底场景：${gf.reveal_scene}
    知情配角：${gf.supporting_character}
    隐忍理由：${gf.conceal_reason}

    【第1集开场策略：${strategy}】
    开场画面：${skeleton.base_info.episode_1_opening_scene}
    ⚠️ 第1集大纲必须包含这个开场画面

    【任务】
    严格按链路节点生成10集大纲。
    第1集必须按开场策略执行。
    冲突逐集升级，禁止连续2集相同冲突。
    打脸闭环。

    【输出JSON】
    {
        "unit_base_info": {
            "unit_num": ${targetStageNum},
            "episode_range": "1-10集",
            "stage_goal": "...",
            "stage_hook": "...",
            "core_shuangdian": "...",
            "core_villain": "...",
            "bystanders": ["...", "...", "..."]
        },
        "episode_outlines": [
            {
                "episode_num": 1,
                "conflict_level": "冲突层级",
                "core_plot": "30字概括",
                "key_scenes": "2-3个关键场景",
                "new_info": "区别于上集的新信息",
                "single_hook": "结尾钩子",
                "node_belong": "铺垫期/冲突升级期/小高潮/大爽点/转场期",
                "face_slap": "打脸安排/无",
                "foreshadow": "伏笔/无",
                "foreshadow_payoff": "回收集数/无"
            }
        ]
    }

    【校验】
    1. 共10集
    2. 每集conflict_level不同于上一集
    3. 每集new_info非空
    4. 打脸闭环
    5. 第1集有开场画面+终极钩子
    6. 转场期新矛盾有伏笔支撑
    `;

    let outlineData = await callLLM(prompt, true);
    if (ENABLE_RULE_CHECK) {
      await delay(API_CALL_DELAY);
      const checkRes = await this.ruleCheck(JSON.stringify(outlineData), 'outline');
      if (!checkRes.pass && checkRes.error) {
        console.warn('大纲校验失败：', checkRes.error);
        await delay(API_CALL_DELAY);
        outlineData = await callLLM(prompt + `\n\n校验失败：${checkRes.error}，请修正`, true);
      }
    }
    let text = this.formatOutline(outlineData);
    text += `\n\n<!--OUTLINE_JSON_START-->${JSON.stringify({ outline: outlineData, skeleton, targetStage })}<!--OUTLINE_JSON_END-->`;
    return text;
  }

  // ==================== 格式化大纲 ====================
  private formatOutline(outline: any): string {
    const info = outline.unit_base_info;
    let text = `📋 大纲：${info.episode_range}\n`;
    text += `🎯 目标：${info.stage_goal}\n`;
    text += `🪝 悬念：${info.stage_hook}\n`;
    text += `⚡ 爽点：${info.core_shuangdian}\n`;
    text += `👿 反派：${info.core_villain}\n`;
    text += `👥 旁观者：${info.bystanders.join(' / ')}\n\n`;
    text += `--- 分集大纲 ---\n\n`;

    outline.episode_outlines.forEach((ep: any) => {
      text += `【第${ep.episode_num}集】[${ep.node_belong}] ${ep.core_plot}\n`;
      text += `  冲突层级：${ep.conflict_level}\n`;
      text += `  关键场景：${ep.key_scenes}\n`;
      text += `  新信息：${ep.new_info}\n`;
      text += `  钩子：${ep.single_hook}\n`;
      if (ep.face_slap && ep.face_slap !== '无') text += `  打脸：${ep.face_slap}\n`;
      if (ep.foreshadow && ep.foreshadow !== '无') text += `  伏笔：${ep.foreshadow} → 第${ep.foreshadow_payoff}集回收\n`;
      text += `\n`;
    });
    return text;
  }

  // ==================== 第三阶段：生成脚本 ====================
  async generateScripts(
    outlineText: string,
    phase: number,
    novelContent: string,
    formattingRef?: string,
    onProgress?: (current: number, total: number, status: string) => void
  ): Promise<string> {
    const match = outlineText.match(/<!--OUTLINE_JSON_START-->(.+?)<!--OUTLINE_JSON_END-->/);
    if (!match) throw new Error('无法从大纲中提取数据');

    const { outline, skeleton, targetStage } = JSON.parse(match[1]);
    const coreShuangdian = outline.unit_base_info.core_shuangdian;
    const shuangdianType = matchShuangdianType(coreShuangdian);
    const gf = skeleton.base_info.gold_finger;
    const strategy = skeleton.base_info.episode_1_strategy;

    const allScripts: string[] = [];
    const totalEpisodes = outline.episode_outlines.length;
    let previousSummary = '';

    for (let i = 0; i < totalEpisodes; i++) {
      const episode = outline.episode_outlines[i];
      if (onProgress) onProgress(i + 1, totalEpisodes, `正在生成第${episode.episode_num}集...`);
      if (i > 0) await delay(API_CALL_DELAY);

      // 动态生成金手指+开场指令
      let goldFingerDirective = '';
      let openingDirective = '';

      if (episode.episode_num === 1) {
        if (strategy.includes('A') || strategy.includes('先炸后藏')) {
          openingDirective = `
【第1集开场指令·策略A先炸后藏】
⚠️ 这是本集最重要的规则：

场景1（前30秒·炸场）：
- 直接给主角最强状态的劲爆动作画面：${skeleton.base_info.episode_1_opening_scene}
- 主角必须亲自上场，有具体动作（开枪/格斗/碾压），不可用配角念简历替代
- 画面有视觉冲击力
- 配角反应或字幕量化碾压级别（${gf.content}）
- 主角在这个场景中要说至少1句有个性的台词

场景2（藏的理由·不超过4行）：
- 简短交代退隐原因（${gf.conceal_reason}）

场景3（反差登场）：
- 时间跳转，主角以最普通的样子出现在日常场景
- 遭遇第一个冲突点，被人当废物
- 主角态度有个性（痞/嘴欠/不在乎），不能全程沉默

⚠️ 绝对禁止：
- 禁止开场是将军站地图前+警卫员念档案
- 禁止主角第1集全程不说话
- 禁止炸场画面只有回忆闪回`;

          goldFingerDirective = `
【金手指·显性-隐忍型·第1集】
隐忍理由：${gf.conceal_reason}
炸场画面是真实样子，反差画面是伪装。
面对刺激有1个微小专属微反应。`;

        } else if (strategy.includes('B') || strategy.includes('日常暴露')) {
          openingDirective = `
【第1集开场指令·策略B日常暴露】
场景1：主角做日常事，过程中无意做逆天之事（${skeleton.base_info.episode_1_opening_scene}）
知情配角（${gf.supporting_character}）OS量化碾压级别
主角完全不知道自己有多强`;

          goldFingerDirective = `
【金手指·隐性型·第1集】主角100%不自知。`;

        } else if (strategy.includes('C') || strategy.includes('系统')) {
          openingDirective = `【第1集开场指令·策略C系统激活】系统弹窗出现1次。`;
          goldFingerDirective = `【金手指·系统型·第1集】仅此1次系统出现。`;
        } else if (strategy.includes('D') || strategy.includes('重生')) {
          openingDirective = `【第1集开场指令·策略D重生闪回】前世惨死3-5秒 → 睁眼回到过去 → 立刻做只有重生者才会做的事。`;
          goldFingerDirective = `【金手指·先知型·第1集】主角OS+行为反差透底。`;
        }
      } else {
        openingDirective = '';
        if (gf.perception === '隐性') {
          goldFingerDirective = `【金手指·隐性】主角不自知。爽感来自无意间逆天+旁人震惊。`;
        } else if (gf.perception?.includes('隐忍')) {
          goldFingerDirective = `【金手指·隐忍】隐忍不发，微反应本集最多1次。`;
        } else if (gf.perception?.includes('系统')) {
          goldFingerDirective = `【金手指·系统】系统全程隐身。`;
        } else {
          goldFingerDirective = `【金手指】不再透底。`;
        }
      }

      let faceSlipReminder = '';
      if (episode.face_slap && episode.face_slap !== '无') {
        faceSlipReminder = `\n【打脸提醒】${episode.face_slap}`;
      }

      const prompt = `
【⚠️ 最高优先级·格式规则】
标准竖屏短剧格式，范本：
${SCRIPT_FORMAT_EXAMPLE}

【绝对禁止】
❌ ### 第X集 / 【场景】【画面】【台词】分块 / 自创标签 / 下集预告

【必须使用】
✅ 场景头+△动作+角色名：台词+OS+（字幕：XXX）+△黑幕

${openingDirective}
${goldFingerDirective}
${faceSlipReminder}

【创作信息】
终极钩子：${skeleton.ultimate_hook.content}
核心爽点：${coreShuangdian}（${shuangdianType}）
主角：${skeleton.base_info.protagonist}
主角说话风格（模仿写台词）：${skeleton.base_info.protagonist_voice}
金手指：${gf.content}（${gf.perception}）
旁观者：${outline.unit_base_info.bystanders.join(' / ')}
冲突梯度：${JSON.stringify(skeleton.conflict_ladder)}
${previousSummary ? `\n【前文摘要】\n${previousSummary}` : ''}

【核心要求】
1. 500-700字，节奏快冲突强爽感足
2. 台词口语化短句，模仿主角说话风格
3. 主角本集至少2句个性台词
4. 信息差通过行为+配角反应自然呈现
5. 结尾最刺激瞬间△黑幕
6. 冲突场景2-3类旁观者
7. 冲突层级：${episode.conflict_level}
8. 新信息：${episode.new_info}

${episode.episode_num <= 3 ? `
【前三集专项·第${episode.episode_num}集】
${episode.episode_num === 1 ? `⚠️ 必须严格按上面的开场指令执行` : ''}
${episode.episode_num === 2 ? `- 反差全面铺开，主角以普通人身份遭遇嘲讽
- 三类旁观者全部到位
- 主角不经意小动作暗示实力
- 不释放爽点，反差持续拉大` : ''}
${episode.episode_num === 3 ? `- 冲突升级到新层级，不重复第2集
- 反派动用资源打压
- 主角有"差点暴露"瞬间但掩饰过去
- 结尾在更大威胁出现时戛然而止` : ''}
` : ''}

${episode.episode_num >= 7 && episode.episode_num <= 8 ? `
【大爽点·第${episode.episode_num}集】
- 爆发干脆利落
- 旁观者分层反应
- 打脸闭环
- ${episode.episode_num === 7 ? '爽点释放一半，最大的留第8集' : '最大爽点全部释放'}
` : ''}

【本集大纲】
${JSON.stringify(episode)}

${ANTI_BUG_RULES}
`;

      let script = await callLLM(prompt, false);

      const isCritical = episode.episode_num <= 3 || (episode.episode_num >= 7 && episode.episode_num <= 8);
      if (ENABLE_RULE_CHECK && isCritical) {
        if (onProgress) onProgress(i + 1, totalEpisodes, `校验第${episode.episode_num}集...`);
        await delay(API_CALL_DELAY);
        const checkRes = await this.ruleCheck(script, 'script', episode.episode_num);
        if (!checkRes.pass && checkRes.error) {
          console.warn(`第${episode.episode_num}集校验失败：`, checkRes.error);
          if (onProgress) onProgress(i + 1, totalEpisodes, `第${episode.episode_num}集重生成...`);
          await delay(API_CALL_DELAY);
          script = await callLLM(prompt + `\n\n校验失败：${checkRes.error}，请修正后重写`, false);
        }
      }

      allScripts.push(script);

      previousSummary = `前${episode.episode_num}集摘要：\n`;
      const recentScripts = allScripts.slice(-3);
      recentScripts.forEach((s, idx) => {
        const epNum = episode.episode_num - (recentScripts.length - 1 - idx);
        previousSummary += `第${epNum}集：${s.slice(0, 150).replace(/\n/g, ' ')}...\n`;
      });
    }

    return allScripts.join('\n\n---\n\n');
  }
}
