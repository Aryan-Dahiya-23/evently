import Collection from '@/components/shared/Collection'
import SkeletonLoading from '@/components/shared/SkeletonLoading'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { Suspense } from 'react'

type Props = {
  userId: string,
  page: number,
}

const Orders = async ({ userId, page }: Props) => {

  // const orders = await getOrdersByUser({ userId, page })

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/events/orderedEvents?userId=${userId}&page=${page}`, {
    method: 'GET',
    next: { revalidate: 3600 },
  });
  const orders = await res.json();

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  return (
    <Collection
      data={orderedEvents}
      emptyTitle="No event tickets purchased yet"
      emptyStateSubtext="No worries - plenty of exciting events to explore!"
      collectionType="My_Tickets"
      limit={3}
      page={page}
      urlParamName="ordersPage"
      totalPages={orders?.totalPages}
    />
  )
}

const Events = async ({ userId, page }: Props) => {

  // const organizedEvents = await getEventsByUser({ userId, page })

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/events/organizedEvents?userId=${userId}&page=${page}`, {
    method: 'GET',
    next: { revalidate: 3600 },
  });

  const organizedEvents = await res.json();

  return (
    <Collection
      data={organizedEvents?.data}
      emptyTitle="No events have been created yet"
      emptyStateSubtext="Go create some now"
      collectionType="Events_Organized"
      limit={3}
      page={page}
      urlParamName="eventsPage"
      totalPages={organizedEvents?.totalPages}
    />
  )
}

const ProfilePage = ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">

        <Suspense fallback={<SkeletonLoading length={3} />}>
          <Orders userId={userId} page={ordersPage} />
        </Suspense>

      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Suspense fallback={<SkeletonLoading length={3} />}>
          <Events userId={userId} page={eventsPage} />
        </Suspense>
      </section>
    </>
  )
}

export default ProfilePage