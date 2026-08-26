// packages/database/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 100 Common Indian Medicines — OCR Training Corpus
// Categories: Antibiotics, Analgesics, Antihypertensives, Antidiabetics,
// Antacids, Vitamins, Antihistamines, Steroids, Cardiac, GI, CNS, etc.
const MEDICINES_100 = [
  // ─── ANALGESICS / ANTIPYRETICS ───────────────────────────────────────────
  {
    name: 'Crocin 500mg',
    genericName: 'Paracetamol',
    strength: '500mg',
    dosageForm: 'Tablet',
    manufacturer: 'GSK India',
    barcodeGtin: '8901463010029',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Dolo 650mg',
    genericName: 'Paracetamol',
    strength: '650mg',
    dosageForm: 'Tablet',
    manufacturer: 'Micro Labs',
    barcodeGtin: '8906044710019',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Combiflam Tablet',
    genericName: 'Ibuprofen + Paracetamol',
    strength: '400mg + 325mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sanofi India',
    barcodeGtin: '8901234500000',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Brufen 400mg',
    genericName: 'Ibuprofen',
    strength: '400mg',
    dosageForm: 'Tablet',
    manufacturer: 'Abbott India',
    barcodeGtin: '8901458210011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Voveran 50mg',
    genericName: 'Diclofenac Sodium',
    strength: '50mg',
    dosageForm: 'Tablet',
    manufacturer: 'Novartis India',
    barcodeGtin: '8901463020011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Nimesulide 100mg',
    genericName: 'Nimesulide',
    strength: '100mg',
    dosageForm: 'Tablet',
    manufacturer: 'Mankind Pharma',
    barcodeGtin: '8906049910000',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Tramadol 50mg',
    genericName: 'Tramadol HCl',
    strength: '50mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724910011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── ANTIBIOTICS ─────────────────────────────────────────────────────────
  {
    name: 'Mox 500mg',
    genericName: 'Amoxicillin',
    strength: '500mg',
    dosageForm: 'Capsule',
    manufacturer: 'Ranbaxy',
    barcodeGtin: '8901547610001',
    scheduleClass: 'H1',
    requiresPrescription: true,
  },
  {
    name: 'Augmentin 625mg',
    genericName: 'Amoxicillin + Clavulanate',
    strength: '625mg',
    dosageForm: 'Tablet',
    manufacturer: 'GSK India',
    barcodeGtin: '8901463010036',
    scheduleClass: 'H1',
    requiresPrescription: true,
  },
  {
    name: 'Azithral 500mg',
    genericName: 'Azithromycin',
    strength: '500mg',
    dosageForm: 'Tablet',
    manufacturer: 'Alembic Pharma',
    barcodeGtin: '8901547620001',
    scheduleClass: 'H1',
    requiresPrescription: true,
  },
  {
    name: 'Cifran 500mg',
    genericName: 'Ciprofloxacin',
    strength: '500mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724910022',
    scheduleClass: 'H1',
    requiresPrescription: true,
  },
  {
    name: 'Doxycycline 100mg',
    genericName: 'Doxycycline Hyclate',
    strength: '100mg',
    dosageForm: 'Capsule',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223010011',
    scheduleClass: 'H1',
    requiresPrescription: true,
  },
  {
    name: 'Cefixime 200mg',
    genericName: 'Cefixime',
    strength: '200mg',
    dosageForm: 'Tablet',
    manufacturer: 'Mankind Pharma',
    barcodeGtin: '8906049920000',
    scheduleClass: 'H1',
    requiresPrescription: true,
  },
  {
    name: 'Metrogyl 400mg',
    genericName: 'Metronidazole',
    strength: '400mg',
    dosageForm: 'Tablet',
    manufacturer: 'J.B. Chemicals',
    barcodeGtin: '8901547630001',
    scheduleClass: 'H1',
    requiresPrescription: true,
  },
  {
    name: 'Clindamycin 300mg',
    genericName: 'Clindamycin HCl',
    strength: '300mg',
    dosageForm: 'Capsule',
    manufacturer: 'Pfizer India',
    barcodeGtin: '8901235710011',
    scheduleClass: 'H1',
    requiresPrescription: true,
  },
  {
    name: 'Norflox 400mg',
    genericName: 'Norfloxacin',
    strength: '400mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223020011',
    scheduleClass: 'H1',
    requiresPrescription: true,
  },

  // ─── ANTIHYPERTENSIVES ───────────────────────────────────────────────────
  {
    name: 'Telma 40mg',
    genericName: 'Telmisartan',
    strength: '40mg',
    dosageForm: 'Tablet',
    manufacturer: 'Glenmark',
    barcodeGtin: '8901406010001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Amlodipine 5mg',
    genericName: 'Amlodipine Besylate',
    strength: '5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724910033',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Olsar 20mg',
    genericName: 'Olmesartan',
    strength: '20mg',
    dosageForm: 'Tablet',
    manufacturer: 'Daiichi Sankyo',
    barcodeGtin: '8901547640001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Atenolol 50mg',
    genericName: 'Atenolol',
    strength: '50mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223030011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Losartan 50mg',
    genericName: 'Losartan Potassium',
    strength: '50mg',
    dosageForm: 'Tablet',
    manufacturer: 'Dr. Reddy\'s',
    barcodeGtin: '8901406020001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Ramipril 5mg',
    genericName: 'Ramipril',
    strength: '5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Aventis Pharma',
    barcodeGtin: '8901547650001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── ANTIDIABETICS ───────────────────────────────────────────────────────
  {
    name: 'Metformin 500mg',
    genericName: 'Metformin HCl',
    strength: '500mg',
    dosageForm: 'Tablet',
    manufacturer: 'USV Pharma',
    barcodeGtin: '8901547660001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Glycomet 1gm',
    genericName: 'Metformin HCl',
    strength: '1000mg',
    dosageForm: 'Tablet',
    manufacturer: 'USV Pharma',
    barcodeGtin: '8901547660002',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Januvia 100mg',
    genericName: 'Sitagliptin',
    strength: '100mg',
    dosageForm: 'Tablet',
    manufacturer: 'MSD India',
    barcodeGtin: '8901234510001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Galvus 50mg',
    genericName: 'Vildagliptin',
    strength: '50mg',
    dosageForm: 'Tablet',
    manufacturer: 'Novartis India',
    barcodeGtin: '8901463030011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Glimepiride 2mg',
    genericName: 'Glimepiride',
    strength: '2mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sanofi India',
    barcodeGtin: '8901234520001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Jardiance 10mg',
    genericName: 'Empagliflozin',
    strength: '10mg',
    dosageForm: 'Tablet',
    manufacturer: 'Boehringer Ingelheim',
    barcodeGtin: '8901547670001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── ANTACIDS / GI ───────────────────────────────────────────────────────
  {
    name: 'Pantop 40mg',
    genericName: 'Pantoprazole',
    strength: '40mg',
    dosageForm: 'Tablet',
    manufacturer: 'Aristo Pharma',
    barcodeGtin: '8901406030001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Ranitidine 150mg',
    genericName: 'Ranitidine HCl',
    strength: '150mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223040011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Omez 20mg',
    genericName: 'Omeprazole',
    strength: '20mg',
    dosageForm: 'Capsule',
    manufacturer: 'Dr. Reddy\'s',
    barcodeGtin: '8901406040001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Gelusil MPS',
    genericName: 'Aluminium Hydroxide + Magnesium Hydroxide + Simethicone',
    strength: 'Standard',
    dosageForm: 'Tablet',
    manufacturer: 'Pfizer India',
    barcodeGtin: '8901235720011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Cremaffin Syrup',
    genericName: 'Liquid Paraffin + Milk of Magnesia',
    strength: 'Compound',
    dosageForm: 'Syrup',
    manufacturer: 'Abbott India',
    barcodeGtin: '8901458220011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Ondansetron 4mg',
    genericName: 'Ondansetron',
    strength: '4mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724910044',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Domperidone 10mg',
    genericName: 'Domperidone',
    strength: '10mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223050011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },

  // ─── ANTIHISTAMINES ──────────────────────────────────────────────────────
  {
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine HCl',
    strength: '10mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223060011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Allegra 120mg',
    genericName: 'Fexofenadine',
    strength: '120mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sanofi India',
    barcodeGtin: '8901234530001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Loratadine 10mg',
    genericName: 'Loratadine',
    strength: '10mg',
    dosageForm: 'Tablet',
    manufacturer: 'Mankind Pharma',
    barcodeGtin: '8906049930000',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Montair 10mg',
    genericName: 'Montelukast',
    strength: '10mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223070011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Phenergan 25mg',
    genericName: 'Promethazine HCl',
    strength: '25mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sanofi India',
    barcodeGtin: '8901234540001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── CARDIAC / LIPID-LOWERING ────────────────────────────────────────────
  {
    name: 'Atorvastatin 10mg',
    genericName: 'Atorvastatin Calcium',
    strength: '10mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724910055',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Rosuvastatin 10mg',
    genericName: 'Rosuvastatin Calcium',
    strength: '10mg',
    dosageForm: 'Tablet',
    manufacturer: 'AstraZeneca India',
    barcodeGtin: '8901547680001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Ecosprin 75mg',
    genericName: 'Aspirin',
    strength: '75mg',
    dosageForm: 'Tablet',
    manufacturer: 'USV Pharma',
    barcodeGtin: '8901547690001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Digoxin 0.25mg',
    genericName: 'Digoxin',
    strength: '0.25mg',
    dosageForm: 'Tablet',
    manufacturer: 'GSK India',
    barcodeGtin: '8901463040011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Metoprolol 25mg',
    genericName: 'Metoprolol Succinate',
    strength: '25mg',
    dosageForm: 'Tablet',
    manufacturer: 'AstraZeneca India',
    barcodeGtin: '8901547700001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── CNS / NEURO ─────────────────────────────────────────────────────────
  {
    name: 'Alprazolam 0.5mg',
    genericName: 'Alprazolam',
    strength: '0.5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724910066',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Clonazepam 0.5mg',
    genericName: 'Clonazepam',
    strength: '0.5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724910077',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Amitriptyline 25mg',
    genericName: 'Amitriptyline HCl',
    strength: '25mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724910088',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Phenytoin 100mg',
    genericName: 'Phenytoin Sodium',
    strength: '100mg',
    dosageForm: 'Tablet',
    manufacturer: 'Pfizer India',
    barcodeGtin: '8901235730011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Donepezil 5mg',
    genericName: 'Donepezil HCl',
    strength: '5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223080011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Pregabalin 75mg',
    genericName: 'Pregabalin',
    strength: '75mg',
    dosageForm: 'Capsule',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724910099',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Gabapentin 300mg',
    genericName: 'Gabapentin',
    strength: '300mg',
    dosageForm: 'Capsule',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724911000',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── VITAMINS / SUPPLEMENTS ──────────────────────────────────────────────
  {
    name: 'Becosules Capsule',
    genericName: 'Vitamin B-Complex',
    strength: 'Standard',
    dosageForm: 'Capsule',
    manufacturer: 'Pfizer India',
    barcodeGtin: '8901235740011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Calcium Sandoz 500mg',
    genericName: 'Calcium Carbonate',
    strength: '500mg',
    dosageForm: 'Tablet',
    manufacturer: 'Novartis India',
    barcodeGtin: '8901463050011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Shelcal 500mg',
    genericName: 'Calcium Carbonate + Vitamin D3',
    strength: '500mg + 250 IU',
    dosageForm: 'Tablet',
    manufacturer: 'Elder Pharma',
    barcodeGtin: '8901547710001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Revital Capsule',
    genericName: 'Multivitamin + Multiminerals',
    strength: 'Standard',
    dosageForm: 'Capsule',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724911011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Vitamin D3 60000 IU',
    genericName: 'Cholecalciferol',
    strength: '60000 IU',
    dosageForm: 'Capsule',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724911022',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Folic Acid 5mg',
    genericName: 'Folic Acid',
    strength: '5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223090011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Ferrous Sulphate 200mg',
    genericName: 'Ferrous Sulphate',
    strength: '200mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223100011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Neurobion Forte',
    genericName: 'B1 + B6 + B12 Complex',
    strength: 'Standard',
    dosageForm: 'Tablet',
    manufacturer: 'MSD India',
    barcodeGtin: '8901234550001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },

  // ─── RESPIRATORY ─────────────────────────────────────────────────────────
  {
    name: 'Seroflo 250 Inhaler',
    genericName: 'Salmeterol + Fluticasone',
    strength: '25mcg + 250mcg',
    dosageForm: 'Inhaler',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223110011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Asthalin Inhaler',
    genericName: 'Salbutamol',
    strength: '100mcg',
    dosageForm: 'Inhaler',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223120011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Deriphyllin Retard',
    genericName: 'Etofylline + Theophylline',
    strength: '150mg + 25mg',
    dosageForm: 'Tablet',
    manufacturer: 'Franco-Indian Pharma',
    barcodeGtin: '8901547720001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Mucinac 600mg',
    genericName: 'N-Acetylcysteine',
    strength: '600mg',
    dosageForm: 'Effervescent Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223130011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },

  // ─── STEROIDS / ANTI-INFLAMMATORY ────────────────────────────────────────
  {
    name: 'Wysolone 5mg',
    genericName: 'Prednisolone',
    strength: '5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Pfizer India',
    barcodeGtin: '8901235750011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Dexamethasone 0.5mg',
    genericName: 'Dexamethasone',
    strength: '0.5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223140011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Methyl Prednisolone 4mg',
    genericName: 'Methylprednisolone',
    strength: '4mg',
    dosageForm: 'Tablet',
    manufacturer: 'Pfizer India',
    barcodeGtin: '8901235760011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── THYROID ─────────────────────────────────────────────────────────────
  {
    name: 'Eltroxin 50mcg',
    genericName: 'Levothyroxine',
    strength: '50mcg',
    dosageForm: 'Tablet',
    manufacturer: 'GSK India',
    barcodeGtin: '8901463060011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Thyronorm 100mcg',
    genericName: 'Levothyroxine',
    strength: '100mcg',
    dosageForm: 'Tablet',
    manufacturer: 'Abbott India',
    barcodeGtin: '8901458230011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Neomercazole 5mg',
    genericName: 'Carbimazole',
    strength: '5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Abbott India',
    barcodeGtin: '8901458240011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── ANTIMALARIALS / ANTIPARASITIC ───────────────────────────────────────
  {
    name: 'Lariago 250mg',
    genericName: 'Chloroquine Phosphate',
    strength: '250mg',
    dosageForm: 'Tablet',
    manufacturer: 'IPCA Laboratories',
    barcodeGtin: '8901547730001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Falcigo 200mg',
    genericName: 'Artesunate',
    strength: '200mg',
    dosageForm: 'Tablet',
    manufacturer: 'IPCA Laboratories',
    barcodeGtin: '8901547740001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Zentel 400mg',
    genericName: 'Albendazole',
    strength: '400mg',
    dosageForm: 'Tablet',
    manufacturer: 'GSK India',
    barcodeGtin: '8901463070011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },

  // ─── ANTIFUNGALS ─────────────────────────────────────────────────────────
  {
    name: 'Fluconazole 150mg',
    genericName: 'Fluconazole',
    strength: '150mg',
    dosageForm: 'Capsule',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223150011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Itraconazole 100mg',
    genericName: 'Itraconazole',
    strength: '100mg',
    dosageForm: 'Capsule',
    manufacturer: 'Glenmark',
    barcodeGtin: '8901406050001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Terbinafine 250mg',
    genericName: 'Terbinafine HCl',
    strength: '250mg',
    dosageForm: 'Tablet',
    manufacturer: 'Novartis India',
    barcodeGtin: '8901463080011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── ANTIVIRALS ──────────────────────────────────────────────────────────
  {
    name: 'Acyclovir 400mg',
    genericName: 'Acyclovir',
    strength: '400mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223160011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Oseltamivir 75mg',
    genericName: 'Oseltamivir Phosphate',
    strength: '75mg',
    dosageForm: 'Capsule',
    manufacturer: 'Roche India',
    barcodeGtin: '8901547750001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── OPHTHALMIC ──────────────────────────────────────────────────────────
  {
    name: 'Moxifloxacin Eye Drop',
    genericName: 'Moxifloxacin HCl',
    strength: '0.5%',
    dosageForm: 'Eye Drop',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724911033',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Betnesol Eye Drop',
    genericName: 'Betamethasone',
    strength: '0.1%',
    dosageForm: 'Eye Drop',
    manufacturer: 'GSK India',
    barcodeGtin: '8901463090011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Timolol 0.5% Eye Drop',
    genericName: 'Timolol Maleate',
    strength: '0.5%',
    dosageForm: 'Eye Drop',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724911044',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── DERMATOLOGICAL ──────────────────────────────────────────────────────
  {
    name: 'Betnovate Cream',
    genericName: 'Betamethasone Valerate',
    strength: '0.1%',
    dosageForm: 'Cream',
    manufacturer: 'GSK India',
    barcodeGtin: '8901463100011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Clotrimazole 1% Cream',
    genericName: 'Clotrimazole',
    strength: '1%',
    dosageForm: 'Cream',
    manufacturer: 'Bayer India',
    barcodeGtin: '8901547760001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Retino-A 0.025% Cream',
    genericName: 'Tretinoin',
    strength: '0.025%',
    dosageForm: 'Cream',
    manufacturer: 'Johnson & Johnson India',
    barcodeGtin: '8901547770001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── PSYCHIATRY ──────────────────────────────────────────────────────────
  {
    name: 'Olanzapine 5mg',
    genericName: 'Olanzapine',
    strength: '5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724911055',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Sertraline 50mg',
    genericName: 'Sertraline HCl',
    strength: '50mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724911066',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Fluoxetine 20mg',
    genericName: 'Fluoxetine HCl',
    strength: '20mg',
    dosageForm: 'Capsule',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223170011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Risperidone 2mg',
    genericName: 'Risperidone',
    strength: '2mg',
    dosageForm: 'Tablet',
    manufacturer: 'Janssen India',
    barcodeGtin: '8901547780001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── UROLOGY / RENAL ─────────────────────────────────────────────────────
  {
    name: 'Tamsulosin 0.4mg',
    genericName: 'Tamsulosin HCl',
    strength: '0.4mg',
    dosageForm: 'Capsule',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223180011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Furosemide 40mg',
    genericName: 'Furosemide',
    strength: '40mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sanofi India',
    barcodeGtin: '8901234560001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Nitrofurantoin 100mg',
    genericName: 'Nitrofurantoin',
    strength: '100mg',
    dosageForm: 'Capsule',
    manufacturer: 'GSK India',
    barcodeGtin: '8901463110011',
    scheduleClass: 'H1',
    requiresPrescription: true,
  },

  // ─── WOMEN'S HEALTH ──────────────────────────────────────────────────────
  {
    name: 'I-Pill 1.5mg',
    genericName: 'Levonorgestrel',
    strength: '1.5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Piramal Healthcare',
    barcodeGtin: '8901547790001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Mala-D Tablet',
    genericName: 'Norethisterone + Ethinyl Estradiol',
    strength: '1mg + 0.035mg',
    dosageForm: 'Tablet',
    manufacturer: 'HLL Lifecare',
    barcodeGtin: '8901547800001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Duphaston 10mg',
    genericName: 'Dydrogesterone',
    strength: '10mg',
    dosageForm: 'Tablet',
    manufacturer: 'Abbott India',
    barcodeGtin: '8901458250011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── BONE / JOINT ────────────────────────────────────────────────────────
  {
    name: 'Alendronate 70mg',
    genericName: 'Alendronic Acid',
    strength: '70mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla',
    barcodeGtin: '8901223190011',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Calcirol 60000 IU',
    genericName: 'Cholecalciferol',
    strength: '60000 IU',
    dosageForm: 'Granules',
    manufacturer: 'Cadila Healthcare',
    barcodeGtin: '8901547810001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },

  // ─── COUGH / COLD ────────────────────────────────────────────────────────
  {
    name: 'Benadryl Cough Syrup',
    genericName: 'Diphenhydramine + Ammonium Chloride + Sodium Citrate',
    strength: 'Compound',
    dosageForm: 'Syrup',
    manufacturer: 'Pfizer India',
    barcodeGtin: '8901235770011',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Grilinctus Syrup',
    genericName: 'Dextromethorphan + Chlorpheniramine',
    strength: 'Compound',
    dosageForm: 'Syrup',
    manufacturer: 'Franco-Indian Pharma',
    barcodeGtin: '8901547820001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Sudafed PE',
    genericName: 'Phenylephrine',
    strength: '10mg',
    dosageForm: 'Tablet',
    manufacturer: 'Johnson & Johnson India',
    barcodeGtin: '8901547830001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },

  // ─── ANTI-NAUSEA / MIGRAINE ──────────────────────────────────────────────
  {
    name: 'Sumatriptan 50mg',
    genericName: 'Sumatriptan Succinate',
    strength: '50mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724911077',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Saridon Tablet',
    genericName: 'Paracetamol + Propyphenazone + Caffeine',
    strength: '250mg + 150mg + 50mg',
    dosageForm: 'Tablet',
    manufacturer: 'Bayer India',
    barcodeGtin: '8901547840001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },

  // ─── INSULIN / INJECTABLE ────────────────────────────────────────────────
  {
    name: 'Huminsulin N 100IU',
    genericName: 'Insulin Isophane (NPH)',
    strength: '100 IU/ml',
    dosageForm: 'Injection',
    manufacturer: 'Eli Lilly India',
    barcodeGtin: '8901547850001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Lantus 100IU',
    genericName: 'Insulin Glargine',
    strength: '100 IU/ml',
    dosageForm: 'Injection',
    manufacturer: 'Sanofi India',
    barcodeGtin: '8901234570001',
    scheduleClass: 'H',
    requiresPrescription: true,
  },

  // ─── MISC / OTHER ────────────────────────────────────────────────────────
  {
    name: 'Disprin 325mg',
    genericName: 'Aspirin',
    strength: '325mg',
    dosageForm: 'Effervescent Tablet',
    manufacturer: 'Reckitt Benckiser India',
    barcodeGtin: '8901547860001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'ORS Electral Powder',
    genericName: 'Oral Rehydration Salts',
    strength: 'Standard WHO Formula',
    dosageForm: 'Powder',
    manufacturer: 'Franco-Indian Pharma',
    barcodeGtin: '8901547870001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Lactulose 10g Syrup',
    genericName: 'Lactulose',
    strength: '10g/15ml',
    dosageForm: 'Syrup',
    manufacturer: 'Solvay Pharma India',
    barcodeGtin: '8901547880001',
    scheduleClass: 'None',
    requiresPrescription: false,
  },
  {
    name: 'Spironolactone 25mg',
    genericName: 'Spironolactone',
    strength: '25mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724911088',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
  {
    name: 'Warfarin 5mg',
    genericName: 'Warfarin Sodium',
    strength: '5mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharma',
    barcodeGtin: '8901724911099',
    scheduleClass: 'H',
    requiresPrescription: true,
  },
];

async function main() {
  console.log(`\n🌱 Seeding database with ${MEDICINES_100.length} medicines...\n`);

  // Clean up existing data
  await prisma.billItem.deleteMany();
  await prisma.bill.deleteMany();
  await prisma.demandNodeItem.deleteMany();
  await prisma.retailerStock.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.insuranceProvider.deleteMany();
  await prisma.doctorHospital.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.procedure.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      passwordHash: 'hashedpassword',
      role: 'CUSTOMER',
    },
  });

  const retailer = await prisma.user.create({
    data: {
      email: 'retailer@example.com',
      passwordHash: 'hashedpassword',
      role: 'RETAILER',
    },
  });

  // Create Hospitals
  const hospital1 = await prisma.hospital.create({
    data: {
      name: 'Apollo Hospitals',
      type: 'Private',
      location: '{"lat": 28.5678, "lng": 77.2800}',
      licenses: JSON.stringify(['NABH', 'JCI']),
      patientsTreated: '1M+',
      photos: JSON.stringify(['https://example.com/apollo.jpg']),
    },
  });

  const hospital2 = await prisma.hospital.create({
    data: {
      name: 'Max Super Speciality',
      type: 'Private',
      location: '{"lat": 28.5273, "lng": 77.2154}',
      licenses: JSON.stringify(['NABH']),
      patientsTreated: '500k+',
      photos: JSON.stringify(['https://example.com/max.jpg']),
    },
  });

  // Create Procedures
  await prisma.procedure.create({
    data: {
      name: 'PCNL',
      diseaseTags: JSON.stringify(['Kidney Stone']),
      expenseBreakdown: JSON.stringify({ room: 15000, surgery: 45000, consumables: 10000 }),
      hospitalId: hospital1.id,
    },
  });

  await prisma.procedure.create({
    data: {
      name: 'RIRS',
      diseaseTags: JSON.stringify(['Kidney Stone']),
      expenseBreakdown: JSON.stringify({ room: 20000, surgery: 60000, consumables: 15000 }),
      hospitalId: hospital1.id,
    },
  });

  await prisma.procedure.create({
    data: {
      name: 'URS',
      diseaseTags: JSON.stringify(['Kidney Stone']),
      expenseBreakdown: JSON.stringify({ room: 12000, surgery: 35000, consumables: 8000 }),
      hospitalId: hospital2.id,
    },
  });

  // Create Doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      name: 'Dr. Sanjay Sharma',
      qualifications: JSON.stringify(['MBBS', 'MS - General Surgery', 'MCh - Urology']),
      experienceYears: 15,
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: 'Dr. Anita Desai',
      qualifications: JSON.stringify(['MBBS', 'MD - Cardiology']),
      experienceYears: 12,
    },
  });

  await prisma.doctorHospital.createMany({
    data: [
      { doctorId: doctor1.id, hospitalId: hospital1.id },
      { doctorId: doctor1.id, hospitalId: hospital2.id },
      { doctorId: doctor2.id, hospitalId: hospital1.id },
    ],
  });

  // Seed all 100 medicines
  const expiryNextYear = new Date();
  expiryNextYear.setFullYear(expiryNextYear.getFullYear() + 1);

  let seededCount = 0;
  for (const med of MEDICINES_100) {
    const created = await prisma.medicine.create({ data: med });

    // Add retailer stock for each medicine
    await prisma.retailerStock.create({
      data: {
        retailerId: retailer.id,
        medicineId: created.id,
        qty: Math.floor(Math.random() * 200) + 10,
        avgDailySales: Math.floor(Math.random() * 20) + 1,
        expiryDate: expiryNextYear,
      },
    });
    seededCount++;
    if (seededCount % 10 === 0) {
      console.log(`  ✅ Seeded ${seededCount} medicines...`);
    }
  }

  console.log(`\n🎉 Seeding complete! ${seededCount} medicines added to the database.\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
