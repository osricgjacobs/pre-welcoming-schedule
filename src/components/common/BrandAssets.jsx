import React from "react";

export const ASSET_PATHS = {
  crest: `${import.meta.env.BASE_URL}images/helshoogte-crest.png`,
  hkShield: `${import.meta.env.BASE_URL}images/hk-chicken-shield.svg`,
  blueChicken: `${import.meta.env.BASE_URL}images/blue-bayoux-chicken.svg`,
};

export function HelshoogteCrestImg({
  className = "w-10 h-10 object-contain",
  invert = false,
}) {
  return (
    <img
      src={ASSET_PATHS.crest}
      alt="Helshoogte Official Three-Pillar House Crest"
      className={`${className} ${invert ? "brightness-0 invert" : ""}`}
    />
  );
}

export function HansStormChickenShieldImg({
  className = "w-12 h-14 object-contain",
}) {
  return (
    <img
      src={ASSET_PATHS.hkShield}
      alt="Helshoogte HK Hans Storm Chicken Emblem"
      className={className}
    />
  );
}
