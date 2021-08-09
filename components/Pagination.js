import Link from "next/link";

export default function Pagination({ numPages, currentPage }) {
  const isFirst = currentPage === 1;
  const isLastPage = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  if (numPages === 1) return <></>;
  return (
    <div className="mt-6">
      <ul className="flex pl-0 list-none my-2 justify-between items-center">
        {!isFirst && (
          <Link href={prevPage}>
            <li className="relative justify-start block py-2 px-3 leading-tight   bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              Previous Page
            </li>
          </Link>
        )}

        {/* {[...Array(numPages).keys()].map((x) => (
          <Link key={x + 1} href={`/blog/page/${x + 1}`}>
            <li className=" relative justify-center block py-2 px-3 leading-tight   bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              {x + 1}
            </li>
          </Link>
        ))} */}

        {!isLastPage && (
          <Link href={nextPage}>
            <li className="relative block py-2 px-3 leading-tight   bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              Next Page
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}
