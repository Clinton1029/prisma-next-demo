"use client"
import { useEffect, useState } from "react"

export default function Home() {
  const [users, setUsers] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/users").then(res => res.json()).then(setUsers)
    fetch("/api/posts").then(res => res.json()).then(setPosts)
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Prisma + Next.js Demo</h1>

      <h2 className="mt-4 text-xl">Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>

      <h2 className="mt-4 text-xl">Posts</h2>
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            {p.title} by {p.author?.email}
          </li>
        ))}
      </ul>
    </main>
  )
}
