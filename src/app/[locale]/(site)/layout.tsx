import type { ReactNode } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface SiteLayoutProps {
    children: ReactNode
    params: Promise<{ locale: string }>
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
    const { locale } = await params
    return (
        <>
            <Navbar locale={locale} />
            {children}
            <Footer locale={locale} />
        </>
    )
}