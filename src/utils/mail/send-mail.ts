export const prerender = true

import nodemailer from 'nodemailer'

interface IEmailData {
  email: string
  htmlText: string
  subject: string
  name?: string
}

let poolConfig = import.meta.env.PUBLIC_M_POOLCONFIG

async function sendMail(props: IEmailData) {
  try {
    let transporter = nodemailer.createTransport(poolConfig)

    // По идее его нужно вызывать не здесь, а на сервере при запуске Express или Fastify в качестве проверки готвности почтового сервера. Пусть пока будет здесь.
    transporter.verify((error, success: any) => {
      if (error) {
        throw error
      } else {
        console.log('Mail smtp-server is connected!')
      }
    })

    let email
    if (typeof props.email === 'string') {
      email = props.email
    } else {
      email = import.meta.env.PUBLIC_M_USER
    }

    let message = {
      from: import.meta.env.PUBLIC_M_USER,
      to: email,
      subject: props.subject,
      html: props.htmlText,
    }

    await transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error(error)
        throw error
      } else {
        console.log('The email was successfully sent.')
        return info
      }
    })
  } catch (error) {
    console.error('Ошибка внутри src/utils/send-mail.ts')
  }
}

export { sendMail }
