import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export async function getCustomers(
  pageNumber = 1,
  pageSize = 10,
  searchTerm = '',
) {
  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.customers}/?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${searchTerm}`,
    method: 'get',
  })
}

export async function create(data) {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.customers,
    method: 'post',
    data: data,
  })
}