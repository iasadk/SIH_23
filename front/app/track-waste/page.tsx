"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useEffect, useState } from "react";
import util from "@/lib/helper";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import user from "@/service/user";

const AboutPage = () => {
  const [data, setData] = useState({});
  const [credit, setCredit] = useState(0);

  const getTrackWasteOrder = async () => {
    try {
      const res: any = await user.trackWasteOrder();
      if (res.success) {
        toast({
          className: "bg-green-600",
          title: "Track Waste Data Loaded.",
        });
        setData({ ...res.data });
        console.log(res.data)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    }
  };
  useEffect(() => {
    getTrackWasteOrder();
  }, []);
  // protecting page:
  if (!util.isLoggedIn()) {
    window.location.href = "/signin";
    return;
  }

  return (
    <>
      <Breadcrumb pageName="Track Waste" description="" />
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container">
          <ProgressBar
            percent={data?.progressPercentage || 20}
            filledBackground="linear-gradient(to right, #000428, #004e92);"
          >
            <Step transition="scale">
              {({ accomplished }) => (
                <Popover>
                  <PopoverTrigger>
                    <svg
                      fill="#000000"
                      width="50px"
                      height="50px"
                      viewBox="0 0 256 256"
                      id="Flat"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white"
                    >
                      <g opacity={0.2}>
                        <circle cx={128} cy={128} r={96} className="bg-white" />
                      </g>
                      <path d="M128,24A104,104,0,1,0,232,128,104.11791,104.11791,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.09957,88.09957,0,0,1,128,216ZM140,84v92a8,8,0,0,1-16,0V98.94434l-11.56348,7.70605a8.00008,8.00008,0,1,1-8.873-13.31445l24-15.99317A8.00039,8.00039,0,0,1,140,84Z" />
                    </svg>
                  </PopoverTrigger>
                  <PopoverContent className="text-center w-[200px] text-sm">
                    Request Under Process
                  </PopoverContent>
                </Popover>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <Popover>
                  <PopoverTrigger>
                    <svg
                      fill="#000000"
                      width="50px"
                      height="50px"
                      viewBox="0 0 256 256"
                      id="Flat"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white"
                    >
                      <g opacity={0.2}>
                        <circle cx={128} cy={128} r={96} />
                      </g>
                      <path d="M128,24A104,104,0,1,0,232,128,104.11791,104.11791,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.09957,88.09957,0,0,1,128,216Zm26.30273-93.7832-34.30566,45.77734H152a8,8,0,0,1,0,16H104.31738c-.10644.00391-.21289.00684-.31836.00684a8.00343,8.00343,0,0,1-6.30175-12.93164L141.37012,112.794a16.00416,16.00416,0,1,0-28.11621-15.01954A8,8,0,1,1,98.51758,91.542a32.00411,32.00411,0,1,1,56.01269,30.35547C154.457,122.00586,154.38184,122.1123,154.30273,122.2168Z" />
                    </svg>
                  </PopoverTrigger>
                  <PopoverContent className="text-center  w-[200px] text-sm">
                    Pick Up Truck is Coming
                  </PopoverContent>
                </Popover>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <Popover>
                  <PopoverTrigger>
                    <svg
                      fill="#000000"
                      width="50px"
                      height="50px"
                      viewBox="0 0 256 256"
                      id="Flat"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white"
                    >
                      <g opacity={0.2}>
                        <circle cx={128} cy={128} r={96} />
                      </g>
                      <path d="M128,24A104,104,0,1,0,232,128,104.11791,104.11791,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.09957,88.09957,0,0,1,128,216Zm21.459-89.45508a35.99995,35.99995,0,0,1-50.9121,50.91113,8.00052,8.00052,0,0,1,11.31445-11.31445A19.99959,19.99959,0,1,0,124.00293,132a8,8,0,0,1-6.55469-12.58691l19.1875-27.4209H103.99707a8,8,0,0,1,0-16h48a8,8,0,0,1,6.55469,12.58691L137.5332,118.61816A35.92893,35.92893,0,0,1,149.459,126.54492Z" />
                    </svg>
                  </PopoverTrigger>
                  <PopoverContent className="text-center  w-[200px] text-sm">
                    Amount Credited
                  </PopoverContent>
                </Popover>
              )}
            </Step>
          </ProgressBar>
          <div className="-mx-4 flex flex-wrap items-center mt-24 justify-between">
            <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-xl">
              Waste Detail:
              <ul className="text-sm">
                <li className="mt-2">Facility Name: {data?.facilityName}</li>
                <li className="mt-2">Product Name: {data?.productName}</li>
                <li className="mt-2">
                  Product Purchase Date: {data?.productPurchaseDate}
                </li>
                <li className="mt-2">Credit (If Dispose ): {data?.credit}</li>
              </ul>
            </h1>
            <Button variant={"outline"} className="text-red-500 border-red-500">
              Cancel Pick Up
            </Button>
          </div>
          <p className="text-sm text-center mt-16">Note: Our Pick boy will reach to you by 2:40 PM</p>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
