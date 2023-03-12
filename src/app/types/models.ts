export interface IProject {
  _id?: string
  name: string
  description: string
  tags: string[]
  imgUrls: string[]
  githubUrl: string
  websiteUrl: string
}

export interface ISkill {
  _id?: string
  title: string
  imgUrl: string
}
