import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import Image from "next/image";

const BlogDetailsPage = () => {
  return (
    <>
      <section className="pt-[150px] pb-[120px]">
        <div className="">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  Unlocking the Secrets of E-Waste: What Really Happens to Our
                  Old Gadgets?
                </h2>
                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Discover the hidden journey of your discarded electronics as
                    we delve into the world of E-waste – from the devices we
                    love to their impact on the environment.
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src="/images/blog/blog-details-02.jpg"
                        alt="image"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    E-waste is any electronic device that is no longer used or
                    wanted. It can be working or broken, and it can be thrown
                    away or donated. If it is donated and goes unsold, it is
                    likely to be thrown away. E-waste is dangerous because it
                    <span className="text-primary underline dark:text-white">
                      contains toxic chemicals{" "}
                    </span>{" "}
                    that can leak out of the metals when it is buried or thrown
                    improperly. While above ground, modern electronics are safe
                    to use and be around. However, most electronics contain some
                    form of toxic materials, including beryllium, cadmium,
                    mercury, and lead, which pose serious environmental risks to
                    our soil, water, air, and wildlife.
                    <strong className="text-primary dark:text-white">
                      malesuada
                    </strong>
                    proin libero nunc consequat interdum varius. Quam
                    pellentesque nec nam aliquam sem et tortor consequat.
                    Pellentesque adipiscing commodo elit at imperdiet.
                  </p>

                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    The Dangers of E-waste
                  </h3>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    According to the World Health Organization (WHO), health
                    risks may result from direct contact with toxic materials
                    that leach from e-waste. These include minerals such as
                    lead, cadmium, chromium, brominated flame retardants, or
                    polychlorinated biphenyls (PCBs). Danger can come from
                    inhalation of toxic fumes, as well as from the accumulation
                    of chemicals in soil, water, and food. This puts not just
                    people in danger but land and sea animals as well. E-waste
                    can affect humans in a number of ways. Exposure to the
                    harmful substances in e-waste can cause a variety of health
                    problems, including
                  </p>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    Measures taken by the Indian government
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    India has taken a number of measures to recycle e-waste,
                    including:
                  </p>
                  <ul className="mb-10 list-inside list-disc text-body-color">
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                      E-Waste (Management) Rules, 2016: These rules require
                      producers of electrical and electronic equipment (EEE) to
                      be responsible for the collection and recycling of their
                      products at the end of their life cycle. The rules also
                      establish a framework for the collection, transportation,
                      processing, and disposal of e-waste.
                    </li>
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                      E-Waste Collection Centers: The government has established
                      a number of e-waste collection centers across the country.
                      These centers collect e-waste from consumers and
                      businesses and send it to authorized recycling facilities.
                    </li>
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                      E-Waste Recycling Facilities: The government has also
                      authorized a number of e-waste recycling facilities across
                      the country. These facilities use state-of-the-art
                      technology to recycle e-waste in a safe and
                      environmentally sound manner.
                    </li>
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                      Public Awareness Campaigns: The government has launched
                      a number of public awareness campaigns to educate people
                      about the importance of recycling e-waste. These campaigns
                      have helped to increase awareness about the issue of
                      e-waste and have encouraged people to recycle their
                      e-waste
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPage;
