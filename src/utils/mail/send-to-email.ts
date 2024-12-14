import nodemailer from 'nodemailer'

interface IEmailData {
  email: string
  htmlText: string
  subject: string
  name?: string
}

let poolConfig = import.meta.env.PUBLIC_M_POOLCONFIG

async function sendMessageToEmail(props: IEmailData) {
  try {
    let transporter = nodemailer.createTransport(poolConfig)

    // По идее его нужно вызывать не здесь, а на сервере при запуске Express или Fastify в качестве проверки готвности почтового сервера. Пусть пока будет здесь.
    await transporter.verify((error, success: any) => {
      if (error) {
        console.error(error)
      } else {
        console.log('Nodemailer smtp-server is connected!')
      }
    })

    if (typeof props.email === 'string') {
      props.email = props.email
    } else {
      props.email = import.meta.env.PUBLIC_M_USER
    }

    let message = {
      from: import.meta.env.PUBLIC_M_USER,
      to: props.email,
      subject: props.subject,
      html: props.htmlText,
    }

    let info = await transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error(error)
      } else {
        console.log('The email was successfully sent.')
        return info
      }
    })

    return info
  } catch (error) {
    console.error('Ошибка внутри src/utils/send-mail.ts')
  }
}

export { sendMessageToEmail }
