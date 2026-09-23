"use client";

import { ArrowRight, ChevronDown, X } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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

export function ProductDialog({ open, onOpenChange }: ProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[720px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-foreground/10 bg-background p-0 max-md:h-screen max-md:w-screen max-md:max-w-none max-md:rounded-none max-md:border-0"
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
              className="relative size-4 shrink-0 rounded-xs opacity-70"
              aria-label="Zamknij"
            >
              <X className="size-4 text-foreground" strokeWidth={1.5} />
            </button>
          </div>

          {/* Stepper */}

          {/* MOBILE */}
          <div className="flex shrink-0 flex-col items-start gap-6 border-t border-b border-border py-3 md:hidden">
            <div className="flex w-full items-center justify-start gap-4 py-3">
              {/* Step 1 */}
              <div className="flex flex-1 flex-col items-start justify-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-blue-600">
                  <span className="text-sm font-semibold leading-5 text-white">
                    1
                  </span>
                </div>

                <div className="flex flex-col items-start justify-center gap-0.5">
                  <span className="text-sm font-medium leading-5 text-foreground">
                    Informacje
                  </span>

                  <span className="text-xs font-normal leading-4 text-muted-foreground">
                    Dane podstawowe
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-1 flex-col items-start justify-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full border border-border bg-accent">
                  <span className="text-sm font-semibold leading-5 text-muted-foreground">
                    2
                  </span>
                </div>

                <div className="flex flex-col items-start justify-center gap-0.5">
                  <span className="text-sm font-medium leading-5 text-muted-foreground">
                    Cena
                  </span>

                  <span className="text-xs font-normal leading-4 text-muted-foreground">
                    Dane cenowe
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-1 flex-col items-start justify-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full border border-border bg-accent">
                  <span className="text-sm font-semibold leading-5 text-muted-foreground">
                    3
                  </span>
                </div>

                <div className="flex flex-col items-start justify-center gap-0.5">
                  <span className="text-sm font-medium leading-5 text-muted-foreground">
                    Dostępność
                  </span>

                  <span className="text-xs font-normal leading-4 text-muted-foreground">
                    Stany magazynowe
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden h-[62px] shrink-0 items-center justify-start gap-4 border-b border-border px-4 py-3 md:flex">
            {/* Step 1 */}
            <div className="flex w-36 shrink-0 items-center justify-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-blue-600">
                <span className="text-sm font-semibold leading-5 text-white">
                  1
                </span>
              </div>

              <div className="flex flex-col items-start justify-center gap-0.5">
                <span className="text-sm font-medium leading-5 text-foreground">
                  Informacje
                </span>

                <span className="whitespace-nowrap text-xs font-normal leading-4 text-muted-foreground">
                  Dane podstawowe
                </span>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px w-16 shrink-0 bg-neutral-200" />

            {/* Step 2 */}
            <div className="flex w-28 shrink-0 items-center justify-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full border border-border bg-accent">
                <span className="text-sm font-semibold leading-5 text-muted-foreground">
                  2
                </span>
              </div>

              <div className="flex flex-col items-start justify-center gap-0.5">
                <span className="text-sm font-medium leading-5 text-muted-foreground">
                  Cena
                </span>

                <span className="whitespace-nowrap text-xs font-normal leading-4 text-muted-foreground">
                  Dane cenowe
                </span>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px w-16 shrink-0 bg-neutral-200" />

            {/* Step 3 */}
            <div className="flex w-40 shrink-0 items-center justify-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full border border-border bg-accent">
                <span className="text-sm font-semibold leading-5 text-muted-foreground">
                  3
                </span>
              </div>

              <div className="flex flex-1 flex-col items-start justify-center gap-0.5">
                <span className="text-sm font-medium leading-5 text-muted-foreground">
                  Dostępność
                </span>

                <span className="whitespace-nowrap text-xs font-normal leading-4 text-muted-foreground">
                  Stany magazynowe
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col items-start justify-start gap-4 px-4 pb-4 md:h-[352px] md:shrink-0 md:px-4 md:py-5">
          {/* Name + SKU */}
          <div className="flex w-full flex-col items-start justify-start gap-4 md:h-[60px] md:flex-row">
            {/* Name */}
            <div className="flex w-full flex-1 flex-col items-start justify-start gap-2">
              <div className="self-stretch text-sm font-medium leading-5 text-foreground">
                Nazwa produktu
              </div>

              <div className="flex h-8 self-stretch items-center justify-start gap-1 rounded-[50px] border border-input bg-transparent px-3 py-1">
                <div className="line-clamp-1 flex-1 text-sm font-normal leading-5 text-muted-foreground">
                  np. MacBook Pro 14
                </div>
              </div>
            </div>

            {/* SKU */}
            <div className="flex w-full flex-1 flex-col items-start justify-start gap-2">
              <div className="self-stretch text-sm font-medium leading-5 text-foreground">
                SKU produktu
              </div>

              <div className="flex h-8 self-stretch items-center justify-start gap-1 rounded-[50px] border border-input bg-transparent px-3 py-1">
                <div className="line-clamp-1 flex-1 text-sm font-normal leading-5 text-muted-foreground">
                  np. MBP14M3PRO
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex w-full flex-col items-start justify-start gap-2 md:h-[92px] md:w-[688px]">
            <div className="self-stretch text-sm font-medium leading-5 text-foreground">
              Nazwa produktu
            </div>

            <div className="flex h-16 min-h-16 self-stretch flex-col items-start justify-start gap-2.5 rounded-[10px] border border-input bg-transparent px-2.5 py-2">
              <div className="flex-1 self-stretch text-sm font-normal leading-5 text-muted-foreground">
                Krótki opis produktu
              </div>
            </div>
          </div>

          {/* Manufacturer + Category */}
          <div className="flex w-full flex-col items-start justify-start gap-4 md:h-[60px] md:flex-row">
            {/* Manufacturer */}
            <div className="flex w-full flex-1 flex-col items-start justify-start gap-2">
              <div className="self-stretch text-sm font-medium leading-5 text-foreground">
                Producent
              </div>

              <div className="flex h-8 self-stretch items-center justify-start gap-1.5 rounded-[50px] border border-input bg-transparent px-3 py-2">
                <div className="line-clamp-1 flex-1 text-sm font-normal leading-5 text-muted-foreground">
                  Wybierz producenta
                </div>

                <ChevronDown
                  className="size-4 shrink-0 text-muted-foreground"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex w-full flex-1 flex-col items-start justify-start gap-2">
              <div className="self-stretch text-sm font-medium leading-5 text-foreground">
                Kategoria
              </div>

              <div className="flex h-8 self-stretch items-center justify-start gap-1.5 rounded-[50px] border border-input bg-transparent px-3 py-2">
                <div className="line-clamp-1 flex-1 text-sm font-normal leading-5 text-muted-foreground">
                  Wybierz kategorię
                </div>

                <ChevronDown
                  className="size-4 shrink-0 text-muted-foreground"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="flex w-full flex-col items-start justify-start gap-2 md:h-[52px] md:w-[688px]">
            <div className="self-stretch text-sm font-medium leading-5 text-foreground">
              Cechy produktu
            </div>

            <div className="flex w-full flex-wrap content-start items-start justify-start gap-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="inline-flex h-6 items-center justify-center gap-1 rounded-3xl border border-border bg-background px-2 py-0.5"
                >
                  <span className="text-sm font-normal leading-5 text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex h-auto shrink-0 self-stretch items-center justify-end gap-2 border-t border-border bg-muted/50 p-4 md:h-[68px]">
          <button
            type="button"
            className="flex h-9 items-center justify-center gap-1.5 overflow-hidden rounded-[40px] bg-blue-600 px-4 py-2"
          >
            <span className="text-sm font-medium leading-5 text-white">
              Dalej
            </span>

            <ArrowRight className="size-4 text-white" strokeWidth={1.5} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
