"use client";

import { FormEvent, useEffect, useState } from "react";
import { BookingModal } from "./modals/BookingModal";
import { BookingBar } from "./sections/BookingBar";
import { ContactBanner } from "./sections/ContactBanner";
import { DayMomentsSection } from "./sections/DayMomentsSection";
import { FaqSection } from "./sections/FaqSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { InteractiveMapSection } from "./sections/InteractiveMapSection";
import { LocalGuideSection } from "./sections/LocalGuideSection";
import { MomentsSection } from "./sections/MomentsSection";
import { NearbyRhythmsSection } from "./sections/NearbyRhythmsSection";
import { QuickBookingSection } from "./sections/QuickBookingSection";
import { ReviewsSection } from "./sections/ReviewsSection";
import { RoomDetailsSection } from "./sections/RoomDetailsSection";
import { RoomsSection } from "./sections/RoomsSection";
import { StorySection } from "./sections/StorySection";

export default function MarketingHome() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2 khách",
  });

  useEffect(() => {
    document.documentElement.lang = "vi";

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      document.body.setAttribute("data-scroll-dir", direction);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".marketing-home > section"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: "-10px 0px -10px 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  function handleOpenBooking() {
    setBookingOpen(true);
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingOpen(false);
  }

  return (
    <>
      <HeroSection onOpenBooking={handleOpenBooking} />

      <BookingBar />

      <StorySection />

      <RoomsSection onOpenBooking={handleOpenBooking} />

      <GallerySection />

      <ReviewsSection />

      <DayMomentsSection />

      <NearbyRhythmsSection />

      <MomentsSection onOpenBooking={handleOpenBooking} />

      <LocalGuideSection />

      <InteractiveMapSection />

      <RoomDetailsSection />

      <FaqSection />

      <ContactBanner onOpenBooking={handleOpenBooking} />

      <QuickBookingSection />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        booking={booking}
        setBooking={setBooking}
        onSubmit={submitBooking}
      />
    </>
  );
}
