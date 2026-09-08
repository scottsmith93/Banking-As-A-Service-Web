import { useEffect, useMemo, useState } from "react";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import Button from "carbon-react/lib/components/button/__next__";
import {
  ButtonToggle,
  ButtonToggleGroup,
} from "carbon-react/lib/components/button-toggle";
import {
  FlatTable,
  FlatTableHead,
  FlatTableHeader,
  FlatTableBody,
  FlatTableRow,
  FlatTableCell,
} from "carbon-react/lib/components/flat-table";
import Pager from "carbon-react/lib/components/pager";
import Pill from "carbon-react/lib/components/pill";
import { clients, type ClientStatus } from "../data/clients";

const PAGE_SIZE = 10;

type ClientFilter = "all" | ClientStatus;

const gbpFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatBalance(amountGbp: number) {
  return gbpFormatter.format(amountGbp);
}

function formatLastActivity(isoDate: string) {
  return dateFormatter.format(new Date(isoDate));
}

export default function ExamplePage1() {
  const [filter, setFilter] = useState<ClientFilter>("all");
  const [page, setPage] = useState(1);

  const filteredClients = useMemo(() => {
    if (filter === "all") {
      return clients;
    }
    return clients.filter((client) => client.status === filter);
  }, [filter]);

  const pageClients = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredClients.slice(start, start + PAGE_SIZE);
  }, [filteredClients, page]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <Box className="pageContent">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h1" as="h1">
          Client list
        </Typography>
        <Button variantType="secondary">Add client</Button>
      </Box>

      <ButtonToggleGroup
        id="client-list-filter"
        label="Show"
        value={filter}
        onChange={(_event, value) => setFilter((value as ClientFilter) ?? "all")}
      >
        <ButtonToggle value="all">All</ButtonToggle>
        <ButtonToggle value="active">Active</ButtonToggle>
        <ButtonToggle value="inactive">Inactive</ButtonToggle>
      </ButtonToggleGroup>

      <Box display="flex" flexDirection="column" gap={2}>
        <FlatTable>
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Client</FlatTableHeader>
              <FlatTableHeader>Primary contact</FlatTableHeader>
              <FlatTableHeader>Status</FlatTableHeader>
              <FlatTableHeader align="right">Balance due</FlatTableHeader>
              <FlatTableHeader>Last activity</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {pageClients.map((client) => (
              <FlatTableRow key={client.id}>
                <FlatTableCell>{client.name}</FlatTableCell>
                <FlatTableCell>{client.contactName}</FlatTableCell>
                <FlatTableCell>
                  <Pill
                    pillRole="status"
                    colorVariant={
                      client.status === "active" ? "positive" : "neutral"
                    }
                  >
                    {client.status === "active" ? "Active" : "Inactive"}
                  </Pill>
                </FlatTableCell>
                <FlatTableCell align="right">
                  <Typography
                    variant="p"
                    as="span"
                    className="numericValue"
                  >
                    {formatBalance(client.balanceDueGbp)}
                  </Typography>
                </FlatTableCell>
                <FlatTableCell>
                  {formatLastActivity(client.lastActivity)}
                </FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>

        <Pager
          currentPage={page}
          totalRecords={filteredClients.length}
          pageSize={PAGE_SIZE}
          onPagination={(nextPage) => setPage(nextPage)}
        />
      </Box>
    </Box>
  );
}
