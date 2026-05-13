import { FlowMockup } from './FlowMockup'
import { ArcaMockup } from './ArcaMockup'
import { MedicaMockup } from './MedicaMockup'
import { KernMockup } from './KernMockup'

export const mockups: Record<string, React.ComponentType> = {
  flow: FlowMockup,
  arca: ArcaMockup,
  medica: MedicaMockup,
  kern: KernMockup,
}

export { FlowMockup, ArcaMockup, MedicaMockup, KernMockup }
