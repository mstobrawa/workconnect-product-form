import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ProductsTableProps = {
  products: Product[];
};

function ProductStatus({ isAvailable }: { isAvailable: boolean }) {
  return (
    <Badge
      variant="default"
      className={
        isAvailable
          ? "border-transparent bg-green-600/10 text-green-600 hover:bg-green-600/10"
          : "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/10"
      }
    >
      {isAvailable ? "Dostępny" : "Niedostępny"}
    </Badge>
  );
}

function ProductPrice({
  grossPrice,
  currency,
}: Pick<Product, "grossPrice" | "currency">) {
  return (
    <span>
      {grossPrice.toLocaleString("pl-PL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}{" "}
      {currency}
    </span>
  );
}

function DesktopProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-lg border border-border bg-card shadow-xs md:block">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Nazwa</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Kategoria</TableHead>
            <TableHead>Cena Brutto</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Magazyn</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>

              <TableCell className="text-muted-foreground">
                {product.sku}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {product.category}
              </TableCell>

              <TableCell className="font-medium">
                <ProductPrice
                  grossPrice={product.grossPrice}
                  currency={product.currency}
                />
              </TableCell>

              <TableCell>
                <ProductStatus isAvailable={product.isAvailable} />
              </TableCell>

              <TableCell>
                {product.isLimited ? product.stockQuantity : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function MobileProductsList({ products }: ProductsTableProps) {
  return (
    <div className="space-y-2 md:hidden">
      {products.map((product) => (
        <article
          key={product.id}
          className="rounded-xl border bg-background p-3"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-base font-medium">{product.name}</h2>

              <p className="text-sm text-muted-foreground">{product.sku}</p>
            </div>

            <ProductStatus isAvailable={product.isAvailable} />
          </div>

          <div className="grid grid-cols-3 rounded-lg bg-muted/60 p-3">
            <div>
              <p className="text-xs text-muted-foreground">Kategoria</p>
              <p className="mt-1 text-sm">{product.category}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Cena brutto</p>
              <p className="mt-1 text-sm font-medium">
                <ProductPrice
                  grossPrice={product.grossPrice}
                  currency={product.currency}
                />
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Magazyn</p>
              <p className="mt-1 text-sm">
                {product.isLimited ? product.stockQuantity : "—"}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <>
      <DesktopProductsTable products={products} />
      <MobileProductsList products={products} />
    </>
  );
}
