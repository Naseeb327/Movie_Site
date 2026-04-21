import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryPage from "../../../src/views/Category";
import { CATEGORY_TITLES, isValidCategory } from "../../../src/lib/movies";

export async function generateMetadata({ params }) {
  const { categoryId } = await params;
  const title = CATEGORY_TITLES[categoryId];

  if (!title) {
    return { title: "Category Not Found" };
  }

  return {
    title,
    description: `Browse ${title.toLowerCase()} available on MovieHub.`,
  };
}

export default async function CategoryRoutePage({ params }) {
  const { categoryId } = await params;

  if (!isValidCategory(categoryId)) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <CategoryPage key={categoryId} categoryId={categoryId} />
    </Suspense>
  );
}
