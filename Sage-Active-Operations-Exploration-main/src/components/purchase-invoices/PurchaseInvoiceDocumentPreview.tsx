import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import {
  FlatTable,
  FlatTableBody,
  FlatTableCell,
  FlatTableHead,
  FlatTableHeader,
  FlatTableRow,
} from "carbon-react/lib/components/flat-table";
import Link from "carbon-react/lib/components/link";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import type { PurchaseInvoice, PurchaseInvoiceDetail } from "../../data/purchaseInvoices";
import { formatCurrencyGbp, formatListingDate } from "../sales-listing/salesGridShared";

type PurchaseInvoiceDocumentPreviewProps = {
  invoice: PurchaseInvoice;
  detail: PurchaseInvoiceDetail;
};

export default function PurchaseInvoiceDocumentPreview({
  invoice,
  detail,
}: PurchaseInvoiceDocumentPreviewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const vatRow = detail.vatRows[0];

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), detail.totalPreviewPages);
    setCurrentPage(clamped);
  };

  return (
    <Box className="purchaseInvoiceDetail__preview">
      <Box
        className="purchaseInvoiceDetail__previewPagination"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Link onClick={() => goToPage(currentPage - 1)}>Previous</Link>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="p" as="span">
            Page
          </Typography>
          <Box className="purchaseInvoiceDetail__pageInput">
            <Textbox
              id="purchase-invoice-preview-page"
              aria-label="Current page"
              value={String(currentPage)}
              onChange={(event) => {
                const parsed = Number(event.target.value.replace(/\D/g, ""));
                if (!Number.isNaN(parsed) && parsed > 0) {
                  goToPage(parsed);
                }
              }}
            />
          </Box>
          <Typography variant="p" as="span">
            of {detail.totalPreviewPages}
          </Typography>
        </Box>
        <Link onClick={() => goToPage(currentPage + 1)}>Next</Link>
      </Box>

      <Box className="purchaseInvoiceDetail__previewCanvas">
        <Box className="purchaseInvoiceDetail__previewPage">
          {currentPage === 1 ? (
            <>
              <Typography variant="strong" as="p">
                {invoice.supplier}
              </Typography>
              {detail.supplierAddressLines.map((line) => (
                <Typography key={line} variant="p" as="p">
                  {line}
                </Typography>
              ))}
              <Typography variant="p" as="p">
                {detail.supplierCityCountry}
              </Typography>

              <Typography
                variant="h3"
                as="p"
                className="purchaseInvoiceDetail__previewDocType"
              >
                {detail.purchaseType === "invoice" ? "Invoice" : "Receipt"}
              </Typography>
              <Typography variant="p" as="p">
                Invoice number: {invoice.invoiceNumber}
              </Typography>
              <Typography variant="p" as="p">
                Invoice date: {formatListingDate(invoice.invoiceDate)}
              </Typography>

              <FlatTable mt={3}>
                <FlatTableHead>
                  <FlatTableRow>
                    <FlatTableHeader>Category</FlatTableHeader>
                    <FlatTableHeader align="right">Taxable amount</FlatTableHeader>
                    <FlatTableHeader align="right">VAT</FlatTableHeader>
                    <FlatTableHeader align="right">Total</FlatTableHeader>
                  </FlatTableRow>
                </FlatTableHead>
                <FlatTableBody>
                  <FlatTableRow>
                    <FlatTableCell>{vatRow.category}</FlatTableCell>
                    <FlatTableCell align="right">
                      {formatCurrencyGbp(vatRow.taxableAmountGbp)}
                    </FlatTableCell>
                    <FlatTableCell align="right">
                      {formatCurrencyGbp(vatRow.vatAmountGbp)}
                    </FlatTableCell>
                    <FlatTableCell align="right">
                      {formatCurrencyGbp(invoice.totalGbp)}
                    </FlatTableCell>
                  </FlatTableRow>
                </FlatTableBody>
              </FlatTable>
            </>
          ) : (
            <Typography variant="p" as="p">
              Page {currentPage} of {detail.totalPreviewPages} — additional pages are not
              included in this prototype.
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        className="purchaseInvoiceDetail__previewToolbar"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button variantType="tertiary" size="small" iconType="download" iconPosition="before">
          Download
        </Button>
        <Box display="flex" gap={1}>
          <Button variantType="secondary" size="small" iconType="minus" iconPosition="before">
            Zoom out
          </Button>
          <Button variantType="secondary" size="small" iconType="plus" iconPosition="before">
            Zoom in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
