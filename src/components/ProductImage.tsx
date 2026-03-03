import { productImages } from '@/assets/products';
import { Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  productId: string;
  className?: string;
  iconSize?: string;
}

export default function ProductImage({ productId, className, iconSize = 'w-8 h-8' }: ProductImageProps) {
  const src = productImages[productId];

  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={cn('object-cover rounded-lg', className)}
        loading="lazy"
      />
    );
  }

  return (
    <div className={cn('rounded-lg bg-muted flex items-center justify-center', className)}>
      <Package className={cn('text-muted-foreground/40', iconSize)} />
    </div>
  );
}
