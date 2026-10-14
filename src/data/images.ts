export interface ImageMeta {
  url: string;
  localPath: string;
  alt: string;
  caption: string;
  isRepresentative: boolean;
  aspectRatio?: string;
}

export const SITE_IMAGES: Record<string, ImageMeta> = {
  // --- Homepage Hero ---
  'hero-warehouse': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/hero/hero-warehouse.jpg',
    alt: 'Industrial logistics warehouse with reconditioned steel barrels and IBC containers on pallets',
    caption: 'Representative industrial warehouse image showing bulk containers staged for logistics.',
    isRepresentative: true,
    aspectRatio: '16/9'
  },

  // --- BESTOSIA® 7 Refurbished Products ---
  'bestosia-otp': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/bestosia-otp.jpg',
    alt: 'Bestosia OTP Open Top Plain mild steel reconditioned barrel with removable lid and clamp ring',
    caption: 'Representative industrial photograph of open-top steel drum with lever-lock ring clamp.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'bestosia-otec': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/bestosia-otec.jpg',
    alt: 'Bestosia OTEC Open Top Epoxy Coated reconditioned barrel with corrosion resistant internal lining',
    caption: 'Representative industrial photograph of chemical drum with high-adhesion internal epoxy coating.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'bestosia-cmp': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/bestosia-cmp.jpg',
    alt: 'Bestosia CMP Close Mouth Plain refurbished steel drum with 2 inch and 3/4 inch threaded bungs',
    caption: 'Representative industrial photograph of tight-head mild steel drum for liquid chemicals and solvents.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'bestosia-gicm': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/bestosia-gicm.jpg',
    alt: 'Bestosia GICM Galvanized Iron Close Mouth barrel with protective hot-dip zinc spangle layer',
    caption: 'Representative photograph of galvanized steel container tailored for essential and peppermint oils.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'bestosia-hdpec': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/bestosia-hdpec.jpg',
    alt: 'Bestosia HDPEC Blue HDPE Close Mouth 210 liter plastic barrel tare weight 7.8 to 8.5 kg',
    caption: 'Representative photograph of high-density polyethylene tight-head drum with verified tare weight.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'bestosia-ibc-max': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/bestosia-ibc-max.jpg',
    alt: 'Bestosia IBC MAX Export Optimized refurbished 1000L tote container staged for 20ft container shipping',
    caption: 'Representative photograph of reconditioned IBC container optimized to fit 20 units in a 20ft freight container.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'bestosia-ibc-premium': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/bestosia-ibc-premium.jpg',
    alt: 'Bestosia IBC Premium High-Grade multi-stage cleaned refurbished 1000 liter intermediate bulk container',
    caption: 'Representative photograph of ultra-clean inspected IBC tote for pharma raw materials and specialty liquids.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },

  // --- Brand-New Packaging ---
  'new-gi-barrels': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/new-gi-barrels.jpg',
    alt: 'Brand-new factory manufactured Galvanized Iron GI barrels with uniform zinc spangle',
    caption: 'Representative photograph of brand-new galvanized steel industrial packaging.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'new-ms-barrels': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/new-ms-barrels.jpg',
    alt: 'Brand-new factory fresh Mild Steel MS barrels with baked industrial enamel coating',
    caption: 'Representative photograph of brand-new cold-rolled mild steel industrial drums.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'new-ibc-totes': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/new-ibc-totes.jpg',
    alt: 'Brand-new 1000 liter Intermediate Bulk Container IBC with virgin UV stabilized HDPE bottle and steel cage',
    caption: 'Representative photograph of brand-new virgin HDPE 1000L composite IBC container.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },

  // --- Legacy Categories & Services ---
  'legacy-carboys': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/legacy-carboys.jpg',
    alt: 'Industrial HDPE carboys and narrow mouth dispensing cans 20L to 50L capacity',
    caption: 'Representative photograph of blow-molded industrial carboys and chemical sampling cans.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'legacy-plastic-drums': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/legacy-plastic-drums.jpg',
    alt: 'Open top wide mouth HDPE plastic drums with galvanized lever clamp band',
    caption: 'Representative photograph of wide-mouth plastic containers for solid and viscous materials.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'legacy-ibc-laundering': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/legacy-ibc-laundering.jpg',
    alt: 'Industrial IBC tote laundering washing and cage reconditioning service for Schutz and Kodama totes',
    caption: 'Representative photograph of intermediate bulk containers staged in an industrial reconditioning line.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },
  'legacy-hmhdpe-drums': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/products/legacy-hmhdpe-drums.jpg',
    alt: 'Reconditioned HMHDPE and mild steel close mouth drums 30 liter 50 liter and 100 liter capacity',
    caption: 'Representative photograph of mid-capacity reconditioned chemical drums inspected to as good as new condition.',
    isRepresentative: true,
    aspectRatio: '4/3'
  },

  // --- Processing Facility, ETP & QA ---
  'facility-reconditioning': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/facility/facility-reconditioning.jpg',
    alt: 'Dedicated industrial barrel reconditioning workshop with automated washing and de-denting machinery',
    caption: 'Representative industrial photograph depicting container reconditioning machinery and workflow.',
    isRepresentative: true,
    aspectRatio: '16/9'
  },
  'facility-etp-plant': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/facility/facility-etp-plant.jpg',
    alt: 'Modern industrial Effluent Treatment Plant ETP with Zero Liquid Discharge ZLD piping and filtration tanks',
    caption: 'Representative industrial photograph of an effluent treatment facility operating under Zero Liquid Discharge principles.',
    isRepresentative: true,
    aspectRatio: '16/9'
  },
  'facility-quality-inspection': {
    url: 'https://cdn.myimgs.org/images/58223/Gemini_Generated_Image_8mn5im8mn5im8mn5.png',
    localPath: '/images/facility/facility-quality-inspection.jpg',
    alt: 'Quality assurance engineer conducting technical inspection and pneumatic leak testing on industrial containers',
    caption: 'Representative industrial photograph of technical quality inspection and ISO standard auditing.',
    isRepresentative: true,
    aspectRatio: '16/9'
  }
};
