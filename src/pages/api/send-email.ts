import type { APIRoute } from 'astro'


// Добавляем redirect, если в конце нуно перенаправить на какую-то страницу
export const POST: APIRoute = async ({ request /*, redirect */ }) => {
  const leadData = await request.formData()

  const name = data.get('name')
  const email = data.get('email')
  const message = data.get('message')



  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 }
    )
  }


//   // Throw an error if we're missing any of the needed fields.
//   if (!to || !subject || !message) {
//     throw new Error('Missing required fields')
//   }








  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: 'Письмо отправлено!',
    }),
    { status: 200 }
  )

  // Redirect the user to a success page after the email is sent.
  // return redirect('/success')

// import type { APIRoute } from 'astro'

//
// export const prerender = false
//
// // Добавляем redirect, если в конце нуно перенаправить на какую-то страницу
// export const POST: APIRoute = async ({ request /*, redirect */ }) => {
//   // Get the form data submitted by the user on the home page
//   const formData = await request.formData()
//   const to = formData.get('recipient')
//   const subject = formData.get('subject')
//   const message = formData.get('message')
//
//   // Throw an error if we're missing any of the needed fields.
//   if (!to || !subject || !message) {
//     throw new Error('Missing required fields')
//   }
//
//   // Try to send the email using a `sendEmail` function we'll create next. Throw
//   // an error if it fails.
//   try {
//     const html = `<div>${message}</div>`
//     await sendMail({ to, subject, html })
//   } catch (error) {
//     throw new Error('Failed to send email')
//   }
//

// }

///////////////////////////////////////////////////////

/*
import { LeadSourse } from 'back/models/LeadSourse'
import { Lead } from 'back/models/Lead'
import { Message } from 'back/models/Message'

const leadSourseId = '001'
const leadSourseName = 'hp-hero-lead-form'
const leadSourseType = 'Main site'
const leadSourseURL = origin
const leadSourseDescription = 'This is the LeadForm from the Hero section from the home page of the main site.'

// (id, name, type, url, description)
let hpFormLeadSourse = new LeadSourse(
  leadSourseId, // '001'
  leadSourseName, // 'hp-hero-lead-form'
  leadSourseType, // 'Mine site'
  leadSourseURL, // Astro.url.origin
  leadSourseDescription // 'This is the LeadForm from the Hero section from the home page of the main site.'
)

const hpHeroForm = document.forms.namedItem('hpHeroForm') as HTMLFormElement

hpHeroForm.addEventListener('submit', function (event: SubmitEvent) {
  event.preventDefault() // прерываем действие по умолчанию

  // создаём FormData нашей формы
  let leadData: FormData = new FormData(hpHeroForm)

  // Готовим параменты для формирования лида
  let leadName = leadData.get('leadName') as string | null
  let leadPhone = leadData.get('leadPhone') as string | null

  // Над сущностью Message еще надо подумать...
  let message = new Message('Заявка с сайта')
  console.log(message)

  // Формируем лида
  let hpFormLead = new Lead(hpFormLeadSourse, { leadName, leadPhone }, message)

  //     // Отравляем сообщение на Почту...
  //     // Static or not static... вот в чем вопрос...!!!
  hpFormLead.sendLeadToMail()
  //
  //     // hpFormLead.sendLeadToTelegram()
})


*/
