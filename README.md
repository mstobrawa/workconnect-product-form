# WorkConnect — formularz dodawania produktu

Projekt rekrutacyjny przedstawiający formularz dodawania produktu w trzech krokach wraz z tabelą produktów.

## Demo

https://workconnect-product-form-teal.vercel.app/

## Technologie

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Form
- Zod
- nuqs
- Lucide React

## Funkcjonalności

- trzyetapowy formularz dodawania produktu,
- walidacja formularza przy użyciu Zod,
- zarządzanie stanem formularza z TanStack Form,
- walidacja pól w trakcie wprowadzania danych,
- automatyczne przeliczanie ceny netto i brutto,
- wybór stawki VAT i waluty,
- obsługa dostępności produktu,
- obsługa produktów limitowanych,
- walidacja ilości magazynowej,
- walidacja minimalnej i maksymalnej ilości produktu w koszyku,
- responsywny widok desktop i mobile,
- tabela produktów oraz mobilna lista produktów,
- paginacja synchronizowana z adresem URL za pomocą nuqs,
- komunikat potwierdzający dodanie produktu,
- reset formularza po zamknięciu dialogu.

## Walidacja

Formularz sprawdza poprawność danych na każdym etapie i nie pozwala przejść dalej, dopóki aktualny krok nie zostanie poprawnie wypełniony.

### Krok 1 — informacje o produkcie

- nazwa produktu jest wymagana i musi zawierać minimum 3 znaki,
- SKU jest wymagane i może zawierać maksymalnie 24 znaki alfanumeryczne,
- opis produktu jest opcjonalny,
- producent jest wymagany,
- kategoria jest wymagana,
- wymagane jest wybranie przynajmniej jednej cechy produktu.

### Krok 2 — ceny

- cena netto i brutto są wymagane,
- ceny mogą zawierać maksymalnie dwa miejsca po przecinku,
- obsługiwane są zarówno przecinek, jak i kropka jako separator dziesiętny,
- zmiana jednej ceny automatycznie przelicza drugą,
- stawka VAT i waluta są wymagane.

### Krok 3 — dostępność i limity

- produkt może być dostępny lub niedostępny,
- ilość magazynowa jest wymagana tylko dla produktu limitowanego,
- ilość magazynowa musi być nieujemną liczbą całkowitą,
- minimalna i maksymalna ilość produktu muszą być liczbami całkowitymi,
- minimalna ilość nie może być większa od maksymalnej.

## Uruchomienie lokalne

### Wymagania

Do uruchomienia projektu potrzebne są:

- Node.js
- npm
- Git

### Klonowanie repozytorium

Sklonuj repozytorium:

```bash
git clone git@github.com:mstobrawa/workconnect-product-form.git
```

Przejdź do katalogu projektu:

```bash
cd workconnect-product-form
```

### Instalacja zależności

Zainstaluj wszystkie wymagane zależności:

```bash
npm install
```

### Uruchomienie środowiska developerskiego

Uruchom aplikację:

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem:

http://localhost:3000

## Sprawdzenie projektu

### Lint

Aby sprawdzić kod pod kątem problemów z lintingiem:

```bash
npm run lint
```

### Build produkcyjny

Aby wykonać produkcyjny build aplikacji:

```bash
npm run build
```

Oba polecenia przechodzą poprawnie.

## QA

Projekt został poddany testom QA przed zakończeniem prac.

W ramach QA sprawdzono między innymi:

- poprawność przechodzenia pomiędzy trzema krokami formularza,
- walidację wymaganych pól,
- walidację danych podczas wprowadzania,
- blokowanie przejścia do kolejnego kroku przy niepoprawnych danych,
- obsługę poprawnych i niepoprawnych wartości cen,
- automatyczne przeliczanie ceny netto i brutto,
- walidację ilości magazynowej dla produktów limitowanych,
- walidację minimalnej i maksymalnej ilości produktu,
- działanie przełącznika dostępności produktu,
- reset formularza po zamknięciu dialogu,
- dodawanie produktu do tabeli,
- komunikat potwierdzający dodanie produktu,
- działanie paginacji i synchronizacji numeru strony z URL,
- widok desktopowy,
- widok mobilny,
- poprawność layoutu względem projektu Figma.

## Uwagi

- Produkty dodane za pomocą formularza są przechowywane wyłącznie w stanie React. Po pełnym odświeżeniu strony znikają.
- Z tego powodu adres URL może zawierać numer strony, która po odświeżeniu nie będzie już dostępna, ponieważ tymczasowo dodane produkty zostaną usunięte.
- Specyfikacja zadania nie określa minimalnej wartości ceny, dlatego wartość `0` jest obecnie akceptowana przez formularz.
- W desktopowej wersji Figma występuje niespójność dotycząca koloru separatora steppera pomiędzy krokami 2 i 3. Implementacja zachowuje logiczne przechodzenie stanu steppera.
- Skorygowano etykietę pola opisu produktu — w projekcie Figma pole textarea było oznaczone jako „Nazwa produktu”, natomiast zgodnie ze specyfikacją i przeznaczeniem zostało oznaczone jako „Opis produktu”.
- Specyfikacja zadania zakłada 5 początkowych produktów przykładowych, natomiast aktualny zestaw danych demonstracyjnych zawiera 7 produktów.

## Status projektu

Projekt ukończony i wdrożony na Vercel.

Zweryfikowano:

- `npm run lint` ✅
- `npm run build` ✅
- QA funkcjonalne i responsywne ✅
- dopasowanie interfejsu do projektu Figma ✅
