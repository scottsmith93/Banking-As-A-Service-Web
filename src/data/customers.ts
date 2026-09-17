// MOCK DATA — replace with real API responses

export type CustomerStatus = "active" | "inactive";
export type CustomerType = "business" | "individual";
export type CustomerCountryCode = "DE" | "ES" | "FR" | "GB" | "PT";

export const CUSTOMER_COUNTRY_CODES: CustomerCountryCode[] = ["DE", "ES", "FR", "GB", "PT"];

export type Customer = {
  id: string;
  customerCode: string;
  name: string;
  customerType: CustomerType;
  vatNumber: string;
  contactName: string;
  email: string;
  phone: string;
  town: string;
  countryCode: CustomerCountryCode;
  status: CustomerStatus;
  /** Outstanding balance in EUR. */
  balanceDueEur: number;
  /** ISO date string. */
  lastActivity: string;
};

export const customers: Customer[] = [
  { id: "cl-001", customerCode: "CLI-1001", name: "Estudio Lumen Arquitectura SL", customerType: "business", vatNumber: "ESB88412653", contactName: "Elena Ruiz", email: "elena.ruiz@estudiolumen.es", phone: "+34 910 482 631", town: "Madrid", countryCode: "ES", status: "active", balanceDueEur: 1240.5, lastActivity: "2026-09-15" },
  { id: "cl-002", customerCode: "CLI-1002", name: "Boulangerie des Lilas SAS", customerType: "business", vatNumber: "FR40321987654", contactName: "Camille Martin", email: "camille.martin@lilas-boulangerie.fr", phone: "+33 4 72 16 84 20", town: "Lyon", countryCode: "FR", status: "active", balanceDueEur: 0, lastActivity: "2026-09-14" },
  { id: "cl-003", customerCode: "CLI-1003", name: "Nordhafen Logistik GmbH", customerType: "business", vatNumber: "DE289456712", contactName: "Lukas Weber", email: "lukas.weber@nordhafen-logistik.de", phone: "+49 40 228 174 90", town: "Hamburg", countryCode: "DE", status: "active", balanceDueEur: 385, lastActivity: "2026-09-11" },
  { id: "cl-004", customerCode: "CLI-1004", name: "Oficina Verde Lda", customerType: "business", vatNumber: "PT509384721", contactName: "Inês Costa", email: "ines.costa@oficinaverde.pt", phone: "+351 22 405 18 62", town: "Porto", countryCode: "PT", status: "inactive", balanceDueEur: 0, lastActivity: "2026-04-18" },
  { id: "cl-005", customerCode: "CLI-1005", name: "Northbridge Office Supplies Ltd", customerType: "business", vatNumber: "GB214557891", contactName: "Helen Marsh", email: "helen.marsh@northbridge-office.co.uk", phone: "+44 161 496 3201", town: "Manchester", countryCode: "GB", status: "active", balanceDueEur: 2890.75, lastActivity: "2026-09-16" },
  { id: "cl-006", customerCode: "CLI-1006", name: "Cooperativa Agrícola Sierra del Sur", customerType: "business", vatNumber: "ESF18756204", contactName: "Marta Jiménez", email: "administracion@sierradelsur.coop", phone: "+34 953 641 208", town: "Jaén", countryCode: "ES", status: "active", balanceDueEur: 156.2, lastActivity: "2026-09-09" },
  { id: "cl-007", customerCode: "CLI-1007", name: "Atelier Lumière SARL", customerType: "business", vatNumber: "FR86754321908", contactName: "Sophie Laurent", email: "sophie@atelierlumiere.fr", phone: "+33 1 84 80 27 14", town: "Paris", countryCode: "FR", status: "active", balanceDueEur: 156.2, lastActivity: "2026-09-10" },
  { id: "cl-008", customerCode: "CLI-1008", name: "Rheinblick Veranstaltungstechnik KG", customerType: "business", vatNumber: "DE312987465", contactName: "Mia Schneider", email: "mia.schneider@rheinblick.de", phone: "+49 221 507 81 30", town: "Köln", countryCode: "DE", status: "inactive", balanceDueEur: 42, lastActivity: "2026-02-03" },
  { id: "cl-009", customerCode: "CLI-1009", name: "Sofia Almeida", customerType: "individual", vatNumber: "PT245781963", contactName: "Sofia Almeida", email: "sofia.almeida@example.pt", phone: "+351 21 348 20 17", town: "Lisboa", countryCode: "PT", status: "active", balanceDueEur: 720, lastActivity: "2026-09-08" },
  { id: "cl-010", customerCode: "CLI-1010", name: "Greenline Renewable Installations Ltd", customerType: "business", vatNumber: "GB883104276", contactName: "Aisha Khan", email: "aisha.khan@greenline-renewables.co.uk", phone: "+44 191 580 3344", town: "Newcastle", countryCode: "GB", status: "active", balanceDueEur: 5420, lastActivity: "2026-09-12" },
  { id: "cl-011", customerCode: "CLI-1011", name: "Talleres Rivera y Asociados SL", customerType: "business", vatNumber: "ESB72910486", contactName: "Diego Rivera", email: "diego@talleresrivera.es", phone: "+34 944 281 705", town: "Bilbao", countryCode: "ES", status: "active", balanceDueEur: 0, lastActivity: "2026-09-07" },
  { id: "cl-012", customerCode: "CLI-1012", name: "Cabinet Juridique Moreau & Associés", customerType: "business", vatNumber: "FR12590487321", contactName: "Élodie Moreau", email: "elodie.moreau@cabinet-moreau.fr", phone: "+33 5 56 18 41 22", town: "Bordeaux", countryCode: "FR", status: "inactive", balanceDueEur: 0, lastActivity: "2026-01-21" },
  { id: "cl-013", customerCode: "CLI-1013", name: "Pemberton Logistics Group Ltd", customerType: "business", vatNumber: "GB654219870", contactName: "Ryan McAllister", email: "ryan.mcallister@pemberton-logistics.co.uk", phone: "+44 161 870 5520", town: "Salford", countryCode: "GB", status: "active", balanceDueEur: 1875.3, lastActivity: "2026-09-05" },
  { id: "cl-014", customerCode: "CLI-1014", name: "Jardins do Atlântico Lda", customerType: "business", vatNumber: "PT516204893", contactName: "Tiago Ferreira", email: "tiago@jardinsatlantico.pt", phone: "+351 291 740 118", town: "Funchal", countryCode: "PT", status: "active", balanceDueEur: 310.45, lastActivity: "2026-09-04" },
  { id: "cl-015", customerCode: "CLI-1015", name: "Klara Hoffmann", customerType: "individual", vatNumber: "DE198765432", contactName: "Klara Hoffmann", email: "klara.hoffmann@example.de", phone: "+49 89 614 28 905", town: "München", countryCode: "DE", status: "inactive", balanceDueEur: 890, lastActivity: "2026-03-10" }
];
