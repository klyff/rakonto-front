import axios from 'axios'
import {
  singup,
  singout,
  requestPasswordReset,
  getMe,
  updateMe,
  passwordReset,
  passwordChange,
  signinGoogle,
  signinFacebook,
  signin,
  confirmEmail,
  requestConfirmEmail,
  searchStories,
  createStory,
  deleteStory,
  updateStory,
  getImage,
  getStories,
  getStory,
  getCollections,
  getCollection,
  updateCollection,
  createCollection,
  deleteCollection,
  uploadImage,
  getPersons,
  updatePerson,
  createPerson,
  addPersonToStory,
  removePersonFromStory,
  uploadFile,
  getFile,
  getFiles,
  deleteFile,
  getLink,
  createLink,
  deleteLink,
  getTranscriptions,
  deleteTranscriptions,
  createTranscriptions,
  updateTranscriptions,
  createGallery,
  deleteGallery,
  getGalleryItem,
  getGallery,
  getTimelines,
  getTimeline,
  createTimeline,
  deleteTimeline,
  getPlaces,
  createPlace,
  deletePlace,
  searchLocation,
  uploadSubtitle,
  deleteSubtitle,
  addWatcher,
  removeWatcher,
  notifyWatcher,
  publishStory,
  deleteComment,
  createComment,
  editComment,
  search,
  searchSuggestions
} from './services'
import Cookies from 'js-cookie'

const request = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}/api/`
})

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (typeof window === 'undefined') {
      return Promise.reject(error)
    }
    if (error.response.status === 401) {
      Cookies.remove('token')
    }
    return Promise.reject(error)
  }
)

export const api = (token?: string) => {
  if (token) {
    request.defaults.baseURL = process.env.NEXT_PUBLIC_API
  } else {
    token = Cookies.get('token')
  }
  request.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  return {
    singup: singup(request),
    singout: singout(request),
    requestPasswordReset: requestPasswordReset(request),
    getMe: getMe(request),
    updateMe: updateMe(request),
    passwordReset: passwordReset(request),
    passwordChange: passwordChange(request),
    signin: signin(request),
    signinGoogle: signinGoogle(request),
    signinFacebook: signinFacebook(request),
    confirmEmail: confirmEmail(request),
    requestConfirmEmail: requestConfirmEmail(request),
    searchStories: searchStories(request),
    getStories: getStories(request),
    deleteStory: deleteStory(request),
    getStory: getStory(request),
    createStory: createStory(request),
    updateStory: updateStory(request),
    publishStory: publishStory(request),
    uploadImage: uploadImage(request),
    getImage: getImage(request),
    getCollections: getCollections(request),
    getCollection: getCollection(request),
    updateCollection: updateCollection(request),
    createCollection: createCollection(request),
    deleteCollection: deleteCollection(request),
    getPersons: getPersons(request),
    updatePerson: updatePerson(request),
    createPerson: createPerson(request),
    addPersonToStory: addPersonToStory(request),
    removePersonFromStory: removePersonFromStory(request),
    uploadFile: uploadFile(request),
    deleteFile: deleteFile(request),
    getFiles: getFiles(request),
    getFile: getFile(request),
    getLink: getLink(request),
    createLink: createLink(request),
    deleteLink: deleteLink(request),
    getTranscriptions: getTranscriptions(request),
    deleteTranscriptions: deleteTranscriptions(request),
    updateTranscriptions: updateTranscriptions(request),
    createTranscriptions: createTranscriptions(request),
    getGallery: getGallery(request),
    getGalleryItem: getGalleryItem(request),
    createGallery: createGallery(request),
    deleteGallery: deleteGallery(request),
    getTimelines: getTimelines(request),
    getTimeline: getTimeline(request),
    createTimeline: createTimeline(request),
    deleteTimeline: deleteTimeline(request),
    getPlaces: getPlaces(request),
    createPlace: createPlace(request),
    deletePlace: deletePlace(request),
    searchLocation: searchLocation(request),
    uploadSubtitle: uploadSubtitle(request),
    deleteSubtitle: deleteSubtitle(request),
    addWatcher: addWatcher(request),
    removeWatcher: removeWatcher(request),
    notifyWatcher: notifyWatcher(request),
    deleteComment: deleteComment(request),
    createComment: createComment(request),
    editComment: editComment(request),
    search: search(request),
    searchSuggestions: searchSuggestions(request)
  }
}
