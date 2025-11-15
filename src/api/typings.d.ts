declare namespace API {
  type BusinessResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type BusinessResponseInt_ = {
    code?: number
    data?: number
    message?: string
  }

  type BusinessResponseListSpaceLevelVO_ = {
    code?: number
    data?: SpaceLevelVO[]
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

  type BusinessResponsePagePicture_ = {
    code?: number
    data?: PagePicture_
    message?: string
  }

  type BusinessResponsePagePictureVO_ = {
    code?: number
    data?: PagePictureVO_
    message?: string
  }

  type BusinessResponsePageSpace_ = {
    code?: number
    data?: PageSpace_
    message?: string
  }

  type BusinessResponsePageSpaceVO_ = {
    code?: number
    data?: PageSpaceVO_
    message?: string
  }

  type BusinessResponsePageUserVO_ = {
    code?: number
    data?: PageUserVO_
    message?: string
  }

  type BusinessResponsePicture_ = {
    code?: number
    data?: Picture
    message?: string
  }

  type BusinessResponsePictureTagCategory_ = {
    code?: number
    data?: PictureTagCategory
    message?: string
  }

  type BusinessResponsePictureVO_ = {
    code?: number
    data?: PictureVO
    message?: string
  }

  type BusinessResponseSpace_ = {
    code?: number
    data?: Space
    message?: string
  }

  type BusinessResponseSpaceVO_ = {
    code?: number
    data?: SpaceVO
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
    id?: string
  }

  type downloadFileUsingGETParams = {
    /** filePath */
    filePath: string
  }

  type getPictureByIdUsingGETParams = {
    /** id */
    id: number
  }

  type getPictureVOByIdUsingGETParams = {
    /** id */
    id: string
  }

  type getSpaceByIdUsingGETParams = {
    /** id */
    id: number
  }

  type getSpaceVOByIdUsingGETParams = {
    /** id */
    id: string
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

  type PagePicture_ = {
    current?: number
    pages?: number
    records?: Picture[]
    size?: number
    total?: number
  }

  type PagePictureVO_ = {
    current?: number
    pages?: number
    records?: PictureVO[]
    size?: number
    total?: number
  }

  type PageSpace_ = {
    current?: number
    pages?: number
    records?: Space[]
    size?: number
    total?: number
  }

  type PageSpaceVO_ = {
    current?: number
    pages?: number
    records?: SpaceVO[]
    size?: number
    total?: number
  }

  type PageUserVO_ = {
    current?: number
    pages?: number
    records?: UserVO[]
    size?: number
    total?: number
  }

  type Picture = {
    createTime?: string
    deleted?: number
    id?: number
    picCategory?: string
    picFormat?: string
    picHeight?: number
    picIntro?: string
    picName?: string
    picScale?: number
    picSize?: number
    picTags?: string
    picUrl?: string
    picWidth?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    spaceId?: number
    thumbnailUrl?: string
    updateTime?: string
    userId?: number
  }

  type PictureFetchRequest = {
    fetchSize?: number
    picNamePrefix?: string
    searchText?: string
  }

  type PictureQueryRequest = {
    current?: number
    id?: number
    keyword?: string
    pageSize?: number
    picCategory?: string
    picFormat?: string
    picHeight?: number
    picIntro?: string
    picName?: string
    picScale?: number
    picSize?: number
    picTagList?: string[]
    picWidth?: number
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    sortField?: string
    sortOrder?: string
    spaceId?: string
    updateTimeEnd?: string
    updateTimeStart?: string
    userId?: number
  }

  type PictureReviewRequest = {
    current?: number
    id?: number
    pageSize?: number
    reviewMessage?: string
    reviewStatus?: number
    sortField?: string
    sortOrder?: string
  }

  type PictureTagCategory = {
    categoryList?: string[]
    tagList?: string[]
  }

  type PictureUpdateRequest = {
    id?: number
    picCategory?: string
    picIntro?: string
    picName?: string
    picTagList?: string[]
  }

  type PictureUploadRequest = {
    fileUrl?: string
    id?: number
    picName?: string
    spaceId?: string
  }

  type PictureVO = {
    createTime?: string
    id?: number
    picCategory?: string
    picFormat?: string
    picHeight?: number
    picIntro?: string
    picName?: string
    picScale?: number
    picSize?: number
    picTagList?: string[]
    picUrl?: string
    picWidth?: number
    spaceId?: string
    thumbnailUrl?: string
    updateTime?: string
    userId?: number
    userVO?: UserVO
  }

  type Space = {
    createTime?: string
    currentCount?: number
    currentSize?: number
    deleted?: number
    id?: number
    maxCount?: number
    maxSize?: number
    spaceLevel?: number
    spaceName?: string
    updateTime?: string
    userId?: number
  }

  type SpaceAddRequest = {
    spaceLevel?: number
    spaceName?: string
  }

  type SpaceLevelVO = {
    baseMaxCount?: number
    baseMaxSize?: number
    desc?: string
    value?: number
  }

  type SpaceQueryRequest = {
    current?: number
    id?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    spaceLevel?: number
    spaceName?: string
    userId?: number
  }

  type SpaceUpdateRequest = {
    id?: number
    maxCount?: number
    maxSize?: number
    spaceLevel?: number
    spaceName?: string
  }

  type SpaceVO = {
    createTime?: string
    currentCount?: number
    currentSize?: number
    id?: number
    maxCount?: number
    maxSize?: number
    spaceLevel?: number
    spaceName?: string
    updateTime?: string
    userId?: number
    userVO?: UserVO
  }

  type uploadPictureUsingPOSTParams = {
    fileUrl?: string
    id?: number
    picName?: string
    spaceId?: string
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
