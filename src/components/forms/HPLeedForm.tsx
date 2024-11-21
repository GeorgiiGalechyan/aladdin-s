import { useState } from 'react'
import type { FormEvent } from 'react'
import { LeadSourse } from 'back/models/LeadSourse'

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
    let sourse = new LeadSourse(
      leadSourseId, // '001'
      leadSourseName, // 'hp-hero-lead-form'
      leadSourseType, // 'Mine site'
      leadSourseURL, // Astro.url.origin
      leadSourseDescription // 'This is the LeadForm from the Hero section from the home page of the main site.'
    )

    const formData = new FormData(e.target as HTMLFormElement)
    formData.append('leadSourse', JSON.stringify(sourse))

    const response = await fetch('/api/send-lead-to-email', {
      method: 'POST',
      body: formData,
    })

    // Получить ответ в формате json и вывести поле  message
    const data = await response.json()
    if (data.message) {
      setResponseMessage(data.message)
    }
  }

  return (
    <>
      <form id="hp-hero-form" name="hpHeroForm" onSubmit={submit}>
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
            персональных данных
          </a>
        </div>

        <button type="submit">Узнать цену</button>

        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </>
  )
}
