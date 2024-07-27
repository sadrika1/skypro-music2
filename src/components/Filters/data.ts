type filterType = {
  title: string,
  value: "author" | "genre" | "order"
}
export const filters:filterType[] = [
  {
    title: "Исполнителю",
    value: "author"
  },

  {
    title: "Жанру",
    value: "genre"
  },
  {
    title: "Году выпуска",
    value: "order"
  },

]


export const order = [
  "по умолчанию",
  "сначала новые",
  "сначала старые",
]