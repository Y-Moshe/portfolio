import Axios from 'axios'

import { IProject, ISkill } from '@/types'
import { DefaultOptionType } from 'antd/es/select'

const axios = Axios.create({
  baseURL:
    'https://portfolio-f93df-default-rtdb.europe-west1.firebasedatabase.app/',
})

type FirebaseEntity<T> = {
  [id: string]: T
}

async function getProjects(): Promise<IProject[]> {
  const res = await axios.get<FirebaseEntity<IProject>>('projects.json')
  const data = Object.keys(res.data).map((id) =>
    _mapEntity<IProject>({ [id]: res.data[id] })
  )

  return data
}

async function getProject(id: string): Promise<IProject | null> {
  const res = await axios.get<FirebaseEntity<IProject | null>>(
    `projects/${id}.json`
  )

  if (!res.data) return null
  return _mapEntity(res.data)
}

async function addProject(project: IProject) {
  return await axios.post('projects.json', project)
}

async function updateProject(project: IProject) {
  return await axios.put(`projects/${project._id}.json`, project)
}

async function deleteProject(projectId: string) {
  return await axios.delete(`projects/${projectId}.json`)
}

function _mapEntity<T>(entity: FirebaseEntity<T>): T {
  const id = Object.keys(entity!)[0]
  return {
    ...entity[id],
    _id: id,
  } as T
}

async function getSkills(): Promise<ISkill[]> {
  const res = await axios.get<FirebaseEntity<ISkill>>('skills.json')
  const data = Object.keys(res.data).map((id) =>
    _mapEntity<ISkill>({ [id]: res.data[id] })
  )

  return data
}

async function getTagOptions(): Promise<DefaultOptionType[]> {
  const res = await axios.get<FirebaseEntity<DefaultOptionType>>('tags.json')
  const data = Object.keys(res.data).map((id) =>
    _mapEntity<DefaultOptionType>({ [id]: res.data[id] })
  )

  return data
}

export const portfolioService = {
  getProjects,
  getProject,
  getSkills,
  getTagOptions,
  addProject,
  updateProject,
  deleteProject,
}
