/**
 * Mirror of supabase/seed.sql.
 * The site renders from these until schema.sql + seed.sql have been run,
 * and falls back to them if Supabase is unreachable.
 */
import type {
  Certification, Division, Product, Stat, Testimonial,
} from "@/types/db";

const d = (
  slug: string, name: string, tagline: string, description: string,
  icon: string, accent: string, count: string, sort: number,
): Division => ({
  id: `fb-div-${slug}`, slug, name, tagline, description, icon, accent,
  image_url: null, product_count_label: count, sort_order: sort, is_active: true,
});

export const fallbackDivisions: Division[] = [
  d("cardiac-diabetic", "Cardiac & Diabetic", "Rhythm you can rely on",
    "A complete cardio-diabetic basket built around anti-hypertensives, statins, anti-platelets and the full oral anti-diabetic range — the fastest growing therapy segment in Indian retail.",
    "heart", "#0F5FBF", "90+ SKUs", 1),
  d("gynaecology", "Gynaecology & Fertility", "Care through every stage",
    "Iron and calcium supplements, progesterones, ovulation support, lactation aids and post-natal nutrition — a division designed for OBGYN chambers and fertility centres.",
    "flower", "#2FA84F", "70+ SKUs", 2),
  d("dermatology", "Dermatology & Cosmetology", "Skin science, shelf-ready",
    "Anti-fungal creams, ceramide moisturisers, sunscreens, anti-acne gels, hair serums and medicated shampoos in premium tubes and airless pumps.",
    "sparkles", "#29A9E1", "65+ SKUs", 3),
  d("ortho-pain", "Orthopaedic & Pain Care", "Mobility, restored",
    "NSAIDs, muscle relaxants, bone-health combinations, collagen peptides and topical analgesic ranges for orthopaedic and physiotherapy practice.",
    "bone", "#0A2E6E", "55+ SKUs", 4),
  d("anti-infectives", "Antibiotics & Anti-infectives", "Guarded by protocol",
    "Cephalosporins, macrolides, fluoroquinolones, anti-malarials and dry syrups — every batch manufactured in a dedicated, cross-contamination-free block.",
    "shield", "#12693A", "80+ SKUs", 5),
  d("gastro", "Gastroenterology", "Balance from within",
    "PPIs, prokinetics, hepato-protectives, probiotic sachets and enzyme syrups covering the entire acid-peptic and gut-health spectrum.",
    "droplets", "#1E7FD4", "45+ SKUs", 6),
  d("paediatric", "Paediatric Range", "Gentle by design",
    "Palatable dry syrups, drops, ORS, multivitamin gummies and paediatric antibiotics dosed and flavoured for the smallest patients.",
    "baby", "#8CC63E", "40+ SKUs", 7),
  d("nutraceutical", "Nutraceuticals & Wellness", "Everyday, evidence-backed",
    "FSSAI-licensed protein blends, immunity boosters, omega-3, biotin, multivitamin softgels and sports nutrition in retail-ready packaging.",
    "leaf", "#3FAE49", "60+ SKUs", 8),
];

const divBySlug = Object.fromEntries(fallbackDivisions.map((x) => [x.slug, x]));

const p = (
  slug: string, name: string, divSlug: string, composition: string, form: string,
  packing: string, category: string, description: string, indications: string[],
  mrp: number, featured: boolean, sort: number,
): Product => ({
  id: `fb-prd-${slug}`, slug, name,
  division_id: divBySlug[divSlug].id,
  composition, form, packing, category, description, indications, mrp,
  image_url: null, is_featured: featured, is_active: true, sort_order: sort,
  divisions: {
    slug: divBySlug[divSlug].slug,
    name: divBySlug[divSlug].name,
    accent: divBySlug[divSlug].accent,
  },
});

export const fallbackProducts: Product[] = [
  p("atcard-tm", "ATCARD-TM", "cardiac-diabetic", "Telmisartan 40mg + Metoprolol Succinate ER 25mg", "Tablet", "10x10 Alu-Alu", "Anti-hypertensive",
    "A once-daily combination for hypertension with associated tachycardia, delivering 24-hour blood-pressure control.", ["Essential hypertension", "Angina prophylaxis"], 165, true, 1),
  p("atvas-20", "ATVAS-20", "cardiac-diabetic", "Rosuvastatin 20mg", "Tablet", "10x10 Alu-Alu", "Lipid lowering",
    "High-intensity statin therapy for dyslipidaemia and secondary cardiovascular prevention.", ["Hyperlipidaemia", "Post-MI care"], 210, true, 2),
  p("atglim-m2", "ATGLIM-M2", "cardiac-diabetic", "Glimepiride 2mg + Metformin HCl 500mg SR", "Tablet", "10x15 Alu-Alu", "Anti-diabetic",
    "Dual-action oral anti-diabetic for type-2 diabetes uncontrolled on monotherapy.", ["Type 2 diabetes mellitus"], 148, true, 3),
  p("atclop-as", "ATCLOP-AS", "cardiac-diabetic", "Clopidogrel 75mg + Aspirin 75mg", "Capsule", "10x10 Alu-Alu", "Anti-platelet",
    "Dual anti-platelet therapy for acute coronary syndrome and post-stent maintenance.", ["Acute coronary syndrome", "Stroke prophylaxis"], 132, false, 4),
  p("atsart-h", "ATSART-H", "cardiac-diabetic", "Telmisartan 40mg + Hydrochlorothiazide 12.5mg", "Tablet", "10x10 Alu-Alu", "Anti-hypertensive",
    "ARB plus thiazide diuretic for patients needing additional blood-pressure reduction.", ["Resistant hypertension"], 154, false, 5),

  p("atfer-xt", "ATFER-XT", "gynaecology", "Ferrous Ascorbate 100mg + Folic Acid 1.5mg", "Tablet", "10x10 Alu-Alu", "Haematinic",
    "Highly bio-available iron with folic acid for iron-deficiency anaemia in pregnancy.", ["Anaemia in pregnancy", "Post-partum anaemia"], 178, true, 1),
  p("atcal-d3", "ATCAL-D3", "gynaecology", "Calcium Citrate Malate 1000mg + Vitamin D3 400IU + Magnesium + Zinc", "Tablet", "10x15 Alu-Alu", "Bone health",
    "Elemental calcium with cofactors for ante-natal and post-menopausal bone support.", ["Osteopenia", "Ante-natal supplementation"], 195, false, 2),
  p("atprog-200", "ATPROG-200", "gynaecology", "Natural Micronised Progesterone 200mg", "Capsule", "1x10 Alu-Alu", "Hormone",
    "Soft-gelatin micronised progesterone for luteal-phase support and threatened abortion.", ["Luteal phase defect", "Threatened abortion"], 285, true, 3),
  p("atmom-pro", "ATMOM PRO", "gynaecology", "Protein 18g + DHA + 24 Vitamins & Minerals", "Sachet", "200g Jar", "Maternal nutrition",
    "Chocolate-flavoured maternal nutrition powder for pregnancy and lactation.", ["Maternal nutrition", "Lactation support"], 420, false, 4),

  p("atclo-kz", "ATCLO-KZ", "dermatology", "Ketoconazole 2% + Clobetasol 0.05% + Neomycin", "Gel", "15g Lami Tube", "Anti-fungal",
    "Triple-action topical for inflammatory and secondarily infected fungal dermatoses.", ["Tinea corporis", "Eczematous dermatitis"], 138, true, 1),
  p("atderm-sun", "ATDERM SUN SPF 50", "dermatology", "Titanium Dioxide + Zinc Oxide + Vitamin E, PA+++", "Gel", "60g Airless Pump", "Photoprotection",
    "Broad-spectrum matte-finish mineral sunscreen suitable for Indian skin tones.", ["Photoprotection", "Post-procedure care"], 460, true, 2),
  p("atacne-cl", "ATACNE-CL", "dermatology", "Clindamycin 1% + Adapalene 0.1%", "Gel", "15g Lami Tube", "Anti-acne",
    "Night-time combination gel for inflammatory acne vulgaris.", ["Acne vulgaris"], 225, false, 3),
  p("athair-serum", "ATHAIR REDENSYL SERUM", "dermatology", "Redensyl 3% + Anagain + Procapil + Biotin", "Drops", "60ml Spray Bottle", "Hair care",
    "Non-greasy leave-in serum targeting anagen-phase hair follicles.", ["Androgenetic alopecia", "Telogen effluvium"], 799, false, 4),

  p("atflam-sp", "ATFLAM-SP", "ortho-pain", "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg", "Tablet", "10x10 Alu-Alu", "Analgesic",
    "Anti-inflammatory, analgesic and anti-oedema triple therapy for musculoskeletal pain.", ["Osteoarthritis", "Post-operative pain"], 145, true, 1),
  p("atbone-k2", "ATBONE-K2", "ortho-pain", "Calcium Carbonate 500mg + Vitamin K2-7 45mcg + Vitamin D3 1000IU", "Tablet", "10x10 Alu-Alu", "Bone health",
    "Directs calcium to bone rather than arterial tissue via vitamin K2-7.", ["Osteoporosis", "Fracture recovery"], 265, false, 2),
  p("atcollagen", "ATCOLLAGEN TYPE-II", "ortho-pain", "Undenatured Collagen Type-II 40mg + Boswellia + Curcumin", "Capsule", "1x10 Alu-Alu", "Joint care",
    "Joint-cartilage support formula for early and moderate osteoarthritis.", ["Osteoarthritis", "Joint stiffness"], 385, true, 3),
  p("atmyo-4", "ATMYO-4", "ortho-pain", "Thiocolchicoside 4mg + Aceclofenac 100mg", "Tablet", "10x10 Alu-Alu", "Muscle relaxant",
    "For acute painful muscle spasm of the lower back and cervical spine.", ["Acute low back pain", "Muscle spasm"], 175, false, 4),

  p("atcef-o200", "ATCEF-O 200", "anti-infectives", "Cefixime 200mg", "Tablet", "10x10 Alu-Alu", "Cephalosporin",
    "Third-generation oral cephalosporin for respiratory and urinary tract infections.", ["URTI", "Urinary tract infection"], 168, true, 1),
  p("atcef-cv", "ATCEF-CV 325", "anti-infectives", "Cefixime 200mg + Clavulanic Acid 125mg", "Tablet", "10x6 Alu-Alu", "Cephalosporin",
    "Beta-lactamase protected cefixime for resistant community-acquired infections.", ["Resistant RTI", "Skin & soft tissue infection"], 245, true, 2),
  p("atzith-500", "ATZITH-500", "anti-infectives", "Azithromycin 500mg", "Tablet", "10x3 Alu-Alu", "Macrolide",
    "Three-day short-course macrolide therapy with high tissue penetration.", ["Pharyngitis", "Atypical pneumonia"], 98, false, 3),
  p("atmox-cv", "ATMOX-CV 625", "anti-infectives", "Amoxycillin 500mg + Clavulanic Acid 125mg", "Tablet", "10x6 Alu-Alu", "Penicillin",
    "First-line broad-spectrum cover for dental, respiratory and skin infections.", ["Dental infection", "Sinusitis"], 215, false, 4),

  p("atpan-dsr", "ATPAN-DSR", "gastro", "Pantoprazole 40mg (EC) + Domperidone 30mg (SR)", "Capsule", "10x10 Alu-Alu", "Anti-ulcerant",
    "Acid suppression with prokinetic action for GERD and functional dyspepsia.", ["GERD", "Functional dyspepsia"], 155, true, 1),
  p("atrab-l", "ATRAB-L", "gastro", "Rabeprazole 20mg + Levosulpiride 75mg SR", "Capsule", "10x10 Alu-Alu", "Anti-ulcerant",
    "For refractory reflux with delayed gastric emptying.", ["Refractory GERD"], 189, false, 2),
  p("atbiotic-plus", "ATBIOTIC PLUS", "gastro", "Multi-strain Probiotic 5 Billion CFU + Prebiotic FOS", "Sachet", "30 Sachets Box", "Probiotic",
    "Room-stable multi-strain probiotic for antibiotic-associated and travellers diarrhoea.", ["Antibiotic-associated diarrhoea", "IBS"], 340, true, 3),
  p("atliv-forte", "ATLIV FORTE", "gastro", "Silymarin 140mg + L-Ornithine L-Aspartate + B-Complex", "Syrup", "200ml Bottle", "Hepato-protective",
    "Liver support syrup for fatty liver and drug-induced hepatic stress.", ["NAFLD", "Hepatic support"], 225, false, 4),

  p("atkid-dry", "ATKID-CV DRY SYRUP", "paediatric", "Amoxycillin 200mg + Clavulanic Acid 28.5mg per 5ml", "Syrup", "30ml Bottle", "Paediatric antibiotic",
    "Reconstitutable dry syrup with a mixed-fruit base children actually finish.", ["Paediatric RTI", "Otitis media"], 132, true, 1),
  p("atkid-ors", "ATKID ORS-L", "paediatric", "WHO-formula ORS + L-Glutamine + Zinc", "Sachet", "21.8g x 10", "Rehydration",
    "Low-osmolarity oral rehydration with zinc, per WHO/UNICEF guidance.", ["Acute diarrhoea", "Dehydration"], 90, false, 2),
  p("atkid-gummy", "ATKID MULTI GUMMIES", "paediatric", "Multivitamin + Multimineral + DHA gummies", "Sachet", "30 Gummies Jar", "Nutrition",
    "Sugar-free pectin gummies covering daily micronutrient gaps for ages 4+.", ["Picky eating", "Micronutrient deficiency"], 385, true, 3),
  p("atkid-drops", "ATKID D3 DROPS", "paediatric", "Cholecalciferol 400IU per 0.5ml", "Drops", "15ml Dropper Bottle", "Vitamin",
    "Infant vitamin-D3 drops with a graduated dropper for accurate dosing.", ["Rickets prophylaxis", "Vitamin D deficiency"], 165, false, 4),

  p("atwhey-pro", "ATWHEY PRO", "nutraceutical", "Whey Protein Concentrate 24g + BCAA + Digestive Enzymes", "Sachet", "1kg Jar", "Sports nutrition",
    "Clean-label whey with added enzymes for better absorption and less bloating.", ["Muscle recovery", "Protein supplementation"], 1850, true, 1),
  p("atomega-3", "ATOMEGA-3 TG", "nutraceutical", "Triglyceride Omega-3 1000mg (EPA 400 / DHA 200)", "Capsule", "1x30 Bottle", "Essential fatty acid",
    "Molecularly distilled, mercury-tested TG-form omega-3 with no fishy reflux.", ["Cardiovascular health", "Joint & brain health"], 640, true, 2),
  p("atimmuno", "ATIMMUNO SHIELD", "nutraceutical", "Vitamin C 500mg + Zinc 10mg + Elderberry + Vitamin D3", "Tablet", "10x10 Alu-Alu", "Immunity",
    "Daily immune-support effervescent-grade blend for seasonal resilience.", ["Immune support", "Convalescence"], 275, false, 3),
  p("atbiotin-10k", "ATBIOTIN 10K", "nutraceutical", "Biotin 10000mcg + Bamboo Silica + Keratin", "Tablet", "1x30 Bottle", "Hair & nail",
    "High-strength biotin with silica for hair, skin and nail structure.", ["Hair fall", "Brittle nails"], 495, false, 4),
];

export const fallbackStats: Stat[] = [
  { id: "s1", label: "Product SKUs", value: 500, suffix: "+", sort_order: 1, is_active: true },
  { id: "s2", label: "Franchise partners", value: 320, suffix: "+", sort_order: 2, is_active: true },
  { id: "s3", label: "Districts covered", value: 180, suffix: "+", sort_order: 3, is_active: true },
  { id: "s4", label: "Years of formulation", value: 12, suffix: "+", sort_order: 4, is_active: true },
];

export const fallbackCertifications: Certification[] = [
  { id: "c1", name: "WHO-GMP", description: "Manufacturing units certified to WHO Good Manufacturing Practice.", badge_url: null, sort_order: 1, is_active: true },
  { id: "c2", name: "ISO 9001:2015", description: "Quality management system audited and certified.", badge_url: null, sort_order: 2, is_active: true },
  { id: "c3", name: "FSSAI", description: "Licensed for the manufacture and sale of nutraceuticals.", badge_url: null, sort_order: 3, is_active: true },
  { id: "c4", name: "CDSCO", description: "Products approved under the Drugs & Cosmetics Act, 1940.", badge_url: null, sort_order: 4, is_active: true },
  { id: "c5", name: "AYUSH", description: "Herbal and ayurvedic range licensed under the AYUSH ministry.", badge_url: null, sort_order: 5, is_active: true },
  { id: "c6", name: "FDA (State)", description: "Registered with the State Food & Drug Administration.", badge_url: null, sort_order: 6, is_active: true },
];

export const fallbackTestimonials: Testimonial[] = [
  { id: "t1", name: "Rakesh Verma", role: "Franchise Partner", company: "Shree Medico Distributors", location: "Lucknow, UP", rating: 5, avatar_url: null, sort_order: 1, is_active: true,
    quote: "I started with a single district and the cardiac-diabetic range. Three years on I run four districts. Dispatch has never once been late, and that is the whole business." },
  { id: "t2", name: "Dr. Meenakshi Rao", role: "Consulting Gynaecologist", company: "Aarogya Women's Clinic", location: "Pune, MH", rating: 5, avatar_url: null, sort_order: 2, is_active: true,
    quote: "The micronised progesterone and iron range hold up in my practice. Batch-to-batch consistency is the reason I keep prescribing them." },
  { id: "t3", name: "Amandeep Singh", role: "Franchise Partner", company: "Preet Pharma", location: "Ludhiana, PB", rating: 5, avatar_url: null, sort_order: 3, is_active: true,
    quote: "Monopoly rights were honoured in writing from day one. No parallel supply, no undercutting. That trust is rarer in this industry than people think." },
  { id: "t4", name: "Suresh Nair", role: "Stockist", company: "Nair Healthcare Agencies", location: "Kochi, KL", rating: 5, avatar_url: null, sort_order: 4, is_active: true,
    quote: "Promotional kits arrive with the stock, not two weeks later. Visual aids, samples, MR bags, everything. It makes the field team look professional." },
  { id: "t5", name: "Priya Deshmukh", role: "Franchise Partner", company: "Vitalis Life Sciences", location: "Nagpur, MH", rating: 5, avatar_url: null, sort_order: 5, is_active: true,
    quote: "The derma range gave me an entry into cosmetology clinics I could not crack before. Packaging quality did half the selling." },
];

