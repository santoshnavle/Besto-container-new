import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, auth, storage, handleFirestoreError, OperationType } from '../lib/firebase';
import { BlogPost, BlogCategory } from '../types';

const POSTS_COLLECTION = 'blog_posts';
const CATEGORIES_COLLECTION = 'blog_categories';

export const INITIAL_CATEGORIES: Array<{ name: string; slug: string; description: string }> = [
  {
    name: 'BESTOSIA® Quality & Reconditioning',
    slug: 'bestosia-quality',
    description: 'Technical insights into reconditioning, multi-stage laundering, pneumatic leak testing, and quality standards.',
  },
  {
    name: 'Industrial Packaging Selection',
    slug: 'packaging-selection',
    description: 'Practical guides comparing steel, HDPE, and IBC containers for industrial chemical and food-grade operations.',
  },
  {
    name: 'ZLD & Environmental Compliance',
    slug: 'environmental-zld',
    description: 'Zero Liquid Discharge sustainability, MPCB compliance, circular economy, and industrial waste mitigation.',
  },
  {
    name: 'Hazardous Goods & UN Standards',
    slug: 'hazardous-un-standards',
    description: 'Regulatory guidelines, UN performance packaging ratings, drop tests, and chemical compatibility.',
  },
  {
    name: 'Bulk Logistics & IBC Solutions',
    slug: 'bulk-logistics-ibc',
    description: '1000L IBC totes handling, logistics optimization, laundering cycles, and tare weight efficiency.',
  },
];

export const INITIAL_BLOG_POSTS: Array<Omit<BlogPost, 'id'>> = [
  {
    title: 'The Industrial Buyer’s Guide to Reconditioned Steel Drums vs. Virgin Barrels',
    slug: 'reconditioned-steel-drums-vs-virgin-drums-guide',
    category: 'Industrial Packaging Selection',
    tags: 'steel drums, reconditioning, cost savings, packaging economics, sustainability',
    author: 'Besto Technical Engineering Team',
    authorEmail: 'sales@bestosia.com',
    seoTitle: 'Reconditioned Steel Drums vs Virgin Barrels | Besto Container Industries',
    seoDescription: 'Compare total cost of ownership, UN performance specifications, and circular economy advantages of reconditioned steel barrels vs new containers.',
    coverImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Warehouse stack of reconditioned industrial steel drums in organized pallets',
    excerpt: 'How plant managers and procurement leads evaluate cost efficiency, pressure testing protocols, and carbon lifecycle metrics without compromising container integrity.',
    status: 'published',
    publishedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    content: `
      <h2>The Strategic Equation of Industrial Packaging Procurement</h2>
      <p>For chemical manufacturers, paint formulators, and specialty lubricant producers across Western India, packaging procurement represents both a significant operating expenditure and an essential compliance checkpoint. While brand-new steel drums provide the reassurance of untouched steel gauge, the modern industrial packaging ecosystem has evolved.</p>
      
      <p>Under rigorous remanufacturing engineering—such as our proprietary <strong>BESTOSIA® reconditioning workflow</strong>—reconditioned barrels deliver identical operational security at <strong>30% to 45% lower procurement costs</strong>, all while preventing heavy carbon emissions associated with virgin steel smelting.</p>

      <h3>1. Dimensional & Structural Uniformity</h3>
      <p>The primary concern regarding refurbished drums has historically been structural fatigue. At Besto Container Industries in Palghar, each incoming steel container undergoes mechanical de-denting, pneumatic chime expansion, and robotic seam re-curling. The barrel geometry is restored to exact ISO tolerances (height 885 ± 5 mm, internal diameter 572 ± 3 mm), ensuring seamless compatibility with automated palletizers, robotic drum grippers, and conveyor lines.</p>

      <h3>2. Internal Surface Cleansing vs. Virgin Internal Finishes</h3>
      <ul>
        <li><strong>Open-Top Plain (OTP):</strong> Thermal internal cleansing followed by high-pressure abrasive shot blasting to white-metal purity, ready for lubricants, greases, and heavy pastes.</li>
        <li><strong>Open-Top Epoxy Coated (OTEC):</strong> Chemical stripping followed by high-solids phenolic epoxy lining (35–50 microns) baked under controlled convection ovens for acidic and reactive compounds.</li>
        <li><strong>Close-Mouth Plain (CMP):</strong> Hot caustic agitation, multi-rinse de-ionized water flush, and warm-air dehumidification eliminating trace hydrocarbon residue.</li>
      </ul>

      <h3>3. 100% Hydrostatic and Pneumatic Testing</h3>
      <p>Unlike random batch sampling frequently practiced in generic manufacturing, every single reconditioned barrel leaving our Palghar facility is submerged in our specialized testing basin and subjected to <strong>30 kPa positive air pressure</strong> with soap-solution seam inspection to guarantee zero micro-porosity.</p>

      <h3>Conclusion</h3>
      <p>Dual-sourcing between brand-new barrels for critical export formulations and certified BESTOSIA® refurbished barrels for standard domestic distribution provides chemical manufacturers with maximum fiscal resilience and sustainable compliance.</p>
    `,
  },
  {
    title: 'Zero Liquid Discharge (ZLD) in Drum Reconditioning: How Besto Operates Responsibly',
    slug: 'zld-effluent-treatment-drum-reconditioning-palghar',
    category: 'ZLD & Environmental Compliance',
    tags: 'ZLD, MPCB, environment, ETP, water recycling, Palghar facility',
    author: 'Environmental Compliance Desk',
    authorEmail: 'sustainability@bestosia.com',
    seoTitle: 'Zero Liquid Discharge (ZLD) Reconditioning Facility | Besto Container',
    seoDescription: 'Discover how Besto Container Industries operates an authorized MPCB facility with an on-site multi-stage Effluent Treatment Plant ensuring Zero Liquid Discharge.',
    coverImageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern industrial water treatment facility and environmental recycling equipment',
    excerpt: 'A technical walkthrough of our multi-stage on-site Effluent Treatment Plant (ETP), multi-effect evaporators, and closed-loop water recirculation.',
    status: 'published',
    publishedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    content: `
      <h2>Industrial Responsibility Beyond Surface Cleanliness</h2>
      <p>The drum reconditioning industry carries an immense environmental responsibility. Washing thousands of industrial barrels and IBC totes daily requires chemical detergents, hot caustic solutions, and neutralizing rinses. Without specialized environmental engineering, wastewater runoff risks contaminating municipal waterways and agricultural soil.</p>

      <p>Besto Container Industries operates with explicit authorization from the <strong>Maharashtra Pollution Control Board (MPCB)</strong> and is anchored by our commitment to <strong>Zero Liquid Discharge (ZLD)</strong> at our Palghar facility.</p>

      <h3>What Does Zero Liquid Discharge Mean in Practice?</h3>
      <p>ZLD is an advanced wastewater treatment process where all industrial wash effluent is purified and recycled, leaving no liquid waste discharged into the external environment. Solid residues are safely condensed, crystallized, and channeled to authorized hazardous waste handling facilities.</p>

      <h3>The 4-Stage Besto Water Purification Loop</h3>
      <ol>
        <li><strong>Primary Sedimentation & Oil-Skimming:</strong> High-efficiency dissolved air flotation (DAF) units capture insoluble oily contaminants and solvent films washed from the barrels.</li>
        <li><strong>Chemical Coagulation & Flocculation:</strong> Poly-aluminum chloride and specialized polyelectrolytes neutralize charges and precipitate suspended heavy particulates.</li>
        <li><strong>Multi-Media Sand & Activated Carbon Filtration:</strong> Adsorption columns eliminate trace odors, color bodies, and chemical surfactants.</li>
        <li><strong>Reverse Osmosis & Multi-Effect Evaporation (MEE):</strong> Concentrated brine is converted into crystal solids while clean permeate water is piped back into the first-stage drum washing cycles.</li>
      </ol>

      <h3>Auditable Peace of Mind for ESG Audits</h3>
      <p>Global pharmaceutical and chemical conglomerates require their supply-chain vendors to furnish transparent environmental compliance logs. By sourcing reconditioned containers from an authenticated ZLD operator, our clients eliminate regulatory liability and fortify their Scope 3 greenhouse gas reporting.</p>
    `,
  },
  {
    title: 'Understanding UN Performance Packaging Ratings on Industrial Steel Drums',
    slug: 'understanding-un-packaging-ratings-steel-drums',
    category: 'Hazardous Goods & UN Standards',
    tags: 'UN ratings, hazardous materials, drop test, stacking test, DG shipping',
    author: 'Quality Assurance Lead',
    authorEmail: 'qa@bestosia.com',
    seoTitle: 'UN Ratings & Drop Testing on Industrial Drums | Besto Container Industries',
    seoDescription: 'Decode UN packaging codes on industrial barrels: Packing Groups I, II, III, hydrostatic test pressures, and hazardous chemical compliance.',
    coverImageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Industrial steel barrels being inspected with precision pressure measuring devices',
    excerpt: 'Demystifying the alphanumeric UN stamp on chemical barrels: understanding packing groups, hydraulic pressure test marks, and gross mass thresholds.',
    status: 'published',
    publishedAt: new Date(Date.now() - 21 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 21 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    content: `
      <h2>Decoding the Alphanumeric UN Specification Code</h2>
      <p>When shipping hazardous chemicals by road, rail, or sea, every industrial container must bear an internationally certified United Nations (UN) specification mark. This embossing is not merely a formality—it is a legally binding guarantee that the drum design has passed rigorous physical tests under severe stresses.</p>

      <p>A typical UN drum mark looks like: <code>UN 1A1 / X1.8 / 250 / 24 / IND / BESTO</code>. What does this communicate?</p>

      <h3>Key Components of the UN Code</h3>
      <ul>
        <li><strong>1A1:</strong> Identifies a Steel Barrel (1 = Drum, A = Steel, 1 = Non-removable closed head). For open-top barrels, the code is <strong>1A2</strong>.</li>
        <li><strong>X, Y, or Z (Packing Group):</strong> 
          <ul>
            <li><strong>X:</strong> Packing Group I (Great danger), II, and III.</li>
            <li><strong>Y:</strong> Packing Group II (Medium danger) and III.</li>
            <li><strong>Z:</strong> Packing Group III (Minor danger) only.</li>
          </ul>
        </li>
        <li><strong>1.8:</strong> Maximum relative liquid density (specific gravity) tested for this packaging.</li>
        <li><strong>250:</strong> Hydrostatic test pressure sustained in kiloPascals (kPa) for 5 minutes without rupture.</li>
        <li><strong>24:</strong> Year of production or recertification (e.g., 2024).</li>
        <li><strong>IND / BESTO:</strong> State of manufacture authorization and approved manufacturer mark.</li>
      </ul>

      <h3>The Standard Test Regimen</h3>
      <p>To certify compliance, containers undergo four mandatory destructive tests:</p>
      <ol>
        <li><strong>Drop Test:</strong> Barrels cooled to -18°C are dropped from heights up to 1.8 meters directly onto concrete chimes.</li>
        <li><strong>Leakproofness Test:</strong> Pressurization with dry air while submerged or coated with foaming surfactant.</li>
        <li><strong>Hydrostatic Pressure Test:</strong> Internal water pressure applied to ensure the body does not rupture under extreme ambient thermal expansion.</li>
        <li><strong>Stacking Test:</strong> Static compressive load representing a 3-meter stack of filled drums for 28 days at 40°C.</li>
      </ol>
    `,
  },
  {
    title: '1000L IBC Totes vs. 210L Drums: Optimizing Bulk Chemical Logistics',
    slug: '1000l-ibc-totes-vs-210l-drums-logistics-optimization',
    category: 'Bulk Logistics & IBC Solutions',
    tags: 'IBC totes, intermediate bulk containers, logistics, freight optimization',
    author: 'Packaging Logistics Consultant',
    authorEmail: 'logistics@bestosia.com',
    seoTitle: '1000L IBC Containers vs 210L Drums Optimization | Besto Container',
    seoDescription: 'Compare shipping payload density, tare weight ratios, and handling labor between 1000-litre composite IBC containers and 210-litre drums.',
    coverImageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Composite 1000L IBC containers with galvanized steel cages ready for shipping',
    excerpt: 'Detailed comparison of freight utilization, decanting residue, forklift cycles, and safety metrics when scaling from drum arrays to composite IBC units.',
    status: 'published',
    publishedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    content: `
      <h2>The Geometry of Freight: 1000 Litres in One Footprint</h2>
      <p>As chemical processing batches scale from pilot production into full commercial supply, logistics managers must reassess their primary container architecture. Sourcing five 210-litre drums versus a single 1000-litre Intermediate Bulk Container (IBC) involves more than just container pricing—it reshapes warehouse racking, freight density, and dispensing times.</p>

      <h3>1. Racking & Container Payload Density</h3>
      <p>A standard 20-foot shipping container can accommodate approximately 80 units of 210-litre steel barrels (totalling 16,800 litres of payload). In contrast, that same container can hold 18 to 20 units of 1000-litre composite IBCs (18,000 to 20,000 litres)—a <strong>19% increase in active liquid transport capacity</strong> per shipment.</p>

      <h3>2. Material Handling and Labor Efficiency</h3>
      <ul>
        <li><strong>Drum Handling:</strong> Unloading 80 drums requires 40 to 80 individual forklift movements or drum-grab attachments, manual positioning, and individual bung unthreading.</li>
        <li><strong>IBC Handling:</strong> 20 forklift cycles complete an entire container discharge. Integrated 4-way steel pallet bases simplify direct loading onto industrial racks.</li>
      </ul>

      <h3>3. Residual Decanting Loss</h3>
      <p>Due to the conical or sloped base design of modern blow-molded HDPE inner bottles and integrated 2-inch ball valves, IBC totes typically retain less than 500 ml of residual liquid. Standard flat-bottomed steel drums, by contrast, frequently trap 1.5 to 3 litres of viscous liquid behind the lower chime.</p>

      <h3>Besto's Full Spectrum Support</h3>
      <p>Besto Container Industries provides both solutions: <strong>Brand-New 1000L IBC Totes</strong>, <strong>BESTOSIA® Certified Refurbished IBCs (MAX & Premium)</strong>, and complete IBC Laundering and Re-bottling services for clients who own their fleet.</p>
    `,
  },
];

// Helper to sanitize slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 180);
}

// 1. Fetch public published blog posts
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(
      postsRef,
      where('status', '==', 'published')
    );
    const snapshot = await getDocs(q);
    const posts: BlogPost[] = [];
    snapshot.forEach((docSnap) => {
      posts.push({ id: docSnap.id, ...(docSnap.data() as Omit<BlogPost, 'id'>) });
    });
    // Sort descending by publishedAt or createdAt client-side to avoid composite index requirements
    return posts.sort((a, b) => {
      const timeA = new Date(a.publishedAt || a.createdAt).getTime();
      const timeB = new Date(b.publishedAt || b.createdAt).getTime();
      return timeB - timeA;
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, POSTS_COLLECTION);
    return [];
  }
}

// 2. Fetch all posts for Admin
export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
  try {
    const postsRef = collection(db, POSTS_COLLECTION);
    const snapshot = await getDocs(postsRef);
    const posts: BlogPost[] = [];
    snapshot.forEach((docSnap) => {
      posts.push({ id: docSnap.id, ...(docSnap.data() as Omit<BlogPost, 'id'>) });
    });
    return posts.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeB - timeA;
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, POSTS_COLLECTION);
    return [];
  }
}

// 3. Get single post by slug
export async function getBlogPostBySlug(slug: string, isAdminView = false): Promise<BlogPost | null> {
  try {
    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(postsRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    const docSnap = snapshot.docs[0];
    const data = docSnap.data() as Omit<BlogPost, 'id'>;
    if (!isAdminView && data.status !== 'published') {
      return null;
    }
    return { id: docSnap.id, ...data };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${POSTS_COLLECTION}/slug/${slug}`);
    return null;
  }
}

// 4. Create blog post
export async function createBlogPost(postData: Omit<BlogPost, 'id'>): Promise<string> {
  try {
    const docId = postData.slug.slice(0, 100) + '-' + Date.now().toString(36);
    const postRef = doc(db, POSTS_COLLECTION, docId);
    
    // Ensure clean payload matching strict firestore.rules
    const cleanedPayload: Record<string, any> = {
      title: postData.title.trim().slice(0, 300),
      slug: postData.slug.trim().slice(0, 200),
      content: postData.content.slice(0, 50000),
      category: postData.category.slice(0, 100),
      status: postData.status,
      createdAt: postData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (postData.excerpt) cleanedPayload.excerpt = postData.excerpt.slice(0, 1000);
    if (postData.coverImageUrl) cleanedPayload.coverImageUrl = postData.coverImageUrl.slice(0, 2000);
    if (postData.imageAlt) cleanedPayload.imageAlt = postData.imageAlt.slice(0, 300);
    if (postData.tags) cleanedPayload.tags = postData.tags.slice(0, 500);
    if (postData.author) cleanedPayload.author = postData.author.slice(0, 100);
    if (postData.authorEmail) cleanedPayload.authorEmail = postData.authorEmail.slice(0, 200);
    if (postData.seoTitle) cleanedPayload.seoTitle = postData.seoTitle.slice(0, 200);
    if (postData.seoDescription) cleanedPayload.seoDescription = postData.seoDescription.slice(0, 500);
    if (postData.status === 'published') {
      cleanedPayload.publishedAt = postData.publishedAt || new Date().toISOString();
    }

    await setDoc(postRef, cleanedPayload);
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, POSTS_COLLECTION);
    throw error;
  }
}

// 5. Update blog post
export async function updateBlogPost(id: string, postData: Partial<BlogPost>): Promise<void> {
  try {
    const postRef = doc(db, POSTS_COLLECTION, id);
    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (postData.title !== undefined) updates.title = postData.title.trim().slice(0, 300);
    if (postData.slug !== undefined) updates.slug = postData.slug.trim().slice(0, 200);
    if (postData.content !== undefined) updates.content = postData.content.slice(0, 50000);
    if (postData.category !== undefined) updates.category = postData.category.slice(0, 100);
    if (postData.status !== undefined) {
      updates.status = postData.status;
      if (postData.status === 'published' && !postData.publishedAt) {
        updates.publishedAt = new Date().toISOString();
      }
    }
    if (postData.excerpt !== undefined) updates.excerpt = postData.excerpt.slice(0, 1000);
    if (postData.coverImageUrl !== undefined) updates.coverImageUrl = postData.coverImageUrl.slice(0, 2000);
    if (postData.imageAlt !== undefined) updates.imageAlt = postData.imageAlt.slice(0, 300);
    if (postData.tags !== undefined) updates.tags = postData.tags.slice(0, 500);
    if (postData.author !== undefined) updates.author = postData.author.slice(0, 100);
    if (postData.authorEmail !== undefined) updates.authorEmail = postData.authorEmail.slice(0, 200);
    if (postData.seoTitle !== undefined) updates.seoTitle = postData.seoTitle.slice(0, 200);
    if (postData.seoDescription !== undefined) updates.seoDescription = postData.seoDescription.slice(0, 500);
    if (postData.publishedAt !== undefined) updates.publishedAt = postData.publishedAt;

    await updateDoc(postRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${POSTS_COLLECTION}/${id}`);
    throw error;
  }
}

// 6. Delete blog post
export async function deleteBlogPost(id: string): Promise<void> {
  try {
    const postRef = doc(db, POSTS_COLLECTION, id);
    await deleteDoc(postRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${POSTS_COLLECTION}/${id}`);
    throw error;
  }
}

// 7. Get blog categories (with persistent Firestore initialization)
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const catRef = collection(db, CATEGORIES_COLLECTION);
    const snapshot = await getDocs(catRef);
    if (snapshot.empty) {
      // Seed categories into real Firestore immediately so they are persistent
      const seeded: BlogCategory[] = [];
      const now = new Date().toISOString();
      for (const c of INITIAL_CATEGORIES) {
        const docId = c.slug.slice(0, 80);
        const docRef = doc(db, CATEGORIES_COLLECTION, docId);
        const categoryData = {
          name: c.name.slice(0, 100),
          slug: c.slug.slice(0, 100),
          description: c.description.slice(0, 500),
          createdAt: now,
          updatedAt: now,
        };
        try {
          await setDoc(docRef, categoryData);
          seeded.push({ id: docId, ...categoryData });
        } catch {
          // If unauthenticated visitor or write denied, fallback to in-memory item
          seeded.push({ id: docId, ...categoryData });
        }
      }
      return seeded;
    }
    const categories: BlogCategory[] = [];
    snapshot.forEach((docSnap) => {
      categories.push({ id: docSnap.id, ...(docSnap.data() as Omit<BlogCategory, 'id'>) });
    });
    // Sort alphabetically by category name
    return categories.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, CATEGORIES_COLLECTION);
    return INITIAL_CATEGORIES.map((c) => ({
      id: c.slug,
      ...c,
      createdAt: new Date().toISOString(),
    }));
  }
}

// 8. Add category with validation and duplicate prevention
export async function createBlogCategory(cat: {
  name: string;
  slug?: string;
  description?: string;
}): Promise<string> {
  try {
    const trimmedName = cat.name.trim();
    if (!trimmedName) {
      throw new Error('Category name cannot be empty.');
    }
    const generatedSlug = generateSlug(cat.slug || trimmedName);
    if (!generatedSlug) {
      throw new Error('A valid URL slug is required.');
    }

    // Verify uniqueness against existing categories
    const existingCats = await getBlogCategories();
    const isDuplicateName = existingCats.some(
      (c) => c.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicateName) {
      throw new Error(`Category "${trimmedName}" already exists.`);
    }

    const isDuplicateSlug = existingCats.some(
      (c) => c.slug.trim().toLowerCase() === generatedSlug.toLowerCase()
    );
    if (isDuplicateSlug) {
      throw new Error(`Category slug "${generatedSlug}" is already in use.`);
    }

    const docId = generatedSlug.slice(0, 80);
    const catRef = doc(db, CATEGORIES_COLLECTION, docId);
    const now = new Date().toISOString();

    await setDoc(catRef, {
      name: trimmedName.slice(0, 100),
      slug: generatedSlug.slice(0, 100),
      description: (cat.description?.trim() || '').slice(0, 500),
      createdAt: now,
      updatedAt: now,
    });
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, CATEGORIES_COLLECTION);
    throw error;
  }
}

// 9. Update existing category, with optional cascading rename on assigned blog posts
export async function updateBlogCategory(
  id: string,
  updatedData: {
    name: string;
    slug?: string;
    description?: string;
  },
  oldName?: string
): Promise<{ updatedPostsCount: number }> {
  try {
    const trimmedName = updatedData.name.trim();
    if (!trimmedName) {
      throw new Error('Category name cannot be empty.');
    }
    const cleanSlug = generateSlug(updatedData.slug || trimmedName);
    if (!cleanSlug) {
      throw new Error('Category slug cannot be empty.');
    }

    // Check duplicate name/slug among OTHER categories
    const existingCats = await getBlogCategories();
    const isDuplicateName = existingCats.some(
      (c) => c.id !== id && c.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicateName) {
      throw new Error(`Another category named "${trimmedName}" already exists.`);
    }
    const isDuplicateSlug = existingCats.some(
      (c) => c.id !== id && c.slug.trim().toLowerCase() === cleanSlug.toLowerCase()
    );
    if (isDuplicateSlug) {
      throw new Error(`Category slug "${cleanSlug}" is already taken by another category.`);
    }

    const catRef = doc(db, CATEGORIES_COLLECTION, id);
    const now = new Date().toISOString();

    await updateDoc(catRef, {
      name: trimmedName.slice(0, 100),
      slug: cleanSlug.slice(0, 100),
      description: (updatedData.description?.trim() || '').slice(0, 500),
      updatedAt: now,
    });

    let updatedPostsCount = 0;
    // If the category name changed and an old name was provided, safely update all assigned blog posts
    if (oldName && oldName.trim() !== trimmedName) {
      const postsRef = collection(db, POSTS_COLLECTION);
      const q = query(postsRef, where('category', '==', oldName.trim()));
      const postSnapshots = await getDocs(q);

      for (const postDoc of postSnapshots.docs) {
        await updateDoc(doc(db, POSTS_COLLECTION, postDoc.id), {
          category: trimmedName.slice(0, 100),
          updatedAt: now,
        });
        updatedPostsCount++;
      }
    }

    return { updatedPostsCount };
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${CATEGORIES_COLLECTION}/${id}`);
    throw error;
  }
}

// 10. Delete category safely with protection against deleting blog posts
export async function deleteBlogCategory(
  id: string,
  categoryName: string,
  reassignToCategory?: string
): Promise<{ reassignedPostsCount: number }> {
  try {
    const trimmedCatName = categoryName.trim();
    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(postsRef, where('category', '==', trimmedCatName));
    const snapshot = await getDocs(q);

    let reassignedPostsCount = 0;
    const targetCategory = reassignToCategory?.trim() || 'General Industrial';
    const now = new Date().toISOString();

    // Reassign any blog posts currently attached to this category
    for (const postDoc of snapshot.docs) {
      await updateDoc(doc(db, POSTS_COLLECTION, postDoc.id), {
        category: targetCategory,
        updatedAt: now,
      });
      reassignedPostsCount++;
    }

    // Now delete the category record
    const catRef = doc(db, CATEGORIES_COLLECTION, id);
    await deleteDoc(catRef);

    return { reassignedPostsCount };
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${CATEGORIES_COLLECTION}/${id}`);
    throw error;
  }
}

// 11. Check and Seed Initial Data into Real Firestore
export async function seedInitialBlogDataIfEmpty(): Promise<boolean> {
  try {
    const postsRef = collection(db, POSTS_COLLECTION);
    const snapshot = await getDocs(query(postsRef, where('status', '==', 'published')));
    if (snapshot.empty) {
      console.log('Seeding initial industrial blog posts into Firestore...');
      for (const cat of INITIAL_CATEGORIES) {
        await createBlogCategory(cat).catch(() => {});
      }
      for (const post of INITIAL_BLOG_POSTS) {
        await createBlogPost(post).catch(() => {});
      }
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Initial seeding note:', error);
    return false;
  }
}

export interface ImageUploadProgressCallback {
  (percentage: number): void;
}

// 12. Image upload helper with real Firebase Storage integration & upload progress
export async function uploadBlogImage(
  file: File,
  onProgress?: ImageUploadProgressCallback
): Promise<string> {
  // 1. Strict validation of image formats: JPG, JPEG, PNG, WebP
  const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const validExtensions = /\.(jpe?g|png|webp)$/i;

  if (!validMimeTypes.includes(file.type.toLowerCase()) && !validExtensions.test(file.name)) {
    throw new Error('Unsupported image format. Please select a valid JPG, JPEG, PNG, or WebP image file.');
  }

  // 2. Strict validation of file size: max 5MB
  const MAX_SIZE_BYTES = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    throw new Error(`Image size exceeds the 5MB limit. Selected image is ${sizeInMB} MB.`);
  }

  // 3. Verify admin user authentication state before initiating upload
  if (!auth.currentUser) {
    throw new Error('Authentication required: You must be logged in as an administrator to upload images to Firebase Storage.');
  }

  // 4. Create a clean, unique Storage path for the image
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanBaseName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 40);
  const uniqueId = Math.random().toString(36).substring(2, 8);
  const storagePath = `blog-images/${Date.now()}-${uniqueId}-${cleanBaseName}.${ext}`;
  const storageRef = ref(storage, storagePath);

  return new Promise<string>((resolve, reject) => {
    let isSettled = false;
    let watchdogTimer: any = null;

    const cleanup = () => {
      if (watchdogTimer) {
        clearTimeout(watchdogTimer);
        watchdogTimer = null;
      }
    };

    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type || 'image/jpeg',
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
        uploadedBy: auth.currentUser?.email || 'admin',
      },
    });

    // Start a watchdog timer (15s). If the Firebase Storage bucket is non-existent, 
    // network request hangs, or Firebase SDK retries indefinitely without emitting errors,
    // explicitly cancel the task and reject with clear diagnostic feedback.
    const resetWatchdog = (timeoutMs = 15000) => {
      cleanup();
      watchdogTimer = setTimeout(() => {
        if (!isSettled) {
          isSettled = true;
          try {
            uploadTask.cancel();
          } catch (e) {
            // ignore cancel error
          }
          const bucketName = storage.app.options.storageBucket || 'learned-sunbeam-dcb1c.firebasestorage.app';
          reject(
            new Error(
              `Upload timed out after 15s. The Firebase Storage bucket "${bucketName}" is unreachable or not yet initialized in the Firebase Console. You can activate Cloud Storage in the Firebase Console, or paste a direct public image link below.`
            )
          );
        }
      }, timeoutMs);
    };

    resetWatchdog(15000);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Reset watchdog whenever progress activity occurs
        resetWatchdog(15000);

        if (snapshot.totalBytes > 0) {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          if (onProgress) {
            onProgress(progress);
          }
        }
      },
      (error: any) => {
        cleanup();
        if (isSettled) return;
        isSettled = true;

        console.error('Firebase Storage upload error:', error);
        let userMessage = error.message;

        if (
          error.code === 'storage/unknown' ||
          error.status_ === 404 ||
          error.message?.includes('404') ||
          error.message?.includes('does not exist')
        ) {
          const bucketName = storage.app.options.storageBucket || 'learned-sunbeam-dcb1c.firebasestorage.app';
          userMessage = `Firebase Storage bucket "${bucketName}" returned 404 (Not Found). In Firebase Console, open Storage and click "Get Started" to initialize Cloud Storage for this project. Alternatively, you can paste any public Image Web Link below.`;
        } else if (error.code === 'storage/unauthorized' || error.status_ === 403) {
          userMessage = 'Permission denied: Please ensure you are logged in with administrator privileges to upload images.';
        } else if (error.code === 'storage/canceled') {
          userMessage = 'Image upload was canceled.';
        } else if (error.code === 'storage/quota-exceeded') {
          userMessage = 'Firebase Storage quota exceeded. Please check storage capacity or provide a direct web image link.';
        }

        reject(new Error(userMessage));
      },
      async () => {
        cleanup();
        if (isSettled) return;
        isSettled = true;

        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          if (onProgress) onProgress(100);
          resolve(downloadUrl);
        } catch (urlError: any) {
          console.error('Failed to retrieve download URL from Firebase Storage:', urlError);
          reject(new Error(`Image uploaded, but failed to retrieve public download URL: ${urlError.message}`));
        }
      }
    );
  });
}
