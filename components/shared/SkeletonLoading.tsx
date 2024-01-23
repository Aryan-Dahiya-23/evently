import { Skeleton } from "@/components/ui/skeleton"

type SkeletonLoadingProps = {
    length: number
}

const SkeletonLoading = ({ length }: SkeletonLoadingProps) => {

    const data = Array.from({ length }, (_, index) => index);

    return (
        <div className="flex flex-col items-center gap-10">
            <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                {data.map((index) => {
                    return (
                        <li key={index} className="flex justify-center">

                            <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] cursor-pointer'>
                                <Skeleton className="w-full h-1/2" />
                                <div className='flex flex-col gap-7 h-1/2 py-7 px-5'>
                                    <div className='flex flex-row gap-3 w-full'>
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                    </div>
                                    <Skeleton className='h-4 w-60 rounded-xl' />
                                    <Skeleton className='h-4 w-60 rounded-xl' />
                                    <Skeleton className='h-4 w-28 rounded-xl mt-auto' />
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SkeletonLoading