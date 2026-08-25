-- ============================================================
--  ATIN HEALTHCARE PVT LTD  ·  Seed content
--  Run AFTER schema.sql, in Supabase → SQL Editor.
--  Safe to re-run: everything upserts on the unique slug.
-- ============================================================

-- ---------------------------- DIVISIONS ----------------------
insert into public.divisions (slug, name, tagline, description, icon, accent, product_count_label, sort_order) values
('cardiac-diabetic', 'Cardiac & Diabetic',
 'Rhythm you can rely on',
 'A complete cardio-diabetic basket built around anti-hypertensives, statins, anti-platelets and the full oral anti-diabetic range — the fastest growing therapy segment in Indian retail.',
 'heart', '#0F5FBF', '90+ SKUs', 1),

('gynaecology', 'Gynaecology & Fertility',
 'Care through every stage',
 'Iron and calcium supplements, progesterones, ovulation support, lactation aids and post-natal nutrition — a division designed for OBGYN chambers and fertility centres.',
 'flower', '#2FA84F', '70+ SKUs', 2),

('dermatology', 'Dermatology & Cosmetology',
 'Skin science, shelf-ready',
 'Anti-fungal creams, ceramide moisturisers, sunscreens, anti-acne gels, hair serums and medicated shampoos in premium tubes and airless pumps.',
 'sparkles', '#29A9E1', '65+ SKUs', 3),

('ortho-pain', 'Orthopaedic & Pain Care',
 'Mobility, restored',
 'NSAIDs, muscle relaxants, bone-health combinations, collagen peptides and topical analgesic ranges for orthopaedic and physiotherapy practice.',
 'bone', '#0A2E6E', '55+ SKUs', 4),

('anti-infectives', 'Antibiotics & Anti-infectives',
 'Guarded by protocol',
 'Cephalosporins, macrolides, fluoroquinolones, anti-malarials and dry syrups — every batch manufactured in a dedicated, cross-contamination-free block.',
 'shield', '#12693A', '80+ SKUs', 5),

('gastro', 'Gastroenterology',
 'Balance from within',
 'PPIs, prokinetics, hepato-protectives, probiotic sachets and enzyme syrups covering the entire acid-peptic and gut-health spectrum.',
 'droplets', '#1E7FD4', '45+ SKUs', 6),

('paediatric', 'Paediatric Range',
 'Gentle by design',
 'Palatable dry syrups, drops, ORS, multivitamin gummies and paediatric antibiotics dosed and flavoured for the smallest patients.',
 'baby', '#8CC63E', '40+ SKUs', 7),

('nutraceutical', 'Nutraceuticals & Wellness',
 'Everyday, evidence-backed',
 'FSSAI-licensed protein blends, immunity boosters, omega-3, biotin, multivitamin softgels and sports nutrition in retail-ready packaging.',
 'leaf', '#3FAE49', '60+ SKUs', 8)
on conflict (slug) do update set
  name = excluded.name, tagline = excluded.tagline, description = excluded.description,
  icon = excluded.icon, accent = excluded.accent,
  product_count_label = excluded.product_count_label, sort_order = excluded.sort_order;

-- ---------------------------- PRODUCTS -----------------------
insert into public.products (slug, name, division_id, composition, form, packing, category, description, indications, mrp, is_featured, sort_order)
values
-- Cardiac & Diabetic
('atcard-tm', 'ATCARD-TM', (select id from public.divisions where slug='cardiac-diabetic'),
 'Telmisartan 40mg + Metoprolol Succinate ER 25mg', 'Tablet', '10x10 Alu-Alu', 'Anti-hypertensive',
 'A once-daily combination for hypertension with associated tachycardia, delivering 24-hour blood-pressure control.',
 array['Essential hypertension','Angina prophylaxis'], 165.00, true, 1),

('atvas-20', 'ATVAS-20', (select id from public.divisions where slug='cardiac-diabetic'),
 'Rosuvastatin 20mg', 'Tablet', '10x10 Alu-Alu', 'Lipid lowering',
 'High-intensity statin therapy for dyslipidaemia and secondary cardiovascular prevention.',
 array['Hyperlipidaemia','Post-MI care'], 210.00, true, 2),

('atglim-m2', 'ATGLIM-M2', (select id from public.divisions where slug='cardiac-diabetic'),
 'Glimepiride 2mg + Metformin HCl 500mg SR', 'Tablet', '10x15 Alu-Alu', 'Anti-diabetic',
 'Dual-action oral anti-diabetic for type-2 diabetes uncontrolled on monotherapy.',
 array['Type 2 diabetes mellitus'], 148.00, true, 3),

('atclop-as', 'ATCLOP-AS', (select id from public.divisions where slug='cardiac-diabetic'),
 'Clopidogrel 75mg + Aspirin 75mg', 'Capsule', '10x10 Alu-Alu', 'Anti-platelet',
 'Dual anti-platelet therapy for acute coronary syndrome and post-stent maintenance.',
 array['Acute coronary syndrome','Stroke prophylaxis'], 132.00, false, 4),

('atsart-h', 'ATSART-H', (select id from public.divisions where slug='cardiac-diabetic'),
 'Telmisartan 40mg + Hydrochlorothiazide 12.5mg', 'Tablet', '10x10 Alu-Alu', 'Anti-hypertensive',
 'ARB plus thiazide diuretic for patients needing additional blood-pressure reduction.',
 array['Resistant hypertension'], 154.00, false, 5),

-- Gynaecology
('atfer-xt', 'ATFER-XT', (select id from public.divisions where slug='gynaecology'),
 'Ferrous Ascorbate 100mg + Folic Acid 1.5mg', 'Tablet', '10x10 Alu-Alu', 'Haematinic',
 'Highly bio-available iron with folic acid for iron-deficiency anaemia in pregnancy.',
 array['Anaemia in pregnancy','Post-partum anaemia'], 178.00, true, 1),

('atcal-d3', 'ATCAL-D3', (select id from public.divisions where slug='gynaecology'),
 'Calcium Citrate Malate 1000mg + Vitamin D3 400IU + Magnesium + Zinc', 'Tablet', '10x15 Alu-Alu', 'Bone health',
 'Elemental calcium with cofactors for ante-natal and post-menopausal bone support.',
 array['Osteopenia','Ante-natal supplementation'], 195.00, false, 2),

('atprog-200', 'ATPROG-200', (select id from public.divisions where slug='gynaecology'),
 'Natural Micronised Progesterone 200mg', 'Capsule', '1x10 Alu-Alu', 'Hormone',
 'Soft-gelatin micronised progesterone for luteal-phase support and threatened abortion.',
 array['Luteal phase defect','Threatened abortion'], 285.00, true, 3),

('atmom-pro', 'ATMOM PRO', (select id from public.divisions where slug='gynaecology'),
 'Protein 18g + DHA + 24 Vitamins & Minerals', 'Sachet', '200g Jar', 'Maternal nutrition',
 'Chocolate-flavoured maternal nutrition powder for pregnancy and lactation.',
 array['Maternal nutrition','Lactation support'], 420.00, false, 4),

-- Dermatology
('atclo-kz', 'ATCLO-KZ', (select id from public.divisions where slug='dermatology'),
 'Ketoconazole 2% + Clobetasol 0.05% + Neomycin', 'Gel', '15g Lami Tube', 'Anti-fungal',
 'Triple-action topical for inflammatory and secondarily infected fungal dermatoses.',
 array['Tinea corporis','Eczematous dermatitis'], 138.00, true, 1),

('atderm-sun', 'ATDERM SUN SPF 50', (select id from public.divisions where slug='dermatology'),
 'Titanium Dioxide + Zinc Oxide + Vitamin E, PA+++', 'Gel', '60g Airless Pump', 'Photoprotection',
 'Broad-spectrum matte-finish mineral sunscreen suitable for Indian skin tones.',
 array['Photoprotection','Post-procedure care'], 460.00, true, 2),

('atacne-cl', 'ATACNE-CL', (select id from public.divisions where slug='dermatology'),
 'Clindamycin 1% + Adapalene 0.1%', 'Gel', '15g Lami Tube', 'Anti-acne',
 'Night-time combination gel for inflammatory acne vulgaris.',
 array['Acne vulgaris'], 225.00, false, 3),

('athair-serum', 'ATHAIR REDENSYL SERUM', (select id from public.divisions where slug='dermatology'),
 'Redensyl 3% + Anagain + Procapil + Biotin', 'Drops', '60ml Spray Bottle', 'Hair care',
 'Non-greasy leave-in serum targeting anagen-phase hair follicles.',
 array['Androgenetic alopecia','Telogen effluvium'], 799.00, false, 4),

-- Ortho & Pain
('atflam-sp', 'ATFLAM-SP', (select id from public.divisions where slug='ortho-pain'),
 'Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg', 'Tablet', '10x10 Alu-Alu', 'Analgesic',
 'Anti-inflammatory, analgesic and anti-oedema triple therapy for musculoskeletal pain.',
 array['Osteoarthritis','Post-operative pain'], 145.00, true, 1),

('atbone-k2', 'ATBONE-K2', (select id from public.divisions where slug='ortho-pain'),
 'Calcium Carbonate 500mg + Vitamin K2-7 45mcg + Vitamin D3 1000IU', 'Tablet', '10x10 Alu-Alu', 'Bone health',
 'Directs calcium to bone rather than arterial tissue via vitamin K2-7.',
 array['Osteoporosis','Fracture recovery'], 265.00, false, 2),

('atcollagen', 'ATCOLLAGEN TYPE-II', (select id from public.divisions where slug='ortho-pain'),
 'Undenatured Collagen Type-II 40mg + Boswellia + Curcumin', 'Capsule', '1x10 Alu-Alu', 'Joint care',
 'Joint-cartilage support formula for early and moderate osteoarthritis.',
 array['Osteoarthritis','Joint stiffness'], 385.00, true, 3),

('atmyo-4', 'ATMYO-4', (select id from public.divisions where slug='ortho-pain'),
 'Thiocolchicoside 4mg + Aceclofenac 100mg', 'Tablet', '10x10 Alu-Alu', 'Muscle relaxant',
 'For acute painful muscle spasm of the lower back and cervical spine.',
 array['Acute low back pain','Muscle spasm'], 175.00, false, 4),

-- Anti-infectives
('atcef-o200', 'ATCEF-O 200', (select id from public.divisions where slug='anti-infectives'),
 'Cefixime 200mg', 'Tablet', '10x10 Alu-Alu', 'Cephalosporin',
 'Third-generation oral cephalosporin for respiratory and urinary tract infections.',
 array['URTI','Urinary tract infection'], 168.00, true, 1),

('atcef-cv', 'ATCEF-CV 325', (select id from public.divisions where slug='anti-infectives'),
 'Cefixime 200mg + Clavulanic Acid 125mg', 'Tablet', '10x6 Alu-Alu', 'Cephalosporin',
 'Beta-lactamase protected cefixime for resistant community-acquired infections.',
 array['Resistant RTI','Skin & soft tissue infection'], 245.00, true, 2),

('atzith-500', 'ATZITH-500', (select id from public.divisions where slug='anti-infectives'),
 'Azithromycin 500mg', 'Tablet', '10x3 Alu-Alu', 'Macrolide',
 'Three-day short-course macrolide therapy with high tissue penetration.',
 array['Pharyngitis','Atypical pneumonia'], 98.00, false, 3),

('atmox-cv', 'ATMOX-CV 625', (select id from public.divisions where slug='anti-infectives'),
 'Amoxycillin 500mg + Clavulanic Acid 125mg', 'Tablet', '10x6 Alu-Alu', 'Penicillin',
 'First-line broad-spectrum cover for dental, respiratory and skin infections.',
 array['Dental infection','Sinusitis'], 215.00, false, 4),

-- Gastro
('atpan-dsr', 'ATPAN-DSR', (select id from public.divisions where slug='gastro'),
 'Pantoprazole 40mg (EC) + Domperidone 30mg (SR)', 'Capsule', '10x10 Alu-Alu', 'Anti-ulcerant',
 'Acid suppression with prokinetic action for GERD and functional dyspepsia.',
 array['GERD','Functional dyspepsia'], 155.00, true, 1),

('atrab-l', 'ATRAB-L', (select id from public.divisions where slug='gastro'),
 'Rabeprazole 20mg + Levosulpiride 75mg SR', 'Capsule', '10x10 Alu-Alu', 'Anti-ulcerant',
 'For refractory reflux with delayed gastric emptying.',
 array['Refractory GERD'], 189.00, false, 2),

('atbiotic-plus', 'ATBIOTIC PLUS', (select id from public.divisions where slug='gastro'),
 'Multi-strain Probiotic 5 Billion CFU + Prebiotic FOS', 'Sachet', '30 Sachets Box', 'Probiotic',
 'Room-stable multi-strain probiotic for antibiotic-associated and travellers diarrhoea.',
 array['Antibiotic-associated diarrhoea','IBS'], 340.00, true, 3),

('atliv-forte', 'ATLIV FORTE', (select id from public.divisions where slug='gastro'),
 'Silymarin 140mg + L-Ornithine L-Aspartate + B-Complex', 'Syrup', '200ml Bottle', 'Hepato-protective',
 'Liver support syrup for fatty liver and drug-induced hepatic stress.',
 array['NAFLD','Hepatic support'], 225.00, false, 4),

-- Paediatric
('atkid-dry', 'ATKID-CV DRY SYRUP', (select id from public.divisions where slug='paediatric'),
 'Amoxycillin 200mg + Clavulanic Acid 28.5mg per 5ml', 'Syrup', '30ml Bottle', 'Paediatric antibiotic',
 'Reconstitutable dry syrup with a mixed-fruit base children actually finish.',
 array['Paediatric RTI','Otitis media'], 132.00, true, 1),

('atkid-ors', 'ATKID ORS-L', (select id from public.divisions where slug='paediatric'),
 'WHO-formula ORS + L-Glutamine + Zinc', 'Sachet', '21.8g x 10', 'Rehydration',
 'Low-osmolarity oral rehydration with zinc, per WHO/UNICEF guidance.',
 array['Acute diarrhoea','Dehydration'], 90.00, false, 2),

('atkid-gummy', 'ATKID MULTI GUMMIES', (select id from public.divisions where slug='paediatric'),
 'Multivitamin + Multimineral + DHA gummies', 'Sachet', '30 Gummies Jar', 'Nutrition',
 'Sugar-free pectin gummies covering daily micronutrient gaps for ages 4+.',
 array['Picky eating','Micronutrient deficiency'], 385.00, true, 3),

('atkid-drops', 'ATKID D3 DROPS', (select id from public.divisions where slug='paediatric'),
 'Cholecalciferol 400IU per 0.5ml', 'Drops', '15ml Dropper Bottle', 'Vitamin',
 'Infant vitamin-D3 drops with a graduated dropper for accurate dosing.',
 array['Rickets prophylaxis','Vitamin D deficiency'], 165.00, false, 4),

-- Nutraceutical
('atwhey-pro', 'ATWHEY PRO', (select id from public.divisions where slug='nutraceutical'),
 'Whey Protein Concentrate 24g + BCAA + Digestive Enzymes', 'Sachet', '1kg Jar', 'Sports nutrition',
 'Clean-label whey with added enzymes for better absorption and less bloating.',
 array['Muscle recovery','Protein supplementation'], 1850.00, true, 1),

('atomega-3', 'ATOMEGA-3 TG', (select id from public.divisions where slug='nutraceutical'),
 'Triglyceride Omega-3 1000mg (EPA 400 / DHA 200)', 'Capsule', '1x30 Bottle', 'Essential fatty acid',
 'Molecularly distilled, mercury-tested TG-form omega-3 with no fishy reflux.',
 array['Cardiovascular health','Joint & brain health'], 640.00, true, 2),

('atimmuno', 'ATIMMUNO SHIELD', (select id from public.divisions where slug='nutraceutical'),
 'Vitamin C 500mg + Zinc 10mg + Elderberry + Vitamin D3', 'Tablet', '10x10 Alu-Alu', 'Immunity',
 'Daily immune-support effervescent-grade blend for seasonal resilience.',
 array['Immune support','Convalescence'], 275.00, false, 3),

('atbiotin-10k', 'ATBIOTIN 10K', (select id from public.divisions where slug='nutraceutical'),
 'Biotin 10000mcg + Bamboo Silica + Keratin', 'Tablet', '1x30 Bottle', 'Hair & nail',
 'High-strength biotin with silica for hair, skin and nail structure.',
 array['Hair fall','Brittle nails'], 495.00, false, 4)
on conflict (slug) do update set
  name = excluded.name, composition = excluded.composition, form = excluded.form,
  packing = excluded.packing, category = excluded.category, description = excluded.description,
  indications = excluded.indications, mrp = excluded.mrp,
  is_featured = excluded.is_featured, sort_order = excluded.sort_order,
  division_id = excluded.division_id;

-- ---------------------------- STATS --------------------------
delete from public.stats;
insert into public.stats (label, value, suffix, sort_order) values
('Product SKUs',            500, '+',  1),
('Franchise partners',      320, '+',  2),
('Districts covered',       180, '+',  3),
('Years of formulation',     12, '+',  4);

-- ------------------------ CERTIFICATIONS ---------------------
delete from public.certifications;
insert into public.certifications (name, description, sort_order) values
('WHO-GMP',   'Manufacturing units certified to WHO Good Manufacturing Practice.', 1),
('ISO 9001:2015', 'Quality management system audited and certified.',              2),
('FSSAI',     'Licensed for the manufacture and sale of nutraceuticals.',          3),
('CDSCO',     'Products approved under the Drugs & Cosmetics Act, 1940.',          4),
('AYUSH',     'Herbal and ayurvedic range licensed under the AYUSH ministry.',     5),
('FDA (State)', 'Registered with the State Food & Drug Administration.',           6);

-- ------------------------ TESTIMONIALS -----------------------
delete from public.testimonials;
insert into public.testimonials (name, role, company, location, quote, rating, sort_order) values
('Rakesh Verma', 'Franchise Partner', 'Shree Medico Distributors', 'Lucknow, UP',
 'I started with a single district and the cardiac-diabetic range. Three years on I run four districts. Dispatch has never once been late, and that is the whole business.', 5, 1),
('Dr. Meenakshi Rao', 'Consulting Gynaecologist', 'Aarogya Womens Clinic', 'Pune, MH',
 'The micronised progesterone and iron range hold up in my practice. Batch-to-batch consistency is the reason I keep prescribing them.', 5, 2),
('Amandeep Singh', 'Franchise Partner', 'Preet Pharma', 'Ludhiana, PB',
 'Monopoly rights were honoured in writing from day one. No parallel supply, no undercutting. That trust is rarer in this industry than people think.', 5, 3),
('Suresh Nair', 'Stockist', 'Nair Healthcare Agencies', 'Kochi, KL',
 'Promotional kits arrive with the stock, not two weeks later. Visual aids, samples, MR bags, everything. It makes the field team look professional.', 5, 4),
('Priya Deshmukh', 'Franchise Partner', 'Vitalis Life Sciences', 'Nagpur, MH',
 'The derma range gave me an entry into cosmetology clinics I could not crack before. Packaging quality did half the selling.', 5, 5);

