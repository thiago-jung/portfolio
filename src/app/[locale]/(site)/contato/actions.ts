'use server'
// /src/app/[locale]/(site)/contato/actions.ts
import { z } from 'zod'

const contactSchema = z.object({
  name:    z.string().min(2,  'Nome muito curto'),
  company: z.string().optional(),
  email:   z.string().email('Email inválido'),
  budget:  z.string().optional(),
  message: z.string().min(20, 'Descreva seu projeto (mín. 20 caracteres)'),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type ActionResult = { success: boolean; error?: string }

export async function sendContactAction(data: ContactFormData): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message }
  }

  // PERF: Edge runtime — latência mínima global
  // Integrar com Resend, SendGrid, ou outra API de email aqui
  // Exemplo com Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' })

  // Simulação para desenvolvimento:
  await new Promise(r => setTimeout(r, 800))

  return { success: true }
}
