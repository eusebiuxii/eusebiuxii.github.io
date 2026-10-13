import styles from "./TagList.module.css"

interface Props {
  tags: readonly string[]
}

export default function TagList({ tags }: Props) {
  return (
    <ul className={styles.tagList} aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  )
}
