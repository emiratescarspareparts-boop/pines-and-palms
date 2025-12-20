import React from 'react';
import Footer from '../../../components/footer';
import RelatedPost from '../relatedpost/page';
import Image from 'next/image';
import carBlog from "../../../public/lib/blog.json"
export const revalidate = 86400;
export const runtime = 'nodejs';
export const dynamicParams = false;

export function generateStaticParams() {
  return carBlog
    .filter(item => item?.SLUG)
    .map(item => ({
      slug: item.SLUG
    }));
}

export function getBlog(slug) {
  const decodedSlug = decodeURIComponent(slug);

  return carBlog.find(
    (item) => item && item.SLUG === decodedSlug
  ) || null;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getBlog(slug);
  return {
    title: `${data.TITLE} | EMIRATESCAR`,
    description: `${data.DESCRIPTION}`,
    manifest: 'https://www.emirates-car.com/manifest.json',
    openGraph: {
      images: 'https://www.emirates-car.com/favicon.png',
      title: `${data.TITLE} | EMIRATESCAR`,
      description: `${data.DESCRIPTION}`,
      url: `https://emirates-car.com/${data.TITLE}`,
      image: `https://www.emirates-car.com/img/blog/ + ${slug}`,
      siteName: 'EMIRATESCAR',
      images: [
        {
          url: 'https://www.emirates-car.com/icon-192x192.png',
          width: 192,
          height: 192
        },
        {
          url: 'https://www.emirates-car.com/icons/icon-512x512.png',
          width: 512,
          height: 512,
          alt: 'car parts'
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.TITLE}`,
      description: `${data.DESCRIPTION}`,
      images: ['https://www.emirates-car.com/favicon.png']
    },
    icons: {
      icon: 'https://www.emirates-car.com/favicon.png',
      shortcut: 'https://www.emirates-car.com/icons/icon-96x96.png',
      apple: 'https://www.emirates-car.com/icons/icon-192x192.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: 'https://www.emirates-car.com/icons/icon-152x152.png'
      }
    },
    category: 'Blog',
    alternate: {
      cannonical: "https://emirates-car.com",
    }
  };
}


export default function Blog({ params }) {
  const { slug } = params;
  const data = getBlog(slug);
  if (!data) {
    return <div className="p-10 text-center">Blog not found</div>;
  }
  return (
    <div>
      <div className="container mx-auto w-full xs:m-0">
        <div className="w-full p-4">
          <div className="flex xs:grid xs:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1 2xs:grid 2xs:grid-cols-1">
            <div className="w-3/4 xs:w-full sm:w-full md:w-full 2xs:w-full shadow-md xs:shadow-none p-5 xs:p-2">
              <div className="bg-blue-200 text-center rounded-xl text-white text-base font-extrabold flex items-center justify-center">
                <Image
                  alt={data.ALT}
                  src={'/img/blog/' + data.IMG}
                  width={940}
                  height={350}
                />
              </div>
              <h3 className="font-bold mb-2 text-5xl sm:text-2xl xs:text-2xl pt-10">
                {data.TITLE}
              </h3>
              <p className="text-sm text-gray-400 font-semibold uppercase pb-5 xs:text-xs">
                {data.TIME} - {data.DATE_PUBLISHED}
              </p>
              <div className="text-base font-sans">
                <div dangerouslySetInnerHTML={{ __html: data.CONTENT }} />
              </div>
              <div className="flex py-5">
                <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                &nbsp;
                <div>
                  <p className="text-base xs:text-md font-normal pt-2">
                    <b>Author:</b> {data.AUTHOR}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/4 p-4 xs:p-2 xs:w-full md:w-full sm:w-full 2xs:w-full">
              <RelatedPost />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
