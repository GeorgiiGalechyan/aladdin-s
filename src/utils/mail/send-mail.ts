const nodemailer = await import('nodemailer')

interface IEmailData {
  email: string
  html: string
  subject: string
  name?: string
}

let poolConfig = import.meta.env.PUBLIC_M_POOLCONFIG

async function sendMail(props: IEmailData) {
  try {
    let transporter = nodemailer.createTransport(poolConfig)

    // По идее его нужно вызывать не здесь, а на сервере при запуске Express или Fastify в качестве проверки готвности почтового сервера. Пусть пока будет здесь.
    await transporter.verify((error, success) => {
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
      // email = 'galechyan23@yandex.ru'
    }

    let message = {
      from: import.meta.env.PUBLIC_M_USER,
      // from: 'galechyan23@yandex.ru',
      to: email,
      subject: props.subject,
      html: props.html,
    }

    await transporter.sendMail(message, (error, info) => {
      if (error) {
        throw error
      } else {
        console.log('The email was successfully sent')
        return info
      }
    })
  } catch (error) {
    throw error
  }
}

export { sendMail }
