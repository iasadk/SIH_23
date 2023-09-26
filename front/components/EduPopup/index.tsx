"use client";
import React from "react";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";

const EduPopup = () => {
  const [flag, setFlag] = useState(true);
  const [shownPopup, setShownPopup] = useState(false);

  const { toast } = useToast();

  const popupData = [
    {
      title: "E-Waste's Hidden Value",
      description: "E-waste recycling can recover metals like gold, silver, and copper, reducing the need for mining.",
    },
    {
      title: "E-Waste's Global Impact",
      description: "Properly disposing of electronics helps mitigate the global e-waste crisis and protect our planet.",
    },
    {
      title: "Reuse as often as possible",
      description: "If you have parts and equipment that are still working, try reapiring the electronic device before getting a new one. If the device is beyond the point of being repaired, then recycle it.",
    },
    {
      title: "E-waste harms children's health",
      description: "E-waste exposure can harm children's lungs, breathing, DNA, thyroid, and increase their risk of cancer and heart disease later in life.",
    },
    {
      title: "Recycle Electronics",
      description: "Recycling e-waste conserves resources and prevents toxic pollution. Be eco-conscious!",
    },
    {
      title: "Toxic E-Waste Components",
      description: "Electronics contain harmful toxins. Dispose them safely to protect ecosystems and health.",
    },
    {
      title: "E-Waste Recycling Benefits",
      description: "Recycling recovers valuable metals and reduces energy consumption. Go green with e-waste recycling.",
    },
    {
      title: "E-Waste: Poison in Disguise",
      description: "Beware! E-waste hides toxic dangers. Handle with care, recycle with responsibility.", 
    },
    {
      title: "Recycling E-Waste Conserves Resources",
      description: "Recycling e-waste conserves valuable resources, such as metals and plastics, reducing the need for raw material extraction",
    },
    {
      title: "E-Waste's Toxic Legacy",
      description: "E-waste contains hazardous materials like lead and mercury. These toxins can seep into soil and water, posing risks to ecosystems and human health",
    },
    {
      title: "Extinction of resources",
      description: "Manufacturing a computer require a total of 530lbs of fossil fuel",
    },
    {
      title: "Hazardous materials in E-waste",
      description: "These materials can contaminate soil and water, and they can also pose a risk to human health. For example, exposure to lead can damage the nervous system and kidneys, and exposure to mercury can damage the brain and kidneys, so dispose them properly. ",
    },
    {
      title: "E-Waste Recycling Matters",
      description: "Recycling electronics conserves resources and reduces pollution. Fun Fact: Recycling one million laptops can save energy equivalent to powering 3,657 homes for a year.",
    },
    {
      title: "Reuse Old Devices",
      description: "Extend the lifespan of your gadgets through repair and reuse. It's an eco-friendly choice that reduces e-waste and saves you money.", 
    },
    {
      title: "Eco-Friendly Disposal",
      description: "Use certified e-waste recycling centers to ensure your old electronics are disposed of safely and sustainably.",
    },
    {
      title: "E-Waste's Environmental Toll",
      description: "E-waste landfill leachate can be 30-40 times more toxic than raw sewage. Proper recycling is essential to protect our planet.",
    },
  ];

  const randomIndex = Math.floor(Math.random() * popupData.length);

  const randomPopup = popupData[randomIndex];

  useEffect(() => {
    const hasPopupBeenShown = sessionStorage.getItem("popupShown");

    if (!hasPopupBeenShown) {
      const randomIndex = Math.floor(Math.random() * popupData.length);
      const randomPopup = popupData[randomIndex];

      toast({
        title: randomPopup.title,
        description: randomPopup.description,
      });

      sessionStorage.setItem("popupShown", "true");
      setShownPopup(true);
    }
  }, []);
}

export default EduPopup;
