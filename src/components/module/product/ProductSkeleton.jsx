
const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4 animate-pulse bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm">
    
      <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-700 rounded-xl"></div>

    
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full w-3/4 mx-auto"></div>

     
      <div className="flex justify-center gap-x-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-12 h-10 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
        ))}
      </div>

    
      <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full w-1/2 mx-auto"></div>
    </div>
  );
};

export default ProductSkeleton;