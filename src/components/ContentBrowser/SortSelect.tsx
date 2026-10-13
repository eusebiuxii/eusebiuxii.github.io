import { Select } from "@base-ui/react/select"
import { Check, ChevronsUpDown } from "lucide-react"

import { sortLabels, type SortOrder } from "@/lib/search"
import styles from "./ContentBrowser.module.css"

interface Props {
  value: SortOrder
  options: readonly SortOrder[]
  onChange: (value: SortOrder) => void
}

/** Base UI Select: handles keyboard, focus and ARIA; we only add styles */
export default function SortSelect({ value, options, onChange }: Props) {
  const items = options.map((option) => ({
    value: option,
    label: sortLabels[option],
  }))

  return (
    <Select.Root
      items={items}
      value={value}
      onValueChange={(next) => next && onChange(next)}
    >
      <Select.Trigger className={styles.selectTrigger} aria-label="Sort by">
        <Select.Value />
        <Select.Icon className={styles.selectIcon}>
          <ChevronsUpDown aria-hidden />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          className={styles.selectPositioner}
          sideOffset={4}
          align="end"
          alignItemWithTrigger={false}
        >
          <Select.Popup className={styles.selectPopup}>
            <Select.List>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  className={styles.selectItem}
                >
                  <Select.ItemIndicator className={styles.selectIndicator}>
                    <Check aria-hidden />
                  </Select.ItemIndicator>
                  <Select.ItemText>{item.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}
