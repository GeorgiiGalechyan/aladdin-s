export function DateToDDMMYYYY(date) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }

  return date.toLocaleDateString('ru-RU', options)
}
