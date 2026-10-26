import { z } from "zod";

const CountSchema = z.number().int().nonnegative();

export const NovelAiSubscriptionResponseSchema = z.object({
  tier: z.number().int().min(0).max(3),
  active: z.boolean(),
  expiresAt: z.number().int().nonnegative(),
  trainingStepsLeft: z.object({
    fixedTrainingStepsLeft: CountSchema,
    purchasedTrainingSteps: CountSchema,
  }),
  usage: z
    .object({
      percent: z.number(),
      purchasedPercent: z.number(),
      isNegative: z.boolean(),
      timeUntilNextPercent: z.number().nonnegative(),
    })
    .optional(),
});

export const NOVELAI_TIER_NAMES = ["paper", "tablet", "scroll", "opus"] as const;

export interface NovelAiAccountStatus {
  readonly tier: (typeof NOVELAI_TIER_NAMES)[number];
  readonly tier_level: number;
  readonly active: boolean;
  readonly expires_at: string;
  readonly anlas: number;
  readonly fixed_anlas: number;
  readonly purchased_anlas: number;
  /** The Opus V5 usage allowance; free V5 generations stop while it is negative. */
  readonly usage: {
    readonly percent: number;
    readonly purchased_percent: number;
    readonly is_negative: boolean;
    readonly time_until_next_percent: number;
  } | null;
}

export function parse_novelai_subscription(value: unknown): NovelAiAccountStatus {
  const parsed = NovelAiSubscriptionResponseSchema.parse(value);
  const fixed = parsed.trainingStepsLeft.fixedTrainingStepsLeft;
  const purchased = parsed.trainingStepsLeft.purchasedTrainingSteps;
  return {
    tier: NOVELAI_TIER_NAMES[parsed.tier] ?? "paper",
    tier_level: parsed.tier,
    active: parsed.active,
    expires_at: new Date(parsed.expiresAt * 1000).toISOString(),
    anlas: fixed + purchased,
    fixed_anlas: fixed,
    purchased_anlas: purchased,
    usage:
      parsed.usage === undefined
        ? null
        : {
            percent: parsed.usage.percent,
            purchased_percent: parsed.usage.purchasedPercent,
            is_negative: parsed.usage.isNegative,
            time_until_next_percent: parsed.usage.timeUntilNextPercent,
          },
  };
}
