export const prerender = false

import type { APIRoute } from 'astro'

import { Lead } from 'back/models/Lead'
import { Message } from 'back/models/Message'

// Добавляем redirect, если в конце нуно перенаправить на какую-то страницу
export const POST: APIRoute = async ({ request /*, redirect */ }) => {
  const leadData = await request.formData()

  let leadName = leadData.get('leadName') as string | null
  let leadPhone = leadData.get('leadPhone') as string | null
  const leadSourse = JSON.parse(leadData.get('leadSourse') as any)

  // Throw an error if we're missing any of the needed fields.
  if (!leadName) {
    throw new Error('Form error: FormData.leadName null, undefined or incorrect!')
  }

  if (!leadPhone) {
    throw new Error('Form error: FormData.leadPhone null, undefined or incorrect!!')
  }
  if (!leadSourse) {
    throw new Error('Form error: FormData.leadSourse null, undefined or incorrect!!')
  }

  // Над сущностью Message еще надо подумать...
  let message = new Message('Заявка с сайта')
  
  try {
    let lead = new Lead(leadSourse, { leadName, leadPhone }, message)

    // We can set the parameters: email, subject, htmlText
    lead.sendLeadToMail()
  } catch (error) {
    throw error
  }

  // Validate the data - you'll probably want to do more than this
  // if (!name || !email || !message) {
  //   return new Response(
  //     JSON.stringify({
  //       message: 'Missing required fields',
  //     }),
  //     { status: 400 }
  //   )
  // }

  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: 'Ваша заявка принята. Мы свяжемся с Вами в ближайшее время.',
    }),
    { status: 200 }
  )

  // Redirect the user to a success page after the email is sent.
  // return redirect('/success')
}
