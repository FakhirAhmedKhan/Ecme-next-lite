import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export async function getSupplier(
  pageNumber: number = 1,
  pageSize: number = 10,
  searchTerm?: string
) {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });

  if (searchTerm && searchTerm.trim() !== "") {
    params.append("search", searchTerm.trim());
  }

  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.Supplier}?${params.toString()}`,
    method: "get",
  });
}


export async function createSupplier(supplier) {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.Supplier,
    method: 'post',
    data: supplier,
  })
}