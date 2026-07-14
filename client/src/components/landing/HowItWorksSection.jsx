import { howItWorksSteps } from '../../data/landingData';
import SectionHeader from '../ui/SectionHeader';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
        <SectionHeader
          eyebrow="SIMPLE PROCESS"
          title="How PolicyGPT Works"
          description="From discovery to application in 4 easy steps. No complexity, no jargon — just the help you need."
          align="center"
          eyebrowColor="text-brand-green"
          className="mb-12"
        />

        <div className="relative">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {howItWorksSteps.map((step, index) => (
              <article
                key={step.step}
                className="relative overflow-visible text-center"
              >
                {/* Connecting Line */}
                {index < howItWorksSteps.length - 1 && (
                  <div
                    className={`absolute left-1/2 top-[50px] hidden h-[2px] w-full -translate-y-1/2 xl:block ${step.lineColor}`}
                    aria-hidden="true"
                  />
                )}

                {/* Step Box */}
                <div
                  className={`relative z-10 mx-auto mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-[30px] ${step.circleBg}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${step.circleColor}`}
                  >
                    <span className="font-body text-base font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                </div>

                <h3 className="mb-3 font-heading text-xl font-bold text-text-primary">
                  {step.title}
                </h3>

                <p className="font-body text-base text-text-secondary">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}