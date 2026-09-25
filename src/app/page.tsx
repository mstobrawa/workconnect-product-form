"use client";

import { Suspense, useState } from "react";
import { Check, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ProductDialog } from "@/components/products/product-dialog";
import { ProductsTable } from "@/components/products/products-table";
import { products as initialProducts } from "@/lib/products";

function getProductLabel(count: number) {
  if (count === 1) {
    return "produkt";
  }

  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastOne >= 2 && lastOne <= 4 && (lastTwo < 12 || lastTwo > 14)) {
    return "produkty";
  }

  return "produktów";
}

export default function Home() {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [productList, setProductList] = useState<Product[]>(initialProducts);

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:bg-background md:px-0 md:pt-12.5">
      <div className="mx-auto flex w-full max-w-310 flex-col items-start gap-6 bg-background">
        <header className="flex w-full items-center justify-start gap-1 md:h-12 md:justify-between md:gap-0">
          <div className="flex w-96 flex-col items-start justify-center gap-1">
            <h1 className="text-xl font-semibold leading-7 text-foreground">
              Produkty
            </h1>

            <p className="text-sm leading-5 text-muted-foreground">
              {productList.length} {getProductLabel(productList.length)} w
              katalogu
            </p>
          </div>

          <Button
            type="button"
            onClick={() => setIsProductDialogOpen(true)}
            className="h-9 gap-1.5 overflow-hidden rounded-[50px] bg-primary px-4 py-2 font-medium text-primary-text"
          >
            <Plus className="size-4 text-primary-text" />
            Dodaj produkt
          </Button>
        </header>

        <ProductDialog
          open={isProductDialogOpen}
          onOpenChange={setIsProductDialogOpen}
          onProductAdded={(product) => {
            setProductList((currentProducts) => [...currentProducts, product]);
            setShowSuccessToast(true);

            window.setTimeout(() => {
              setShowSuccessToast(false);
            }, 5000);
          }}
        />

        <Suspense fallback={null}>
          <ProductsTable products={productList} />
        </Suspense>
      </div>
      {showSuccessToast && (
        <div className="fixed bottom-3 right-3 z-50 flex w-80 items-center gap-2 overflow-hidden rounded-lg border border-border bg-card p-4 shadow-[0_4px_12px_-1px_rgba(0,0,0,0.10)]">
          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success">
            <Check className="size-3 text-primary-foreground" />
          </div>

          <div className="flex flex-1 flex-col items-start gap-0.5">
            <span className="text-sm font-medium leading-5 text-foreground">
              Produkt został dodany
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
