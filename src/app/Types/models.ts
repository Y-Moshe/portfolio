interface BaseModel {
  createdAt?: Date
  updatedAT?: Date
}

export interface IUser extends BaseModel {
  firstName: string
  lastName: string
  email: string
  password?: string
}
