import React from 'react';
import Footer from '../../../components/footer';
import RelatedPost from '../relatedpost/page';
import Image from 'next/image';
import carBlog from "../../../public/lib/blog.json"
export const revalidate = 1814400;
export const runtime = 'edge';
export const dynamicParams = false;


export async function getBlog(slug) {
  const blog = carBlog.filter(c => c.TITLE === decodeURIComponent(slug))

  return blog;
}

export default async function Blog({ params }) {
  const { slug } = params;
  const data = await getBlog(slug);
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
                <div dangerouslySetInnerHTML={{ __html: data.CONTENT }}></div>
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
