import { v4 as uuidv4 } from 'uuid'
import { IProject, ISkill } from '@/types'
import projectsData from '../data/projects.json'
import skillsData from '../data/skills.json'

const _projects: IProject[] = projectsData.map((project) => ({
  ...project,
  imgUrls: project.imgUrls.map((url) => ({ id: uuidv4(), url })),
  _id: uuidv4(),
}))

const _skills: ISkill[] = skillsData.map((skill) => ({
  ...skill,
  _id: uuidv4(),
}))

function getProjects(): IProject[] {
  return _projects
}

function getProject(id: string): IProject | undefined {
  const project = _projects.find((p) => p._id === id)
  return project
}

function getSkills(): ISkill[] {
  return _skills
}

export const portfolioService = {
  getProjects,
  getProject,
  getSkills,
}
