// ====================== 【配置区】======================
// API Key 从 Cloudflare 环境变量注入（在 vite.config.ts 中配置）
const API_KEY: string = (import.meta as any).env?.VITE_OPENAI_API_KEY || '';
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const MODEL_NAME = "anthropic/claude-sonnet-4.6"; // 可自行替换为2026年最新模型
const MAX_RETRY = 3;
// ======================================================================

// ---------------------- 全局规则常量 ----------------------
const GLOBAL_TOP_RULES = `
## 🔝 全局最高优先级规则（所有流程必须严格遵守，优先级高于其他所有规则）
### 🎯 强制新增规则（必须100%执行，2026年短剧标准）
1. 【强制金手指规则】
   无论原著是否有金手指/穿越设定，必须给主角二选一强加金手指：
   - 选项1：穿越/重生身份（自带信息差/先知优势，比如重生2008年知道房价走势、穿进规则怪谈知道副本答案）
   - 选项2：系统金手指（适配核心爽点类型，比如爽点是直播就加人气系统，爽点是玄学就加功德系统）
   ✅ 金手指定位：仅作为给观众透底的铺垫工具，严格遵守各爽点的金手指使用边界，仅可在第1集前30秒出现1次，绝对不抢核心爽梗的风头，禁止中途乱跳出来刷存在感
2. 【爽感优先魔改规则】
   无需贴合原著剧情，可自由魔改、加冲突、加反派、加爽点，只要保留主角核心人设（比如废柴/赘婿/重生者）和核心钩子即可，所有改编以「爽」为第一标准，不需要遵守原著剧情走向，禁用2020年之前的过时老梗（比如纯上门龙婿、无脑神医）
3. 【信息差强制规则】
   所有爽点必须营造「反派在明、主角在暗」的认知差：剧内所有角色（除主角外）完全不知道主角的底牌，只有观众全知主角的碾压级优势，全程保持「所有人都看不起主角，只有观众知道主角能秒了反派」的氛围感
4. 【旁观者烘托规则】
   所有冲突场景必须至少出现3类旁观者：① 踩主角/捧反派的阵营 ② 同情主角的弱势阵营 ③ 看热闹的中立阵营，用不同立场的反应放大冲突拉扯感，戳观众代入情绪
5. 【阶段爽梗闭环强制规则】
   全剧拆分为N个连续的爽梗阶段，每个阶段严格遵守以下要求：
   - 单阶段仅绑定1个唯一核心爽梗（从爽点库选，禁止多爽梗并行），所有剧情100%为这个爽梗服务，禁止插入无关支线
   - 单阶段总集数固定为10-15集（适配2026年短剧追更节奏，刚好是用户3-5天能追完的小周期），必须包含完整的5个链路节点：铺垫期→冲突升级期→小高潮→大爽点爆发→转场期
   - 每个节点对应明确的集数范围、核心任务、爽感层级，爽点大爆发固定在阶段第8-10集，爆发后2集内完成转场，引出下一个阶段的新爽梗
   - 每个阶段的爽梗必须和全局终极钩子强绑定，爽梗爆发后必须推进全局主线进度（比如重生创业线里，赚得第一桶金→引出极品亲戚抢钱的下阶段矛盾）
---
### 前三集强制规则（不可修改，适配1-2分钟/集竖屏短剧，精确到秒级节点，2026年短剧黄金节奏）
#### 第1集强制要求（标准时长1.5分钟）：
1. 0-3秒：无铺垫直接扔强冲突画面（比如主角被踹倒在地、合同甩脸、直播间被黑粉冲烂），直接戳2026年大众痛点（比如职场PUA、极品亲戚、直播网暴、996加班）
2. 4-30秒：完成2个核心动作，缺一不可：
   ① 借反派/旁白带出当前阶段的核心爽梗矛盾（比如「公婆要求房本只写儿子名？」「黑粉说主播卖的是假货？」）
   ② 【强制底牌透底】仅给观众露1次主角的碾压级筹码/金手指（比如战神身份、千亿存款、提前录了公婆抢房的录音、重生知道彩票号码），立刻给足观众安全感，明确「主角稳赢」的预期
3. 31-80秒：阶段爽梗初始铺垫：反派当众装逼欺辱主角→主角刻意装弱（比如低头沉默、假装顺从、假装不懂）→插入3类旁观者反应，拉满信息差氛围感
4. 最后10秒：留单集钩子，停在反派放最狠的话的瞬间（比如「明天你要是不滚，我就断你家所有生路」）
#### 第2集强制要求（标准时长1.5分钟）：
1. 全程叠压迫感：反派升级欺辱行为（比如让主角擦鞋、当众骂女主瞎了眼找这种废物、黑粉造黄谣网暴主播）
2. 持续放大信息差：主角继续装弱，旁观者的嘲讽/同情升级，反复强化「所有人都觉得主角死定了」的共识
3. 不得释放任何爽点，全程拉期待感，最后10秒留钩子（比如反派拿出债务文件，要求24小时内把主角赶出去）
#### 第3集强制要求（标准时长1.5分钟，必须有小高潮）：
1. 前80秒：把压迫感拉到顶峰：反派即将实施致命打击（比如马上要掐断公司融资、马上要把女方名字从购房合同里划掉、马上要封主播的直播间），女主/主角的亲友已经绝望，旁观者都等着看主角笑话
2. 最后10秒：停在「主角即将第一次出手/亮小底牌」的临界点（比如主角抬眼冷笑，掏出手机拨出一个电话；主角拿出 hidden 的出资记录），戛然而止，留爆炸级单集钩子，直接关联本阶段爽梗核心矛盾，不释放完整大爽点，吊足观众追更欲
### 二、爽梗唯一原则
- 单阶段/单集仅允许1个S级核心爽梗，其余所有元素（金手指、支线、配角）仅可作为铺垫工具，核心爽梗占比≥80%，辅助元素占比≤20%，绝对不能喧宾夺主
- 辅助元素（比如金手指）仅可在第1集前30秒出现，不能抢核心爽梗的风头
### 三、钩子优先级原则
- 全剧终极钩子 > 阶段爽梗钩子 > 单集钩子，全剧终极钩子每10集至少强化1次，每个阶段有专属阶段钩子，每集结尾必须留单集钩子，绝不允许断钩
- 所有钩子必须绑定2026年大众普遍痛点（比如失业裁员、彩礼矛盾、直播网暴、极品亲戚、房贷压力），禁止虚设脱离观众认知的悬念
`;

// ---------------------- 2026年最新S级核心爽点库 ----------------------
const SHUANGDIAN_LIBRARY = `
## 📚 2026年最新可选S级核心爽点库（必须从以下分类中选择，禁止自定义）
1. 装逼打脸类：扮猪吃虎 / 实力碾压 / 解决难题 / 上帝视角 / 万千宠爱 / 一呼百应 / 幕后大佬 / 挥金如土 / 天赋异禀 / 不按常理
2. 荣获至宝类：夺宝奇兵 / 慧眼识珠 / 神器认主 / 收服帮派
3. 意外之喜类：无心插柳 / 一夜暴富 / 偷听秘闻 / 因祸得福
4. 惩戒恶人类：大仇得报 / 诛杀坏人 / 劫富济贫 / 反向PUA
5. 人格魅力类：持之以恒 / 认祖归宗 / 重情重义 / 知恩图报
6. 拯救危难类：力挽狂澜 / 英雄救美 / 拯救公司 / 解救家人
7. 智商碾压类：预判对手 / 渔翁得利 / 职场宫斗 / 规则破解
8. 绝地反杀类：绝境逃脱 / 极限反杀 / 逆风翻盘 / 反杀小人
9. 【2026新增】直播爽感类：直播打脸 / 弹幕封神 / 反向带货 / 花式怼粉 / 黑料澄清
10. 【2026新增】玄学爽感类：开卦算命 / 风水改运 / 驱邪破煞 / 功德加身 / 预知吉凶
11. 【2026新增】年代逆袭类：信息差赚钱 / 薅集体羊毛 / 打脸极品亲戚 / 返城创业 / 囤货致富
12. 【2026新增】规则怪谈类：破解规则 / 戏耍NPC / 极限逃生 / 副本通关 / 卡bug刷分
`;

// ---------------------- 2026年最新子流派专属规则 ----------------------
const SUB_GENRE_RULES = `
## 🎭 2026年最新子流派专属规则（对应流派必须严格遵守）
| 子流派 | 专属钩子规则 | 专属爽梗规则 |
|--------|--------------|--------------|
| 玄幻修仙 | 全剧终极钩子必须绑定「生死危机/终极复仇」，比如「被挖灵根的废柴，能不能在仙门大会上反杀仇人飞升？」；每10集阶段钩子绑定「越阶挑战/秘境夺宝」 | 核心爽梗金手指（混沌体/老爷爷/系统）仅可提前给观众透底1次，打脸必须主角自己出手，禁止代打 |
| 都市赘婿 | 全剧终极钩子必须绑定「身份揭晓/复仇」，比如「隐藏3年的首富继承人，能不能在妻子被赶出家门时反杀所有看不起他的人？」；每10集阶段钩子绑定「妻女受辱→反杀」 | 身份底牌仅可在打脸最高潮揭晓，之前必须把嘲讽拉满 |
| 战神归来 | 全剧终极钩子必须绑定「护妻护女/复仇」，比如「消失5年的战神，能不能在女儿被拐卖前反杀所有仇家？」；每10集阶段钩子绑定「家人受辱→反杀」 | 战力/身份仅可提前给观众透底1次，禁止直接喊手下上场，必须先装弱再打脸 |
| 都市异能 | 全剧终极钩子必须绑定「异能暴露/拯救危机」，比如「有读心术的职员，能不能在公司破产前揪出内奸？」；每10集阶段钩子绑定「异能隐藏→解决危机」 | 异能仅可提前给观众透底1次，爽点突出信息差反差 |
| 穿越历史 | 全剧终极钩子必须绑定「改变命运/夺嫡/救国」，比如「穿越成废太子的现代人，能不能在3个月后的废储大典上保住皇位？」；每10集阶段钩子绑定「朝堂危机→打脸政敌」 | 现代知识/历史记忆仅可提前给观众透底1次，爽点突出知识差 |
| 校园爽文 | 全剧终极钩子必须绑定「逆袭考学/打脸校霸」，比如「常年倒数的学渣，能不能在高考时考上清北反杀所有人？」；每10集阶段钩子绑定「考试/比赛→打脸」 | 金手指（过目不忘/系统）仅可提前给观众透底1次，爽点突出学渣→学霸的反差 |
| 【2026新增】年代创业 | 全剧终极钩子必须绑定「发家致富/弥补遗憾」，比如「重生回1998年的穷小子，能不能在千禧年之前赚够100万弥补前世妻女惨死的遗憾？」；每10集阶段钩子绑定「极品亲戚闹事/创业危机→反杀」 | 时代信息差仅可提前给观众透底1次，爽点突出「别人嫌赔本的生意主角赚翻」的反差 |
| 【2026新增】玄学爽文 | 全剧终极钩子必须绑定「化解劫数/积累功德」，比如「天生阴阳眼的小道士，能不能在18岁天劫之前攒够1000功德活下来？」；每10集阶段钩子绑定「事主不信→打脸改运」 | 玄学金手指仅可提前给观众透底1次，爽点突出「事主之前嚣张之后跪地拜谢」的反差 |
| 【2026新增】直播爽文 | 全剧终极钩子必须绑定「成为顶流/打脸黑料」，比如「被网暴退圈的明星，能不能靠直播算命半年内成为全网顶流反杀黑粉？」；每10集阶段钩子绑定「直播间被冲→打脸封神」 | 金手指仅可提前给观众透底1次，每集必须出现弹幕反应烘托爽感 |
| 【2026新增】规则怪谈 | 全剧终极钩子必须绑定「活过所有副本/破解规则真相」，比如「被拉进规则怪谈世界的打工人，能不能通关所有副本回到现实？」；每10集阶段钩子绑定「触发死亡规则→极限破解」 | 规则漏洞仅可提前给观众透底1次，爽点突出「只有观众知道主角卡了bug」的信息差 |
`;

// ---------------------- 2026年最新爽点专属执行规则 ----------------------
const SHUANGDIAN_EXEC_RULES = `
## ⚙️ 2026年最新爽点专属执行规则（对应爽点类型必须严格遵守）
### 1. 装逼打脸类（核心：反差感）
- 核心要求：所有内容围绕「别人看不起主角→主角用实力/身份打脸」走，爽感100%集中在主角反差高光
- 金手指边界：仅在第1集前30秒向观众透底1次（比如系统提示【宿主是当朝太傅，在场官员品级都比你低】/ 穿越者提示【你知道这个反派下个月就要倒台】），仅此1次，后续全程隐身；禁止打脸过程中弹提示、给buff、替主角打脸
- 铺垫要求：先铺垫他人的轻视/嘲讽→主角可故意示弱放大反差→打脸瞬间干脆利落，跟上全场震惊反应
- 禁入内容：禁止中途插入得宝、升级、无关支线
### 2. 荣获至宝类（核心：价值感）
- 核心要求：所有内容围绕「宝物有多稀有→主角得到它的爽感」走，爽感100%集中在得宝本身
- 金手指边界：仅在第1集宝物出现时向观众透底1次价值（比如系统提示【这是上古混沌钟，可秒杀金丹】/ 穿越者提示【你知道这块石头里有千年暖玉】），仅此1次；禁止得宝过程中弹其他奖励、直接把宝物塞给主角
- 铺垫要求：先铺垫宝物的稀缺性（所有人抢破头/不识货）→得宝瞬间给特写→跟上旁人嫉妒/震惊反应
- 禁入内容：禁止中途插入反派挑衅、打脸、无关支线
### 3. 意外之喜类（核心：惊喜感）
- 核心要求：所有内容围绕「主角没抱希望→突然得到远超预期的收获」走，爽感100%集中在意外收获瞬间
- 金手指边界：仅在收获揭晓时出现1次明确价值，仅此1次；禁止提前剧透收获，破坏意外感
- 铺垫要求：先铺垫「这件事没好处/倒霉」→揭晓收获时先给旁人震惊反应，再亮价值
- 禁入内容：禁止提前透底、插入其他爽点
### 4. 惩戒恶人类（核心：宣泄感）
- 核心要求：所有内容围绕「恶人有多坏→得到应有的惩罚」走，爽感100%集中在恶人受罚瞬间
- 金手指边界：仅在铺垫阶段向观众透底1次主角有惩罚恶人的能力，仅此1次；禁止金手指直接替主角惩罚
- 铺垫要求：先铺垫恶人的恶行（欺负弱小/有前科/PUA员工）→惩罚够解气（比如让恶人丢工作/赔巨款/当众社死）→跟上受害者拍手称快反应
- 禁入内容：禁止中途插入得宝、升级、洗白恶人
### 5. 人格魅力类（核心：认同感）
- 核心要求：所有内容围绕「主角坚持品格→最终得到认可/回报」走，爽感100%集中在主角品格高光
- 金手指边界：仅可在最终认可时出现1次明确回报价值，仅此1次；禁止金手指引导主角做选择
- 铺垫要求：先铺垫主角的困境（所有人劝他放弃/走捷径）→最终得到认可时跟上质疑者的愧疚/敬佩反应
- 禁入内容：禁止中途插入打脸、得宝等爽点
### 6. 拯救危难类（核心：成就感）
- 核心要求：所有内容围绕「危难有多严重→主角出手拯救」走，爽感100%集中在拯救高光瞬间
- 金手指边界：仅可在铺垫阶段向观众透底1次主角有能力解决危难，仅此1次；禁止金手指直接解决危难
- 铺垫要求：先铺垫危难的严重性（所有人束手无策/公司要破产/家人要出事）→主角出手干脆利落→跟上所有人感激/崇拜反应
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
### 9. 【2026新增】直播爽感类（核心：弹幕认同感）
- 核心要求：所有内容围绕「直播间黑粉骂主角→主角打脸→弹幕集体反转」走，爽感100%集中在弹幕封神瞬间
- 金手指边界：仅在第1集前30秒向观众透底1次（比如系统提示【宿主能看到所有黑粉的黑历史】/ 重生提示【你知道这个爆料是假的】），仅此1次，后续全程隐身
- 铺垫要求：先铺垫黑粉的嚣张/网暴的严重性→主角刻意装怂引黑粉放大招→打脸瞬间同步放弹幕反转反应（比如「我靠主播是对的」「之前骂的道歉」）
- 禁入内容：禁止中途插入无关线下剧情，每集至少出现3次弹幕画面
### 10. 【2026新增】玄学爽感类（核心：认知反差感）
- 核心要求：所有内容围绕「事主不信主角→主角算准所有事→事主跪地拜谢」走，爽感100%集中在事主反转瞬间
- 金手指边界：仅在第1集前30秒向观众透底1次（比如系统提示【宿主能看到事主的生死劫】/ 阴阳眼提示【事主身上有女鬼】），仅此1次，后续全程隐身
- 铺垫要求：先铺垫事主的嚣张（比如「我才不信封建迷信」「你要是算准我给你100万」）→主角点出只有事主自己知道的私密事→事主当场吓尿跪地求帮忙
- 禁入内容：禁止中途插入无关剧情，必须突出事主前后态度的巨大反差
### 11. 【2026新增】年代逆袭类（核心：时代信息差）
- 核心要求：所有内容围绕「所有人觉得主角的生意要赔本→主角靠信息差赚翻→旁人傻眼」走，爽感100%集中在赚钱瞬间
- 金手指边界：仅在第1集前30秒向观众透底1次（比如重生提示【你知道1998年邮票半年涨10倍】/ 系统提示【下个月粮食要涨价】），仅此1次，后续全程隐身
- 铺垫要求：先铺垫所有人的不看好（比如父母骂他不务正业、亲戚笑他败家）→主角偷偷囤货/做生意→公布收入时所有人震惊
- 禁入内容：禁止提前暴露主角的信息差给剧内角色，必须突出时代背景的真实感
### 12. 【2026新增】规则怪谈类（核心：极限刺激感）
- 核心要求：所有内容围绕「所有人都违反规则要死→主角偷偷卡bug活下来→NPC傻眼」走，爽感100%集中在破解规则瞬间
- 金手指边界：仅在第1集前30秒向观众透底1次（比如穿越提示【你知道这个副本的规则漏洞】/ 系统提示【规则第3条是错的】），仅此1次，后续全程隐身
- 铺垫要求：先铺垫规则的恐怖（比如违反规则就会被NPC杀死、其他玩家接连死亡）→主角假装遵守规则偷偷卡bug→通关时其他玩家/NPC震惊
- 禁入内容：禁止提前暴露规则漏洞给剧内角色，全程保持紧张感
`;

// ---------------------- 通用 LLM 调用函数（原逻辑完全保留） ----------------------
async function callLLM(prompt: string, outputJson: boolean = true, retries: number = MAX_RETRY): Promise<any> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Novel-to-Script-Generator-2026',
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
      await new Promise(resolve => setTimeout(resolve, Math.min(2000 * Math.pow(2, attempt), 30000)));
    }
  }
}

// ---------------------- 爽点类型匹配工具（已更新2026年最新爽点映射） ----------------------
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
    if (keywords.some(kw => coreShuangdian.includes(kw))) {
      return type;
    }
  }
  return '';
}

// ---------------------- GeminiService 类（已整合所有修改，兼容原有调用逻辑） ----------------------
export class GeminiService {

  // 第一阶段：分析小说骨架（已更新为2026年阶段爽梗全链路规划）
  async analyzeNovel(novelContent: string): Promise<string> {
    const prompt = `
    ${GLOBAL_TOP_RULES}
    ${SHUANGDIAN_LIBRARY}
    ${SUB_GENRE_RULES}
    
    【参考示例（仅学习逻辑，禁止照搬内容）】
    示例：家庭类短剧，全局终极钩子：「白手起家的小夫妻，能不能在一地鸡毛的家庭矛盾里守住自己的小日子？」
    阶段爽梗规划示例：
    [
      {
        "stage_num": 1,
        "stage_total_episodes": 12,
        "core_shuangdian": "惩戒恶人+智商碾压",
        "stage_hook": "被公婆抢房的女方，能不能顺利在房本上加上自己的名字？",
        "bind_global_hook": "对应全局主线「守住小家庭」的第一个核心矛盾，爽点爆发后女方家庭地位提升，为后续婆媳矛盾铺垫",
        "full_link_nodes": {
          "铺垫期": {
            "episode_range": "1-3集",
            "core_task": "叠压迫→公婆提出房本只写儿子名、逼女方签放弃协议、男方妈宝和稀泥、3类旁观者反应拉满，第1集前30秒给观众透底「女方提前录了所有聊天记录+保留了全部出资流水」的底牌"
          },
          "冲突升级期": {
            "episode_range": "4-8集",
            "core_task": "拉拉扯→女方偷偷收集证据、公婆找关系改购房合同、女方父母上门对峙、男方终于醒悟站女方，每集结尾留钩子强化冲突"
          },
          "small_climax": {
            "episode_range": "第9集",
            "core_task": "放钩子→房本办理现场，公婆拿着提前准备的假资料要签字，所有人都以为女方要输，停在即将签字的临界点"
          },
          "big_explosion": {
            "episode_range": "第10集",
            "core_task": "爽点释放→女方拿出全套出资证据+录音，直接把公婆的假资料拍在窗口，房本顺利写双方名字，全程跟上亲戚/工作人员的震惊反应，爽感拉满"
          },
          "transition_period": {
            "episode_range": "11-12集",
            "core_task": "转场→公婆灰溜溜走、小夫妻感情升温，新矛盾出现（公婆要搬过来同住），引出第2阶段「婆媳同住智斗恶婆婆」的核心爽梗"
          }
        },
        "forbidden_elements": ["男主升职、小三插足等无关支线", "提前暴露女方底牌", "金手指中途跳出来"],
        "gold_finger_boundary": "仅在第1集前30秒给观众透底「女方保留了全部出资证据」，后续全程隐身"
      }
    ]
    
    【任务】
    基于输入的小说内容提炼核心卖点，可自由魔改，爽感优先，必须给主角强加穿越/系统金手指二选一，输出标准化的小说核心骨架，阶段爽梗规划必须严格参考上面的示例逻辑，禁止照搬示例内容。
    【输出要求（必须严格按照JSON格式输出，不要有多余内容）】
    {
        "base_info": {
            "book_name": "书名，可魔改得更有爽感，符合2026年短剧命名风格",
            "core_genre": "男频/女频",
            "sub_genre": "从2026年最新子流派规则表中选对应标签，最多3个",
            "protagonist": "主角姓名+身份+核心性格+隐藏底牌，必须包含强制加的穿越/系统金手指",
            "gold_finger": "强制加的金手指类型+能力+触发条件，明确使用边界（仅第1集前30秒出现1次）",
            "final_boss": "最终BOSS姓名+身份+核心战力+和主角的核心仇恨，可魔改得更嚣张更坏，符合2026年大众厌恶点",
            "final_goal": "主角最终要完成的终极目标，可魔改得更有爽感"
        },
        "ultimate_hook": {
            "content": "全剧终极二元悬念，必须是明确的是非疑问，比如「被打入斩仙台的废仙，能不能在3日问斩前反杀所有众神？」，禁止模糊表述",
            "strengthen_nodes": ["第10集强化内容", "第20集强化内容", "...每10集1个"]
        },
        "stage_shuangdian_plan": [
            {
                "stage_num": 1,
                "stage_total_episodes": "10-15之间的整数",
                "core_shuangdian": "从2026年最新爽点库中选1-2个匹配的S级核心爽点，单阶段仅1个核心主题",
                "stage_hook": "本阶段的核心二元悬念，比如「被上门反派逼到绝路的赘婿，能不能保住妻子的公司？」",
                "bind_global_hook": "说明本阶段爽梗和全局终极钩子的关联，以及爽点爆发后对全局主线的推进作用",
                "full_link_nodes": {
                    "铺垫期": {
                        "episode_range": "1-3集",
                        "core_task": "具体的铺垫任务，必须包含前三集的强冲突、底牌透底、信息差营造"
                    },
                    "冲突升级期": {
                        "episode_range": "4-8集",
                        "core_task": "具体的冲突升级任务，必须包含每集的拉扯点、反派升级欺辱的行为"
                    },
                    "small_climax": {
                        "episode_range": "第9集",
                        "core_task": "小高潮的具体内容，必须停在爽点即将爆发的临界点"
                    },
                    "big_explosion": {
                        "episode_range": "第10集",
                        "core_task": "大爽点爆发的具体内容，必须包含打脸过程、旁观者反应"
                    },
                    "transition_period": {
                        "episode_range": "11-XX集（对应阶段总集数）",
                        "core_task": "转场的具体内容，必须引出下一个阶段的新爽梗"
                    }
                },
                "forbidden_elements": ["本阶段禁止出现的无关内容，比如支线、多余爽点、过时老梗"],
                "gold_finger_boundary": "本阶段金手指的使用边界，严格遵守仅第1集前30秒出现1次的要求"
            }
        ],
        "sub_genre_rules": "对应子流派的专属钩子+爽梗规则，从2026年最新子流派规则表中提取"
    }
    
    【校验规则】
    1. 必须给主角强加穿越/系统金手指二选一，没有则直接重写
    2. 终极钩子必须符合要求，不能模糊，必须绑定大众痛点
    3. 阶段爽梗规划必须符合示例的5节点结构，每个阶段仅1个核心爽梗，禁止多爽梗并行，禁止照搬示例的买房内容
    4. 核心爽点必须从2026年最新爽点库中选择，禁止自定义，禁止使用过时老梗
    5. 所有字段不能为空，缺项直接重写
    
    【输入的小说内容】：
    ${novelContent.slice(0, 10000)}
    `;

    const result = await callLLM(prompt, true);
    return this.formatAnalysisReport(result);
  }

  // 格式化分析报告为可读文本（已更新为阶段爽梗规划格式）
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
    report += `⚡ 阶段爽梗全链路规划（2026年标准）：\n`;
    skeleton.stage_shuangdian_plan.forEach((stage: any) => {
      report += `\n  📌 第${stage.stage_num}阶段（共${stage.stage_total_episodes}集）：${stage.core_shuangdian}\n`;
      report += `  🪝 阶段钩子：${stage.stage_hook}\n`;
      report += `  🔗 绑定全局主线：${stage.bind_global_hook}\n`;
      report += `  📅 链路节点：\n`;
      report += `    ① 铺垫期${stage.full_link_nodes.铺垫期.episode_range}：${stage.full_link_nodes.铺垫期.core_task}\n`;
      report += `    ② 冲突升级期${stage.full_link_nodes.冲突升级期.episode_range}：${stage.full_link_nodes.冲突升级期.core_task}\n`;
      report += `    ③ 小高潮${stage.full_link_nodes.small_climax.episode_range}：${stage.full_link_nodes.small_climax.core_task}\n`;
      report += `    ④ 大爽点爆发${stage.full_link_nodes.big_explosion.episode_range}：${stage.full_link_nodes.big_explosion.core_task}\n`;
      report += `    ⑤ 转场期${stage.full_link_nodes.transition_period.episode_range}：${stage.full_link_nodes.transition_period.core_task}\n`;
      report += `  ⚠️ 禁入元素：${stage.forbidden_elements.join('、')}\n`;
      report += `  🔧 金手指边界：${stage.gold_finger_boundary}\n`;
    });
    report += `\n🎭 子流派规则：${skeleton.sub_genre_rules}\n`;

    // 把原始 JSON 存在末尾，供后续阶段使用
    report += `\n\n<!--SKELETON_JSON_START-->${JSON.stringify(skeleton)}<!--SKELETON_JSON_END-->`;
    return report;
  }

  // 从分析报告中提取骨架 JSON（原逻辑保留）
  private extractSkeleton(analysisReport: string): any {
    const match = analysisReport.match(/<!--SKELETON_JSON_START-->(.+?)<!--SKELETON_JSON_END-->/);
    if (match) {
      return JSON.parse(match[1]);
    }
    throw new Error('无法从分析报告中提取骨架数据，请重新运行分析');
  }

  // 第二阶段：生成分集大纲（已更新为阶段链路节点适配，新增targetStageNum参数可生成指定阶段）
  async generateOutline(novelContent: string, analysisReport: string, targetStageNum: number = 1): Promise<string> {
    const skeleton = this.extractSkeleton(analysisReport);
    // 找到目标阶段的爽梗规划
    const targetStage = skeleton.stage_shuangdian_plan.find((s: any) => s.stage_num === targetStageNum);
    if (!targetStage) throw new Error(`未找到第${targetStageNum}阶段的规划，请检查分析报告`);

    const unitStart = 1;
    const unitEnd = targetStage.stage_total_episodes;

    const prompt = `
    ${GLOBAL_TOP_RULES}
    ${SHUANGDIAN_LIBRARY}
    ${SHUANGDIAN_EXEC_RULES}
    子流派规则：${skeleton.sub_genre_rules}
    
    【基础信息】
    全剧终极钩子：${skeleton.ultimate_hook.content}
    当前阶段：第${targetStageNum}阶段，共${targetStage.stage_total_episodes}集
    本阶段核心爽梗：${targetStage.core_shuangdian}
    本阶段钩子：${targetStage.stage_hook}
    本阶段链路节点要求：${JSON.stringify(targetStage.full_link_nodes)}
    强制金手指：${skeleton.base_info.gold_finger}
    金手指边界：${targetStage.gold_finger_boundary}
    禁入元素：${targetStage.forbidden_elements.join('、')}
    
    【任务】
    严格按照本阶段的链路节点要求生成对应集数的竖屏短剧大纲，所有剧情100%为当前阶段核心爽梗服务，可自由魔改剧情、加冲突、加反派，爽感优先，无需拘泥原著细节。
    【输出要求（必须严格按照JSON格式输出，不要有多余内容）】
    {
        "unit_base_info": {
            "unit_num": ${targetStageNum},
            "episode_range": "${unitStart}-${unitEnd}集",
            "stage_goal": "${targetStage.bind_global_hook}",
            "stage_hook": "${targetStage.stage_hook}",
            "core_shuangdian": "${targetStage.core_shuangdian}",
            "core_villain": "本阶段核心反派的战力/智商/势力优势，可魔改得更嚣张，符合2026年大众厌恶点",
            "bystanders": ["踩主角的人群", "同情主角的人群", "看热闹的人群"]
        },
        "episode_outlines": [
            {
                "episode_num": 1,
                "core_plot": "30字以内概括本集核心剧情，严格对应当前阶段的链路节点任务",
                "single_hook": "本集结尾的单集悬念，必须关联本阶段核心矛盾",
                "shuangdian_padding": "本集对应的爽点铺垫内容，没有则填无",
                "node_belong": "本集所属的链路节点，比如「铺垫期」",
                "ultimate_hook_strengthen": "本集是否强化全剧终极钩子，没有则填无"
            }
        ]
    }
    
    【校验规则】
    1. 所有集数严格对应当前阶段的5个链路节点，不得偏离任务
    2. 必须有三层钩子：全剧终极钩子每10集至少强化1次，本阶段有阶段钩子，每集有单集结尾钩子
    3. 核心爽梗占比100%，无任何无关支线/爽点，金手指不越界
    4. 反派足够强、足够坏，每集都有3类旁观者的反应烘托
    5. 严格遵守对应子流派和爽点的专属规则，前三集必须符合秒级节奏要求
    `;

    const outlineData = await callLLM(prompt, true);
    let text = this.formatOutline(outlineData);
    text += `\n\n<!--OUTLINE_JSON_START-->${JSON.stringify({ outline: outlineData, skeleton, targetStage })}<!--OUTLINE_JSON_END-->`;
    return text;
  }

  // 格式化大纲为可读文本（原逻辑保留）
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
      text += `  所属节点：${ep.node_belong}\n`;
      text += `  终极钩子强化：${ep.ultimate_hook_strengthen}\n\n`;
    });

    return text;
  }

  // 第三阶段：生成全部脚本（已修复原逻辑bug，新增2026年校验规则）
  async generateScripts(outlineText: string, phase: number, novelContent: string, formattingRef?: string): Promise<string> {
    const match = outlineText.match(/<!--OUTLINE_JSON_START-->(.+?)<!--OUTLINE_JSON_END-->/);
    if (!match) {
      throw new Error('无法从大纲中提取数据，请重新生成大纲');
    }

    const { outline, skeleton, targetStage } = JSON.parse(match[1]);
    const coreShuangdian = outline.unit_base_info.core_shuangdian;
    const shuangdianType = matchShuangdianType(coreShuangdian);

    const allScripts: string[] = [];

    for (const episode of outline.episode_outlines) {
      const prompt = `
      ${SHUANGDIAN_EXEC_RULES}
      本集核心爽点类型：${shuangdianType}，核心爽点：${coreShuangdian}
      对应子流派规则：${skeleton.sub_genre_rules}
      全剧终极钩子：${skeleton.ultimate_hook.content}
      强制金手指：${skeleton.base_info.gold_finger}
      金手指边界：${targetStage.gold_finger_boundary}
      ${formattingRef ? '\n【排版参考 - 最高优先级】以下是排版范本，你必须100%复刻这个范本的排版格式、标点符号、分行逻辑、段落结构，一个字都不能改变排版风格：\n' + formattingRef.slice(0, 3000) : ''}
      
      【任务】
      基于单集大纲生成1-2分钟的竖屏短剧脚本，800-1000字，节奏快、冲突强、爽感足，可自由加细节加台词，不需要拘泥原著。
      【格式要求】
      如果有排版参考，必须严格按照排版参考的格式来写，包括标点、分行、段落结构都要一模一样。
      如果没有排版参考，则按以下默认格式，集与集之间用 --- 分隔：
      ### 第X集
      【场景】：一句话说明场景
      【画面】：分点描述画面，聚焦人物上半身/表情，适配竖屏，2026年短剧要求画面有冲击力，不要冗余镜头
      【台词】：人物台词，短句为主，符合人物身份，不要长句
      【字幕/系统提示】：仅出现约定的1次第1集前30秒铺垫用金手指提示，其他时候禁止出现
      
      【1-3集强制校验清单（不符合直接重写）】
      1. 第1集是否3秒出强冲突？
      2. 第1集前30秒是否给观众透了主角的碾压级底牌？
      3. 前3集是否全程保持「剧内所有人看不起主角，只有观众知道主角稳赢」的信息差？
      4. 前3集是否有至少3类旁观者的反应烘托？
      5. 第3集结尾是否停在主角即将第一次出手的临界点，留足追更钩子？
      6. 核心爽点占比是否≥80%，有没有无关内容？
      
      【通用校验规则】
      1. 符合钩子要求：每集结尾留悬念，按时强化全剧终极钩子
      2. 核心爽梗占比≥80%，辅助元素不越界，金手指仅在约定阶段出现1次，没有抢戏
      3. 严格遵守对应爽点类型的专属规则，禁止使用过时老梗
      4. 观众看完的第一感受是「爽」，注意力完全集中在核心爽梗上，没有被其他内容分散
      
      【单集大纲】：
      ${JSON.stringify(episode)}
    `;

      const script = await callLLM(prompt, false);
      allScripts.push(script);
    }

    return allScripts.join('\n\n---\n\n');
  }
}
