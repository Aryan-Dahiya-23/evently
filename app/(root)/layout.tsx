import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster />
            <Footer />
        </div>
    )
}