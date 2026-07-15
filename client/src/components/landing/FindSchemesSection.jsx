import findSchemesImg from '../../assets/images/find-schemes-img.png';
import aiIcon from '../../assets/icons/ai.svg';
import greenTick from '../../assets/icons/green-tick.svg';
import arrowIcon from '../../assets/icons/line-md_arrow-right.svg';
import { eligibilityMatches } from '../../data/landingData';
import Button from '../ui/Button';

function MatchBar({ name, percent, color }) {
  return (
    <div className="rounded-[20px] bg-white px-6 py-5 shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="font-body text-base font-semibold text-text-primary">{name}</p>
        <span className="font-body text-base font-semibold text-brand-green">{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-[30px] bg-[#D9D9D9]">
        <div
          className={`h-full rounded-[30px] ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function FindSchemesSection() {
  return (
    <section id="find-schemes" className="relative overflow-hidden py-10 sm:py-14 lg:py-24">
      <img
        src={findSchemesImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="find-schemes-gradient absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-20">
        <div className="overflow-hidden rounded-[20px] border border-white/10 shadow-[0px_3px_20px_0px_rgba(0,0,0,0.25)] sm:rounded-[30px]">
          <div className="grid lg:grid-cols-2">
            {/* Left side - White background */}
            <div className="bg-white/50 backdrop-blur-sm p-5 sm:p-8 lg:p-12 xl:p-16">
              <div className="mb-6 inline-flex items-center gap-2 rounded-[30px] bg-card-green px-4 py-2">
                <img src={aiIcon} alt="" className="h-2.5 w-3.5" aria-hidden="true" />
                <span className="font-body text-sm font-semibold text-brand-green">
                  AI-Powered Matching
                </span>
              </div>

              <h2 className="mb-4 font-heading text-3xl font-bold leading-tight text-text-primary lg:text-[34px] lg:leading-[42px]">
                Find Schemes You Actually Qualify For
              </h2>

              <p className="mb-8 font-body text-lg leading-8 text-text-secondary lg:text-xl">
                Answer 5 quick questions and our AI instantly identifies all government schemes
                and policies you are eligible for — no manual searching required.
              </p>

              <div className="mb-6 flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<img src={arrowIcon} alt="" className="h-5 w-5" aria-hidden="true" />}
                >
                  Check My Eligibility
                </Button>
                <Button variant="secondary" size="lg">
                  See How It Works
                </Button>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
                {['Takes 2 minutes', 'Completely private', 'Instant results'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <img src={greenTick} alt="" className="h-3 w-3" aria-hidden="true" />
                    <span className="font-body text-base text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Match bars with background */}
            <div className="flex flex-col gap-3 p-5 sm:p-8 lg:p-12 xl:p-16">
              {eligibilityMatches.map((match) => (
                <MatchBar key={match.name} {...match} />
              ))}
              <p className="text-center font-body text-base text-text-primary sm:text-center">
                +14 more schemes matched
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
