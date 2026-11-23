import InvitationProvider from "@/components/InvitationProvider";
import Intro from "@/components/Intro";
import Shell from "@/components/Shell";
import MusicButton from "@/components/MusicButton";
import AutoScroll from "@/components/AutoScroll";
import Guestbook from "@/components/Guestbook";
import Hero from "@/components/sections/Hero";
import CeremonyInfo from "@/components/sections/CeremonyInfo";
// import Gallery from "@/components/sections/Gallery"; // photo gallery — turned off for now
import Divider from "@/components/sections/Divider";
import ReceptionInfo from "@/components/sections/ReceptionInfo";
import Rsvp from "@/components/sections/Rsvp";
import Venue from "@/components/sections/Venue";
import DressCode from "@/components/sections/DressCode";
import Schedule from "@/components/sections/Schedule";
import Quotes from "@/components/sections/Quotes";
import Footer from "@/components/sections/Footer";
import LangToggle from "@/components/LangToggle";
import { LangProvider } from "@/lib/i18n";

export default function Page() {
  return (
    <LangProvider>
    <InvitationProvider>
      <Shell>
        <Hero />
        <CeremonyInfo />
        {/* <Gallery /> */}
        <Divider />
        <ReceptionInfo />
        <Rsvp />
        <Venue />
        <DressCode />
        <Schedule />
        <Quotes />
        <Guestbook />
        <Footer />
      </Shell>
      <Intro />
      <MusicButton />
      <AutoScroll />
      <LangToggle />
    </InvitationProvider>
    </LangProvider>
  );
}
