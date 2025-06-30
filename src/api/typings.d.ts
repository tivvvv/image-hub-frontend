declare namespace API {
  type BusinessResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type BusinessResponseLoginUserVO_ = {
    code?: number
    data?: LoginUserVO
    message?: string
  }

  type BusinessResponseLong_ = {
    code?: number
    data?: number
    message?: string
  }

  type BusinessResponsePageUserVO_ = {
    code?: number
    data?: PageUserVO_
    message?: string
  }

  type BusinessResponseString_ = {
    code?: number
    data?: string
    message?: string
  }

  type BusinessResponseUser_ = {
    code?: number
    data?: User
    message?: string
  }

  type BusinessResponseUserVO_ = {
    code?: number
    data?: UserVO
    message?: string
  }

  type BusinessResponseVoid_ = {
    code?: number
    message?: string
  }

  type DeleteRequest = {
    id?: number
  }

  type getUserByIdUsingGETParams = {
    /** id */
    id: number
  }

  type getUserVOByIdUsingGETParams = {
    /** id */
    id: number
  }

  type LoginUserVO = {
    createTime?: string
    id?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type PageUserVO_ = {
    current?: number
    pages?: number
    records?: UserVO[]
    size?: number
    total?: number
  }

  type User = {
    createTime?: string
    deleted?: number
    id?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userName?: string
    userPassword?: string
    userProfile?: string
    userRole?: string
  }

  type UserAddRequest = {
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type UserLoginRequest = {
    userAccount?: string
    userPassword?: string
  }

  type UserQueryRequest = {
    current?: number
    id?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    userAccount?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type UserRegisterRequest = {
    userAccount?: string
    userPassword?: string
  }

  type UserUpdateRequest = {
    id?: number
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type UserVO = {
    createTime?: string
    id?: number
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }
}
