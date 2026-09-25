"use client";

import type { Product } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
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

const PRODUCTS_PER_PAGE = 5;

function ProductStatus({ isAvailable }: { isAvailable: boolean }) {
  return (
    <Badge
      variant="default"
      className={
        isAvailable
          ? "border-transparent bg-success/10 text-success hover:bg-success/10"
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
    <div className="hidden overflow-hidden md:block">
      <Table className="w-full min-w-0">
        <colgroup>
          <col className="w-89.25" />
          <col className="w-[176.6px]" />
          <col className="w-[176.6px]" />
          <col className="w-[176.6px]" />
          <col className="w-[176.6px]" />
          <col className="w-[176.6px]" />
        </colgroup>

        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="h-10 min-w-20 border-b border-border bg-muted px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              Nazwa
            </TableHead>

            <TableHead className="h-10 min-w-20 border-b border-border bg-muted px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              SKU
            </TableHead>

            <TableHead className="h-10 min-w-20 border-b border-border bg-muted px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              Kategoria
            </TableHead>

            <TableHead className="h-10 min-w-20 border-b border-border bg-muted px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              Cena Brutto
            </TableHead>

            <TableHead className="h-10 min-w-20 border-b border-border bg-muted px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              Status
            </TableHead>

            <TableHead className="h-10 min-w-20 border-b border-border bg-muted px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              Magazyn
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="h-12 px-4 py-2 text-sm font-medium leading-5 text-foreground">
                {product.name}
              </TableCell>

              <TableCell className="h-12 min-w-20 px-4 py-2 text-xs font-normal leading-4 text-muted-foreground">
                <span className="line-clamp-1">{product.sku}</span>
              </TableCell>

              <TableCell className="h-12 min-w-20 px-4 py-2 text-sm font-normal leading-5 text-muted-foreground">
                <span className="line-clamp-1">{product.category}</span>
              </TableCell>

              <TableCell className="h-12 min-w-20 px-4 py-2 text-sm font-medium leading-5 text-foreground">
                <ProductPrice
                  grossPrice={product.grossPrice}
                  currency={product.currency}
                />
              </TableCell>

              <TableCell>
                <ProductStatus isAvailable={product.isAvailable} />
              </TableCell>

              <TableCell className="h-12 min-w-20 px-4 py-2 border-b border-border text-sm font-normal leading-5 text-foreground">
                <span className="line-clamp-1">
                  {product.isLimited ? product.stockQuantity : "—"}
                </span>
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
    <div className="space-y-2 md:hidden bg-muted">
      {products.map((product) => (
        <article
          key={product.id}
          className="flex flex-col gap-2 rounded-xl border bg-card p-3"
        >
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex min-w-0 flex-col gap-1">
              <h2 className="line-clamp-1 text-base font-medium leading-6 text-foreground">
                {product.name}
              </h2>
              <p className="line-clamp-1 text-xs font-normal leading-4 text-muted-foreground">
                {product.sku}
              </p>
            </div>

            <ProductStatus isAvailable={product.isAvailable} />
          </div>

          <div className="flex flex-col items-start justify-center gap-1 rounded-lg bg-secondary p-3">
            <div className="flex w-full items-start gap-1">
              <div className="flex flex-1 flex-col items-start gap-1">
                <p className="text-xs font-normal leading-4 text-muted-foreground">
                  Kategoria
                </p>
                <p className="line-clamp-1 self-stretch text-sm font-normal leading-5 text-foreground">
                  {product.category}
                </p>
              </div>

              <div className="flex flex-1 flex-col items-start gap-1">
                <p className="text-xs font-normal leading-4 text-muted-foreground">
                  Cena brutto
                </p>
                <p className="line-clamp-1 self-stretch text-sm font-medium leading-5 text-foreground">
                  <ProductPrice
                    grossPrice={product.grossPrice}
                    currency={product.currency}
                  />
                </p>
              </div>

              <div className="flex flex-1 flex-col items-start gap-1">
                <p className="text-xs font-normal leading-4 text-muted-foreground">
                  Magazyn
                </p>
                <p className="line-clamp-1 self-stretch text-sm font-normal leading-5 text-foreground">
                  {product.isLimited ? product.stockQuantity : "—"}
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  totalProducts,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
}) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-muted p-6 md:min-h-16 md:flex-row md:justify-between md:gap-0 md:border-t md:border-border md:bg-muted md:p-4">
      <p className="text-xs leading-4 text-muted-foreground">
        Strona {currentPage} z {totalPages} · {totalProducts} produktów
      </p>

      <div className="flex w-full items-center justify-center gap-1 md:w-auto">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className="flex h-8 items-center gap-1 rounded-lg bg-transparent py-2 pl-1.5 pr-2.5 text-sm font-medium text-foreground disabled:cursor-default disabled:opacity-50"
        >
          <ChevronLeft className="size-4" />
          Wstecz
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={
                page === currentPage
                  ? "size-8 rounded-lg bg-primary text-sm font-medium text-primary-foreground"
                  : "size-8 rounded-lg bg-transparent text-sm font-medium text-foreground"
              }
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="flex h-8 items-center gap-1 rounded-lg bg-transparent py-2 pl-2.5 pr-1.5 text-sm font-medium text-foreground disabled:cursor-default disabled:opacity-50"
        >
          Dalej
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const visibleProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    setPage(nextPage);
  };

  return (
    <div className="w-full overflow-hidden bg-card md:rounded-[10px] md:border md:border-border md:shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
      <DesktopProductsTable products={visibleProducts} />

      <MobileProductsList products={visibleProducts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalProducts={products.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
