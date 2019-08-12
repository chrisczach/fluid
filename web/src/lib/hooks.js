import React, { useState } from 'react'

export const slideShowHandler = (galleryArray = []) => {
  console.log(galleryArray)
  const [index, setIndex] = useState(0)
  const next = () => (index === galleryArray.length - 1 ? setIndex(0) : setIndex(index + 1))
  const prev = () => (index === 0 ? setIndex(galleryArray.length - 1) : setIndex(index - 1))
  return { index, length: galleryArray.length, next, prev, currentItem: galleryArray[index] }
}
