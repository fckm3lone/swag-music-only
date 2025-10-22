"use client";

import {useState} from "react";
import {Container, PageTitle} from "@/components/shared";
import {CategoryTabs} from "@/components/catalog/category-tabs";
import {SortSelect} from "@/components/catalog/sort-select";
import {FilterSidebar} from "@/components/catalog/filter-sidebar";
import {ProductGrid} from "@/components/catalog/product-grid";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";

export default function Home() {
  const [sort, setSort] = useState<string | null>(null);

  return (
      <Container>
        <PageTitle title="Find Your Perfect Sound" />
        <div className="flex flex-col">
          {/* Категории и сортировка */}
          <div className="flex justify-between items-center pb-4">
            {/* Desktop: Категории */}
            <div className="hidden md:block">
              <CategoryTabs />
            </div>
            {/* Mobile: Drawer Trigger */}
            <div className="md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                      variant="ghost"
                      className="font-medium hover:bg-transparent cursor-pointer"
                  >
                    <img src="/filter.png" alt="Filter" width={24} height={24} />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="p-4 max-h-[50vh] overflow-y-auto">
                  <div className="mb-4 mt-4">
                    <CategoryTabs />
                  </div>
                  <FilterSidebar />
                  <DrawerClose asChild>
                    <Button variant="outline" className="mt-4 w-full">
                      Закрыть
                    </Button>
                  </DrawerClose>
                </DrawerContent>
              </Drawer>
            </div>
            {/* Сортировка справа */}
            <SortSelect value={sort} onChange={setSort} />
          </div>

          {/* Основной контент */}
          <div className="flex mt-6 gap-8">
            {/* Desktop: Фильтры */}
            <div className="hidden md:block">
              <FilterSidebar />
            </div>

            {/* Каталог товаров */}
            <div className="flex-1">
              <ProductGrid sort={sort} />
            </div>
          </div>
        </div>
      </Container>
  );
}