import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import SkeletonLoading from '@/components/shared/SkeletonLoading';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import { Suspense } from 'react';

type RelatedEventsProps = {
  categoryId: string,
  eventId: string,
  page: number,
}

const RelatedEvents = async ({ categoryId, eventId, page }: RelatedEventsProps) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/events/relatedEvents?categoryId=${categoryId}&eventId=${eventId}&page=${page}`, {
    method: 'GET',
    next: { revalidate: 3600 },
  });

  const relatedEvents = await res.json();

  return (
    <Collection
      data={relatedEvents?.data}
      emptyTitle="No Events Found"
      emptyStateSubtext="Come back later"
      collectionType="All_Events"
      limit={3}
      page={page}
      totalPages={relatedEvents?.totalPages}
    />
  )
}

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/events/event?id=${id}`, {
    method: 'GET',
    next: { revalidate: 3600 },
  })

  const event = await res.json();

  const page = Number(searchParams?.page) || 1;

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="md:h-full md:max-h-full max-h-[300px] min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className='h2-bold'>{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree ? 'FREE' : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{' '}
                  <span className="text-primary-500">{event.organizer.firstName} {event.organizer.lastName}</span>
                </p>
              </div>
            </div>

            <CheckoutButton event={event} />

            <div className="flex flex-col gap-5">
              <div className='flex gap-2'>
                <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center space-x-0.5">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} - {' '}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -  {' '}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-2">
                <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">{"What You'll Learn:"}</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <a href={event.url} target="_blank" className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.url}</a>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        <Suspense fallback={<SkeletonLoading length={3} />}>
          <RelatedEvents
            categoryId={event.category._id}
            eventId={event._id}
            page={page}
          />
        </Suspense>

      </section>
    </>
  )
}

export default EventDetails
