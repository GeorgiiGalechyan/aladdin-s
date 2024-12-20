import nodemailer from 'nodemailer'

import { EmailTemplates, type EmailMessageConfig } from '@ts/email/EmailMessageProps'

async function sendMessageToEmail(props: EmailMessageConfig) {
  console.log(props)
  let html
  switch (props.template) {
    case EmailTemplates.NewLead:
      if (props.poolConfig || props.subject || props.email) {
        throw new Error('This template only needs "template" and "message".')
      }

      props.poolConfig = import.meta.env.PUBLIC_NODEMAILER_NEW_LEADS_SMTP
      props.subject = 'Новая заявка'
      props.email = import.meta.env.PUBLIC_NODEMAILER_NEW_LEADS_EMAIL
      html = `<div>
      <strong>${props.message.leadName}:</strong> 
      
      </div>`

      break

    case EmailTemplates.LeadToManager:
      throw new Error(`Данный шаблон пока не прописан`)

    case EmailTemplates.ManagerToLead:
      throw new Error(`Данный шаблон пока не прописан`)

    default:
      throw new Error('Unknown message template.')
  }

  // poolConfig - данные почтового SMTP сервера ОТПРАВИТЕЛЯ в виде строки.
  if (!props.poolConfig) {
    throw new Error(`This template doesn't need a "poolConfig".`)
  }

  let transporter = nodemailer.createTransport(props.poolConfig)

  // Проверка соединения с SMTP сервером
  try {
    await transporter.verify((error, success: any) => {
      if (error) {
        console.error(error)
      } else {
        console.log({
          message: 'Nodemailer smtp-server is connected!',
          success: success,
        })
      }
    })

    //
    if (!props.email || typeof props.email !== 'string') {
      throw new Error('Invalid or missing "email".')
    }

    if (!props.message || typeof props.message !== 'string') {
      throw new Error('Invalid or missing "message".')
    }

    if (!props.subject || typeof props.subject !== 'string') {
      props.subject = 'Без темы'
    }

    let message = {
      from: props.email, // из вне или по шаблону
      to: props.email, // из вне или по шаблону
      subject: props.subject, // из вне или по шаблону
      html: props.message, // приходит из вне
    }

    let successData = await transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error(error)
      } else {
        console.log('The email was successfully sent.')
        return info
      }
    })

    return successData
  } catch (error) {
    console.error({
      message: 'Ошибка внутри try/catch в файле src/utils/send-to-email.ts',
      error: error,
    })
  }
}

export { sendMessageToEmail }
