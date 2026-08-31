"use client";

import AnnouncementBar, { AnnouncementBarSlider } from "./announcement-bar";

export function Preview() {
  return (
    <div className="flex w-full flex-col gap-6">
      <AnnouncementBar theme="gray" className="w-full text-center">
        <p className="px-4 text-14">This is an announcement bar.</p>
      </AnnouncementBar>
      <AnnouncementBarSlider theme="gray">
        <p>
          We’re donating $10 to the National Park Foundation for each purchase made at Apple using
          Apple Pay through August 28.*
        </p>
        <p>Save on Mac and iPad for college with education pricing.</p>
        <p>Shop the latest Apple Watch bands and accessories.</p>
      </AnnouncementBarSlider>
    </div>
  );
}
