"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import GoldCoin from "@/components/svgs/goldCoin";
import { toast } from "@/components/ui/use-toast";
import creditPoints from "@/service/creditPoints";
import user from "@/service/user";
import { useEffect, useState } from "react";

const AboutPage = () => {
  const [data, setData] = useState({});
  const [credit, setCredit] = useState(0)
  const getProfile = async () => {
    try {
      const res: any = await user.profile();
      if (res.success) {
        toast({
          className: "bg-green-600",
          title: "Profile Data Loaded.",
        });
        console.log(res.data?.result);
        setData({ ...res.data?.result });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    }
  };
  const calculateCreditPoints = async () => {
    try {
      const res: any = await creditPoints.calculateCredits();
      if (res.success) {
        toast({
          className: "bg-green-600",
          title: "Credit Data Loaded.",
        });
        setCredit(res.data[0]?.coins)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const res: any = await user.register(data);
      if (res.success) {
        toast({
          className: "bg-green-600",
          title: "Profile Updated Successfully.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    }
  };
  
  useEffect(() => {
    getProfile();
    calculateCreditPoints();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Profile" description="" />
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full lg:w-7/12 xl:w-8/12 ">
              <div
                className="fadeInUp mb-12 rounded-md   lg:mb-5 "
                data-wow-delay=".15s
              "
              >
                <div className="-mx-4 flex flex-wrap ">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="Username"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        value={data?.username}
                        onChange={(e) =>
                          setData({ ...data, username: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        placeholder="Enter email"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        value={data?.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your Phone Number"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        value={data?.phone}
                        onChange={(e) =>
                          setData({ ...data, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password to update"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      value={data?.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Full Address
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter E-waste center address"
                        className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        value={data?.address}
                        onChange={(e) =>
                          setData({ ...data, address: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                      onClick={handleProfileUpdate}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[450px]">
              <div className="flex justify-center items-center flex-col m-[-150px]">
                <GoldCoin {...{ width: "200px", height: "200px"}} />
                <p className="text-center font-medium text-xl">Current Coin Balance</p>
                <p className="items-center font-bold text-2xl">{credit.toString() || 0} </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
