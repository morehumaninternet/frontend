import axios from 'axios'


export async function getUserByUsername(username: string): Promise<any> {
  const { data } = await axios(`https://api.github.com/users/${username}`)
  return data
}
