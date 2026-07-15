import { latestUpdates } from '../../data/landingData';
import UpdateCard from '../ui/UpdateCard';
import SectionHeader from '../ui/SectionHeader';

export default function LatestUpdatesSection() {
  return (
    <section id="updates" className="bg-white py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-20">
        <SectionHeader
          eyebrow="STAY INFORMED"
          eyebrowColor="text-brand-blue-dark"
          title="Latest Government Updates"
          className="mb-6 sm:mb-10"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestUpdates.map((update) => (
            <UpdateCard key={update.title} update={update} />
          ))}
        </div>
      </div>
    </section>
  );
}
