import nodemailer from 'nodemailer'

import {
  EmailTemplates,
  type NodemailerAddresObject,
  type EmailMessageConfig,
  type NodemailerSendMessageConfig,
} from '@ts/email/EmailMessageProps'
import { error } from 'node_modules/astro/dist/core/logger/core'

export async function sendMessageToEmail(props: EmailMessageConfig) {
  try {
    if (!props.text && !props.html) {
      throw new Error('Missing message (text or html).')
    }

    if (props.text && props.html) {
      throw new Error('Only one thing was expected: "text" or "html".')
    }

    if (props.template) {
      switch (props.template) {
        case EmailTemplates.NewLead:
          if (props.poolConfig || props.subject || props.email) {
            throw new Error('This template only needs "template" and "message".')
          }

          props.poolConfig = import.meta.env.NEW_LEADS_TRANSPORT
          props.subject = 'Новая заявка'
          props.email = import.meta.env.SMTPS_NEW_LEADS_EMAIL

          break

        case EmailTemplates.LeadToManager:
          throw new Error(`Данный шаблон пока не прописан`)

        case EmailTemplates.ManagerToLead:
          throw new Error(`Данный шаблон пока не прописан`)

        default:
          throw new Error('Unknown message template.')
      }
    }

    // poolConfig - данные почтового SMTP сервера ОТПРАВИТЕЛЯ в виде строки.
    if (!props.poolConfig) {
      throw new Error(`"PoolConfig" is undefined or missing..`)
    }

    let transporter = nodemailer.createTransport(props.poolConfig)

    if (!props.email || typeof props.email !== 'string') {
      throw new Error('Invalid or missing "email".')
    }

    if (!props.subject || typeof props.subject !== 'string') {
      props.subject = 'Без темы'
    }

    let config: NodemailerSendMessageConfig = {
      from: props.from as NodemailerAddresObject, // из вне | по шаблону |
      to: props.email, // из вне | по шаблону |
      cc: props?.cc || [], // из вне | по шаблону
      bcc: props?.bcc || [], // из вне | по шаблону
      subject: props.subject, // из вне | по шаблону | 'Без темы'
      text: props.text || undefined, // из вне | по шаблону |
      html: props.html || undefined, // из вне | по шаблону |
      attachments: props.attachments || undefined,
    }

    let data = await transporter.sendMail(config)
    return { data, error: undefined }
  } catch (error) {
    return { data: undefined, error }
  }
}
