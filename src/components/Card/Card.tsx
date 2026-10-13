import TagList from "@/components/TagList/TagList"
import type { CardImage } from "@/lib/search"
import styles from "./Card.module.css"

/*
 * A React component so the same card renders in static Astro pages
 * (no JS shipped) and inside the ContentBrowser island.
 */
interface Props {
  href: string
  title: string
  description?: string
  /** Small text above the title, e.g. a formatted date */
  meta?: string
  tags?: readonly string[]
  /** Optional thumbnail, pre-sized by `getItems()` in lib/content.ts */
  image?: CardImage
}

export default function Card({
  href,
  title,
  description,
  meta,
  tags = [],
  image,
}: Props) {
  return (
    <article className={styles.card}>
      {image && (
        <div className={styles.thumbnail}>
          {/* Decorative: the title link already names the card */}
          <img
            className={styles.image}
            src={image.src}
            srcSet={image.srcSet}
            sizes="(min-width: 48rem) 24rem, 100vw"
            width={image.width}
            height={image.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      {meta && <p className={styles.meta}>{meta}</p>}
      <h3 className={styles.title}>
        {/* The ::after on this link makes the whole card clickable */}
        <a className={styles.link} href={href}>
          {title}
        </a>
      </h3>
      {description && <p className={styles.description}>{description}</p>}
      {tags.length > 0 && <TagList tags={tags} />}
    </article>
  )
}
