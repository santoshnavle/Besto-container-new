import { ProductItem } from '../types';

export const PRODUCTS: ProductItem[] = [
  // --- BESTOSIA® 7 Products ---
  {
    id: 'bestosia-otp',
    name: 'Bestosia OTP',
    fullName: 'Open Top Plain Barrel',
    category: 'refurbished',
    subCategory: 'Steel Drums',
    isBestosia: true,
    material: 'Refurbished Mild Steel (M.S.)',
    closureType: 'Removable Lid with Heavy-Duty Lever Ring Clamp',
    surfaceFinish: 'Plain internal finish, anti-corrosive industrial exterior paint',
    description: 'A refurbished open-top M.S. barrel engineered for solid, semi-solid and powdered materials. Built with rigorous de-denting, shot-blasting, and perimeter chime reinforcement for dependable industrial containment.',
    applications: [
      'Petroleum and grease compounds',
      'Industrial chemical powders & granules',
      'Food processing ingredients & raw materials',
      'Resins, pigments and masterbatches'
    ],
    specs: [
      { label: 'Type', value: 'Open Top Plain (OTP)' },
      { label: 'Substrate', value: 'Refurbished Mild Steel' },
      { label: 'Lid & Clamp', value: 'Full open-head with bolt or lever-lock ring' },
      { label: 'Internal Surface', value: 'Cleaned Plain Steel' },
      { label: 'Condition', value: 'BESTOSIA® Certified Reconditioned' }
    ]
  },
  {
    id: 'bestosia-otec',
    name: 'Bestosia OTEC',
    fullName: 'Open Top Epoxy Coated Barrel',
    category: 'refurbished',
    subCategory: 'Steel Drums',
    isBestosia: true,
    material: 'Refurbished Mild Steel (M.S.) with High-Grade Epoxy Lining',
    closureType: 'Removable Lid with Gasketed Locking Ring',
    surfaceFinish: 'Food/Chemical Grade Internal Epoxy Phenolic / Epoxy Lacquer',
    description: 'An epoxy-coated open-top barrel engineered for enhanced corrosion resistance and chemical inertness. Specifically processed to prevent any interaction between the steel substrate and sensitive materials.',
    applications: [
      'Cable jelly and optical fiber compounds',
      'Petroleum jelly & pharmaceutical intermediates',
      'Sensitive specialty chemicals & aggressive resins',
      'Corrosive pastes and polymer emulsions'
    ],
    specs: [
      { label: 'Type', value: 'Open Top Epoxy Coated (OTEC)' },
      { label: 'Substrate', value: 'Refurbished Mild Steel' },
      { label: 'Internal Coating', value: 'Bake-cured Epoxy Lacquer / Resin' },
      { label: 'Barrier Property', value: 'High chemical resistance & anti-rust barrier' },
      { label: 'Condition', value: 'BESTOSIA® Certified Reconditioned' }
    ]
  },
  {
    id: 'bestosia-cmp',
    name: 'Bestosia CMP',
    fullName: 'Close Mouth Plain Barrel',
    category: 'refurbished',
    subCategory: 'Steel Drums',
    isBestosia: true,
    material: 'Refurbished Mild Steel (M.S.)',
    closureType: 'Standard 2" and 3/4" Hex Bung Plugs with Gaskets',
    surfaceFinish: 'Plain interior, oven-cured exterior industrial coating',
    description: 'A refurbished close-mouth M.S. barrel engineered for solvents, oils, chemicals and industrial liquids. Fully leak-tested under pneumatic pressure to ensure zero seepage during transport and storage.',
    applications: [
      'Industrial solvents and thinners',
      'Lubricating oils, transformer oils & fuel blends',
      'Non-corrosive chemical solutions',
      'Industrial liquid bulk formulations'
    ],
    specs: [
      { label: 'Type', value: 'Close Mouth Plain (CMP)' },
      { label: 'Substrate', value: 'Refurbished Mild Steel' },
      { label: 'Fittings', value: '2-inch & 3/4-inch threaded bungs with nitrile/EPDM gaskets' },
      { label: 'Leak Testing', value: '100% pneumatic pressure leak evaluated' },
      { label: 'Condition', value: 'BESTOSIA® Certified Reconditioned' }
    ]
  },
  {
    id: 'bestosia-gicm',
    name: 'Bestosia GICM',
    fullName: 'Galvanized Iron Close Mouth Barrel',
    category: 'refurbished',
    subCategory: 'Steel Drums',
    isBestosia: true,
    material: 'Galvanized Iron (G.I.) with Hot-Dip Zinc Layer',
    closureType: '2" & 3/4" G.I. Threaded Bung Closures',
    surfaceFinish: 'Zinc spangle finish providing maximum oxidation immunity',
    description: 'A barrel offering high corrosion resistance, specifically designed for peppermint oil, spearmint oil, perfumery compounds and specialty liquids that cannot tolerate any paint or plain iron oxidation.',
    applications: [
      'Peppermint oil & spearmint oil processing',
      'Aromatic chemicals & perfumery compounds',
      'Essential oils & flavors',
      'High-purity specialty liquids & agrochemicals'
    ],
    specs: [
      { label: 'Type', value: 'Galvanized Iron Close Mouth (GICM)' },
      { label: 'Substrate', value: 'Reconditioned Galvanized Iron (G.I.)' },
      { label: 'Corrosion Shield', value: 'Continuous zinc metallurgic coating' },
      { label: 'Purity Level', value: 'Aroma-neutral & non-reactive' },
      { label: 'Condition', value: 'BESTOSIA® Certified Reconditioned' }
    ]
  },
  {
    id: 'bestosia-hdpec',
    name: 'Bestosia HDPEC',
    fullName: 'HDPE Close Mouth Barrel',
    category: 'refurbished',
    subCategory: 'Plastic Drums',
    isBestosia: true,
    tareWeight: '7.8 to 8.5 kg',
    material: 'High-Density Polyethylene (HDPE) Polymer',
    closureType: 'Dual Bung Plugs (Coarse & Fine Buttress Threads)',
    surfaceFinish: 'Seamless blow-molded finish, acid/alkali inert',
    description: 'A high-grade HDPE plastic barrel with an authentic tare weight of 7.8 to 8.5 kg. Suited for lubricants and liquid chemicals requiring unyielding resistance against acids, alkalis, and moisture.',
    applications: [
      'Automotive lubricants & hydraulic fluids',
      'Liquid industrial chemicals & surfactants',
      'Acidic and alkaline process reagents',
      'Aqueous chemical solutions and water treatment agents'
    ],
    specs: [
      { label: 'Type', value: 'HDPE Close Mouth (HDPEC)' },
      { label: 'Tare Weight', value: '7.8 to 8.5 kg' },
      { label: 'Polymer', value: 'High Molecular Weight HDPE' },
      { label: 'Chemical Inertness', value: 'Immune to rust, corrosion, and rot' },
      { label: 'Condition', value: 'BESTOSIA® Certified Reconditioned' }
    ]
  },
  {
    id: 'bestosia-ibc-max',
    name: 'Bestosia IBC MAX',
    fullName: 'Export Optimized Refurbished IBC',
    category: 'refurbished',
    subCategory: 'IBC Containers',
    isBestosia: true,
    exportReady: true,
    highlightBadge: 'Export Freight Optimized',
    material: 'Refurbished HDPE Bottle in Galvanized Tubular Steel Grid',
    closureType: 'Top filling port with screw lid & integrated bottom drain ball valve',
    surfaceFinish: 'Multi-stage hot water & alkaline sanitized, cage reconditioned',
    description: 'A refurbished IBC designed to accommodate up to 20 units in a standard 20-foot shipping container to minimize freight costs for export shipments. Maximizes payload efficiency for global B2B cargo logistics.',
    applications: [
      'Export bulk liquid transportation',
      'Chemical trade & maritime logistics',
      'Petrochemicals and technical fluids',
      'Bulk liquid agrochemicals and detergents'
    ],
    specs: [
      { label: 'Type', value: 'Export Optimized IBC (Bestosia IBC MAX)' },
      { label: 'Container Fit', value: 'Accommodates up to 20 units in a 20ft freight container' },
      { label: 'Frame', value: 'Reinforced tubular galvanized steel cage' },
      { label: 'Logistics Goal', value: 'Minimized ocean freight & trucking overhead' },
      { label: 'Condition', value: 'BESTOSIA® Certified Reconditioned' }
    ]
  },
  {
    id: 'bestosia-ibc-premium',
    name: 'Bestosia IBC Premium',
    fullName: 'High-Grade Refurbished IBC',
    category: 'refurbished',
    subCategory: 'IBC Containers',
    isBestosia: true,
    highlightBadge: 'Multi-Stage Tested',
    material: 'Highest-Grade Reconditioned HDPE with Precision Steel Cage',
    closureType: '150mm / 225mm Top Cam-Lock Cap & Certified Dispensing Valve',
    surfaceFinish: 'Ultra-clean bottle inspection with pressure decay & ultrasonic diagnostics',
    description: 'A highest-grade refurbished IBC undergoing rigorous multi-stage cleaning and testing. Suited for high-value liquid products, pharmaceutical raw materials and specialty solvents where supreme cleanliness is paramount.',
    applications: [
      'High-value specialty liquid products',
      'Pharmaceutical raw materials & fine chemicals',
      'Specialty solvents and electronic grade chemicals',
      'Cosmetic raw ingredients and surfactants'
    ],
    specs: [
      { label: 'Type', value: 'High-Grade Cleaned IBC (Bestosia IBC Premium)' },
      { label: 'Inspection Protocol', value: 'Rigorous multi-stage decontamination & testing' },
      { label: 'Target Media', value: 'High-value liquid compounds & fine chemicals' },
      { label: 'Discharge', value: 'Precision flow discharge valve with tamper-evident seal' },
      { label: 'Condition', value: 'BESTOSIA® Certified Reconditioned' }
    ]
  },

  // --- Brand-New Packaging ---
  {
    id: 'new-gi-barrels',
    name: 'New G.I. Barrels',
    fullName: 'Brand-New Galvanized Iron Barrels',
    category: 'new',
    subCategory: 'New Barrels',
    material: 'Virgin Galvanized Iron (G.I.) with Precision Zinc Spangle',
    closureType: 'Precision Machined Bung Closures with Viton/PTFE Gaskets',
    surfaceFinish: 'Factory new uniform hot-dip zinc coating',
    description: 'Brand-new G.I. Barrels sourced from reliable manufacturing partners adhering to stringent quality standards. Delivers pristine virgin containment for ultra-pure essential oils, aroma chemicals, and pharmaceuticals.',
    applications: [
      'Export-grade essential oils & menthol derivatives',
      'Perfumery aromatics & high-value fragrance bases',
      'Corrosive-sensitive specialty solvents',
      'Strict GMP pharmaceutical manufacturing compounds'
    ],
    specs: [
      { label: 'Origin', value: 'Brand-New Precision Factory Manufacturing' },
      { label: 'Metal Grade', value: 'Prime Quality Galvanized Iron' },
      { label: 'Corrosion Resistance', value: 'Permanent zinc barrier against rust & oxidation' },
      { label: 'Quality Partnering', value: 'Stringent multi-tier manufacturer inspection' },
      { label: 'Documentation', value: 'Manufacturer test report & compliance available' }
    ]
  },
  {
    id: 'new-ms-barrels',
    name: 'New M.S. Barrels',
    fullName: 'Brand-New Mild Steel Barrels',
    category: 'new',
    subCategory: 'New Barrels',
    material: 'Prime Cold-Rolled Mild Steel (M.S.)',
    closureType: 'Available in Open-Head (Removable Top) or Tight-Head (Closed Mouth)',
    surfaceFinish: 'Custom baked enamel paint outside, plain or internal epoxy lacquer',
    description: 'Brand-new M.S. Barrels built to international dimensional and structural standards. Sourced from partner mills ensuring pristine sheet thickness, seam integrity, and heavy-duty triple-seamed chimes.',
    applications: [
      'Petroleum lubricants, oils and fuels',
      'Bulk paint, resins and polymer coatings',
      'Organic solvents and industrial processing agents',
      'Hazardous & non-hazardous chemical transport'
    ],
    specs: [
      { label: 'Origin', value: 'Brand-New Certified Factory Manufacturing' },
      { label: 'Configuration', value: 'Available in Open Top or Close Mouth' },
      { label: 'Chime Construction', value: 'Heavy-duty triple-seamed rolled chimes' },
      { label: 'Exterior Finish', value: 'Industrial baked paint to customer color spec' },
      { label: 'Compliance', value: 'Manufactured to strict industrial packaging standards' }
    ]
  },
  {
    id: 'new-ibc-totes',
    name: 'New IBCs',
    fullName: 'Brand-New Intermediate Bulk Containers',
    category: 'new',
    subCategory: 'New IBCs',
    material: 'Virgin UV-Stabilized High Molecular Weight HDPE with Galvanized Grid',
    closureType: 'DN150 / DN225 Screw Cap with Breather; Integrated Camlock Valve',
    surfaceFinish: 'Virgin food-contact and chemical-safe cleanroom blown bottle',
    description: 'Brand-new Intermediate Bulk Containers (IBCs) engineered for demanding bulk liquid packaging. Sourced from premier manufacturers adhering to rigid dimensional, drop-test, and hydrostatic tolerances.',
    applications: [
      'High-purity chemical liquids & acid formulations',
      'Bulk food additives, edible oils & concentrates',
      'Pharmaceutical excipients and active intermediates',
      'International sea freight & containerized shipping'
    ],
    specs: [
      { label: 'Origin', value: 'Brand-New Virgin Manufacturing' },
      { label: 'Bottle Material', value: 'Virgin HMW-HDPE with UV stabilization' },
      { label: 'Cage & Pallet', value: 'Heavy-duty tubular steel cage on 4-way pallet' },
      { label: 'Valve System', value: 'Integrated butterfly or ball valve with tamper seal' },
      { label: 'Partner Standards', value: 'Verified manufacturer quality assurance' }
    ]
  },

  // --- Verified Legacy Categories Preserved ---
  {
    id: 'legacy-carboys',
    name: 'HDPE Carboys & Cans',
    fullName: 'Industrial HDPE Carboys & Narrow-Mouth Cans',
    category: 'legacy',
    subCategory: 'Carboys & Jerrycans',
    material: 'Blow-Molded High-Density Polyethylene',
    closureType: 'Threaded Cap with Inner Plug & Tamper-Evident Ring',
    surfaceFinish: 'Chemical-resistant smooth HDPE wall',
    description: 'Durable reconditioned and surplus HDPE carboys and industrial cans ranging from 20L to 50L. Ideal for chemical sampling, localized plant dispensing, and smaller volume liquid transport.',
    applications: [
      'Laboratory reagents and plant chemical dosing',
      'Industrial detergents and cleaning compounds',
      'Water treatment formulations',
      'Pesticide and agricultural spray formulations'
    ],
    specs: [
      { label: 'Category', value: 'Carboys & Small Industrial Containers' },
      { label: 'Handling', value: 'Molded-in top carry handles' },
      { label: 'Resistance', value: 'High chemical resistance to acids and alkalis' },
      { label: 'Sourcing', value: 'Available in reconditioned & secondary batches' }
    ]
  },
  {
    id: 'legacy-plastic-drums',
    name: 'Open Top Plastic Drums',
    fullName: 'Wide-Mouth HDPE Plastic Drums with Clamping Ring',
    category: 'legacy',
    subCategory: 'Plastic Drums',
    material: 'Heavy-Duty Virgin / Reconditioned HDPE',
    closureType: 'Removable Full-Diameter Lid with Galvanized Lever Band',
    surfaceFinish: 'Seamless easy-clean internal cavity',
    description: 'Wide-mouth plastic drums designed for powders, dyes, viscous pastes, and bulk solids where full-diameter access is essential for filling and scooping.',
    applications: [
      'Textile dyes, pigments, and mordants',
      'Chemical powders and granulated raw materials',
      'Pickles, food processing pulps and pastes',
      'Solid waste and secondary containment'
    ],
    specs: [
      { label: 'Category', value: 'Open Top Plastic Drums' },
      { label: 'Access', value: 'Full diameter wide-mouth opening' },
      { label: 'Ring Clamp', value: 'Heavy-duty galvanized steel lever lock' },
      { label: 'Corrosion Shield', value: '100% rustproof all-polymer body' }
    ]
  },
  {
    id: 'legacy-ibc-laundering',
    name: 'IBC Laundering & Reconditioning Service',
    fullName: 'Comprehensive Industrial IBC Bottle Laundering & Cage Rebuilding',
    category: 'legacy',
    subCategory: 'IBC Services',
    material: 'Full Tube & Wire Cage Laundering, Multi-Stage Chemical Cleaned',
    closureType: 'Compatible with standard DN150/DN225 ports and valve types',
    surfaceFinish: 'Residue-free sanitized inner cavity, degreased outer cage',
    description: 'A complete IBC laundering and reconditioning service for client-owned or secondary market IBCs. Compatible with major tote brands including Schütz, Kodama, and Mauser. Employs multi-stage caustic and neutral wash cycles with effluent treated via our on-site ETP.',
    applications: [
      'Chemical manufacturer IBC fleet rejuvenation',
      'Paint and coating tote washing',
      'Agrochemical and lubricant container recycling',
      'Schütz & Kodama IBC compatibility and maintenance'
    ],
    specs: [
      { label: 'Service Category', value: 'IBC Laundering & Reconditioning' },
      { label: 'Cage Compatibility', value: 'Standard tubular & wire grid cages (Schütz, Kodama, Mauser)' },
      { label: 'Process Loop', value: 'Hydro-decanting, chemical wash, rinse & dry' },
      { label: 'Leak Inspection', value: 'Pneumatic decay & bottom valve integrity check' },
      { label: 'Environmental', value: 'ZLD effluent treatment under MPCB consent' }
    ]
  },
  {
    id: 'legacy-hmhdpe-drums',
    name: 'HMHDPE & M.S. Drums (30L–100L)',
    fullName: 'Reconditioned High-Molecular HDPE & Mild Steel Close Mouth Drums',
    category: 'legacy',
    subCategory: 'Mid-Capacity Drums',
    material: 'High-Molecular High-Density Polyethylene & Mild Steel',
    closureType: 'Threaded Bung Closures with Sealing Plugs',
    surfaceFinish: '"As good as new" restored surface finish',
    description: 'Reconditioned 30 to 100-liter capacity drums supplying smaller batch processing and formulation operations. Inspected to "as good as new" condition, providing immense savings to procurement teams without sacrificing leak safety.',
    applications: [
      'Specialty chemical batches (30L, 50L, 100L)',
      'Flavor, fragrance and aromatic additives',
      'Agricultural formulation concentrates',
      'Intermediate bulk transfer within plant facilities'
    ],
    specs: [
      { label: 'Capacity Range', value: '30 Liters, 50 Liters, 100 Liters' },
      { label: 'Material Options', value: 'HMHDPE Polymer or Mild Steel (M.S.)' },
      { label: 'Quality Assurance', value: '"As Good as New" tested condition' },
      { label: 'Economic Value', value: 'Substantial savings vs new drums' }
    ]
  }
];
