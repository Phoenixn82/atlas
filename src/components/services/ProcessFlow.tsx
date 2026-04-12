import { Circle } from '@/components/ui/Circle'

interface ProcessFlowProps {
  steps: readonly string[]
}

export function ProcessFlow({ steps }: ProcessFlowProps) {
  return (
    <div className="flex items-center overflow-x-auto py-4">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center gap-3 min-w-[90px]">
            <Circle size="xs" variant="outlined" />
            <span
              className="text-xs font-mono uppercase tracking-widest whitespace-nowrap text-center"
              style={{ color: 'var(--atlas-black)' }}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="h-[1px] w-12 lg:w-16 flex-shrink-0"
              style={{ backgroundColor: 'var(--atlas-black)' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
