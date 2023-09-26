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
      title: "hola1",
      description: "haovnajlnfbnajnbjlhaovnajlnfbnajnbjl",
    },
    {
      title: "hola2",
      description: "haovnajlnfbnajnbjlhaovnajlnfbnajnbjl",
    },
    {
      title: "hola3",
      description: "haovnajlnfbnajnbjlhaovnajlnfbnajnbjl",
    },
  ];

  const randomIndex = Math.floor(Math.random() * popupData.length);

  const randomPopup = popupData[randomIndex];

  useEffect(() => {
    // Check if the popup has already been shown in this session
    const hasPopupBeenShown = sessionStorage.getItem("popupShown");

    if (!hasPopupBeenShown) {
      const randomIndex = Math.floor(Math.random() * popupData.length);
      const randomPopup = popupData[randomIndex];

      // Show the popup
      toast({
        title: randomPopup.title,
        description: randomPopup.description,
      });

      // Mark the popup as shown in this session
      sessionStorage.setItem("popupShown", "true");
      setShownPopup(true);
    }
  }, []);
}

export default EduPopup;
