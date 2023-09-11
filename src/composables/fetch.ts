import { useFetch } from "@vueuse/core"

export default async function <T>(path: string) {
  let request: Request 
  if (import.meta.env.DEV) {
    request = new Request(new URL(path, import.meta.env.VITE_API_BASE_URL))
  } else {
    request = new Request(path)
  }

  const { data } = await useFetch(request.url).get().json<T>()
  return data
}
