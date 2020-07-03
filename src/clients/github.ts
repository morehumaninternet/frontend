import axios from 'axios'


export async function getUserByUsername(username: string): Promise<any> {
  const result = await axios(`https://api.github.com/users/${username}`)
  console.log('result', result)
  return result.data
}
