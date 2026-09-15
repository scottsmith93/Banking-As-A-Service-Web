// Curated, contextually-realistic photos for the prototype catalogue — one
// per item, sourced from Wikimedia Commons (freely licensed) rather than
// random stock photography, so each item's thumbnail and detail-page image
// actually resemble what the item is.
import doorSeal from "../assets/product-images/222.jpg";
import builtInOven from "../assets/product-images/balay3kfe361wi.jpg";
import oliveOil from "../assets/product-images/c01.jpg";
import iphone from "../assets/product-images/iph15-128.jpg";
import softwareSupport from "../assets/product-images/svc-annual.jpg";
import officeDesk from "../assets/product-images/desk-erg.jpg";
import installation from "../assets/product-images/svc-install.jpg";
import paper from "../assets/product-images/paper-a4.jpg";
import meshChair from "../assets/product-images/chair-mesh.jpg";
import training from "../assets/product-images/svc-train.jpg";
import toner from "../assets/product-images/toner-bk.jpg";
import monitor from "../assets/product-images/mon-27.jpg";
import audit from "../assets/product-images/svc-audit.jpg";
import keyboard from "../assets/product-images/keyb-wl.jpg";
import coffee from "../assets/product-images/coffee-1kg.jpg";
import delivery from "../assets/product-images/svc-deliv.jpg";

const PRODUCT_IMAGE_BY_CODE: Record<string, string> = {
  "222": doorSeal,
  BALAY3KFE361WI: builtInOven,
  C01: oliveOil,
  "IPH15-128": iphone,
  "SVC-ANNUAL": softwareSupport,
  "DESK-ERG": officeDesk,
  "SVC-INSTALL": installation,
  "PAPER-A4": paper,
  "CHAIR-MESH": meshChair,
  "SVC-TRAIN": training,
  "TONER-BK": toner,
  "MON-27": monitor,
  "SVC-AUDIT": audit,
  "KEYB-WL": keyboard,
  "COFFEE-1KG": coffee,
  "SVC-DELIV": delivery,
};

export function getProductImage(code: string): string | undefined {
  return PRODUCT_IMAGE_BY_CODE[code];
}
