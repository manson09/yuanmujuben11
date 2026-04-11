const PROXY_URL = "/api/llm";
const MODEL_NAME = "anthropic/claude-sonnet-4.6";
const MAX_RETRY = 5;
const ENABLE_RULE_CHECK = true;
const API_CALL_DELAY = 3000;
// ======================================================================

// ====================== 【金手指维度化分类体系】======================
const GOLD_FINGER_FRAMEWORK = `
## 🔧 金手指分类与匹配框架

### 金手指三大维度
1. 感知维度：隐性（主角不自知）/ 显性-隐忍（主角知道但藏着）/ 显性-系统（系统/面板可见）/ 半显性（知道一部分但不知全貌）
2. 存在形式：内生型（天赋/血脉/经历）/ 外挂型（系统/宝物/外部力量）
3. 作用方式：主动型（主角主动使用）/ 被动型（自动生效主角不知情）

### 爽梗→金手指自动匹配表（直接查表，不需要AI推理）

| 核心爽梗 | 金手指类型 | 感知维度 | 透底形式 | 配角需求 |
|---------|-----------|---------|---------|---------|
| 扮猪吃虎/天赋异禀/不按常理 | 内生·天赋流 | 隐性（主角不自知） | 知情配角OS/吐槽 | 必须有1个知情长辈/师父 |
| 实力碾压/一呼百应/幕后大佬 | 身份·实力流 | 显性-隐忍 | 旧部下/手下的震惊反应 | 至少1个知道身份的旧部 |
| 挥金如土/万千宠爱 | 身份·财富流 | 显性-隐忍 | 主角回忆/证件/旧物 | 可选知情配角 |
| 预判对手/渔翁得利/职场宫斗 | 重生·先知流 | 显性-隐忍 | 主角内心OS+记忆闪回 | 不强制 |
| 信息差赚钱/囤货致富/返城创业 | 重生·先知流 | 显性-隐忍 | 主角内心OS+记忆闪回 | 不强制 |
| 打脸极品亲戚/薅集体羊毛 | 重生·先知流 | 显性-隐忍 | 主角内心OS+记忆闪回 | 不强制 |
| 直播打脸/弹幕封神/花式怼粉/黑料澄清 | 外挂·系统流 | 显性-系统 | 系统弹窗/面板 | 不强制 |
| 反向带货 | 外挂·系统流或内生·眼力流 | 显性-系统或半显性 | 系统提示或主角行为反差 | 不强制 |
| 破解规则/卡bug刷分/副本通关 | 外挂·系统流或重生·先知流 | 显性-系统或显性-隐忍 | 系统提示或主角OS | 不强制 |
| 极限逃生/戏耍NPC | 重生·先知流 | 显性-隐忍 | 主角OS+行为反差 | 不强制 |
| 开卦算命/风水改运/预知吉凶 | 内生·天赋流 | 半显性（知道有能力但不知多强） | 主角行为+事主震惊反应 | 不强制 |
| 驱邪破煞/功德加身 | 内生·天赋流+外挂·功德系统 | 半显性 | 主角行为+系统辅助 | 不强制 |
| 夺宝奇兵/慧眼识珠/神器认主 | 内生·眼力流或重生·先知流 | 隐性或显性-隐忍 | 旁人不识货的反差反应 | 不强制 |
| 收服帮派 | 身份·实力流 | 显性-隐忍 | 行为碾压+旁人震惊 | 可选旧部 |
| 绝境逃脱/极限反杀/逆风翻盘/反杀小人 | 内生·潜力流或身份·底牌流 | 隐性或显性-隐忍 | 绝境中知情配角/回忆透底 | 可选 |
| 力挽狂澜/英雄救美/拯救公司/解救家人 | 身份·实力流 | 显性-隐忍 | 行为反差+旁人震惊 | 可选 |
| 大仇得报/诛杀坏人/反向PUA | 重生·先知流或身份·证据流 | 显性-隐忍 | 证据展示+回忆闪回 | 不强制 |
| 劫富济贫 | 身份·实力流或内生·天赋流 | 显性-隐忍或隐性 | 行为反差+旁人震惊 | 可选 |
| 无心插柳/一夜暴富/因祸得福 | 内生·气运流 | 隐性（主角不知道自己运气逆天） | 旁人震惊反应 | 不强制 |
| 偷听秘闻 | 内生·天赋流或外挂·异能流 | 半显性 | 主角行为+信息反差 | 不强制 |
| 持之以恒/认祖归宗/重情重义/知恩图报 | 内生·品格流 | 不适用（无传统金手指） | 行为本身就是爽点 | 不强制 |

### 匹配规则
1. 先选定核心爽梗 → 查表确定金手指类型、感知维度、透底形式
2. 隐性型：天然信息差，不需要隐忍理由，主角不会主动使用金手指
3. 显性-隐忍型：必须给出明确隐忍理由（涉密任务/保护家人/等待时机/收集证据）
4. 显性-系统型：仅直播/规则怪谈类使用，其他题材禁止用系统弹窗
5. 半显性型：主角知道自己有某种能力但低估了自身实力
6. 需要知情配角的类型必须设定知情配角

### 透底形式优先级（从自然到生硬）
Tier 1：知情配角的OS/吐槽/震惊反应（最自然，优先用）
Tier 2：主角不经意的行为暴露实力（自己不知道）
Tier 3：碎片化回忆/闪回
Tier 4：纯文字字幕提示
Tier 5：系统弹窗界面（仅直播/怪谈类可用）

### 禁止事项
- 禁止所有题材一律用系统弹窗
- 禁止金手指类型和爽梗类型不匹配
- 禁止隐性金手指设定下出现主角主动使用金手指的剧情
- 禁止无透底（观众也不知道主角底牌则没有信息差爽感）
`;

// ====================== 【全局规则（精简版）】======================
const GLOBAL_TOP_RULES = `
## 🔝 全局最高优先级规则

### 最高顶层原则
所有规则为剧情自然度服务。规则形式与剧情流畅性冲突时，优先保证剧情逻辑通顺、不生硬。
核心规则（信息差、旁观者烘托、每集留钩子、冲突梯度）必须达标，细节形式可灵活调整。
禁止为了卡规则硬塞内容。

### ⚠️ 剧本格式最高规则（违反直接重写）
输出必须是标准竖屏短剧剧本格式：
- 场景头：序号、日/夜、内/外、出场人物
- 动作描写：△开头，一句话一个镜头，只写能拍出来的具体画面
- 台词：角色名：台词 / 角色名（情绪）：台词，口语化短句
- 内心独白：角色名（情绪）OS：内容
- 字幕：行内（字幕：XXX）
- 切场：△切
- 集结尾：△黑幕。
绝对禁止用【场景】【画面】【台词】分块式结构。

### 核心创作规则

1. 【信息差强制规则】
   所有爽点必须营造至少2层认知差，观众全知：
   - 第一层：主角不知道/低估自己的底牌，或主角知道但刻意隐瞒
   - 第二层：配角/反派完全不知道主角的真实实力/底牌
   信息差通过剧情行为+配角反应自然呈现，形式由金手指感知维度决定（查匹配表）

2. 【金手指规则】
   - 主角必须有碾压级底牌/优势，类型由核心爽梗查匹配表决定
   - 仅在第1集前30秒给观众透底1次，后续全程隐身不抢核心爽梗风头
   - 透底形式严格按匹配表执行，禁止所有题材一律用系统弹窗

3. 【旁观者烘托规则】
   冲突场景至少出现2-3类旁观者：①踩主角/捧反派的 ②同情主角的 ③看热闹的中立方

4. 【钩子规则】
   - 每集结尾在剧情最刺激的瞬间戛然而止，直接△黑幕，不解释不预告
   - 全剧终极钩子 > 阶段钩子 > 单集钩子，不允许断钩
   - 全剧终极钩子每10集至少强化1次

5. 【冲突梯度规则】
   反派欺辱行为必须有升级梯度：口头嘲讽→利益损害→人身/核心关系威胁
   同等级冲突不超过2次，禁止同质化堆砌

6. 【人物规则】
   - 主角必须有2-3个专属标志性动作/口头禅，贯穿全剧
   - 台词口语化短句，有个性，禁止书面语
   - 通过具体行为表现性格，禁止用旁白/OS描述性格
   - 反派有明确利益动机，密谋在私下进行，不当众自爆

7. 【爽感优先魔改规则】
   无需贴合原著，可自由魔改加冲突加反派，保留主角核心人设和核心钩子即可

8. 【阶段爽梗闭环规则】
   - 单阶段仅1个核心爽梗，所有剧情100%为它服务
   - 单阶段10-15集，完整包含：铺垫期→冲突升级期→小高潮→大爽点爆发→转场期
   - 每个阶段爽梗必须和全局终极钩子绑定，爆发后推进全局主线

9. 【伏笔闭环规则】
   所有伏笔必须在本阶段内回收，全局伏笔最多延后到下一阶段前3集
   转场期的新矛盾必须在本阶段前8集埋下至少2处伏笔

10. 【人物逻辑规则】
    - 正面配角立场转变必须有铺垫，至少2次暗中维护主角
    - 隐性金手指设定下主角的反应必须符合"不自知"的逻辑
    - 显性-隐忍设定下面对核心仇人/保护对象时必须有仅观众可见的情绪微反应

---
### 前三集强制节奏
#### 第1集（500-700字）：
- 开头直接扔一个视觉冲击力强的画面，不铺垫
- 前30秒内通过匹配表规定的透底形式给观众透底主角底牌
- 建立信息差氛围
- 结尾在反转/冲突临界点戛然而止

#### 第2集（500-700字）：
- 全集压迫感叠加，反派升级，旁观者嘲讽升级
- 不释放爽点，拉满期待感
- 结尾留钩子

#### 第3集（500-700字，小高潮）：
- 压迫感拉到顶峰
- 结尾停在主角即将第一次出手的临界点，戛然而止
`;

// ====================== 【标准剧本格式范本】======================
const SCRIPT_FORMAT_EXAMPLE = `
## 📝 标准剧本格式范本（必须100%复刻此格式风格，仅学习格式，禁止照搬内容）

第一集
1、日、外、林凡、逍遥子
△山巅，云雾缭绕，仙气飘飘，茅草屋旁的深潭，林凡戴着斗笠，嘴角吊着一根狗尾巴坐在那里闭着眼（字幕：林凡），一旁是一根竹竿做的鱼竿。
△水下镜头，水潭内，黑龙游动，面前一条蚯蚓闪烁着金光，黑龙冲上去一口吞下，尔后疯狂挣扎。
△水上，鱼漂猛然下坠，林凡睁眼，一把抓住鱼竿，嘴角带笑。
林凡：上钩了！
△林凡举起鱼竿。
△深潭中，黑龙被鱼线拉着急速向上。
△砰！
△黑龙破水而出，水花漫天之间，金光闪烁，黑龙悲鸣着变成一条黑鱼掉在地上，林凡看着在地上蹦跶的黑鱼嘿嘿一笑。
△切
△火堆前，黑鱼被木棍串着架在火上烤，林凡哼着小曲往黑鱼上撒作料。
林凡：来点葱花，撒点香菜，这小味挠一下就上来了！
△金光一闪，逍遥子入镜（字幕：逍遥子，林凡师父，绝世高人），逍遥子看着被烤的黑鱼，顿时气急败坏的嘶吼。
逍遥子：逆徒！老夫圈养了万年的金仙境黑龙，你就这么给我烤了？
林凡（翻白眼）：什么黑龙？不就是一条黑鱼吗？小气扒拉的！
逍遥子（吹胡子瞪眼）：我小气？你来山上这俩月，老夫这里的火凤，真龙，仙药，灵珍都快被你给吃完了！
林凡：切！不就几只鸡，几条鱼，几根草吗？不过话说回来！老头，你当初说我是修仙天才是不是在骗我？我都修炼了两个月了，还是炼气期！我感觉自己不是修炼的那块料。
逍遥子（瞪眼）OS：你丫头两个月修炼到了练气九十九万层，弹指间仙帝都要飞灰湮灭！你还想怎样？
林凡：我想下山了。
逍遥子（瞬间大喜）：下山好啊！山下好吃的可比山上多！不过徒儿啊！山下金丹多如狗，元婴满地走，你一个小小的练气，切记一定要低调行事。
林凡（认真点头）：我记住了！
△林凡起身，化作金光消失不见。
逍遥子（笑容阴险）：我的好徒儿，山下可有一个大惊喜等着你呢！
2、日、内、林凡，江清苒
△酒店房间内，江清月面色桃红，衣衫凌乱（字幕：江清苒，江家大小姐）。
△金光一闪，林凡掉在床上，坐起身来，林凡神情迷茫。
林凡：这是给我干哪来了？
△一旁，江清月从床上爬起来，眼神迷离，上前一把抱住林凡，林凡瞪大双眼。
林凡：这位...
△江清月亲了上去，把林凡扑倒在床上。
△黑幕。

【从范本中必须学习的要点】
1. 格式：场景头"序号、时间、空间、出场人物"，动作△开头，台词"角色名：台词"
2. 信息差：师父OS自然吐槽透底（隐性金手指·知情配角OS形式），主角不自知，观众全知
3. 人设：林凡憨批吃货人设通过具体行为表现（烤黑龙/翻白眼/嘴欠），不用旁白描述
4. 钩子：结尾在最刺激瞬间直接△黑幕，不解释
5. 爽点：通过剧情自然展开，不堆规则
6. 台词：口语化短句，有个性（"小气扒拉的""这小味挠一下就上来了"）
7. 字数：约500-600字/集，精炼可拍
8. 金手指形式：隐性·天赋流 → 知情配角（师父）OS吐槽 → 主角完全不知道 → 天然信息差
`;

// ====================== 【S级核心爽点库】======================
const SHUANGDIAN_LIBRARY = `
## 📚 可选S级核心爽点库（必须从以下分类中选择）
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

// ====================== 【子流派规则（精简版）】======================
const SUB_GENRE_RULES = `
## 🎭 子流派专属规则
| 子流派 | 核心规则 | 推荐金手指类型 |
|--------|---------|--------------|
| 玄幻修仙 | 终极钩子绑定生死/复仇；越阶需合理支撑；打脸主角自己出手 | 隐性·天赋流（主角不自知实力） |
| 都市赘婿 | 终极钩子绑定身份揭晓；底牌最高潮才揭；女主至少2次暗中维护 | 显性-隐忍·身份流 |
| 战神归来 | 终极钩子绑定护妻护女；先装弱再打脸；隐姓埋名有明确理由 | 显性-隐忍·身份实力流 |
| 都市异能 | 终极钩子绑定异能暴露/救危机；异能不无限滥用 | 半显性·天赋流 |
| 穿越历史 | 终极钩子绑定改命运/夺嫡；现代知识不离谱；核心历史不魔改 | 显性-隐忍·先知流 |
| 校园爽文 | 终极钩子绑定逆袭考学；逆袭有铺垫不凭空满分 | 隐性或显性均可 |
| 年代创业 | 终极钩子绑定发家致富；不出现不符年代的物品；信息差符合真实历史 | 显性-隐忍·先知流 |
| 玄学爽文 | 终极钩子绑定化劫/积功德；算命有实锤点私密细节；禁止封建迷信违禁内容 | 半显性·天赋流 |
| 直播爽文 | 终极钩子绑定成顶流；弹幕分层（黑粉/路人/真爱粉）有梯度 | 显性-系统·系统流 |
| 规则怪谈 | 终极钩子绑定通关所有副本；规则不前后矛盾；卡bug逻辑自洽 | 显性-系统或显性-隐忍 |
| 都市家庭 | 终极钩子绑定家庭痛点；冲突符合现实逻辑；禁止过度狗血 | 显性-隐忍·证据流 |
`;

// ====================== 【爽点专属执行规则（精简版）】======================
const SHUANGDIAN_EXEC_RULES = `
## ⚙️ 爽点专属执行规则

### 通用要求
- 每个核心爽点搭配至少1个辅助爽感元素（搞笑/暧昧/亲情等），避免单一
- 单阶段核心爽梗1个，可搭配最多2个辅助爽梗，辅助占比≤30%

### 按爽点类型的核心要求
| 爽点类型 | 核心体验 | 铺垫要求 | 禁止事项 |
|---------|---------|---------|---------|
| 装逼打脸 | 反差感 | 先铺嘲讽→主角可装弱→打脸干脆利落+全场震惊 | 禁止代打；所有核心反派必须有对应惩罚闭环 |
| 荣获至宝 | 价值感 | 先铺宝物稀缺→得宝特写→旁人嫉妒震惊 | 得宝后必须隐瞒，不当众显摆 |
| 意外之喜 | 惊喜感 | 先铺"没好处/倒霉"→揭晓时旁人震惊→亮价值 | 禁止提前剧透收获；收获必须有合理逻辑 |
| 惩戒恶人 | 宣泄感 | 先铺恶行→惩罚够解气→受害者拍手称快 | 惩罚符合公序良俗 |
| 人格魅力 | 认同感 | 先铺困境→坚持品格→质疑者愧疚敬佩 | 禁止中途插入打脸得宝 |
| 拯救危难 | 成就感 | 先铺危难严重性→主角出手干脆→所有人感激 | 禁止金手指直接解决 |
| 智商碾压 | 优越感 | 先铺对手诡计毒辣→层层拆穿→对手破防 | 预判必须有线索支撑 |
| 绝地反杀 | 刺激感 | 先铺绝境绝望→反杀快狠准→对手难以置信 | 禁止第三方救场 |
| 直播爽感 | 弹幕认同 | 先铺黑粉网暴→主角装怂引放大招→弹幕集体反转 | 每集至少3次弹幕画面；弹幕分三层 |
| 玄学爽感 | 认知反差 | 先铺事主嚣张不信→点出私密细节→事主跪地求帮忙 | 算命必须有实锤 |
| 年代逆袭 | 时代信息差 | 先铺所有人不看好→偷偷囤货做生意→公布收入所有人震惊 | 不出现不符年代物品；信息差符合真实历史 |
| 规则怪谈 | 极限刺激 | 先铺规则恐怖→假装遵守偷偷卡bug→通关众人震惊 | 规则不矛盾；卡bug自洽 |
`;

// ====================== 【防踩坑规则（精简版）】======================
const ANTI_BUG_RULES = `
## 🚫 防踩坑规则

1. 隐忍逻辑：显性-隐忍型金手指必须有明确隐忍理由；隐性型无需理由（天然信息差）
2. 隐性金手指逻辑：主角不可主动使用不知道的能力；反差和爽感来自旁人反应而非主角主动施展
3. 伏笔闭环：本阶段伏笔本阶段回收，全局伏笔最多延后1阶段
4. 正面配角：立场转变需铺垫，至少2次暗中维护
5. 反派智商：密谋私下进行，不当众自爆阴谋
6. 金手指不闲置：金手指提供的证据/信息必须在本阶段使用
7. 打脸闭环：所有核心反派必须有对应惩罚，不能溜走
8. 年代剧：禁止出现不符年代的物品/事件
9. 直播剧：弹幕分层，黑料符合大众认知
10. 玄学剧：算命必须有实锤，禁止封建迷信违禁内容
11. 规则怪谈：规则不矛盾，卡bug自洽
12. 所有类型：禁止违反公序良俗的内容
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
      reject(new Error(`请求超时（${timeoutMs / 1000}秒），请检查网络或稍后重试`));
    }, timeoutMs);

    fetch(url, { ...options, signal: controller.signal })
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(err => {
        clearTimeout(timer);
        if (err.name === 'AbortError') {
          reject(new Error(`请求超时（${timeoutMs / 1000}秒），请检查网络或稍后重试`));
        } else {
          reject(err);
        }
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
                ? `你是专业的短剧创作助手。输出JSON时必须用<json>和</json>标签包裹，标签外不允许有任何其他内容。JSON必须严格规范：双引号key、字符串内双引号转义、无trailing comma。`
                : `你是专业的短剧剧本编剧。你写的剧本必须是标准短剧格式（△动作描写+角色名：台词），绝对不能用【场景】【画面】【台词】分块格式。台词口语化短句，有人物个性。结尾在最刺激的瞬间△黑幕戛然而止。`
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 16000,
        }),
      }, 180000);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 401) throw new Error('⚠️ API_KEY 错误，请检查 Cloudflare 环境变量中的 OpenRouter 密钥');
        if (response.status === 404) throw new Error('⚠️ 模型未找到，请检查 MODEL_NAME');
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('retry-after') || '10', 10);
          console.warn(`触发限流（429），等待 ${retryAfter} 秒后重试...`);
          await delay(retryAfter * 1000);
          continue;
        }
        throw new Error(`API 请求失败 (${response.status}): ${JSON.stringify(errData)}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error('API 返回内容为空');

      if (needJson) {
        const jsonMatch = content.match(/<json>([\s\S]*?)<\/json>/i);
        if (!jsonMatch) {
          console.error('未找到<json>标签，原始返回：', content);
          throw new Error('模型未返回标签包裹的JSON内容');
        }
        let jsonStr = jsonMatch[1].trim()
          .replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
          .replace(/\n/g, ' ').replace(/\t/g, ' ').replace(/\r/g, '')
          .replace(/,\s*([\]}])/g, '$1');
        try {
          const parsed = JSON.parse(jsonStr);
          console.log('JSON解析成功');
          return parsed;
        } catch (e) {
          console.error('JSON解析失败，清洗后：', jsonStr);
          throw new Error('JSON格式错误');
        }
      }
      return content;
    } catch (error: any) {
      if (error.message?.includes('API_KEY') || error.message?.includes('模型未找到')) throw error;
      console.warn(`调用出错（第${attempt + 1}次）：${error.message}`);
      if (attempt === retries - 1) throw error;
      const isConnectionError = error.message?.includes('Failed to fetch') ||
        error.message?.includes('connection') ||
        error.message?.includes('network') ||
        error.message?.includes('超时');
      const baseMs = isConnectionError ? 8000 : 5000;
      const backoffMs = Math.min(baseMs * Math.pow(2.5, attempt), 120000);
      console.log(`等待 ${(backoffMs / 1000).toFixed(1)} 秒后重试...`);
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

  // ==================== 自检（精简版，聚焦关键项） ====================
  private async ruleCheck(
    content: string,
    checkType: 'skeleton' | 'outline' | 'script',
    episodeNum?: number,
    totalEpisodes?: number
  ): Promise<{ pass: boolean, error?: string }> {
    let checkPrompt = '';

    if (checkType === 'skeleton') {
      checkPrompt = `检查以下骨架，输出JSON{"pass":true/false,"error":"原因或无"}：
      1. 主角是否有碾压级底牌/优势？
      2. 金手指类型是否与核心爽梗匹配（隐性金手指配扮猪吃虎/天赋异禀，显性-隐忍配赘婿/战神/重生，显性-系统仅配直播/怪谈）？
      3. 金手指感知维度和透底形式是否一致（隐性→配角OS，显性-隐忍→回忆闪回，显性-系统→弹窗）？
      4. 显性-隐忍型是否有明确隐忍理由？隐性型是否标注了"不适用-天然信息差"？
      5. 需要知情配角的类型是否设定了知情配角？
      6. 终极钩子是否为明确的二元悬念？
      7. 主角是否有2-3个专属标志性动作/口头禅？
      8. 阶段爽梗是否有冲突升级梯度？
      内容：${content.slice(0, 6000)}`;
    } else if (checkType === 'outline') {
      checkPrompt = `检查以下大纲，输出JSON{"pass":true/false,"error":"原因或无"}：
      1. 每集结尾是否有钩子？
      2. 冲突是否有升级梯度？
      3. 第1集是否安排了按金手指类型对应的透底剧情？
      4. 正面配角是否有至少2次暗中维护主角？
      5. 转场期新矛盾是否有之前埋下的伏笔？
      内容：${content.slice(0, 6000)}`;
    } else if (checkType === 'script' && episodeNum !== undefined) {
      checkPrompt = `检查第${episodeNum}集脚本，输出JSON{"pass":true/false,"error":"原因或无"}：
      1. 格式是否为标准短剧格式（△动作+角色名：台词），不是【场景】【画面】分块式？
      2. 结尾是否在高潮处戛然而止（△黑幕）？
      3. 台词是否口语化短句有个性？
      4. 信息差是否通过行为/配角反应自然呈现？
      ${episodeNum === 1 ? `5. 开头是否直接进入画面无铺垫？
      6. 前30秒是否透底了主角底牌？
      7. 透底形式是否自然（非生硬系统弹窗，除非是直播/怪谈类）？` : ''}
      ${episodeNum <= 3 ? `8. 是否有旁观者反应烘托？` : ''}
      【⚠️】只检查第${episodeNum}集的内容，不属于本集的规则默认通过！
      内容：${content.slice(0, 6000)}`;
    } else {
      return { pass: true };
    }

    try {
      return await callLLM(checkPrompt, true, 1);
    } catch {
      console.warn('自检调用失败，默认放行');
      return { pass: true };
    }
  }

  // ==================== 第一阶段：分析小说骨架 ====================
  async analyzeNovel(novelContent: string): Promise<string> {
    const prompt = `
    ${GLOBAL_TOP_RULES}
    ${SHUANGDIAN_LIBRARY}
    ${GOLD_FINGER_FRAMEWORK}
    ${SUB_GENRE_RULES}

    【参考示例（仅学习逻辑结构和金手指匹配思路，绝对禁止照搬内容）】
    示例思路：修仙题材 → 核心爽梗"扮猪吃虎/天赋异禀" → 查匹配表 → 金手指类型"内生·天赋流"，感知维度"隐性（主角不自知）"，透底形式"知情配角OS"，配角需求"必须有知情师父" → 主角设定"练气99万层但以为自己是废柴" → 师父OS吐槽透底 → 天然信息差无需隐忍理由
    
    示例阶段规划逻辑参考：
    {
      "stage_num": 1,
      "stage_total_episodes": 12,
      "core_shuangdian": "扮猪吃虎+天赋异禀",
      "stage_hook": "以为自己是废柴的林凡下山后，能不能在金丹满地走的江湖里活下来？",
      "bind_global_hook": "对应全局'废柴闯天下'的第一个核心矛盾，爽点爆发后主角开始意识到自己可能不普通",
      "full_link_nodes": {
        "铺垫期": {
          "episode_range": "1-3集",
          "core_task": "建立反差：第1集用钓黑龙/烤黑龙的画面冲击开场，师父OS透底主角逆天修为（隐性金手指·知情配角OS透底），主角下山遇到女主，被卷入冲突，前3集主角全程憨批操作不知道自己多强"
        },
        "冲突升级期": {
          "episode_range": "4-7集",
          "core_task": "反派当主角是蝼蚁越来越嚣张，欺辱升级，主角无意中做了几件逆天的事但自己不知道（隐性金手指被动生效），旁观者开始怀疑主角来路"
        },
        "small_climax": {
          "episode_range": "第8集",
          "core_task": "反派要杀主角/女主，主角还在嬉皮笑脸不知道危险有多大"
        },
        "big_explosion": {
          "episode_range": "第9-10集",
          "core_task": "主角随手一招秒杀反派（自己还以为用了很大力），全场震惊，观众爽感拉满"
        },
        "transition_period": {
          "episode_range": "11-12集",
          "core_task": "消息传开引来更强势力的注意，新反派出场，引出下阶段矛盾"
        }
      }
    }
    
    【任务】
    基于输入的小说内容：
    1. 提炼核心卖点，确定核心爽梗类型
    2. 查金手指匹配表确定金手指的类型、感知维度、透底形式、配角需求
    3. 基于以上联合决策结果规划阶段剧情
    可自由魔改，爽感优先。

    【输出JSON结构】
    {
        "base_info": {
            "book_name": "书名，可魔改",
            "core_genre": "男频/女频",
            "sub_genre": "子流派标签，最多3个，用/分隔",
            "protagonist": "主角姓名+身份+核心性格+2-3个专属标志性动作/口头禅+隐藏底牌",
            "gold_finger": {
                "content": "金手指具体内容和能力（比如'练气99万层但自以为是废柴练气期'）",
                "type": "查表结果：内生·天赋流 / 重生·先知流 / 外挂·系统流 / 身份·实力流 / 身份·证据流 / 内生·气运流 等",
                "perception": "隐性 / 显性-隐忍 / 显性-系统 / 半显性",
                "reveal_method": "透底形式：知情配角OS / 回忆闪回 / 行为反差 / 系统弹窗 等",
                "reveal_scene": "第1集透底的具体场景描述（1-2句话，比如'师父看到主角把金仙境黑龙当黑鱼烤，OS吐槽修为'）",
                "supporting_character": "知情配角设定（如需要）：姓名+身份+与主角关系+透底时的表现方式。不需要则填'不适用'",
                "conceal_reason": "隐忍理由（仅显性-隐忍型填写）。隐性型/半显性型填'不适用-天然信息差'",
                "boundary": "使用边界：仅第1集前30秒出现1次透底，后续全程隐身不抢爽梗风头"
            },
            "final_boss": "终极BOSS姓名+身份+核心战力+和主角的核心仇恨",
            "final_goal": "主角终极目标"
        },
        "ultimate_hook": {
            "content": "全剧终极二元悬念，必须是明确的是非疑问句",
            "strengthen_nodes": ["每10集的强化内容"]
        },
        "stage_shuangdian_plan": [
            {
                "stage_num": 1,
                "stage_total_episodes": 12,
                "core_shuangdian": "从爽点库选1个核心，可搭配1-2个辅助",
                "stage_hook": "本阶段核心二元悬念",
                "bind_global_hook": "与全局钩子的关联+爽点爆发后对主线的推进",
                "full_link_nodes": {
                    "铺垫期": { "episode_range": "1-3集", "core_task": "具体任务，必须包含第1集按金手指类型对应的透底场景" },
                    "冲突升级期": { "episode_range": "4-7集", "core_task": "具体任务" },
                    "small_climax": { "episode_range": "第8集", "core_task": "具体任务" },
                    "big_explosion": { "episode_range": "第9-10集", "core_task": "具体任务" },
                    "transition_period": { "episode_range": "11-12集", "core_task": "具体任务，必须引出下阶段新矛盾" }
                },
                "forbidden_elements": ["禁入内容"],
                "gold_finger_boundary": "本阶段金手指使用边界"
            }
        ],
        "sub_genre_rules": "对应子流派规则"
    }
    
    【校验规则】
    1. 金手指类型必须与核心爽梗匹配（查匹配表），不匹配直接重写
    2. 金手指感知维度和透底形式必须一致，不一致直接重写
    3. 显性-隐忍型必须有隐忍理由，隐性型必须标注"不适用-天然信息差"
    4. 需要知情配角的类型必须设定知情配角
    5. 隐性金手指不可出现主角主动使用的设定
    6. 终极钩子必须是明确的二元悬念
    7. 主角必须有2-3个专属标志性动作/口头禅
    8. 阶段爽梗有冲突升级梯度
    9. 所有伏笔标注回收节点
    10. 正面配角有暗中维护情节，反派有明确动机
    11. 符合对应子流派规则
    
    【输入小说内容】：
    ${novelContent.slice(0, 10000)}
    `;

    let result = await callLLM(prompt, true);
    if (ENABLE_RULE_CHECK) {
      await delay(API_CALL_DELAY);
      const checkRes = await this.ruleCheck(JSON.stringify(result), 'skeleton');
      if (!checkRes.pass && checkRes.error) {
        console.warn('骨架校验失败，重试：', checkRes.error);
        await delay(API_CALL_DELAY);
        result = await callLLM(prompt + `\n\n之前不符合规则：${checkRes.error}，请修正后重新生成`, true);
      }
    }
    return this.formatAnalysisReport(result);
  }

  // ==================== 格式化分析报告 ====================
  private formatAnalysisReport(skeleton: any): string {
    const info = skeleton.base_info;
    const hook = skeleton.ultimate_hook;
    const gf = info.gold_finger;

    let report = `📖 书名：${info.book_name}\n`;
    report += `📂 流派：${info.core_genre} / ${info.sub_genre}\n`;
    report += `👤 主角：${info.protagonist}\n\n`;
    report += `🔧 金手指详情：\n`;
    report += `  内容：${gf.content}\n`;
    report += `  类型：${gf.type}\n`;
    report += `  感知维度：${gf.perception}\n`;
    report += `  透底形式：${gf.reveal_method}\n`;
    report += `  透底场景：${gf.reveal_scene}\n`;
    report += `  知情配角：${gf.supporting_character}\n`;
    report += `  隐忍理由：${gf.conceal_reason}\n`;
    report += `  使用边界：${gf.boundary}\n\n`;
    report += `👿 终极BOSS：${info.final_boss}\n`;
    report += `🎯 终极目标：${info.final_goal}\n\n`;
    report += `🪝 全剧终极钩子：${hook.content}\n`;
    report += `📍 钩子强化节点：${hook.strengthen_nodes.join('、')}\n\n`;
    report += `⚡ 阶段爽梗规划：\n`;

    skeleton.stage_shuangdian_plan.forEach((stage: any) => {
      report += `\n  📌 第${stage.stage_num}阶段（共${stage.stage_total_episodes}集）：${stage.core_shuangdian}\n`;
      report += `  🪝 阶段钩子：${stage.stage_hook}\n`;
      report += `  🔗 绑定全局主线：${stage.bind_global_hook}\n`;
      report += `  📅 链路节点：\n`;
      const nodes = stage.full_link_nodes;
      report += `    ① 铺垫期 ${nodes['铺垫期'].episode_range}：${nodes['铺垫期'].core_task}\n`;
      report += `    ② 冲突升级期 ${nodes['冲突升级期'].episode_range}：${nodes['冲突升级期'].core_task}\n`;
      report += `    ③ 小高潮 ${nodes.small_climax.episode_range}：${nodes.small_climax.core_task}\n`;
      report += `    ④ 大爽点 ${nodes.big_explosion.episode_range}：${nodes.big_explosion.core_task}\n`;
      report += `    ⑤ 转场期 ${nodes.transition_period.episode_range}：${nodes.transition_period.core_task}\n`;
      report += `  ⚠️ 禁入：${stage.forbidden_elements.join('、')}\n`;
      report += `  🔧 金手指边界：${stage.gold_finger_boundary}\n`;
    });

    report += `\n🎭 子流派规则：${skeleton.sub_genre_rules}\n`;
    report += `\n\n<!--SKELETON_JSON_START-->${JSON.stringify(skeleton)}<!--SKELETON_JSON_END-->`;
    return report;
  }

  // ==================== 提取骨架JSON ====================
  private extractSkeleton(analysisReport: string): any {
    const match = analysisReport.match(/<!--SKELETON_JSON_START-->(.+?)<!--SKELETON_JSON_END-->/);
    if (match) return JSON.parse(match[1]);
    throw new Error('无法提取骨架数据，请重新运行分析');
  }

  // ==================== 第二阶段：生成分集大纲 ====================
  async generateOutline(novelContent: string, analysisReport: string, targetStageNum: number = 1): Promise<string> {
    const skeleton = this.extractSkeleton(analysisReport);
    const targetStage = skeleton.stage_shuangdian_plan.find((s: any) => s.stage_num === targetStageNum);
    if (!targetStage) throw new Error(`未找到第${targetStageNum}阶段`);

    const gf = skeleton.base_info.gold_finger;

    const prompt = `
    ${GLOBAL_TOP_RULES}
    ${SHUANGDIAN_EXEC_RULES}
    ${ANTI_BUG_RULES}
    子流派规则：${skeleton.sub_genre_rules}
    
    【基础信息】
    全剧终极钩子：${skeleton.ultimate_hook.content}
    当前阶段：第${targetStageNum}阶段，共${targetStage.stage_total_episodes}集
    核心爽梗：${targetStage.core_shuangdian}
    阶段钩子：${targetStage.stage_hook}
    链路节点要求：${JSON.stringify(targetStage.full_link_nodes)}
    禁入元素：${targetStage.forbidden_elements.join('、')}
    主角人设：${skeleton.base_info.protagonist}
    
    【金手指信息（必须严格遵守）】
    金手指内容：${gf.content}
    类型：${gf.type}
    感知维度：${gf.perception}
    透底形式：${gf.reveal_method}
    第1集透底场景：${gf.reveal_scene}
    知情配角：${gf.supporting_character}
    隐忍理由：${gf.conceal_reason}
    使用边界：${gf.boundary}
    
    【任务】
    严格按链路节点要求生成对应集数的竖屏短剧大纲。
    所有剧情100%为核心爽梗服务，可自由魔改。
    第1集必须包含按金手指类型执行的透底场景。
    ${gf.perception === '隐性' ? '隐性金手指：主角全程不可主动使用金手指，爽感来自旁人反应和观众的信息差优越感' : ''}
    ${gf.perception === '显性-隐忍' ? '显性-隐忍金手指：主角知道底牌但隐忍不发，必须在每集安排仅观众可见的情绪微反应' : ''}
    ${gf.perception === '显性-系统' ? '显性-系统金手指：系统仅第1集出现1次，后续不弹窗不抢爽梗风头' : ''}

    【输出JSON】
    {
        "unit_base_info": {
            "unit_num": ${targetStageNum},
            "episode_range": "1-${targetStage.stage_total_episodes}集",
            "stage_goal": "${targetStage.bind_global_hook}",
            "stage_hook": "${targetStage.stage_hook}",
            "core_shuangdian": "${targetStage.core_shuangdian}",
            "core_villain": "本阶段核心反派设定（身份+势力+作恶动机+与主角的冲突点）",
            "bystanders": ["踩主角/捧反派的", "同情主角的", "看热闹的中立方"]
        },
        "episode_outlines": [
            {
                "episode_num": 1,
                "core_plot": "30字概括核心剧情，第1集必须包含金手指透底场景",
                "single_hook": "结尾钩子：在什么画面/台词处戛然而止",
                "node_belong": "铺垫期/冲突升级期/小高潮/大爽点/转场期",
                "foreshadow": "本集埋下的伏笔（无则填无）",
                "foreshadow_payoff": "伏笔回收集数（无则填无）"
            }
        ]
    }
    
    【校验规则】
    1. 集数严格对应链路节点
    2. 三层钩子：终极钩子每10集强化1次、阶段钩子、每集结尾钩子
    3. 核心爽梗占比100%，无无关支线
    4. 冲突有升级梯度
    5. 第1集有金手指对应的透底场景
    6. 正面配角至少2次暗中维护
    7. 转场期新矛盾有前面埋下的伏笔支撑
    8. 所有伏笔标注回收集数
    `;

    let outlineData = await callLLM(prompt, true);
    if (ENABLE_RULE_CHECK) {
      await delay(API_CALL_DELAY);
      const checkRes = await this.ruleCheck(JSON.stringify(outlineData), 'outline');
      if (!checkRes.pass && checkRes.error) {
        console.warn('大纲校验失败，重试：', checkRes.error);
        await delay(API_CALL_DELAY);
        outlineData = await callLLM(prompt + `\n\n之前不符合规则：${checkRes.error}，请修正后重新生成`, true);
      }
    }
    let text = this.formatOutline(outlineData);
    text += `\n\n<!--OUTLINE_JSON_START-->${JSON.stringify({ outline: outlineData, skeleton, targetStage })}<!--OUTLINE_JSON_END-->`;
    return text;
  }

  // ==================== 格式化大纲 ====================
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
      text += `  节点：${ep.node_belong}\n`;
      if (ep.foreshadow && ep.foreshadow !== '无') {
        text += `  伏笔：${ep.foreshadow} → 回收于第${ep.foreshadow_payoff}集\n`;
      }
      text += `\n`;
    });
    return text;
  }

  // ==================== 第三阶段：生成脚本（核心改造） ====================
  async generateScripts(
    outlineText: string,
    phase: number,
    novelContent: string,
    formattingRef?: string,
    onProgress?: (current: number, total: number, status: string) => void
  ): Promise<string> {
    const match = outlineText.match(/<!--OUTLINE_JSON_START-->(.+?)<!--OUTLINE_JSON_END-->/);
    if (!match) throw new Error('无法从大纲中提取数据，请重新生成大纲');

    const { outline, skeleton, targetStage } = JSON.parse(match[1]);
    const coreShuangdian = outline.unit_base_info.core_shuangdian;
    const shuangdianType = matchShuangdianType(coreShuangdian);
    const gf = skeleton.base_info.gold_finger;

    const allScripts: string[] = [];
    const totalEpisodes = outline.episode_outlines.length;

    for (let i = 0; i < totalEpisodes; i++) {
      const episode = outline.episode_outlines[i];
      if (onProgress) onProgress(i + 1, totalEpisodes, `正在生成第 ${episode.episode_num} 集脚本...`);
      if (i > 0) {
        console.log(`等待 ${API_CALL_DELAY / 1000} 秒后生成第 ${episode.episode_num} 集...`);
        await delay(API_CALL_DELAY);
      }

      // 根据金手指感知维度生成不同的执行指令
      let goldFingerDirective = '';
      if (episode.episode_num === 1) {
        if (gf.perception === '隐性') {
          goldFingerDirective = `
          【第1集金手指执行指令·隐性型】
          透底场景：${gf.reveal_scene}
          执行方式：通过知情配角（${gf.supporting_character}）的OS/吐槽/震惊反应给观众透底
          主角状态：完全不知道自己的底牌，言行举止100%是"不自知"的状态
          禁止：主角不可有任何暗示自己知道底牌的表现；不可出现系统弹窗；不可用旁白直接告诉观众`;
        } else if (gf.perception === '显性-隐忍') {
          goldFingerDirective = `
          【第1集金手指执行指令·显性-隐忍型】
          隐忍理由：${gf.conceal_reason}
          执行方式：通过主角碎片化回忆/闪回向观众透底底牌和隐忍理由
          主角状态：知道自己的底牌但刻意隐忍，面对刺激时有仅观众可见的情绪微反应（微动作，不被其他角色察觉）
          微反应要求：必须符合主角专属人设动作，禁止通用模板（如"右眼微眯"）
          禁止：不可出现系统弹窗；回忆/闪回不超过3秒`;
        } else if (gf.perception === '显性-系统') {
          goldFingerDirective = `
          【第1集金手指执行指令·显性-系统型】
          执行方式：系统弹窗/面板出现1次，给观众和主角同时透底关键信息
          限制：仅此1次，第2集开始系统全程隐身不出现
          禁止：弹窗内容不可过长，1-2句话点到为止`;
        } else if (gf.perception === '半显性') {
          goldFingerDirective = `
          【第1集金手指执行指令·半显性型】
          执行方式：主角展示能力时，通过旁人的超预期反应让观众意识到主角比自己以为的更强
          主角状态：知道自己有某种能力，但严重低估了自身实力
          禁止：不可出现系统弹窗`;
        }
      } else {
        // 非第1集
        if (gf.perception === '隐性') {
          goldFingerDirective = `【金手指规则·隐性型】本集禁止任何金手指透底/系统弹窗。主角全程不知道自己的底牌，所有言行必须是"不自知"状态。爽感来自主角无意间做了逆天的事但自己浑然不觉，旁人震惊。`;
        } else if (gf.perception === '显性-隐忍') {
          goldFingerDirective = `【金手指规则·显性-隐忍型】本集禁止金手指再次透底。主角隐忍不发，面对刺激时可有仅观众可见的微小情绪反应。`;
        } else if (gf.perception === '显性-系统') {
          goldFingerDirective = `【金手指规则·显性-系统型】本集禁止系统弹窗/面板出现，系统全程隐身。`;
        } else {
          goldFingerDirective = `【金手指规则】本集禁止金手指再次透底。`;
        }
      }

      const prompt = `
      【⚠️ 最高优先级·格式规则·违反直接重写】
      你必须输出标准竖屏短剧剧本格式。参考范本：
      
      ${SCRIPT_FORMAT_EXAMPLE}

      【绝对禁止的格式】
      ❌ 禁止 ### 第X集 这种markdown标题
      ❌ 禁止 【场景】：xxx 【画面】：xxx 【台词】：xxx 分块结构
      ❌ 禁止 【字幕/系统提示】【内心OS】 自创标签
      ❌ 禁止结尾写"下集预告"或解释性文字
      
      【必须使用的格式】
      ✅ 场景头：序号、日/夜、内/外、出场人物
      ✅ 动作：△开头，一句一镜头
      ✅ 台词：角色名：台词 / 角色名（情绪）：台词
      ✅ OS：角色名（情绪）OS：内容
      ✅ 字幕：行内（字幕：XXX）
      ✅ 结尾：△黑幕。
      
      ${goldFingerDirective}
      
      【创作信息】
      全剧终极钩子：${skeleton.ultimate_hook.content}
      核心爽点：${coreShuangdian}（${shuangdianType}）
      主角人设：${skeleton.base_info.protagonist}
      金手指：${gf.content}（${gf.perception}）
      子流派规则：${skeleton.sub_genre_rules}
      旁观者设定：${outline.unit_base_info.bystanders.join(' / ')}
      ${formattingRef ? '\n【额外排版参考（优先级低于上面的范本）】\n' + formattingRef.slice(0, 2000) : ''}
      
      【核心创作要求】
      1. 500-700字，节奏快、冲突强、爽感足
      2. 台词口语化短句，有人物个性和专属口头禅
      3. 信息差通过行为+配角反应自然呈现
      4. 结尾在最刺激的瞬间△黑幕戛然而止
      5. 冲突场景写出2-3类旁观者的具体反应
      6. 动作描写一句一镜头，只写能拍出来的画面
      
      ${episode.episode_num <= 3 ? `
      【前三集专项要求·第${episode.episode_num}集】
      ${episode.episode_num === 1 ? `- 开头直接进入视觉冲击画面，不铺垫不解释
- 前30秒按上面的金手指执行指令完成透底
- 建立信息差：观众知道主角底牌，剧内角色不知道` : ''}
      ${episode.episode_num === 2 ? `- 全集叠压迫感，反派升级欺辱
- 不释放爽点，拉满期待感
- 信息差持续强化` : ''}
      ${episode.episode_num === 3 ? `- 压迫感拉到顶峰，所有人等着看主角笑话
- 结尾停在主角即将第一次出手/亮底牌的临界点，戛然而止` : ''}
      ` : ''}
      
      【本集大纲】
      ${JSON.stringify(episode)}
      
      ${ANTI_BUG_RULES}
      `;

      let script = await callLLM(prompt, false);

      // 仅对关键集自检：前3集+爽点爆发集
      const isCriticalEpisode = episode.episode_num <= 3 || (episode.episode_num >= 8 && episode.episode_num <= 10);
      if (ENABLE_RULE_CHECK && isCriticalEpisode) {
        console.log(`校验第${episode.episode_num}集（关键集）...`);
        if (onProgress) onProgress(i + 1, totalEpisodes, `正在校验第 ${episode.episode_num} 集...`);
        await delay(API_CALL_DELAY);
        const checkRes = await this.ruleCheck(script, 'script', episode.episode_num, targetStage.stage_total_episodes);
        if (!checkRes.pass && checkRes.error) {
          console.warn(`第${episode.episode_num}集校验失败，重试：`, checkRes.error);
          if (onProgress) onProgress(i + 1, totalEpisodes, `第 ${episode.episode_num} 集重新生成中...`);
          await delay(API_CALL_DELAY);
          script = await callLLM(prompt + `\n\n之前不符合规则：${checkRes.error}，请修正后重新生成`, false);
        }
      } else if (ENABLE_RULE_CHECK) {
        console.log(`第${episode.episode_num}集为非关键集，跳过自检`);
      }

      allScripts.push(script);
    }

    return allScripts.join('\n\n---\n\n');
  }
}
