import type { PersonalityClassGroupType } from "./personality-types";

export interface PolyuSurvivalTip {
  trait: string;
  survival: string;
  pitfall: string;
}

/** 与测试结果四字母编码一一对应；文案来自理大生存建议图鉴 */
export const POLYU_SURVIVAL_TIPS: Record<
  PersonalityClassGroupType,
  PolyuSurvivalTip
> = {
  PSAC: {
    trait: "极其严谨，抗压性强，逻辑严密。",
    survival:
      "你是理大最稳的一块砖。但请注意，生活不是只有 AP（All Perfect）。建议偶尔走出 LKS 图书馆的 Quiet Zone，去 VA 喝杯咖啡，接受一点「不确定性」。",
    pitfall: "别在 Group Project 里因为组员对齐不了像素而破防。",
  },
  PSAB: {
    trait: "极其严谨，抗压性强，逻辑严密。",
    survival:
      "你是 Deadline 战神，但这种「爆发式精度」很伤身体。在考试季，记得像练习 Arcaea 交叉指法一样合理分配体力，别在最后 24 小时才开机。",
    pitfall: "长期熬夜会降低你的判定精度，小心 Mid-term 出现重大失误。",
  },
  PMAC: {
    trait: "极其严谨，抗压性强，逻辑严密。",
    survival:
      "社交与技术的完美结合。你是最理想的 Group Leader。利用你的逻辑去协调那些 E 属性（表现派）的组员，你会是理大的风云人物。",
    pitfall:
      "别太执着于用音游的硬核逻辑去要求所有人，有些人只是想「打着玩」。",
  },
  PMAB: {
    trait: "极其严谨，抗压性强，逻辑严密。",
    survival:
      "你享受聚光灯下的成功。在理大的各种 Case Competition 中，你的爆发力和精准度是致命武器。保持你的竞技状态！",
    pitfall: "输赢心别太重，机厅里的 P Score 不是人生的全部。",
  },
  ESIC: {
    trait: "极具创意，感性驱动，乐于共情。",
    survival:
      "在高压的理大校园里，你是难得的清流。适合去护理或康复专业发挥你的治愈力。累的时候，戴上耳机，在 Cytus 的音乐里找回自我。",
    pitfall: "别因为太追求「氛围感」而漏掉了课程大纲里的重要细节。",
  },
  ESIB: {
    trait: "极具创意，感性驱动，乐于共情。",
    survival:
      "你就是 V-Building（创新楼）的灵魂化身。别怕你的想法太跳跃，去参加设计展或多媒体比赛，你的直觉会带你夺冠。",
    pitfall:
      "直觉偶尔会失灵，尤其是面对复杂的理大选课系统（SITS）时，请务必看说明书。",
  },
  EMIC: {
    trait: "极具创意，感性驱动，乐于共情。",
    survival:
      "你是团队的粘合剂。像今井莉莎一样，你的存在让枯燥的 Lab 报告变得有趣。多利用你的人脉，在红磡能过得很滋润。",
    pitfall:
      "别为了照顾所有人的情绪而委屈自己，有时候你也需要 S 属性（独行）的独处时间。",
  },
  EMIB: {
    trait: "极具创意，感性驱动，乐于共情。",
    survival:
      "理大最燥的灵魂。适合筹办 O-Camp 或大型活动。你的爆发力能让任何沉闷的项目瞬间起飞。",
    pitfall: "狂欢过后，记得检查你的 GPA，别让热血冲昏了期末考的头脑。",
  },
  PSIC: {
    trait: "灵活多变，能在不同环境下快速切换模式。",
    survival:
      "你的直觉极其精准。在面对复杂的物理或数学模型时，你往往能一眼看到答案。保持这种专注，你是天生的研究者。",
    pitfall: "别太孤僻，偶尔参加一下 PJSK 的多人联机，感受一下他人的节奏。",
  },
  PSIB: {
    trait: "灵活多变，能在不同环境下快速切换模式。",
    survival:
      "你是短跑型选手。在需要短时间内解决技术难题（如 Coding）时表现卓越。学会把大任务拆解成无数个「瞬时挑战」。",
    pitfall: "警惕「三分钟热度」，像练习太鼓达人的长连段一样锻炼你的耐力。",
  },
  PMIC: {
    trait: "灵活多变，能在不同环境下快速切换模式。",
    survival:
      "你在理大的社交圈里游刃有余。你懂得如何在保持个人风格的同时融入集体。适合从事传媒或市场营销。",
    pitfall: "别光顾着在天桥上优雅地漫步，记得按时交 Assignment。",
  },
  PMIB: {
    trait: "灵活多变，能在不同环境下快速切换模式。",
    survival:
      "你的爱是你的动力源。无论是对角色还是对专业，这种热情能让你在理大脱颖而出。去寻找志同道合的社团吧！",
    pitfall:
      "别因为过度的「爱」而导致生活失衡（比如为了买周边/抽卡而吃了一个月的泡面）。",
  },
  ESAC: {
    trait: "拥有独特的审美逻辑或执行逻辑。",
    survival:
      "你的审美有严谨的底层逻辑。适合服装设计或建筑。你能在理大的红砖背景下创造出最具结构美感的作品。",
    pitfall:
      "别太纠结于「表现是否得体」，有时候为了精度（P），需要一点打破常规的勇气。",
  },
  ESAB: {
    trait: "拥有独特的审美逻辑或执行逻辑。",
    survival:
      "你的生活就是一场 3DMV。善于利用社交媒体展示你的理大生活，你很有潜力成为校园博主。",
    pitfall:
      "镜头背后的真实学习也需要关注，别让朋友圈的 Perfect 掩盖了现实中的 Miss。",
  },
  EMAC: {
    trait: "拥有独特的审美逻辑或执行逻辑。",
    survival:
      "你擅长统筹，既懂艺术也懂规矩。在理大的创业项目中，你最适合担任 CTO 或运营。",
    pitfall:
      "管理别人时别太像打 maimai 一样下死指令，给别人留点发挥空间。",
  },
  EMAB: {
    trait: "拥有独特的审美逻辑或执行逻辑。",
    survival:
      "传说级人格。你似乎在所有维度都游刃有余。你的理大生涯应该是金牌和奖学金的收割之旅。",
    pitfall:
      "最大的敌人是「高处不胜寒」。记得像莉莎照顾乐队一样，偶尔也关照一下身边的普通人。",
  },
};

export function getPolyuSurvivalTip(
  type: PersonalityClassGroupType
): PolyuSurvivalTip {
  return POLYU_SURVIVAL_TIPS[type];
}
