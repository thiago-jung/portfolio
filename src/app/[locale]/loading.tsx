// /src/app/[locale]/loading.tsx
// Skeleton editorial — mantém o ritmo visual sem layout shift
export default function Loading() {
    return (
        <div
            className="min-h-[100svh] flex items-center justify-center"
            aria-label="Carregando"
            aria-busy="true"
        >
            <div className="w-full max-w-3xl px-[var(--spacing-gutter)] space-y-6">
                {/* Badge skeleton */}
                <div
                    className="animate-pulse h-3 w-40 rounded-none"
                    style={{ background: 'var(--color-surface)' }}
                />

                {/* Headline skeleton — 2 linhas de tamanhos diferentes */}
                <div className="space-y-3">
                    <div
                        className="animate-pulse h-14 rounded-none"
                        style={{ width: '75%', background: 'var(--color-surface)' }}
                    />
                    <div
                        className="animate-pulse h-14 rounded-none"
                        style={{ width: '55%', background: 'var(--color-surface-hover)' }}
                    />
                </div>

                {/* Subheadline skeleton */}
                <div className="space-y-2 pt-2">
                    <div
                        className="animate-pulse h-4 rounded-none"
                        style={{ width: '90%', background: 'var(--color-surface)' }}
                    />
                    <div
                        className="animate-pulse h-4 rounded-none"
                        style={{ width: '70%', background: 'var(--color-surface)' }}
                    />
                </div>

                {/* CTA skeleton */}
                <div className="flex gap-4 pt-2">
                    <div
                        className="animate-pulse h-10 w-36 rounded-none"
                        style={{ background: 'var(--color-surface-hover)' }}
                    />
                    <div
                        className="animate-pulse h-10 w-44 rounded-none"
                        style={{ background: 'var(--color-surface)' }}
                    />
                </div>
            </div>
        </div>
    )
}