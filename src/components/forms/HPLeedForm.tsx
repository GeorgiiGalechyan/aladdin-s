
import type { FormEvent } from 'react'

import { useState } from 'react'

import { LeadSourse } from 'back/models/LeadSourse'
import { Message } from 'back/models/Message'
import { Lead } from 'back/models/Lead'

export default function HPLeadForm() {
  const [responseMessage, setResponseMessage] = useState('')
  const [checked, setChecked] = useState(true)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const leadSourseId = '001'
    const leadSourseName = 'hp-hero-lead-form'
    const leadSourseType = 'Main site'
    const leadSourseURL = `https://{domain name}/ru/`
    const leadSourseDescription = 'This is the LeadForm from the Hero section from the home page of the main site.'

    // (id, name, type, url, description)
    let leadSourse = new LeadSourse(
      leadSourseId, // '001'
      leadSourseName, // 'hp-hero-lead-form'
      leadSourseType, // 'Mine site'
      leadSourseURL, // Astro.url.origin
      leadSourseDescription // 'This is the LeadForm from the Hero section from the home page of the main site.'
    )

    const formData = new FormData(e.target as HTMLFormElement)
    let leadName = formData.get('leadName') as string | null
    let leadPhone = formData.get('leadPhone') as string | null

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
      let mailResData = await lead.sendLeadToMail()

      // We can set the parameters: botToken, chatID, message, parse_mode
      let telegramResData = await lead.sendLeadToTelegram()

      console.log({
        sendToEmailData: mailResData,
        sendToTelegramData: telegramResData,
      })
    } catch (error) {
      console.error(error)
    }

    //     const responseEmail = await fetch('/api/send-lead-to-email', {
    //       method: 'POST',
    //       body: formData,
    //     })
    //
    //     const responseTelegram = await fetch('/api/send-lead-to-telegram', {
    //       method: 'POST',
    //       body: formData,
    //     })

    // Получить ответ в формате json и вывести поле  message
    // const dataEmail = await responseEmail.json()
    // if (responseEmail.ok && responseTelegram.ok) {
    //   setResponseMessage(dataEmail.message)
    // }
  }

  return (
    <>
      <form id="hp-hero-form" name="hpHeroForm" method="POST" onSubmit={submit}>
        <input type="text" placeholder="Ваше имя" name="leadName" required={true} />
        <input type="text" placeholder="Ваш телефон" name="leadPhone" required={true} />

        <div>
          <input
            type="checkbox"
            placeholder="Даю согласие на обработку"
            name="formConsent"
            defaultChecked={checked}
            onChange={() => setChecked((prevState) => !prevState)}
            required={true}
          />
          {' Даю согласие на обработку '}
          <a href="/ru/law-info/personal-data-processing-policy" target="_blank">
            {'персональных данных'}
          </a>
        </div>

        <button type="submit">Узнать цену</button>

        {(responseMessage && <p>{responseMessage}</p>) || <p> Заглушка </p>}
      </form>
    </>
  )
}
