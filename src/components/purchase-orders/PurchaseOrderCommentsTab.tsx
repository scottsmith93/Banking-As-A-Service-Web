import { useState } from "react";
import Textarea from "carbon-react/lib/components/textarea";

export default function PurchaseOrderCommentsTab() {
  const [comments, setComments] = useState("");

  return (
    <Textarea
      id="purchase-order-comments"
      label="Comments"
      value={comments}
      onChange={(event) => setComments(event.target.value)}
      rows={6}
    />
  );
}
