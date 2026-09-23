"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { productStepOneSchema } from "@/lib/validation/product-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const features = [
  "Bluetooth",
  "WiFI",
  "USB-C",
  "Wodoodporny",
  "Bezprzewodowy",
  "Ekologiczny",
  "Premium",
];

const manufacturers = ["Apple", "Samsung", "Sony", "Bosch", "Xiaomi"];

const categories = [
  "Komputery",
  "Telefony",
  "RTV",
  "AGD",
  "Akcesoria",
  "Tablety",
  "Monitory",
];

export function ProductDialog({ open, onOpenChange }: ProductDialogProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      manufacturer: "",
      category: "",
      features: [] as string[],
    },
    validators: {
      onSubmit: productStepOneSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("STEP 1:", value);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-180 max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-foreground/10 bg-background p-0 max-md:h-screen max-md:w-screen max-md:max-w-none max-md:rounded-none max-md:border-0"
      >
        {/* Header + Stepper */}
        <div className="flex flex-col gap-4 px-4 pt-6 md:contents">
          {/* Header */}
          <div className="flex h-auto shrink-0 items-center justify-between md:h-16 md:items-start md:justify-start md:gap-2 md:border-b md:border-border md:px-4 md:py-6">
            <DialogTitle className="w-56 self-stretch text-base font-medium leading-4 text-foreground md:flex-1">
              Dodaj nowy produkt
            </DialogTitle>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex size-4 shrink-0 items-center justify-center opacity-70"
              aria-label="Zamknij"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Mobile stepper */}
          <div className="flex shrink-0 flex-col items-start gap-6 border-t border-b border-border py-3 md:hidden">
            <div className="flex w-full items-center justify-start gap-4 py-3">
              <div className="flex flex-1 flex-col items-start justify-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  1
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-5 text-foreground">
                    Informacje
                  </span>
                  <span className="text-xs leading-4 text-muted-foreground">
                    Podstawowe dane
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-start justify-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                  2
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-5 text-muted-foreground">
                    Cena
                  </span>
                  <span className="text-xs leading-4 text-muted-foreground">
                    Cena produktu
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-start justify-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                  3
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-5 text-muted-foreground">
                    Dostępność
                  </span>
                  <span className="text-xs leading-4 text-muted-foreground">
                    Stan magazynowy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop stepper */}
          <div className="hidden h-15.5 shrink-0 items-center justify-start gap-4 border-b border-border px-4 py-3 md:flex">
            <div className="flex w-36 shrink-0 items-center justify-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                1
              </div>

              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="whitespace-nowrap text-sm font-medium leading-5 text-foreground">
                  Informacje
                </span>
                <span className="whitespace-nowrap text-xs leading-4 text-muted-foreground">
                  Podstawowe dane
                </span>
              </div>
            </div>

            <div className="h-px w-16 shrink-0 bg-neutral-200" />

            <div className="flex w-28 shrink-0 items-center justify-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                2
              </div>

              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="whitespace-nowrap text-sm font-medium leading-5 text-muted-foreground">
                  Cena
                </span>
                <span className="whitespace-nowrap text-xs leading-4 text-muted-foreground">
                  Cena
                </span>
              </div>
            </div>

            <div className="h-px w-16 shrink-0 bg-neutral-200" />

            <div className="flex w-40 shrink-0 items-center justify-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                3
              </div>

              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="whitespace-nowrap text-sm font-medium leading-5 text-muted-foreground">
                  Dostępność
                </span>
                <span className="whitespace-nowrap text-xs leading-4 text-muted-foreground">
                  Stan magazynowy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col items-start justify-start gap-4 px-4 pb-4 md:h-88 md:shrink-0 md:px-4 md:py-5">
          {/* Name + SKU */}
          <div className="flex w-full flex-col items-start justify-start gap-4 md:h-15 md:flex-row">
            <form.Field
              name="name"
              validators={{
                onChange: productStepOneSchema.shape.name,
                onBlur: productStepOneSchema.shape.name,
              }}
            >
              {(field) => (
                <div className="relative flex w-full flex-1 flex-col gap-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-medium leading-5 text-foreground"
                  >
                    Nazwa produktu
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Nazwa produktu"
                    className="h-8 w-full rounded-full border border-border bg-background px-3 pr-2.5 py-1 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                  />

                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="absolute top-15.75 left-0 text-xs leading-4 text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="sku"
              validators={{
                onChange: productStepOneSchema.shape.sku,
                onBlur: productStepOneSchema.shape.sku,
              }}
            >
              {(field) => (
                <div className="relative flex w-full flex-1 flex-col gap-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-medium leading-5 text-foreground"
                  >
                    SKU
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="SKU"
                    className="h-8 w-full rounded-full border border-border bg-background px-3 pr-2.5 py-1 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                  />

                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="absolute top-15.75 left-0 text-xs leading-4 text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <div className="flex w-full flex-col gap-2 md:h-23 md:w-172">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium leading-5 text-foreground"
                >
                  Nazwa produktu
                </label>

                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Krótki opis produktu"
                  className="h-16 w-full resize-none rounded-[10px] border border-border bg-background px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
            )}
          </form.Field>

          {/* Manufacturer + Category */}
          <div className="flex w-full flex-col items-start justify-start gap-4 md:h-15 md:flex-row">
            <form.Field
              name="manufacturer"
              validators={{
                onChange: productStepOneSchema.shape.manufacturer,
                onBlur: productStepOneSchema.shape.manufacturer,
              }}
            >
              {(field) => (
                <div className="relative flex w-full flex-1 flex-col gap-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-medium leading-5 text-foreground"
                  >
                    Producent
                  </label>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      if (value === null) return;

                      field.handleChange(value);
                      field.handleBlur();
                    }}
                  >
                    <SelectTrigger
                      id={field.name}
                      className="h-8 w-full rounded-full border-border bg-background px-3 py-2 text-sm"
                    >
                      <SelectValue placeholder="Wybierz producenta" />
                    </SelectTrigger>

                    <SelectContent>
                      {manufacturers.map((manufacturer) => (
                        <SelectItem key={manufacturer} value={manufacturer}>
                          {manufacturer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="absolute left-0 top-15.75 text-xs leading-4 text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="category"
              validators={{
                onChange: productStepOneSchema.shape.category,
                onBlur: productStepOneSchema.shape.category,
              }}
            >
              {(field) => (
                <div className="relative flex w-full flex-1 flex-col gap-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-medium leading-5 text-foreground"
                  >
                    Kategoria
                  </label>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      if (value === null) return;

                      field.handleChange(value);
                      field.handleBlur();
                    }}
                  >
                    <SelectTrigger
                      id={field.name}
                      className="h-8 w-full rounded-full border-border bg-background px-3 py-2 text-sm"
                    >
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="absolute left-0 top-[63px] text-xs leading-4 text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Features */}
          <form.Field
            name="features"
            validators={{
              onChange: productStepOneSchema.shape.features,
            }}
          >
            {(field) => (
              <div className="relative flex w-full flex-col gap-2 md:h-13 md:w-172">
                <span className="text-sm font-medium leading-5 text-foreground">
                  Cechy produktu
                </span>

                <div className="flex flex-wrap content-start items-start gap-2">
                  {features.map((feature) => {
                    const isSelected = field.state.value.includes(feature);

                    return (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => {
                          const currentFeatures = field.state.value;

                          field.handleChange(
                            isSelected
                              ? currentFeatures.filter(
                                  (item) => item !== feature,
                                )
                              : [...currentFeatures, feature],
                          );
                        }}
                        className={`rounded-3xl border px-2 py-0.5 text-sm leading-5 ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-foreground"
                        }`}
                      >
                        {feature}
                      </button>
                    );
                  })}
                </div>

                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="absolute top-22.5 md:top-13.75 left-0 text-xs leading-4 text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Footer */}
        <div className="flex h-auto shrink-0 self-stretch items-center justify-end gap-2 border-t border-border bg-muted/50 p-4 md:h-17">
          <button
            type="button"
            onClick={() => form.handleSubmit()}
            className="flex h-9 items-center gap-1.5 rounded-[40px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Dalej
            <ArrowRight className="size-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
