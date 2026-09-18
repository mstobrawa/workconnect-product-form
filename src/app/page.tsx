import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/products/products-table";
import { products } from "@/lib/products";

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
  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-0 md:pt-12.5">
      <div className="mx-auto flex w-full max-w-310 flex-col gap-6 bg-card">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold leading-7 text-foreground">
              Produkty
            </h1>

            <p className="text-sm leading-5 text-muted-foreground">
              {products.length} {getProductLabel(products.length)} w katalogu
            </p>
          </div>

          <Button
            type="button"
            className="h-9 gap-1.5 rounded-full bg-primary px-4 font-medium"
          >
            <Plus className="size-4" />
            Dodaj produkt
          </Button>
        </header>

        <ProductsTable products={products} />
      </div>
    </main>
  );
}
