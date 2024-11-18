const nodemailer = await import('nodemailer')

interface IEmailData {
  email: string
  html: string
  subject: string
  name?: string
}

// let poolConfig = import.meta.env.PUBLIC_M_POOLCONFIG
let poolConfig = 'smtp://:galechyan23@yandex.ru:wpgxtbszhnqbwdqg@smtp.yandex.ru/?pool=true'

async function sendMail(props: IEmailData) {
  let transporter = nodemailer.createTransport(poolConfig)

  transporter.verify((error, success) => {
    if (error) {
      console.error(error)
    } else {
      console.log('Server is ready to take our messages')
      console.log(success)
    }
  })

  let email
  if (typeof props.email === 'string') {
    email = props.email
  } else {
    // email = import.meta.env.PUBLIC_M_USER
    email = 'galechyan23@yandex.ru'
  }

  let message = {
    // from: import.meta.env.PUBLIC_M_USER,
    from: 'galechyan23@yandex.ru',
    to: email,
    subject: props.subject,
    html: props.html,
  }

  // По идее его нужно вызывать не здесь, а на сервере при запуске Express или Fastify в качестве проверки готвности почтового сервера. Пусть пока будет здесь.

  await transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      console.log('Email sent: ' + info.response)
      console.log(info)
      return info
    }
  })
}

export { sendMail }
