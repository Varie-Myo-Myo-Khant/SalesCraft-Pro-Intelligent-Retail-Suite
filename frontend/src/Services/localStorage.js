//storing user object at local storage
export const addLocalStorageUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

//get user object from local storage while submitting form
export const getLocalStorageUser = () => {
   return JSON.parse(localStorage.getItem('user'))
}

//deleting user object from local storage
export const deleteLocalStorageUser = () => {
   localStorage.removeItem('user')
}

export const addLocalStorageCart = (product) => {
    localStorage.setItem('cart', JSON.stringify(product))
}

export const getLocalStorageCart = () => {
   return JSON.parse(localStorage.getItem('cart'))
}

export const deleteLocalStorageCart = () => {
   localStorage.removeItem('cart')
}

