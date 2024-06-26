import type { Metadata } from 'next'
import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

export const metadata: Metadata = {
    title: 'Create Event - Evently'
  }
  
const CreateEvent = async () => {
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // await delay(15000);

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
            </section>

            <div className="wrapper my-8">
                <EventForm userId={userId} type="Create" />
            </div>
        </>
    )
}

export default CreateEvent