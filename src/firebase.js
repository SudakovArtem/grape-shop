import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getDownloadURL, ref, getStorage, getBlob, uploadBytes, deleteObject } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCDiRgArrxtmVc6DbuM2KcHqfbvdYEvh4Q',
  authDomain: 'fast-company-firebase-87f3f.firebaseapp.com',
  databaseURL: 'https://fast-company-firebase-87f3f-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'fast-company-firebase-87f3f',
  storageBucket: 'fast-company-firebase-87f3f.appspot.com',
  messagingSenderId: '1072562795530',
  appId: '1:1072562795530:web:45e529ef9702e2f9fd1bf3'
}

const getImageUrl = (name) => {
  return getDownloadURL(ref(storage, `photos/${name}`))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      let blob = null
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = (event) => {
        blob = xhr.response
      }
      xhr.open('GET', url)
      xhr.send()

      return {
        src: url,
        file: blob
      }
    })
    .catch((error) => {
      console.log(error)
      // Handle any errors
    })
}

const getImageFile = (name) => {
  return getBlob(ref(storage, `photos/${name}`))
    .then((blob) => {
      return new File([blob], name)
    })
    .catch((error) => {
      console.log(error)
      // Handle any errors
    })
}

const uploadFile = (file, name) => {
  const storageRef = ref(storage, `photos/${name}`)

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log(`Файл ${name} был добавлен`)
  })
}

const deleteFile = (name) => {
  const desertRef = ref(storage, `photos/${name}`)

  // Delete the file
  deleteObject(desertRef).then(() => {
    console.log(`Файл ${name} был удален`)
  }).catch((error) => {
    console.log(error)
    // Uh-oh, an error occurred!
  })
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getDatabase(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage, getImageUrl, getImageFile, uploadFile, deleteFile }
