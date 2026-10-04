export function StarRating({ rating = "4.9", reviews = "2,400" }: { rating?: string; reviews?: string }) {
  return (
    <div className="flex items-center justify-center gap-2" aria-label={`Rated ${rating} out of 5 from ${reviews} reviews`}>
      <span className="text-lg tracking-tight text-amber-400" aria-hidden="true">★★★★★</span>
      <span className="text-sm font-medium text-slate-600">
        {rating} ({reviews} reviews)
      </span>
    </div>
  );
}
