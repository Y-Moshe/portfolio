type ImageUrl = {
  id: string
  url: string
}

interface BaseModel {
  _id: string
}

export interface IProject extends BaseModel {
  name: string
  description: string
  tags: string[]
  imgUrls: ImageUrl[]
  githubUrl: string
  websiteUrl: string
}

export interface ISkill extends BaseModel {
  title: string
  cssClass: string
}
