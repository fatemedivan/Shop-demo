import ProductsList from "@/components/common/ProductsList";


export default function Home({searchParams}) {
  return (
    <div>
     <ProductsList searchParams={searchParams}/>
    </div>
  );
}
