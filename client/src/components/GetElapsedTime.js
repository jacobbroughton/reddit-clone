import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
// import { formatISO9075, isSameHour, parseISO } from "date-fns"

export const getElapsedTime = (date) => {

  // Split timestamp into [ Y, M, D, h, m, s ]
  const datePostedArr = date.split(/[- :]/);


  // Apply each element to the Date function
  const utcDate = new Date(
    Date.UTC(
      datePostedArr[0], 
      datePostedArr[1]-1, 
      datePostedArr[2], 
      datePostedArr[3], 
      datePostedArr[4], 
      datePostedArr[5])
  );



  const elapsedTime = formatDistanceToNowStrict(utcDate, { addSuffix: true })

  return elapsedTime
}