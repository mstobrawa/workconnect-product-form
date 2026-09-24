"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  productStepOneSchema,
  productStepTwoSchema,
  validateZodField,
} from "@/lib/validation/product-schema";
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
  const [step, setStep] = useState(1);
  const [lastEditedPrice, setLastEditedPrice] = useState<"net" | "gross">(
    "net",
  );

  const form = useForm({
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      manufacturer: "",
      category: "",
      features: [] as string[],
      netPrice: "",
      grossPrice: "",
      vatRate: "23",
      currency: "PLN",
    },
    // validators: {
    //   onSubmit: productStepOneSchema,
    // },
    onSubmit: async ({ value }) => {
      console.log("STEP 1:", value);
      setStep(2);
    },
  });

  const calculateGross = (net: string, vat: string) => {
    const netValue = Number(net.replace(",", "."));
    const vatValue = Number(vat.replace(",", "."));

    if (!net || Number.isNaN(netValue) || Number.isNaN(vatValue)) {
      return "";
    }

    return (netValue * (1 + vatValue / 100)).toFixed(2);
  };

  const calculateNet = (gross: string, vat: string) => {
    const grossValue = Number(gross.replace(",", "."));
    const vatValue = Number(vat.replace(",", "."));

    if (!gross || Number.isNaN(grossValue) || Number.isNaN(vatValue)) {
      return "";
    }

    return (grossValue / (1 + vatValue / 100)).toFixed(2);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setStep(1);
        }

        onOpenChange(nextOpen);
      }}
    >
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
              onClick={() => {
                form.reset();
                setStep(1);
                setLastEditedPrice("net");
                onOpenChange(false);
              }}
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
                    Dane podstawowe
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-start justify-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full border border-border bg-accent text-sm font-medium text-muted-foreground">
                  2
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-5 text-muted-foreground">
                    Cena
                  </span>
                  <span className="text-xs leading-4 text-muted-foreground">
                    Dane cenowe
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-start justify-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full border border-border bg-accent text-sm font-medium text-muted-foreground">
                  3
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-5 text-muted-foreground">
                    Dostępność
                  </span>
                  <span className="text-xs leading-4 text-muted-foreground">
                    Stany magazynowe
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop stepper */}
          <div className="hidden h-15 shrink-0 items-center justify-start gap-4 border-b border-border px-4 py-3 md:flex">
            <div className="flex w-36 shrink-0 items-center justify-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                1
              </div>

              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="whitespace-nowrap text-sm font-medium leading-5 text-foreground">
                  Informacje
                </span>
                <span className="whitespace-nowrap text-xs leading-4 text-muted-foreground">
                  Dane podstawowe
                </span>
              </div>
            </div>

            <div className="h-px w-16 shrink-0 bg-neutral-200" />

            <div className="flex w-28 shrink-0 items-center justify-start gap-3">
              <div className="size-8 rounded-full bg-accent outline-1 -outline-offset-1 outline-border inline-flex items-center justify-center">
                <div className="text-muted-foreground text-sm font-semibold font-['Geist'] leading-5">
                  2
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="whitespace-nowrap text-sm font-medium leading-5 text-muted-foreground">
                  Cena
                </span>
                <span className="whitespace-nowrap text-xs leading-4 text-muted-foreground">
                  Dane cenowe
                </span>
              </div>
            </div>

            <div className="h-px w-16 shrink-0 bg-neutral-200" />

            <div className="flex w-40 shrink-0 items-center justify-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full border border-border bg-accent text-sm font-medium text-muted-foreground">
                3
              </div>

              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="whitespace-nowrap text-sm font-medium leading-5 text-muted-foreground">
                  Dostępność
                </span>
                <span className="whitespace-nowrap text-xs leading-4 text-muted-foreground">
                  Stany magazynowe
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col items-start justify-start gap-4 px-4 pb-4 md:h-88 md:shrink-0 md:px-4 md:py-5">
          {/* Name + SKU */}
          {step === 1 && (
            <>
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
                        onChange={(event) => {
                          field.handleChange(event.target.value);
                          void field.validate("change");
                        }}
                        placeholder="np. MacBook Pro 14"
                        className="h-8 w-full rounded-full border border-border bg-background px-3 pr-2.5 py-1 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                      />

                      {field.state.meta.isTouched &&
                        validateZodField(
                          productStepOneSchema.shape.name,
                          field.state.value,
                        ) && (
                          <p className="absolute top-15.75 left-0 text-xs leading-4 text-destructive">
                            {validateZodField(
                              productStepOneSchema.shape.name,
                              field.state.value,
                            )}
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
                        SKU produktu
                      </label>

                      <input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => {
                          field.handleChange(event.target.value);
                          void field.validate("change");
                        }}
                        placeholder="np. MBP14M3PRO"
                        className="h-8 w-full rounded-full border border-border bg-background px-3 pr-2.5 py-1 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                      />

                      {field.state.meta.isTouched &&
                        validateZodField(
                          productStepOneSchema.shape.sku,
                          field.state.value,
                        ) && (
                          <p className="absolute top-15.75 left-0 text-xs leading-4 text-destructive">
                            {validateZodField(
                              productStepOneSchema.shape.sku,
                              field.state.value,
                            )}
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
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
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
                    onChange: ({ value }) =>
                      validateZodField(
                        productStepOneSchema.shape.manufacturer,
                        value,
                      ),
                    onBlur: ({ value }) =>
                      validateZodField(
                        productStepOneSchema.shape.manufacturer,
                        value,
                      ),
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
                          onBlur={field.handleBlur}
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
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="category"
                  validators={{
                    onChange: ({ value }) =>
                      validateZodField(
                        productStepOneSchema.shape.category,
                        value,
                      ),
                    onBlur: ({ value }) =>
                      validateZodField(
                        productStepOneSchema.shape.category,
                        value,
                      ),
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
                          onBlur={field.handleBlur}
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
                          <p className="absolute left-0 top-15.75 text-xs leading-4 text-destructive">
                            {field.state.meta.errors[0]}
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
                  onBlur: productStepOneSchema.shape.features,
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
                            className={`rounded-3xl text-muted-foreground border px-2 py-0.5 text-sm leading-5 ${
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
                        <p className="absolute left-0 top-22.5 text-xs leading-4 text-destructive md:top-13.75">
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                  </div>
                )}
              </form.Field>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex w-full flex-col gap-4">
                {/* Ceny */}
                <div className="flex w-full flex-col gap-4 md:flex-row">
                  <form.Field name="netPrice">
                    {(field) => (
                      <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-medium text-[#0A0A0A]">
                          Cena netto
                        </label>

                        <input
                          type="text"
                          inputMode="decimal"
                          value={field.state.value}
                          onChange={(e) => {
                            const value = e.target.value;

                            setLastEditedPrice("net");
                            field.handleChange(value);

                            const gross = calculateGross(
                              value,
                              form.getFieldValue("vatRate") ?? "",
                            );

                            form.setFieldValue("grossPrice", gross);
                          }}
                          placeholder="0.00"
                          className="h-8 w-full rounded-[60px] border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-1 text-sm text-[#0A0A0A] outline-none placeholder:text-[#737373] focus:border-[#2563EB]"
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="grossPrice">
                    {(field) => (
                      <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-medium text-[#0A0A0A]">
                          Cena brutto
                        </label>

                        <input
                          type="text"
                          inputMode="decimal"
                          value={field.state.value}
                          onChange={(e) => {
                            const value = e.target.value;

                            setLastEditedPrice("gross");
                            field.handleChange(value);

                            const net = calculateNet(
                              value,
                              form.getFieldValue("vatRate") ?? "",
                            );

                            form.setFieldValue("netPrice", net);
                          }}
                          placeholder="0.00"
                          className="h-8 w-full rounded-[60px] border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-1 text-sm text-[#0A0A0A] outline-none placeholder:text-[#737373] focus:border-[#2563EB]"
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* VAT + waluta */}
                <div className="flex w-full flex-col gap-4 md:flex-row">
                  <form.Field name="vatRate">
                    {(field) => (
                      <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-medium text-[#0A0A0A]">
                          Stawka VAT
                        </label>

                        <Select
                          value={field.state.value}
                          onValueChange={(value) => {
                            const nextValue = value ?? "";

                            field.handleChange(nextValue);

                            if (lastEditedPrice === "net") {
                              form.setFieldValue(
                                "grossPrice",
                                calculateGross(
                                  form.getFieldValue("netPrice") ?? "",
                                  nextValue,
                                ),
                              );
                            } else {
                              form.setFieldValue(
                                "netPrice",
                                calculateNet(
                                  form.getFieldValue("grossPrice") ?? "",
                                  nextValue,
                                ),
                              );
                            }
                          }}
                        >
                          <SelectTrigger className="h-8 w-full rounded-[60px] border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-1 text-sm text-[#0A0A0A] outline-none focus:ring-0">
                            <SelectValue placeholder="Wybierz VAT">
                              {(value) => (value ? `${value}%` : "Wybierz VAT")}
                            </SelectValue>
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="23">23%</SelectItem>
                            <SelectItem value="8">8%</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="0">0%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="currency">
                    {(field) => (
                      <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-medium text-[#0A0A0A]">
                          Waluta
                        </label>

                        <Select
                          value={field.state.value}
                          onValueChange={(value) =>
                            field.handleChange(value ?? "")
                          }
                        >
                          <SelectTrigger className="h-8 w-full rounded-[60px] border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-1 text-sm text-[#0A0A0A] outline-none focus:ring-0">
                            <SelectValue placeholder="Wybierz walutę" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="PLN">PLN</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex h-auto shrink-0 self-stretch items-center justify-between gap-2 border-t border-[#E5E5E5] bg-[#FFFFFF] p-4 md:h-17">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex h-9 items-center gap-1.5 rounded-[50px] border border-[#E5E5E5] px-4 py-2 text-sm font-medium text-[#0A0A0A]"
          >
            <ArrowRight className="size-4 rotate-180" />
            <span>Wstecz</span>
          </button>

          <button
            type="button"
            onClick={async () => {
              if (step === 1) {
                const errors = await Promise.all([
                  form.validateField("name", "change"),
                  form.validateField("sku", "change"),
                  form.validateField("manufacturer", "change"),
                  form.validateField("category", "change"),
                  form.validateField("features", "change"),
                ]);

                if (errors.some((fieldErrors) => fieldErrors.length > 0)) {
                  return;
                }

                await form.handleSubmit();
                return;
              }

              setStep(3);
            }}
            className="flex h-9 items-center gap-1.5 rounded-[40px] bg-[#2563EB] px-4 py-2 text-sm font-medium text-[#FFFFFF]"
          >
            <span>Dalej</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
