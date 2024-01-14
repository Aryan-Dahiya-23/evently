import { SignIn } from "@clerk/nextjs";

export default function page() {
    return (
        <SignIn />
    )
}


// import { SignIn } from "@clerk/nextjs";

// export default async function Page() {
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // await delay(10000);

//     return (
//         <div>
//             <SignIn />
//         </div>
//     );
// }
