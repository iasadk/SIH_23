import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Our Reward System"
          paragraph="Discover the exciting world of rewards and incentives at our E-Waste Recycling Hub"
          center
        />
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-2.jpg"
                alt="about image"
                fill
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Submit Your E-Waste
                </h3>
                <p className="text-base font-light leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Start your eco-journey by filling out a simple form detailing
                  your e-waste. Tell us what you&apos;re recycling, and we&apos;ll take it
                  from there.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Calculate Your Reward
                </h3>
                <p className="text-base font-light leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Click the &apos;Calculate Reward&apos; button and instantly receive a personalized quote from our automate system. We believe in transparency, so you&apos;ll know the value of your contribution upfront.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Choose Your Path
                </h3>
                <p className="text-base font-light leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                If the reward meets your expectations, you can choose to &apos;Collect&apos; it, turning your e-waste into tangible benefits. Alternatively, you have the option to &apos;Give Back&apos; by donating your reward to the nearest e-waste facility.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Rewards Await
                </h3>
                <p className="text-base font-light leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                After you&apos;ve submitted your e-waste, our team will review and approve your reward. It&apos;s our way of saying &apos;thank you&apos; for your dedication to sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
