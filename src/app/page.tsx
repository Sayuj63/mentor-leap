import Hero from "@/components/home/Hero";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import WhatIsMentorLeap from "@/components/home/WhatIsMentorLeap";
import ServicesOverview from "@/components/home/ServicesOverview";
import AboutMridu from "@/components/home/AboutMridu";
import MentorAIFeature from "@/components/home/MentorAIFeature";
import LiveEventsPreview from "@/components/home/LiveEventsPreview";
import ResourceLibraryPreview from "@/components/home/ResourceLibraryPreview";
import Testimonials from "@/components/home/Testimonials";
import StudioReel from "@/components/home/StudioReel";
import FreeCourse from "@/components/home/FreeCourse";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <WhatIsMentorLeap />
      <ServicesOverview />
      <AboutMridu />
      <MentorAIFeature />
      <FreeCourse />
      <LiveEventsPreview />
      <StudioReel />
      <ResourceLibraryPreview />
      <Testimonials />
    </>
  );
}