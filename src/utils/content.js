import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function getCollection(category, slug) {
  const directory = path.resolve(`./src/content/${category}`)
  const filePath = path.join(directory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(fileContent)

  return { frontmatter, content }
}

export function getAllTags() {
  const contentDir = path.resolve('./src/content')
  const categories = ['news', 'writeups'] // Add more categories if needed
  const tagsSet = new Set()

  for (const category of categories) {
    const categoryDir = path.join(contentDir, category)
    const files = fs.readdirSync(categoryDir)

    files.forEach((file) => {
      const filePath = path.join(categoryDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter } = matter(fileContent)

      if (frontmatter.tags) {
        frontmatter.tags.forEach((tag) => tagsSet.add(tag))
      }
    })
  }

  return Array.from(tagsSet)
}
