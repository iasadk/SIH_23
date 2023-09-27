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
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { leaderBoardData } from "./disposeWasteData";
import user from "@/service/user";
import { toast } from "@/components/ui/use-toast";

const AboutPage = () => {
  const [data, setData] = useState([]);
  const [credit, setCredit] = useState(0);

  const getWasteTrack = async () => {
    try {
      const res: any = await user.trackWasteHistory();
      if (res.success) {
        toast({
          className: "bg-green-600",
          title: "Dispose Waste History Loaded.",
        });
        setData(res.data);
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
    getWasteTrack();
  }, []);
  // protecting page:
  if (!util.isLoggedIn()) {
    window.location.href = "/signin";
    return;
  }

  return (
    <>
      <Breadcrumb pageName="Your Disposed Waste" description="Thank you for your responsible waste disposal. Your actions contribute to a cleaner environment and a brighter future for us all." />
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container">
        <DataTable columns={columns} data={data} />
         
        </div>
      </section>
    </>
  );
};

export default AboutPage;
