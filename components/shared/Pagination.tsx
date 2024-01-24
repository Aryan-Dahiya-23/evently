// 'use client'

// import Link from 'next/link';
// import React from 'react';
// import { Button } from '../ui/button';

// type PaginationProps = {
//     page: number | string;
//     totalPages: number;
//     urlParamName?: string;
// };

// const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {

//     return (
//         <div className="flex gap-2">

//             {Number(page) > 1 ?
//                 <Link href={`?${urlParamName || 'page'}=${Number(page) - 1}`} passHref scroll={false}>
//                     <Button
//                         size="lg"
//                         variant="outline"
//                         className="w-28"
//                     >
//                         Previous
//                     </Button>
//                 </Link>
//                 :
//                 <Button
//                     size="lg"
//                     variant="outline"
//                     className="w-28"
//                     disabled={true}
//                 >
//                     Previous
//                 </Button>
//             }

//             {Number(page) < totalPages ?
//                 <Link href={`?${urlParamName || 'page'}=${Number(page) + 1}`} passHref scroll={false}>
//                     <Button
//                         size="lg"
//                         variant="outline"
//                         className="w-28"
//                     >
//                         Next
//                     </Button>
//                 </Link>
//                 :
//                 <Button
//                     size="lg"
//                     variant="outline"
//                     className="w-28"
//                     disabled={true}
//                 >
//                     Next
//                 </Button>
//             }
//         </div>

//     );
// };

// export default Pagination;

"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'

type PaginationProps = {
    page: number | string,
    totalPages: number,
    urlParamName?: string
}

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(false);
    }, [searchParams.toString()]);

    const onClick = (btnType: string) => {
        setLoading(true);
        const pageValue = btnType === 'next'
            ? Number(page) + 1
            : Number(page) - 1

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || 'page',
            value: pageValue.toString(),
        })

        router.push(newUrl, { scroll: false })
    }

    return (
        <>
            {loading && (
                <style jsx global>{`
                    body {
                        opacity: 0.35;
                        pointer-events: none;
                    }
                `}</style>
            )}

            <div className="flex gap-2">
                <Button
                    size="lg"
                    variant="outline"
                    className="w-28"
                    onClick={() => onClick('prev')}
                    disabled={Number(page) <= 1}
                >
                    Previous
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="w-28"
                    onClick={() => onClick('next')}
                    disabled={Number(page) >= totalPages}
                >
                    Next
                </Button>
            </div>
        </>
    )
}

export default Pagination