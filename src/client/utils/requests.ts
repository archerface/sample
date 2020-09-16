export interface ServerResponse {
  error: boolean
  message: string
  data: {}
}

function _buildUrl(endpoint: string): string {
  return `http://localhost:3000/sdl/v1${endpoint}`
}

export async function makeRequest<T>(
  endpoint: string,
  method: string,
  body?: T
): Promise<ServerResponse> {
  const url = _buildUrl(endpoint)
  const response = await fetch(url, {
    method: method || 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body && JSON.stringify(body)
  })

  return (response.json() as unknown) as ServerResponse
}
