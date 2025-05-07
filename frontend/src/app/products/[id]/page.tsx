
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import styles from '../ProductDetailPage.module.scss';
import { Product } from '@/types';

interface ProductDetailPageProps {
  params: { id: string };
}

async function fetchProduct(id: string): Promise<Product | null> {
  const res = await fetch(`http://localhost:5000/api/products/${id}`);
  if (!res.ok) return null;
  const body = await res.json();
  return body.data as Product;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = await fetchProduct(params.id);
  if (!product) {
    return { title: 'Product Not Found | E-Commerce Store' };
  }
  return {
    title: `${product.name} | E-Commerce Store`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await fetchProduct(params.id);
  console.log(product);
  

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>
        <Link href="/products" className={styles.backLink}>
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.imageUrl || '/images/placeholder.jpg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      <div className={styles.details}>
        <h1 className={styles.title}>{product.name}</h1>
        <div className={styles.price}>₹{product.price.toFixed(2)}</div>
        <span className={`${styles.stock} ${product.stock > 0 ? styles.in : styles.out}`}>
          {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
        </span>

        <section className={styles.section}>
          <h2>Description</h2>
          <p>{product.description}</p>
        </section>

        <section className={styles.section}>
          <h2>Category</h2>
          <Link href={`/products?category=${product.category}`} className={styles.categoryLink}>
            {product.category}
          </Link>
        </section>

        <AddToCartButton productId={product._id || ''} inStock={product.stock > 0} />

        <section className={`${styles.section} ${styles.divider}`}>
          <h2>Shipping & Returns</h2>
          <ul>
            <li>Free shipping on orders over ₹50</li>
            <li>Standard delivery: 3–5 business days</li>
            <li>Easy returns within 30 days</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
