import {Container, PageTitle} from "@/components/shared";
import {CategoryTabs} from "@/components/catalog/category-tabs";
import {SortSelect} from "@/components/catalog/sort-select";
import {FilterSidebar} from "@/components/catalog/filter-sidebar";
import {ProductGrid} from "@/components/catalog/product-grid";


export default function Home() {
  return (
 <Container>
     <PageTitle title="Find Your Perfect Sound" />
     <div className="flex flex-col">


         <div className="flex justify-between items-center  pb-4">
             <CategoryTabs />
             <SortSelect />
         </div>

         <div className="flex mt-6 gap-8">
             <FilterSidebar />
             <div className="flex-1">
                 <ProductGrid />

             </div>
         </div>
     </div>

 </Container>
  );
}
