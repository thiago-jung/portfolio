'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Download, Share2, Copy, Printer, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { cardFront, cardBack } from '@/lib/animation-variants'
import { SITE } from '@/constants/site'

// ─── Card Front ───────────────────────────────────────────────────────────────

function CardFront() {
  const t = useTranslations('card.front')
  const { author } = SITE

  return (
    <div
      className="business-card-print absolute inset-0 flex flex-col justify-between p-8 bg-grid"
      style={{
        background: 'var(--color-base)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Coordenadas — detalhe de assinatura */}
      <div
        className="text-label opacity-30"
        style={{ fontSize: '0.55rem' }}
        aria-hidden="true"
      >
        {author.coordinates.lat}°S {Math.abs(author.coordinates.lng)}°W
      </div>

      {/* Nome + cargo */}
      <div>
        <div
          className="font-display font-extrabold tracking-[-0.03em] mb-2"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            color: 'var(--color-text-primary)',
          }}
        >
          {author.name}
        </div>
        <div className="text-label" style={{ color: 'var(--color-accent)' }}>
          {author.role}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <span className="status-blink" style={{ color: 'var(--color-accent)', fontSize: '0.4rem' }}>●</span>
        <span className="text-label opacity-40" style={{ fontSize: '0.6rem' }}>
          {t('status')}
        </span>
      </div>
    </div>
  )
}

// ─── Card Back ────────────────────────────────────────────────────────────────

function CardBack() {
  const t = useTranslations('card.back')
  const { author } = SITE

  // DECISÃO: Verso com fundo #00FF94 — inversão ousada que nenhum
  // portfólio de dev usa. CEO vai fotografar e mandar no WhatsApp.
  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-8"
      style={{
        background: 'var(--color-accent)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
      }}
    >
      {/* QR Code placeholder — substituir com <QRCodeSVG> do pacote qrcode.react */}
      <div className="flex items-center gap-6">
        <div
          className="w-16 h-16 border-2 flex items-center justify-center text-[0.45rem] font-accent"
          style={{ borderColor: 'var(--color-base)', color: 'var(--color-base)' }}
          aria-label="QR Code"
        >
          QR
        </div>
        <div
          className="text-label"
          style={{ color: 'var(--color-base)', fontSize: '0.6rem' }}
        >
          {t('statusBar')}
        </div>
      </div>

      {/* Contatos */}
      <div className="space-y-2">
        {[
          { prefix: '✉', value: author.email   },
          { prefix: '⬡', value: author.website  },
          { prefix: '☎', value: author.phone ?? '' },
        ].filter(({ value }) => value).map(({ prefix, value }) => (
          <div
            key={value}
            className="font-body text-[0.65rem] flex gap-2"
            style={{ color: 'var(--color-base)' }}
          >
            <span>{prefix}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div
        className="text-label status-blink"
        style={{ color: 'var(--color-base)', fontSize: '0.55rem' }}
      >
        ● {t('statusBar')}
      </div>
    </div>
  )
}

// ─── Business Card Page Component ─────────────────────────────────────────────

export function BusinessCard({ locale }: { locale: string }) {
  const t = useTranslations('card')
  const [isFlipped, setIsFlipped] = useState(false)

  const handleDownloadVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${SITE.author.name}`,
      `TITLE:${SITE.author.role}`,
      `ORG:${SITE.author.company}`,
      `EMAIL:${SITE.author.email}`,
      SITE.author.phone ? `TEL:${SITE.author.phone}` : '',
      `URL:${SITE.url}`,
      `ADR:;;${SITE.author.location};;;;`,
      'END:VCARD',
    ].filter(Boolean).join('\n')

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `${SITE.author.name.replace(/\s+/g, '-')}.vcf`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(locale === 'pt-BR' ? 'Contato salvo!' : 'Contact saved!')
  }

  const handleShare = async () => {
    const shareData = {
      title: SITE.author.name,
      text: SITE.author.role,
      url: `${SITE.url}/${locale}/cartao`,
    }
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(shareData.url)
      toast.success(locale === 'pt-BR' ? 'Link copiado!' : 'Link copied!')
    }
  }

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(SITE.author.email)
    toast.success(locale === 'pt-BR' ? 'Email copiado!' : 'Email copied!')
  }

  const actions = [
    { icon: RefreshCw,  label: t('actions.flip'),     onClick: () => setIsFlipped(v => !v) },
    { icon: Download,   label: t('actions.download'),  onClick: handleDownloadVCard           },
    { icon: Share2,     label: t('actions.share'),     onClick: handleShare                   },
    { icon: Copy,       label: t('actions.copyEmail'), onClick: handleCopyEmail               },
    { icon: Printer,    label: t('actions.print'),     onClick: () => window.print()          },
  ]

  return (
    <section aria-label={locale === 'pt-BR' ? 'Cartão de visita digital' : 'Digital business card'}>
      {/* Card 3D */}
      <div
        className="mx-auto"
        style={{ width: 'min(380px, 90vw)', perspective: '1200px' }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 22 }}
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.47%', // aspect ratio 85:54
            transformStyle: 'preserve-3d',
          }}
        >
          <CardFront />
          <CardBack />
        </motion.div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {actions.map(({ icon: Icon, label, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            data-cursor-label="OK"
            className="inline-flex items-center gap-2 px-4 py-2 border font-accent text-xs tracking-widest uppercase transition-all duration-150 hover:border-accent"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>

      {/* QR ampliado + instrução */}
      <div className="mt-12 text-center space-y-4">
        <div
          className="inline-block p-4 border"
          style={{ borderColor: 'var(--color-border-accent)' }}
          aria-label="QR Code ampliado"
        >
          {/* substituir por <QRCodeSVG value={`${SITE.url}/${locale}/cartao`} size={120} /> */}
          <div
            className="w-32 h-32 flex items-center justify-center font-accent text-xs"
            style={{ color: 'var(--color-accent)', border: '1px solid var(--color-accent)' }}
          >
            QR CODE
          </div>
        </div>
        <p className="text-label opacity-40">{t('actions.qrInstructions')}</p>
      </div>
    </section>
  )
}
