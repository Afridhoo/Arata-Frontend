import NewLoading from "@/components/loading/NewLoading";

import { UseGetAllReview } from "../../../features/review/hooks/useReview";

export default function ReviewAdmin() {
  const { data: Review } = UseGetAllReview();

  if (!Review) return <NewLoading />;
  console.log(Review);

  return <div>ReviewAdmin</div>;
}
