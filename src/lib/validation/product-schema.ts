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

export type ProductStepOneValues = z.infer<typeof productStepOneSchema>;
