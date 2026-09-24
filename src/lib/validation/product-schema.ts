import { z } from "zod";

export const productStepOneSchema = z.object({
  name: z.string().min(3, "Nazwa produktu musi mieć co najmniej 3 znaki"),

  sku: z
    .string()
    .min(1, "SKU jest wymagane")
    .max(24, "SKU może mieć maksymalnie 24 znaki")
    .regex(/^[a-zA-Z0-9]+$/, "SKU może zawierać tylko litery i cyfry"),

  description: z.string(),

  manufacturer: z.string().min(1, "Wybierz producenta"),

  category: z.string().min(1, "Wybierz kategorię"),

  features: z.array(z.string()).min(1, "Wybierz co najmniej jedną cechę"),
});

export const productStepTwoSchema = z.object({
  netPrice: z
    .string()
    .min(1, "Cena netto jest wymagana")
    .regex(/^\d+([.,]\d{1,2})?$/, "Cena netto musi być liczbą"),

  grossPrice: z
    .string()
    .min(1, "Cena brutto jest wymagana")
    .regex(/^\d+([.,]\d{1,2})?$/, "Cena brutto musi być liczbą"),

  vatRate: z.string().min(1, "Wybierz stawkę VAT"),

  currency: z.string().min(1, "Wybierz walutę"),
});

export const productStepThreeSchema = z
  .object({
    available: z.boolean(),

    limited: z.boolean(),

    stockQuantity: z.string().optional(),

    minQuantity: z
      .string()
      .min(1, "Minimalna ilość jest wymagana")
      .regex(/^\d+$/, "Minimalna ilość musi być liczbą całkowitą"),

    maxQuantity: z
      .string()
      .min(1, "Maksymalna ilość jest wymagana")
      .regex(/^\d+$/, "Maksymalna ilość musi być liczbą całkowitą"),
  })
  .superRefine((data, ctx) => {
    if (data.limited) {
      if (!data.stockQuantity || !/^\d+$/.test(data.stockQuantity)) {
        ctx.addIssue({
          code: "custom",
          path: ["stockQuantity"],
          message: "Ilość na magazynie musi być nieujemną liczbą całkowitą",
        });
      }
    }

    const min = Number(data.minQuantity);
    const max = Number(data.maxQuantity);

    if (Number.isInteger(min) && Number.isInteger(max) && min > max) {
      ctx.addIssue({
        code: "custom",
        path: ["minQuantity"],
        message: "Minimalna ilość nie może być większa od maksymalnej",
      });

      ctx.addIssue({
        code: "custom",
        path: ["maxQuantity"],
        message: "Maksymalna ilość nie może być mniejsza od minimalnej",
      });
    }
  });

export function validateZodField<T>(
  schema: z.ZodType<T>,
  value: unknown,
): string | undefined {
  const result = schema.safeParse(value);

  if (result.success) {
    return undefined;
  }

  return result.error.issues[0]?.message;
}

export type ProductStepOneValues = z.infer<typeof productStepOneSchema>;

export type ProductStepTwoValues = z.infer<typeof productStepTwoSchema>;

export type ProductStepThreeValues = z.infer<typeof productStepThreeSchema>;
