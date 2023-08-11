import { ref } from "vue"

export async function useFetch<T>(path: string) {
  let req = new Request(path)
  if (import.meta.env.DEV) {
    req = new Request(new URL(path, import.meta.env.VITE_API_BASE_URL))
  }
  const res = await fetch(req)
  const data = await res.json()
  return ref(data as T)
}
