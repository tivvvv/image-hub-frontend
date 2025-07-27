// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** deletePicture DELETE /api/picture */
export async function deletePictureUsingDelete(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BusinessResponseBoolean_>('/api/picture', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getPictureById GET /api/picture/${param0} */
export async function getPictureByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPictureByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<API.BusinessResponsePicture_>(`/api/picture/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** listPictureByPage POST /api/picture/page */
export async function listPictureByPageUsingPost(
  body: API.PictureQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BusinessResponsePagePicture_>('/api/picture/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listPictureVOByPage POST /api/picture/page/vo */
export async function listPictureVoByPageUsingPost(
  body: API.PictureQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BusinessResponsePagePictureVO_>('/api/picture/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** reviewPicture POST /api/picture/review */
export async function reviewPictureUsingPost(
  body: API.PictureReviewRequest,
  options?: { [key: string]: any },
) {
  return request<API.BusinessResponseBoolean_>('/api/picture/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listPictureTagCategory GET /api/picture/tagList */
export async function listPictureTagCategoryUsingGet(options?: { [key: string]: any }) {
  return request<API.BusinessResponsePictureTagCategory_>('/api/picture/tagList', {
    method: 'GET',
    ...(options || {}),
  })
}

/** updatePicture POST /api/picture/update */
export async function updatePictureUsingPost(
  body: API.PictureUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BusinessResponseBoolean_>('/api/picture/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** uploadPicture POST /api/picture/upload */
export async function uploadPictureUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPictureUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData()

  if (file) {
    formData.append('file', file)
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''))
        } else {
          formData.append(ele, JSON.stringify(item))
        }
      } else {
        formData.append(ele, item)
      }
    }
  })

  return request<API.BusinessResponsePictureVO_>('/api/picture/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  })
}

/** uploadPictureByUrl POST /api/picture/upload/url */
export async function uploadPictureByUrlUsingPost(
  body: API.PictureUploadRequest,
  options?: { [key: string]: any },
) {
  return request<API.BusinessResponsePictureVO_>('/api/picture/upload/url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getPictureVOById GET /api/picture/vo/${param0} */
export async function getPictureVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPictureVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<API.BusinessResponsePictureVO_>(`/api/picture/vo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}
