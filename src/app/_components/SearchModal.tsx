"use client";

import { frontendApi } from "@/src/api/api";
import { TCategories, TProduct } from "@/src/api/type";
import CloseButton from "@/src/components/svg/CloseButton";
import SearchIcon from "@/src/components/svg/SearchIcon";
import { useDebounce } from "@/src/hooks/useDebounce";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const RECENT_KEY = "skm-recent-searches";
const MAX_RECENT = 5;
const MAX_RESULTS = 6;
const SEARCH_DEBOUNCE_MS = 300;

const readRecent = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
};

const writeRecent = (terms: string[]) => {
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(terms));
  } catch {
    // storage can be unavailable (private mode) — searching still works
  }
};

const SearchModal = ({ open, onClose }: Props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const trimmed = debouncedQuery.trim();

  // Categories power the "Browse categories" chips. They rarely change, so they
  // are fetched once the modal is first opened and cached for the session.
  const { data: categories = [] } = useQuery({
    queryKey: ["search-categories"],
    queryFn: () => frontendApi.getCollectionPage(),
    enabled: open,
    staleTime: 5 * 60 * 1000,
    select: (data: TCategories[] | null) =>
      (data ?? []).filter((category) => category.products_count > 0),
  });

  // Results come from the API on every (debounced) keystroke. keepPreviousData
  // holds the previous list on screen while the next one loads, so the dropdown
  // doesn't flash empty between keystrokes.
  const {
    data: search,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["product-search", trimmed],
    queryFn: () => frontendApi.searchProducts({ q: trimmed, per_page: MAX_RESULTS }),
    enabled: open && trimmed.length > 0,
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const results: TProduct[] = trimmed ? (search?.data ?? []) : [];
  const totalResults = search?.meta.total ?? 0;

  // Only show skeletons on a first search; later searches keep the old list.
  const isLoading = Boolean(trimmed) && isFetching && !search;

  // Reset the field and refresh recent searches on every open.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    setRecent(readRecent());
  }, [open]);

  // Keep the highlight inside the current result set.
  useEffect(() => {
    setActiveIndex(0);
  }, [trimmed]);

  // Scroll the highlighted row into view when navigating with the keyboard.
  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const rememberTerm = (term: string) => {
    const next = [
      term,
      ...readRecent().filter((item) => item.toLowerCase() !== term.toLowerCase()),
    ].slice(0, MAX_RECENT);
    setRecent(next);
    writeRecent(next);
  };

  const goToSearch = (term: string) => {
    const value = term.trim();
    if (!value) return;
    rememberTerm(value);
    onClose();
    router.push(`/shop?q=${encodeURIComponent(value)}`);
  };

  const goToProduct = (product: TProduct) => {
    rememberTerm(product.name);
    onClose();
    router.push(`/shop/${product.slug}`);
  };

  const goToCategory = (category: TCategories) => {
    onClose();
    // The shop page filters by category id, falling back to the name as the
    // human-readable label in the search header.
    router.push(
      `/shop?category_id=${category.id}&category=${encodeURIComponent(category.name)}`,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const highlighted = results[activeIndex];
    if (highlighted) {
      goToProduct(highlighted);
      return;
    }
    goToSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    }
  };

  const clearRecent = () => {
    setRecent([]);
    writeRecent([]);
  };

  const lowestPrice = (product: TProduct) => {
    const prices = (product.variants ?? [])
      .map((variant) => variant.price)
      .filter((price) => typeof price === "number");
    if (prices.length === 0) return null;
    return Math.min(...prices);
  };

  const showEmptyState =
    Boolean(trimmed) && !isLoading && !isError && results.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          static
          open={open}
          onClose={onClose}
          initialFocus={inputRef}
          className="relative z-[99999]"
        >
          <DialogBackdrop
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          />

          <div className="fixed inset-0 flex items-start justify-center ~pt-[5rem]/[12rem] px-[1rem]">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.25, ease: [0.25, 0.8, 0.25, 1] },
              }}
              exit={{
                opacity: 0,
                y: -12,
                scale: 0.98,
                transition: { duration: 0.15, ease: "easeIn" },
              }}
              data-lenis-prevent
              className="w-full max-w-[34rem] bg-white rounded-[1rem] shadow-2xl overflow-hidden"
            >
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-[0.75rem] px-[1.25rem] ~py-[0.75rem]/[1rem]"
              >
                <SearchIcon className="size-[1.25rem] shrink-0 text-[#1A1A1A]/50" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search for spices, masalas, blends…"
                  autoComplete="off"
                  aria-label="Search products"
                  className="flex-1 min-w-0 text-[1rem] font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 bg-transparent outline-none leading-[1.5] tracking-[-0.02em]"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors shrink-0"
                    aria-label="Clear search"
                  >
                    <CloseButton className="size-[1.125rem]" />
                  </button>
                ) : (
                  <span className="max-lg:hidden shrink-0 rounded-[0.375rem] border border-[#00000014] bg-[#F8F5EE] px-[0.4rem] py-[0.15rem] text-[0.6875rem] font-semibold leading-[1.4] tracking-[-0.02em] text-[#1A1A1A]/45">
                    ESC
                  </span>
                )}
              </form>

              <div
                ref={listRef}
                className="border-t border-[#00000010] max-h-[min(24rem,55vh)] overflow-y-auto no-scrollbar"
              >
                {isLoading && (
                  <div className="px-[1.25rem] py-[0.875rem] flex flex-col gap-[0.75rem]">
                    {[0, 1, 2].map((row) => (
                      <div key={row} className="flex items-center gap-[0.75rem]">
                        <div className="size-[2.75rem] shrink-0 rounded-[0.5rem] bg-[#F8F5EE] animate-pulse" />
                        <div className="flex-1 space-y-[0.4rem]">
                          <div className="h-[0.6rem] w-1/2 rounded-full bg-[#F8F5EE] animate-pulse" />
                          <div className="h-[0.6rem] w-1/4 rounded-full bg-[#F8F5EE] animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!isLoading && results.length > 0 && (
                  <div className="py-[0.5rem]">
                    {results.map((product, index) => {
                      const price = lowestPrice(product);
                      return (
                        <button
                          key={product.id}
                          type="button"
                          data-index={index}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => goToProduct(product)}
                          className={`flex w-full items-center gap-[0.75rem] px-[1.25rem] py-[0.5rem] text-left transition-colors ${
                            activeIndex === index ? "bg-[#F8F5EE]" : ""
                          }`}
                        >
                          <div className="relative size-[2.75rem] shrink-0 overflow-hidden rounded-[0.5rem] bg-cream">
                            {product.thumbnail_image && (
                              <Image
                                src={product.thumbnail_image}
                                alt={product.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[0.9375rem] font-medium leading-[1.3] tracking-[-0.02em] text-[#1A1A1A]">
                              {product.name}
                            </p>
                            <p
                              className="truncate text-[0.75rem] font-medium uppercase leading-[1.4] tracking-[-0.02em]"
                              style={{ color: product.colour ?? "#F1913D" }}
                            >
                              {product.category_name}
                            </p>
                          </div>
                          {price !== null && (
                            <span className="shrink-0 text-[0.8125rem] font-semibold tracking-[-0.02em] text-main">
                              ₹{price.toFixed(2)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {Boolean(trimmed) && isError && !isLoading && (
                  <div className="px-[1.25rem] py-[1.25rem] text-center">
                    <p className="text-[0.9375rem] font-medium tracking-[-0.02em] text-[#1A1A1A]">
                      Search is unavailable right now
                    </p>
                    <p className="pt-[0.25rem] text-[0.8125rem] text-[#1A1A1A]/50">
                      Please check your connection and try again.
                    </p>
                  </div>
                )}

                {showEmptyState && (
                  <div className="px-[1.25rem] py-[1.25rem] text-center">
                    <p className="text-[0.9375rem] font-medium tracking-[-0.02em] text-[#1A1A1A]">
                      No products match &ldquo;{trimmed}&rdquo;
                    </p>
                    <p className="pt-[0.25rem] text-[0.8125rem] text-[#1A1A1A]/50">
                      Try a different spice or blend name.
                    </p>
                  </div>
                )}

                {!trimmed && !isLoading && recent.length > 0 && (
                  <div className="px-[1.25rem] py-[0.875rem]">
                    <div className="flex items-center justify-between pb-[0.6rem]">
                      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]/40">
                        Recent searches
                      </p>
                      <button
                        type="button"
                        onClick={clearRecent}
                        className="text-[0.75rem] font-medium text-[#1A1A1A]/40 hover:text-main transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-[0.5rem]">
                      {recent.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => goToSearch(term)}
                          className="rounded-full bg-[#F8F5EE] px-[0.75rem] py-[0.35rem] text-[0.8125rem] font-medium tracking-[-0.02em] text-main hover:bg-main hover:text-white transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!trimmed && !isLoading && categories.length > 0 && (
                  <div className="px-[1.25rem] pb-[1rem] pt-[0.25rem]">
                    <p className="pb-[0.6rem] text-[0.75rem] font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]/40">
                      Browse categories
                    </p>
                    <div className="flex flex-wrap gap-[0.5rem]">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => goToCategory(category)}
                          className="rounded-full border border-[#00000014] px-[0.75rem] py-[0.35rem] text-[0.8125rem] font-medium tracking-[-0.02em] hover:bg-[#F8F5EE] transition-colors"
                          style={{ color: category.colour }}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {trimmed && !isError && (
                <button
                  type="button"
                  onClick={() => goToSearch(query)}
                  className="flex w-full items-center gap-[0.5rem] border-t border-[#00000010] px-[1.25rem] py-[0.875rem] text-[0.875rem] font-medium text-main hover:bg-[#F8F5EE] transition-colors"
                >
                  <SearchIcon className="size-[0.875rem] shrink-0" />
                  <span className="truncate">
                    See all results for &ldquo;{trimmed}&rdquo;
                  </span>
                  {totalResults > results.length && (
                    <span className="ml-auto shrink-0 text-[0.8125rem] font-semibold text-[#1A1A1A]/45">
                      {totalResults}
                    </span>
                  )}
                </button>
              )}
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
