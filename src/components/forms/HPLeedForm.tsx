// const { origin } = Astro.url

import { useState } from 'react'
import type { FormEvent } from 'react'

export default function HPLeadForm() {
  const [responseMessage, setResponseMessage] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    if (data.message) {
      setResponseMessage(data.message)
    }
  }

  return (
    <>
      <form id="hp-hero-form" name="hpHeroForm" onSubmit={submit}>
        <input type="text" placeholder="Ваше имя" name="leadName" required />
        <input type="text" placeholder="Ваш телефон" name="leadPhone" required />

        <div>
          <input type="checkbox" placeholder="Даю согласие на обработку" name="formConsent" checked required />
          Даю согласие на обработку
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
