import { useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'

interface AccordionItemData {
  question: string
  answer: ReactNode
}

export default function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-trigger-${index}`

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-brand-soft/40"
              >
                <span className="text-base font-medium text-ink">{item.question}</span>
                <Plus
                  className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ease-out ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 leading-relaxed text-ink-soft">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
