'use server'
// /src/app/[locale]/(site)/contato/actions.ts
import { z } from 'zod'
import { Resend } from 'resend'

const contactSchema = z.object({
    name: z.string().min(2, 'Nome muito curto'),
    company: z.string().optional(),
    email: z.string().email('Email inválido'),
    budget: z.string().optional(),
    message: z.string().min(20, 'Descreva seu projeto (mín. 20 caracteres)'),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type ActionResult = { success: boolean; error?: string }

// DECISÃO: Resend como provider de email — deliverability superior ao SMTP,
// SDK minimalista, free tier suficiente para volume de portfólio.
// ALTERNATIVA: nodemailer com SMTP — descartado por complexidade de config e
// maior probabilidade de cair em spam.
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null

export async function sendContactAction(data: ContactFormData): Promise<ActionResult> {
    const parsed = contactSchema.safeParse(data)
    if (!parsed.success) {
        return { success: false, error: parsed.error.errors[0]?.message }
    }

    const { name, company, email, budget, message } = parsed.data

    // Guard: Se RESEND_API_KEY não estiver configurada, loga no servidor
    // sem quebrar em produção (útil para testes locais)
    if (!resend) {
        console.warn('[Contact] RESEND_API_KEY não configurada — simulando envio')
        console.log('[Contact] Dados recebidos:', { name, company, email, budget })
        await new Promise(r => setTimeout(r, 500))
        return { success: true }
    }

    try {
        await resend.emails.send({
            // IMPORTANTE: trocar pelo domínio verificado no Resend
            // Free tier: usar 'onboarding@resend.dev' para testes
            from: `Portfólio <noreply@${process.env.RESEND_DOMAIN ?? 'resend.dev'}>`,
            to: [process.env.CONTACT_EMAIL ?? 'contato@thiago.dev'],
            replyTo: email,
            subject: `[Portfólio] ${company ? `${company} — ` : ''}${name}`,
            html: `
                <div style="font-family: monospace; max-width: 600px; background: #050508; color: #E8EDF5; padding: 32px; border: 1px solid rgba(232,237,245,0.08);">
                    <div style="color: #00FF94; font-size: 11px; letter-spacing: 0.15em; margin-bottom: 24px; text-transform: uppercase;">
                        ● NOVO CONTATO — PORTFÓLIO
                    </div>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,237,245,0.08); color: rgba(232,237,245,0.5); font-size: 12px; width: 100px;">NOME</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,237,245,0.08); color: #E8EDF5; font-size: 12px;">${name}</td>
                        </tr>
                        ${company ? `
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,237,245,0.08); color: rgba(232,237,245,0.5); font-size: 12px;">EMPRESA</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,237,245,0.08); color: #E8EDF5; font-size: 12px;">${company}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,237,245,0.08); color: rgba(232,237,245,0.5); font-size: 12px;">EMAIL</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,237,245,0.08); color: #00FF94; font-size: 12px;">
                                <a href="mailto:${email}" style="color: #00FF94;">${email}</a>
                            </td>
                        </tr>
                        ${budget ? `
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,237,245,0.08); color: rgba(232,237,245,0.5); font-size: 12px;">ORÇAMENTO</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,237,245,0.08); color: #E8EDF5; font-size: 12px;">${budget}</td>
                        </tr>
                        ` : ''}
                    </table>

                    <div style="margin-top: 24px;">
                        <div style="color: rgba(232,237,245,0.5); font-size: 12px; margin-bottom: 12px; letter-spacing: 0.1em; text-transform: uppercase;">PROJETO</div>
                        <p style="color: #E8EDF5; font-size: 14px; line-height: 1.7; white-space: pre-wrap; margin: 0;">${message}</p>
                    </div>

                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(232,237,245,0.08); color: rgba(232,237,245,0.3); font-size: 11px;">
                        Enviado em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
                    </div>
                </div>
            `,
        })

        return { success: true }
    } catch (err) {
        console.error('[Contact] Erro ao enviar email:', err)
        return { success: false, error: 'Erro interno. Tente novamente.' }
    }
}