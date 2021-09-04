import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardSkeleton from "../../components/cardskeleton";
import Layout from "../../components/layout";
import ProductCard from "../../components/productcard";
import { recentCategory } from "../../slices/categorySlice";
import NotFound from "../404";
import Head from "next/head";

export async function getStaticProps({ params }) {
  const { slug } = params;
  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "/categories");
  const data = await res.json();
  const resTypes = await fetch(process.env.NEXT_PUBLIC_APIURL + "/types");
  const dataTypes = await resTypes.json();
  const resItems = await fetch(
    process.env.NEXT_PUBLIC_APIURL +
      `/items?category.slug=${slug}&_sort=published_at:DESC`
  );
  const dataItems = await resItems.json();

  return {
    props: {
      data,
      dataItems,
      dataTypes,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "/categories");
  const data = await res.json();

  const paths = data.map((cat) => ({
    params: { slug: cat.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

function Category({ data, dataItems, dataTypes }) {
  if (!dataItems || !data) {
    return <NotFound />;
  }

  const recent_category = useSelector(recentCategory);
  const data_items = dataItems.filter((item) => {
    if (recent_category.length > 0) {
      return item.type.name == recent_category;
    } else {
      return true;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <Head>
        <title>wefootwear | Shop</title>
      </Head>
      <Layout categories={data} types={dataTypes}>
        {!loading ? (
          data_items.length > 0 ? (
            data_items.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))
          ) : (
            <p className="col-span-full mx-auto text-sm text-gray-400">
              No item found
            </p>
          )
        ) : (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
      </Layout>
    </>
  );
}

export default Category;
