import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import LeaderBoard from "@/components/LeaderBoardHome";
import Video from "@/components/Video";
import EduPopup from "@/components//EduPopup"
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <EduPopup />
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <AboutSectionTwo />
      <LeaderBoard />
      <Blog />
      <Contact />
    </>
  );
}
