"use client";

import type { Product } from "@/types/product";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryState, parseAsInteger } from "nuqs";

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
    <div className="hidden overflow-hidden md:block">
      <Table>
        <colgroup>
          <col className="w-[357px]" />
          <col className="w-[176.6px]" />
          <col className="w-[176.6px]" />
          <col className="w-[176.6px]" />
          <col className="w-[176.6px]" />
          <col className="w-[176.6px]" />
        </colgroup>

        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="h-10 px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              Nazwa
            </TableHead>
            <TableHead className="h-10 px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              SKU
            </TableHead>
            <TableHead className="h-10 px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              Kategoria
            </TableHead>
            <TableHead className="h-10 px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              Cena Brutto
            </TableHead>
            <TableHead className="h-10 px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="h-10 px-4 py-0 text-left text-sm font-medium leading-5 text-muted-foreground">
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

              <TableCell className="text-xs leading-4 text-muted-foreground">
                {product.sku}
              </TableCell>

              <TableCell className="text-sm leading-5 text-muted-foreground">
                {product.category}
              </TableCell>

              <TableCell className="text-sm font-medium leading-5 text-foreground">
                <ProductPrice
                  grossPrice={product.grossPrice}
                  currency={product.currency}
                />
              </TableCell>

              <TableCell>
                <ProductStatus isAvailable={product.isAvailable} />
              </TableCell>

              <TableCell className="text-sm leading-5 text-foreground">
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
          className="flex flex-col gap-2 rounded-xl border bg-card p-3"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1">
              <h2 className="truncate text-base font-medium leading-6">
                {product.name}
              </h2>

              <p className="text-xs leading-4 text-muted-foreground">
                {product.sku}
              </p>
            </div>

            <ProductStatus isAvailable={product.isAvailable} />
          </div>

          <div className="grid grid-cols-3 gap-1 rounded-[9px] bg-muted p-3">
            <div>
              <p className="text-xs leading-4 text-muted-foreground">
                Kategoria
              </p>

              <p className="mt-1 text-sm leading-5 text-foreground">
                {product.category}
              </p>
            </div>

            <div>
              <p className="text-xs leading-4 text-muted-foreground">
                Cena brutto
              </p>

              <p className="mt-1 text-sm font-medium leading-5 text-foreground">
                <ProductPrice
                  grossPrice={product.grossPrice}
                  currency={product.currency}
                />
              </p>
            </div>

            <div>
              <p className="text-xs leading-4 text-muted-foreground">Magazyn</p>

              <p className="mt-1 text-sm leading-5 text-foreground">
                {product.isLimited ? product.stockQuantity : "—"}
              </p>
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
    <div className="flex min-h-16 flex-col items-center justify-center gap-4 bg-card p-4 md:flex-row md:justify-between md:gap-0 md:border-t md:border-border md:bg-gray-50">
      <p className="text-xs leading-4 text-muted-foreground">
        Strona {currentPage} z {totalPages} · {totalProducts} produktów
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className="flex h-8 items-center gap-1 px-2 text-sm text-muted-foreground disabled:cursor-default disabled:opacity-50"
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
                  ? "h-8 min-w-8 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
                  : "h-8 min-w-8 rounded-lg px-3 text-sm text-foreground"
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
          className="flex h-8 items-center gap-1 px-2 text-sm text-foreground disabled:cursor-default disabled:opacity-50"
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
    <div className="overflow-hidden bg-card md:rounded-lg md:border md:border-border md:shadow-xs">
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
