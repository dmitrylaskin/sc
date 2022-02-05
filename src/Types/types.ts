export type postType = {
    id: number, text: string, likes: number
}
export type photosType = {
    small: string | null
    large: string | null
}
export type contactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}
export type profileType = {
    aboutMe: string | null
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number
    photos: photosType
}
export type userType = {
    name: string
    id: number
    uniqueUrlName: null | string
    photos: photosType
    status: null | string
    followed: boolean
}